// ga4-env.test.mjs
// GA4 环境隔离回归测试（Node 内置 test runner，零第三方依赖）
// 运行：node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shouldLoadGa4, PRODUCTION_HOSTS, isProductionHostname } from '../src/scripts/ga4-env.js';

// 生产构建的标准非生产信号
const prodBuildSignals = { isDev: false, isPreview: false, cfBranch: 'main' };

test('生产主域名 + 生产构建信号：允许统计', () => {
  assert.equal(shouldLoadGa4({ hostname: 'zhongsai-steelstructure.com', ...prodBuildSignals }), true);
});

test('生产 www 域名 + 生产构建信号：允许统计', () => {
  assert.equal(shouldLoadGa4({ hostname: 'www.zhongsai-steelstructure.com', ...prodBuildSignals }), true);
});

test('localhost：禁止统计', () => {
  assert.equal(shouldLoadGa4({ hostname: 'localhost', ...prodBuildSignals }), false);
  assert.equal(shouldLoadGa4({ hostname: '127.0.0.1', ...prodBuildSignals }), false);
});

test('Cloudflare Preview 域名 *.pages.dev：禁止统计', () => {
  assert.equal(shouldLoadGa4({ hostname: '30ec57e9.zhongsai-website-v2.pages.dev', ...prodBuildSignals }), false);
  assert.equal(shouldLoadGa4({ hostname: 'zhongsai-website-v2.pages.dev', ...prodBuildSignals }), false);
});

test('未知 / 未批准域名：禁止统计（DEFAULT DENY）', () => {
  assert.equal(shouldLoadGa4({ hostname: 'example.com', ...prodBuildSignals }), false);
  assert.equal(shouldLoadGa4({ hostname: '', ...prodBuildSignals }), false);
});

test('Preview 构建变量缺失（isPreview=false）但 host 非生产：仍禁止', () => {
  // 模拟仪表盘变量未注入，仅靠 hostname 兜底也必须拒绝
  assert.equal(shouldLoadGa4({ hostname: '30ec57e9.zhongsai-website-v2.pages.dev', isDev: false, isPreview: false, cfBranch: '' }), false);
  assert.equal(shouldLoadGa4({ hostname: 'localhost', isDev: false, isPreview: false, cfBranch: '' }), false);
});

test('本地 DEV：即使 host 伪造为生产域名也禁止', () => {
  assert.equal(shouldLoadGa4({ hostname: 'zhongsai-steelstructure.com', isDev: true, isPreview: false, cfBranch: 'main' }), false);
});

test('构建期 PUBLIC_IS_PREVIEW=true：禁止', () => {
  assert.equal(shouldLoadGa4({ hostname: 'zhongsai-steelstructure.com', isDev: false, isPreview: true, cfBranch: 'main' }), false);
});

test('CF_PAGES_BRANCH 非 main（预览分支）：禁止', () => {
  assert.equal(shouldLoadGa4({ hostname: 'zhongsai-steelstructure.com', isDev: false, isPreview: false, cfBranch: 'feature-x' }), false);
});

test('模糊/仿冒域名不得被 includes 类规则误放行', () => {
  assert.equal(shouldLoadGa4({ hostname: 'zhongsai-steelstructure.com.evil.com', ...prodBuildSignals }), false);
  assert.equal(shouldLoadGa4({ hostname: 'notzhongsai-steelstructure.com', ...prodBuildSignals }), false);
});

test('isProductionHostname 精确匹配与允许列表常量', () => {
  assert.equal(isProductionHostname('zhongsai-steelstructure.com'), true);
  assert.equal(isProductionHostname('zhongsai-steelstructure.com.evil.com'), false);
  assert.equal(PRODUCTION_HOSTS.length, 2);
  assert.ok(Object.isFrozen(PRODUCTION_HOSTS));
});

test('自定义允许列表（测试替身）按预期工作', () => {
  assert.equal(shouldLoadGa4({ hostname: 'staging.test', ...prodBuildSignals, allowedHosts: ['staging.test'] }), true);
  assert.equal(shouldLoadGa4({ hostname: 'other.test', ...prodBuildSignals, allowedHosts: ['staging.test'] }), false);
});
