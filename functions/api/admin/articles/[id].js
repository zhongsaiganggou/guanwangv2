// 单篇文章API - 获取/更新/删除
import { getSession } from '../../../lib/auth';
import { getFileContent, createOrUpdateFile, deleteFile, parseFrontmatter } from '../../../lib/github';

const BLOG_PATH_EN = 'src/content/blog/en';
const BLOG_PATH_ZH = 'src/content/blog/zh';

// 获取文章详情
export async function onRequestGet(context) {
  const { request, env, params } = context;
  
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
    const url = new URL(request.url);
    const language = url.searchParams.get('lang') || 'en';
    const id = params.id;
    
    const blogPath = language === 'zh' ? BLOG_PATH_ZH : BLOG_PATH_EN;
    const filePath = `${blogPath}/${id}.md`;
    
    const file = await getFileContent(token, filePath);
    if (!file) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const { data, body } = parseFrontmatter(file.content);
    
    return new Response(JSON.stringify({
      id: id,
      title: data.title || id,
      language: language,
      category: data.category || 'Uncategorized',
      status: data.status || 'published',
      seoTitle: data.seoTitle || '',
      metaDescription: data.metaDescription || '',
      h1: data.h1 || '',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      coverImageAlt: data.coverImageAlt || '',
      author: data.author || '',
      publishedAt: data.publishedAt || '',
      updatedAt: data.updatedAt || '',
      translationKey: data.translationKey || '',
      alternateSlug: data.alternateSlug || '',
      ctaType: data.ctaType || 'send-project-requirements',
      ctaText: data.ctaText || '',
      noindex: data.noindex || false,
      content: body,
      frontmatter: data,
      path: filePath,
      sha: file.sha,
    }), {
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

// 更新文章
export async function onRequestPut(context) {
  const { request, env, params } = context;
  
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
    const { language, title, content, ...frontmatter } = body;
    const id = params.id;
    
    if (!language || !title || !content) {
      return new Response(JSON.stringify({ error: 'language, title, and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
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
    const commitMessage = `CMS: ${language === 'zh' ? '更新' : 'Update'} article: ${title}`;
    await createOrUpdateFile(token, filePath, fullContent, commitMessage);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Article updated successfully',
      path: filePath,
      url: `/${language}/blog/${id}/`,
    }), {
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

// 删除文章
export async function onRequestDelete(context) {
  const { request, env, params } = context;
  
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
    const url = new URL(request.url);
    const language = url.searchParams.get('lang') || 'en';
    const id = params.id;
    
    const blogPath = language === 'zh' ? BLOG_PATH_ZH : BLOG_PATH_EN;
    const filePath = `${blogPath}/${id}.md`;
    
    // 检查文件是否存在
    const file = await getFileContent(token, filePath);
    if (!file) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // 删除文件
    const commitMessage = `CMS: Delete article: ${id}`;
    await deleteFile(token, filePath, commitMessage);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Article deleted successfully',
      warning: 'This may affect Google indexing. Consider setting up a 301 redirect.',
    }), {
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
