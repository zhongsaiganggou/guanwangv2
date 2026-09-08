// 图片上传API - 通过GitHub API上传图片
import { getSession } from '../../lib/auth';
import { uploadImage } from '../../lib/github';

const IMAGE_PATH = 'public/images/blog';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

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
    const contentType = request.headers.get('Content-Type') || '';
    
    // 处理JSON格式的base64上传
    if (contentType.includes('application/json')) {
      const body = await request.json();
      const { filename, base64, alt } = body;
      
      if (!filename || !base64) {
        return new Response(JSON.stringify({ error: 'filename and base64 are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // 清理base64前缀
      const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
      
      // 生成安全文件名
      const safeFilename = generateSafeFilename(filename);
      const filePath = `${IMAGE_PATH}/${safeFilename}`;
      
      // 上传到GitHub
      const commitMessage = `CMS: Upload image: ${safeFilename}`;
      await uploadImage(token, filePath, cleanBase64, commitMessage);
      
      const publicUrl = `/images/blog/${safeFilename}`;
      
      return new Response(JSON.stringify({
        success: true,
        url: publicUrl,
        filename: safeFilename,
        alt: alt || safeFilename,
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // 处理multipart/form-data上传
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');
      
      if (!file) {
        return new Response(JSON.stringify({ error: 'No file uploaded' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // 检查文件大小
      if (file.size > MAX_FILE_SIZE) {
        return new Response(JSON.stringify({ error: 'File too large. Max 5MB.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // 检查文件类型
      if (!ALLOWED_TYPES.includes(file.type)) {
        return new Response(JSON.stringify({ error: 'File type not allowed. Use JPG, PNG, WebP, or GIF.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // 转换为base64
      const arrayBuffer = await file.arrayBuffer();
      const base64 = arrayBufferToBase64(arrayBuffer);
      
      // 生成安全文件名
      const safeFilename = generateSafeFilename(file.name);
      const filePath = `${IMAGE_PATH}/${safeFilename}`;
      
      // 上传到GitHub
      const commitMessage = `CMS: Upload image: ${safeFilename}`;
      await uploadImage(token, filePath, base64, commitMessage);
      
      const publicUrl = `/images/blog/${safeFilename}`;
      
      return new Response(JSON.stringify({
        success: true,
        url: publicUrl,
        filename: safeFilename,
        size: file.size,
        type: file.type,
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ error: 'Unsupported content type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
    
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// 生成安全文件名
function generateSafeFilename(originalName) {
  const ext = originalName.split('.').pop().toLowerCase();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}.${ext}`;
}

// ArrayBuffer转base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
