// sitemap.xml.ts - 构建时静态生成正式 Sitemap
// 包含固定页面 + CMS发布的文章；排除draft/test/noindex页面
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL, buildSitemapPaths } from '../data/seo-structure';

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const prerender = true;

export const GET: APIRoute = async () => {
  // 1. 获取固定页面路径
  const fixedPaths = buildSitemapPaths();
  
  // 2. 获取CMS发布的文章
  const blogPosts = await getCollection('blog', ({ data }) => {
    return data.status === 'published' && data.noindex !== true;
  });
  
  // 2.1 过滤掉id格式错误的文章（包含/en/、/zh/或.md后缀）
  // 这些是CMS后台创建时id格式不正确导致的，实际URL应该是/{lang}/blog/{slug}/
  const validBlogPosts = blogPosts.filter((post) => {
    const id = post.id || '';
    // 排除包含语言前缀或.md后缀的错误id
    if (id.startsWith('en/') || id.startsWith('zh/') || id.endsWith('.md')) {
      return false;
    }
    return true;
  });
  
  // 3. 构建CMS文章URL列表
  const cmsUrls = validBlogPosts.map((post) => ({
    path: `/${post.data.language}/blog/${post.id}/`,
    language: post.data.language,
    translationKey: post.data.translationKey,
    lastmod: post.data.updatedAt || post.data.publishedAt || new Date().toISOString().slice(0, 10),
  }));
  
  // 4. 按translationKey分组，识别双语对应
  const translationGroups = new Map<string, typeof cmsUrls>();
  for (const url of cmsUrls) {
    if (url.translationKey) {
      const group = translationGroups.get(url.translationKey) || [];
      group.push(url);
      translationGroups.set(url.translationKey, group);
    }
  }
  
  const today = new Date().toISOString().slice(0, 10);
  
  // 5. 生成固定页面XML（保持原有逻辑）
  const fixedUrlsXml = fixedPaths
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
  
  // 6. 生成CMS文章XML
  const cmsUrlsXml = cmsUrls
    .map((url) => {
      const loc = `${SITE_URL}${url.path}`;
      const lines = ['  <url>', `    <loc>${escapeXml(loc)}</loc>`];
      
      // 只有存在双语对应时才添加hreflang
      if (url.translationKey && translationGroups.has(url.translationKey)) {
        const group = translationGroups.get(url.translationKey)!;
        const enPost = group.find((p) => p.language === 'en');
        const zhPost = group.find((p) => p.language === 'zh');
        
        if (enPost) {
          lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${SITE_URL}${enPost.path}`)}"/>`);
        }
        if (zhPost) {
          lines.push(`    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(`${SITE_URL}${zhPost.path}`)}"/>`);
        }
        // x-default
        const defaultPost = enPost || zhPost;
        if (defaultPost) {
          lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}${defaultPost.path}`)}"/>`);
        }
      }
      
      lines.push(`    <lastmod>${url.lastmod}</lastmod>`);
      lines.push('  </url>');
      return lines.join('\n');
    })
    .join('\n');
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${fixedUrlsXml}
${cmsUrlsXml}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
