// seo-structure.ts - 技术SEO集中配置（Organization / BreadcrumbList / Sitemap）
// 正式生产域名唯一来源。Preview (*.pages.dev) 不得进入 canonical / sitemap / schema。
import { projects } from './projects-data';

export const SITE_URL = 'https://zhongsai-steelstructure.com';

export interface Crumb {
  name: string;
  // 相对路径；中间级若无对应页面则省略（不制造 404），最后一级 current 也省略
  href?: string;
}

type Lang = 'zh' | 'en';

// 静态内容页面包屑（文字必须与页面可见面包屑完全一致）
const STATIC_BREADCRUMBS: Record<string, { en: Crumb[]; zh: Crumb[] }> = {
  products: {
    en: [{ name: 'Home', href: '/en/' }, { name: 'Products' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '产品' }],
  },
  'products/custom-engineering': {
    en: [
      { name: 'Home', href: '/en/' },
      { name: 'Products', href: '/en/products/' },
      { name: 'Custom Engineering & Fabrication' },
    ],
    zh: [
      { name: '首页', href: '/zh/' },
      { name: '产品', href: '/zh/products/' },
      { name: '定制工程与按图加工' },
    ],
  },
  components: {
    en: [{ name: 'Home', href: '/en/' }, { name: 'Components & Materials' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '构件与材料' }],
  },
  'components/fabricated-steel-beams-columns': {
    en: [
      { name: 'Home', href: '/en/' },
      { name: 'Components', href: '/en/components/' },
      { name: 'Steel Beams & Columns' },
    ],
    zh: [
      { name: '首页', href: '/zh/' },
      { name: '构件与材料', href: '/zh/components/' },
      { name: '钢梁与钢柱' },
    ],
  },
  'components/roof-wall-cladding-systems': {
    en: [
      { name: 'Home', href: '/en/' },
      { name: 'Components', href: '/en/components/' },
      { name: 'Roof & Wall Cladding Systems' },
    ],
    zh: [
      { name: '首页', href: '/zh/' },
      { name: '构件与材料', href: '/zh/components/' },
      { name: '屋面与墙面围护系统' },
    ],
  },
  'manufacturing-quality': {
    en: [{ name: 'Home', href: '/en/' }, { name: 'Manufacturing' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '制造能力' }],
  },
  'steel-workshop': {
    en: [
      { name: 'Home', href: '/en/' },
      { name: 'Products', href: '/en/products/' },
      { name: 'Industrial Workshop' },
    ],
    zh: [
      { name: '首页', href: '/zh/' },
      { name: '产品', href: '/zh/products/' },
      { name: '工业厂房与车间' },
    ],
  },
  'steel-warehouse': {
    en: [
      { name: 'Home', href: '/en/' },
      { name: 'Products', href: '/en/products/' },
      { name: 'Steel Warehouse' },
    ],
    zh: [
      { name: '首页', href: '/zh/' },
      { name: '产品', href: '/zh/products/' },
      { name: '钢结构仓库' },
    ],
  },
  'services/structural-steel-detailing': {
    en: [
      { name: 'Home', href: '/en/' },
      { name: 'Services' },
      { name: 'Structural Steel Detailing' },
    ],
    zh: [
      { name: '首页', href: '/zh/' },
      { name: '服务' },
      { name: '钢结构深化设计' },
    ],
  },
  'engineering-design': {
    en: [{ name: 'Home', href: '/en/' }, { name: 'Engineering Design' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '工程设计' }],
  },
  about: {
    en: [{ name: 'Home', href: '/en/' }, { name: 'About ZhongSai' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '关于中赛' }],
  },
  contact: {
    en: [{ name: 'Home', href: '/en/' }, { name: 'Contact' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '联系我们' }],
  },
  'export-delivery': {
    en: [{ name: 'Home', href: '/en/' }, { name: 'Export Delivery' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '出口交付' }],
  },
  privacy: {
    en: [{ name: 'Home', href: '/en/' }, { name: 'Privacy Policy' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '隐私政策' }],
  },
  terms: {
    en: [{ name: 'Home', href: '/en/' }, { name: 'Terms of Use' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '使用条款' }],
  },
  projects: {
    en: [{ name: 'Home', href: '/en/' }, { name: 'Projects' }],
    zh: [{ name: '首页', href: '/zh/' }, { name: '项目案例' }],
  },
};

// 根据当前路径返回面包屑（与可见面包屑一致）；首页/未知页返回 null
export function getBreadcrumbs(pathname: string): Crumb[] | null {
  const trimmed = pathname.replace(/\/+$/, '');
  const m = pathname.match(/^\/(en|zh)\/projects\/([^/]+)\/?$/);
  if (m) {
    const lang = m[1] as Lang;
    const slug = m[2];
    const proj = projects.find((x) => x.slug === slug);
    if (!proj) return null;
    return [
      { name: lang === 'zh' ? '首页' : 'Home', href: `/${lang}/` },
      { name: lang === 'zh' ? '项目案例' : 'Projects', href: `/${lang}/projects/` },
      { name: proj.name[lang] },
    ];
  }
  const sm = pathname.match(/^\/(en|zh)\/(.+?)\/?$/);
  if (sm) {
    const lang = sm[1] as Lang;
    const key = sm[2].replace(/\/$/, '');
    const entry = STATIC_BREADCRUMBS[key];
    if (entry) return entry[lang];
  }
  return null;
}

export function buildBreadcrumbJsonLd(pathname: string) {
  const crumbs = getBreadcrumbs(pathname);
  if (!crumbs) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => {
      const el: Record<string, unknown> = {
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
      };
      if (c.href) {
        el.item = `${SITE_URL}${c.href}`;
      } else if (i === crumbs.length - 1) {
        // 当前页（最后一级）使用本页绝对 URL
        el.item = `${SITE_URL}${pathname.endsWith('/') ? pathname : pathname + '/'}`;
      }
      return el;
    }),
  };
}

// Organization 实体（全站只在首页输出，语言无关，每页至多 1 个）
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ZhongSai Steel Structure',
    legalName: '深圳市中赛钢结构进出口有限公司',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo-official-transparent-cropped.png`,
    description:
      'A China-based steel structure manufacturer and export supplier providing detailing support, fabrication, structural steel component supply, packing, container loading, export coordination and overseas installation technical guidance.',
    email: 'zhongsaiganggou@gmail.com',
    telephone: '+86 131 9200 7378',
    sameAs: [
      'https://www.facebook.com/ZhongSaiSteelStructure/reels/',
      'https://www.instagram.com/zhongsaisteel/reels/',
      'https://www.tiktok.com/@zhongsai_steelstructure',
      'https://www.youtube.com/@ZhongSaiSteel',
    ],
  };
}

// ---- Sitemap：仅包含可上线的正式内容页（排除占位页 / test / 根重定向） ----
const SITEMAP_SECTIONS = [
  '', // 首页
  'products',
  'products/custom-engineering',
  'components',
  'components/fabricated-steel-beams-columns',
  'components/roof-wall-cladding-systems',
  'components/steel-trusses',
  'components/steel-purlins',
  'manufacturing-quality',
  'steel-workshop',
  'steel-warehouse',
  'steel-mining-factory',
  'services/structural-steel-detailing',
  'engineering-design',
  'about',
  'contact',
  'export-delivery',
  'privacy',
  'terms',
  'projects',
];

// 仅英文的 Legacy Blog 页面（无对应中文版本）
const SITEMAP_EN_ONLY = [
  'blog/how-to-import-steel-structure-from-china-complete-guide',
  'blog/how-to-import-steel-structure-from-china-to-africa',
  'blog/shipping-cost-steel-structure-from-china',
  'blog/steel-structure-container-loading-guide',
  'blog/steel-warehouse-cost-complete-guide',
];

export function buildSitemapPaths(): string[] {
  const urls: string[] = [];
  for (const lang of ['en', 'zh'] as Lang[]) {
    for (const section of SITEMAP_SECTIONS) {
      urls.push(`/${lang}/${section ? section + '/' : ''}`);
    }
    for (const proj of projects) {
      urls.push(`/${lang}/projects/${proj.slug}/`);
    }
  }
  for (const blog of SITEMAP_EN_ONLY) {
    urls.push(`/en/${blog}/`);
  }
  return urls;
}
