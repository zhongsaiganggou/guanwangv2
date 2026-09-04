// sitemap.xml.ts - 构建时静态生成正式 Sitemap
// 仅包含已完成的正式内容页；排除占位页 / test / 根重定向 / pages.dev
import type { APIRoute } from 'astro';
import { SITE_URL, buildSitemapPaths } from '../data/seo-structure';

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const prerender = true;

export const GET: APIRoute = () => {
  const paths = buildSitemapPaths();
  const today = new Date().toISOString().slice(0, 10);

  const urls = paths
    .map((path) => {
      const loc = `${SITE_URL}${path}`;
      const altPath = path.startsWith('/en/')
        ? path.replace('/en/', '/zh/')
        : path.replace('/zh/', '/en/');
      const enHref = path.startsWith('/en/') ? loc : `${SITE_URL}${altPath}`;
      const zhHref = path.startsWith('/zh/') ? loc : `${SITE_URL}${altPath}`;
      return [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enHref)}"/>`,
        `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(zhHref)}"/>`,
        `    <lastmod>${today}</lastmod>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
