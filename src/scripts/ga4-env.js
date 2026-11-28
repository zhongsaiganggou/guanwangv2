// ga4-env.js
// GA4 生产追踪环境判定 —— 单一权威实现（DEFAULT DENY / PRODUCTION ALLOWLIST）。
// 该函数同时被 Analytics.astro 运行时与 Node 自动化测试引用，避免判定逻辑两份不一致。
// 不依赖 DOM / gtag，可在 Node 与浏览器中直接运行。

// 精确生产域名允许列表。必须与 hostname 完全相等，禁止 includes 等模糊匹配，
// 防止 *.pages.dev、含 zhongsai 字样的测试域名被误放行。
export const PRODUCTION_HOSTS = Object.freeze([
  'zhongsai-steelstructure.com',
  'www.zhongsai-steelstructure.com',
]);

export function isProductionHostname(hostname, allowedHosts = PRODUCTION_HOSTS) {
  return typeof hostname === 'string' && allowedHosts.includes(hostname);
}

// 判定是否允许加载生产 GA4。
// input:
//   hostname  : 浏览器 location.hostname（运行时）
//   isDev     : 构建期 import.meta.env.DEV（本地开发）
//   isPreview : 构建期 PUBLIC_IS_PREVIEW === 'true'
//   cfBranch  : 构建期 process.env.CF_PAGES_BRANCH（Cloudflare Pages 分支）
//   allowedHosts : 可选，自定义允许列表（测试用）
// 规则：任一构建期非生产信号命中即拒绝；且 hostname 必须精确命中允许列表。
// localhost / 127.0.0.1 / *.pages.dev / 未知域名 / 空 host 因不在允许列表而默认拒绝。
export function shouldLoadGa4(input) {
  const {
    hostname = '',
    isDev = false,
    isPreview = false,
    cfBranch = '',
    allowedHosts = PRODUCTION_HOSTS,
  } = input || {};

  // 第一层：构建环境识别
  if (isDev === true) return false;
  if (isPreview === true) return false;
  if (typeof cfBranch === 'string' && cfBranch !== '' && cfBranch !== 'main') {
    return false;
  }

  // 第二层：浏览器 hostname 精确允许列表兜底（DEFAULT DENY）
  return isProductionHostname(hostname, allowedHosts);
}
