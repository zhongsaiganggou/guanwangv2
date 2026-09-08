// 文章列表API - 获取所有文章 / 创建新文章
import { getSession } from '../../../lib/auth';
import { getDirectoryContents, getFileContent, createOrUpdateFile, createOrUpdateFileViaGitApi, parseFrontmatter } from '../../../lib/github';

const BLOG_PATH_EN = 'src/content/blog/en';
const BLOG_PATH_ZH = 'src/content/blog/zh';

export async function onRequestGet(context) {
  const { request, env } = context;
  
  // 认证检查
  const session = await getSession(request, env);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const token = env.GITHUB_CONTENT_TOKEN || env.GITHUB_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'GitHub token not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    // 获取语言参数
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') || 'all';
    
    const articles = [];
    
    // 获取EN文章
    if (lang === 'all' || lang === 'en') {
      try {
        const enFiles = await getDirectoryContents(token, BLOG_PATH_EN);
        for (const file of enFiles) {
          if (file.name.endsWith('.md')) {
            const content = await getFileContent(token, file.path);
            if (content) {
              const { data } = parseFrontmatter(content.content);
              articles.push({
                id: file.name.replace('.md', ''),
                title: data.title || file.name,
                language: 'en',
                category: data.category || 'Uncategorized',
                status: data.status || 'published',
                publishedAt: data.publishedAt || null,
                updatedAt: data.updatedAt || null,
                path: file.path,
                excerpt: data.excerpt || '',
              });
            }
          }
        }
      } catch (e) {
        console.error('Error fetching EN articles:', e);
      }
    }
    
    // 获取ZH文章
    if (lang === 'all' || lang === 'zh') {
      try {
        const zhFiles = await getDirectoryContents(token, BLOG_PATH_ZH);
        for (const file of zhFiles) {
          if (file.name.endsWith('.md')) {
            const content = await getFileContent(token, file.path);
            if (content) {
              const { data } = parseFrontmatter(content.content);
              articles.push({
                id: file.name.replace('.md', ''),
                title: data.title || file.name,
                language: 'zh',
                category: data.category || 'Uncategorized',
                status: data.status || 'published',
                publishedAt: data.publishedAt || null,
                updatedAt: data.updatedAt || null,
                path: file.path,
                excerpt: data.excerpt || '',
              });
            }
          }
        }
      } catch (e) {
        console.error('Error fetching ZH articles:', e);
      }
    }
    
    // 按更新时间排序
    articles.sort((a, b) => {
      const aTime = a.updatedAt || a.publishedAt || '0';
      const bTime = b.updatedAt || b.publishedAt || '0';
      return bTime.localeCompare(aTime);
    });
    
    return new Response(JSON.stringify({ articles, total: articles.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// 创建新文章
export async function onRequestPost(context) {
  const { request, env } = context;
  
  // 认证检查
  const session = await getSession(request, env);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const token = env.GITHUB_CONTENT_TOKEN || env.GITHUB_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'GitHub token not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    const body = await request.json();
    const { id, language, title, content, ...frontmatter } = body;
    
    if (!id || !language || !title || !content) {
      return new Response(JSON.stringify({ error: 'id, language, title, and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // 构建文件路径
    const blogPath = language === 'zh' ? BLOG_PATH_ZH : BLOG_PATH_EN;
    const filePath = `${blogPath}/${id}.md`;
    
    // 构建frontmatter
    const data = {
      title: title,
      language: language,
      ...frontmatter,
    };
    
    // 生成完整Markdown内容
    const yaml = generateFrontmatterSimple(data);
    const fullContent = `${yaml}\n${content}`;
    
    // 提交到GitHub
    const commitMessage = `CMS: ${language === 'zh' ? '创建' : 'Create'} article: ${title}`;
    try {
      await createOrUpdateFileViaGitApi(token, filePath, fullContent, commitMessage);
    } catch (gitApiError) {
      console.error('Git Data API failed, falling back:', gitApiError.message);
      await createOrUpdateFile(token, filePath, fullContent, commitMessage);
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Article created successfully',
      path: filePath,
      url: `/${language}/blog/${id}/`,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// 简单的frontmatter生成
function generateFrontmatterSimple(data) {
  let yaml = '---\n';
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      yaml += `${key}:\n`;
      for (const item of value) {
        yaml += `  - ${item}\n`;
      }
    } else if (typeof value === 'boolean') {
      yaml += `${key}: ${value}\n`;
    } else if (value !== undefined && value !== null && value !== '') {
      if (String(value).match(/[:#\[\]{}]/)) {
        yaml += `${key}: "${String(value).replace(/"/g, '\\"')}"\n`;
      } else {
        yaml += `${key}: ${value}\n`;
      }
    }
  }
  yaml += '---\n';
  return yaml;
}
