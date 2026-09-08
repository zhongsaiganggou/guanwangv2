// GitHub API工具函数 - 服务端通过GitHub API读写文件
// Token从env.GITHUB_CONTENT_TOKEN获取，不暴露给前端

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'zhongsaiganggou';
const REPO_NAME = 'guanwangv2';
const BRANCH = 'main';

// 路径白名单 - 只允许写这些目录
const ALLOWED_WRITE_PATHS = [
  'src/content/blog/en/',
  'src/content/blog/zh/',
  'public/images/blog/',
];

/**
 * 验证路径是否在白名单内
 */
export function isPathAllowed(path) {
  // 规范化路径，防止路径穿越
  const normalizedPath = path.replace(/\\/g, '/').replace(/\.\.\//g, '').replace(/^\//, '');
  
  for (const allowedPath of ALLOWED_WRITE_PATHS) {
    if (normalizedPath.startsWith(allowedPath)) {
      return true;
    }
  }
  return false;
}

/**
 * 清理slug/文件名，防止路径穿越和特殊字符
 */
export function sanitizePathSegment(input) {
  return input
    .replace(/\.\./g, '')           // 移除..
    .replace(/[\\\/]/g, '-')        // 替换路径分隔符
    .replace(/[<>:"|?*\x00-\x1f]/g, '') // 移除非法字符
    .replace(/\s+/g, '-')           // 空格替换为-
    .replace(/-+/g, '-')            // 多个-合并为一个
    .replace(/^-+|-+$/g, '')        // 移除首尾-
    .substring(0, 100);             // 限制长度
}

/**
 * 获取GitHub API请求头
 */
function getHeaders(token, contentType = 'application/json') {
  return {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': contentType,
    'User-Agent': 'ZhongSai-CMS-Bot',
  };
}

/**
 * 可靠的base64编码（支持UTF-8）
 */
function encodeBase64(str) {
  // 使用TextEncoder将字符串转为UTF-8字节，然后base64编码
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}

/**
 * 获取文件内容
 */
export async function getFileContent(token, path, branch = BRANCH) {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(path)}?ref=${branch}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(token),
  });
  
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  const content = atob(data.content.replace(/\n/g, ''));
  return {
    content: content,
    sha: data.sha,
    path: data.path,
  };
}

/**
 * 创建或更新文件（带路径白名单验证）
 */
export async function createOrUpdateFile(token, path, content, message, branch = BRANCH) {
  // 路径白名单验证
  if (!isPathAllowed(path)) {
    throw new Error(`Path not allowed: ${path}. Only src/content/blog/ and public/images/blog/ are writable.`);
  }
  
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(path)}`;
  
  // 先检查文件是否存在，获取sha
  let sha = null;
  try {
    const existing = await getFileContent(token, path, branch);
    if (existing) sha = existing.sha;
  } catch (e) {
    // 文件不存在，继续创建
  }
  
  const body = {
    message: message,
    content: encodeBase64(content),
    branch: branch,
  };
  
  if (sha) body.sha = sha;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    let errorData = {};
    try { errorData = JSON.parse(errorText); } catch (e) {}
    console.error('GitHub API PUT error:', {
      status: response.status,
      statusText: response.statusText,
      url: url,
      path: path,
      hasSha: !!sha,
      responseBody: errorText.substring(0, 500),
    });
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${errorData.message || errorText.substring(0, 200)}`);
  }
  
  return await response.json();
}

/**
 * 使用Git Data API创建/更新文件（更可靠的方式）
 */
export async function createOrUpdateFileViaGitApi(token, path, content, message, branch = BRANCH) {
  // 路径白名单验证
  if (!isPathAllowed(path)) {
    throw new Error(`Path not allowed: ${path}. Only src/content/blog/ and public/images/blog/ are writable.`);
  }
  
  const headers = getHeaders(token);
  
  try {
    // 1. 获取当前分支的最新commit
    const refResponse = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/git/ref/heads/${branch}`, { headers });
    if (!refResponse.ok) throw new Error(`Failed to get ref: ${refResponse.status}`);
    const refData = await refResponse.json();
    const latestCommitSha = refData.object.sha;
    
    // 2. 获取最新commit的tree SHA
    const commitResponse = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/git/commits/${latestCommitSha}`, { headers });
    if (!commitResponse.ok) throw new Error(`Failed to get commit: ${commitResponse.status}`);
    const commitData = await commitResponse.json();
    const baseTreeSha = commitData.tree.sha;
    
    // 3. 创建blob
    const blobResponse = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/git/blobs`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        content: content,
        encoding: 'utf-8',
      }),
    });
    if (!blobResponse.ok) {
      const blobError = await blobResponse.text();
      throw new Error(`Failed to create blob: ${blobResponse.status} - ${blobError.substring(0, 200)}`);
    }
    const blobData = await blobResponse.json();
    const blobSha = blobData.sha;
    
    // 4. 创建新tree（包含新文件）
    const treeResponse = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: [
          {
            path: path,
            mode: '100644',
            type: 'blob',
            sha: blobSha,
          },
        ],
      }),
    });
    if (!treeResponse.ok) {
      const treeError = await treeResponse.text();
      throw new Error(`Failed to create tree: ${treeResponse.status} - ${treeError.substring(0, 200)}`);
    }
    const treeData = await treeResponse.json();
    const newTreeSha = treeData.sha;
    
    // 5. 创建新commit
    const newCommitResponse = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: message,
        tree: newTreeSha,
        parents: [latestCommitSha],
      }),
    });
    if (!newCommitResponse.ok) {
      const commitError = await newCommitResponse.text();
      throw new Error(`Failed to create commit: ${newCommitResponse.status} - ${commitError.substring(0, 200)}`);
    }
    const newCommitData = await newCommitResponse.json();
    const newCommitSha = newCommitData.sha;
    
    // 6. 更新分支ref指向新commit
    const updateRefResponse = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${branch}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        sha: newCommitSha,
        force: false,
      }),
    });
    if (!updateRefResponse.ok) {
      const refError = await updateRefResponse.text();
      throw new Error(`Failed to update ref: ${updateRefResponse.status} - ${refError.substring(0, 200)}`);
    }
    
    return { commit: { sha: newCommitSha }, content: { path, sha: blobSha } };
  } catch (e) {
    console.error('Git Data API error:', e.message);
    throw e;
  }
}

/**
 * 删除文件（带路径白名单验证）
 */
export async function deleteFile(token, path, message, branch = BRANCH) {
  // 路径白名单验证
  if (!isPathAllowed(path)) {
    throw new Error(`Path not allowed: ${path}. Only src/content/blog/ and public/images/blog/ are writable.`);
  }
  
  const existing = await getFileContent(token, path, branch);
  if (!existing) throw new Error('File not found');
  
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(path)}`;
  const body = {
    message: message,
    sha: existing.sha,
    branch: branch,
  };
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * 获取目录列表
 */
export async function getDirectoryContents(token, path, branch = BRANCH) {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(path)}?ref=${branch}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(token),
  });
  
  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * 上传图片（通过GitHub API创建文件，带路径白名单验证）
 */
export async function uploadImage(token, path, base64Content, message, branch = BRANCH) {
  // 路径白名单验证
  if (!isPathAllowed(path)) {
    throw new Error(`Path not allowed: ${path}. Only public/images/blog/ is writable for images.`);
  }
  
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(path)}`;
  
  let sha = null;
  try {
    const existing = await getFileContent(token, path, branch);
    if (existing) sha = existing.sha;
  } catch (e) {
    // 文件不存在
  }
  
  const body = {
    message: message,
    content: base64Content,
    branch: branch,
  };
  
  if (sha) body.sha = sha;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${errorData.message || ''}`);
  }
  
  return await response.json();
}

/**
 * 解析Markdown frontmatter
 */
export function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  
  const data = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  let currentArray = null;
  
  for (const line of lines) {
    if (line.match(/^- /) && currentArray) {
      currentArray.push(line.replace(/^- /, '').trim());
    } else if (line.match(/^[a-zA-Z_]+:/)) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      if (value === '') {
        currentKey = key.trim();
        currentArray = [];
        data[currentKey] = currentArray;
      } else {
        currentKey = key.trim();
        currentArray = null;
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          data[currentKey] = value.slice(1, -1);
        } else if (value === 'true') {
          data[currentKey] = true;
        } else if (value === 'false') {
          data[currentKey] = false;
        } else {
          data[currentKey] = value;
        }
      }
    }
  }
  
  return { data, body: match[2] };
}

/**
 * 生成Markdown frontmatter
 */
export function generateFrontmatter(data) {
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
      if (String(value).match(/[:#\[\]{}]/) || String(value).startsWith(' ')) {
        yaml += `${key}: "${String(value).replace(/"/g, '\\"')}"\n`;
      } else {
        yaml += `${key}: ${value}\n`;
      }
    }
  }
  yaml += '---\n';
  return yaml;
}
