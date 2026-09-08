// 认证工具函数 - 单密码登录
// 使用Web Crypto API: HMAC SHA256 JWT for session signing

const SESSION_COOKIE = 'zs_admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24小时

// 登录失败限速（内存计数）
const loginAttempts = new Map();
const MAX_ATTEMPTS = 10;
const LOCK_DURATION = 15 * 60 * 1000; // 15分钟锁定
const RATE_LIMIT_DELAY = 500; // 密码错误后延迟500ms

/**
 * 验证单密码（使用恒定时间比较，防止时序攻击）
 */
export async function verifySinglePassword(inputPassword, storedPassword) {
  if (!inputPassword || !storedPassword) return false;
  
  const enc = new TextEncoder();
  const a = enc.encode(inputPassword);
  const b = enc.encode(storedPassword);
  
  if (a.length !== b.length) {
    // 即使长度不同也做一次比较，减少时序信息泄露
    await crypto.subtle.digest('SHA-256', a);
    return false;
  }
  
  // 使用HMAC进行恒定时间比较
  const key = await crypto.subtle.generateKey(
    { name: 'HMAC', hash: 'SHA-256' },
    true,
    ['sign']
  );
  
  const sigA = await crypto.subtle.sign('HMAC', key, a);
  const sigB = await crypto.subtle.sign('HMAC', key, b);
  
  const arrA = new Uint8Array(sigA);
  const arrB = new Uint8Array(sigB);
  
  let diff = 0;
  for (let i = 0; i < arrA.length; i++) {
    diff |= arrA[i] ^ arrB[i];
  }
  
  return diff === 0;
}

/**
 * 创建JWT
 */
export async function createJWT(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + (SESSION_DURATION / 1000),
  };
  
  const base64Url = (obj) => {
    return btoa(JSON.stringify(obj))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };
  
  const headerEncoded = base64Url(header);
  const payloadEncoded = base64Url(fullPayload);
  const data = `${headerEncoded}.${payloadEncoded}`;
  
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signature = btoa(String.fromCharCode(...signatureArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  
  return `${data}.${signature}`;
}

/**
 * 验证JWT
 */
export async function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [headerEncoded, payloadEncoded, signature] = parts;
    const data = `${headerEncoded}.${payloadEncoded}`;
    
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const signatureBuffer = Uint8Array.from(atob(signature.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, signatureBuffer, enc.encode(data));
    
    if (!valid) return null;
    
    const payload = JSON.parse(atob(payloadEncoded.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    
    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * 从请求中获取session
 */
export async function getSession(request, env) {
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split(';').map(c => {
    const [k, ...v] = c.trim().split('=');
    return [k, v.join('=')];
  }));
  
  const token = cookies[SESSION_COOKIE];
  if (!token) return null;
  
  const secret = env.ADMIN_SESSION_SECRET || env.JWT_SECRET;
  if (!secret) return null;
  
  return await verifyJWT(token, secret);
}

/**
 * 设置session cookie
 */
export function setSessionCookie(response, token) {
  response.headers.set('Set-Cookie', 
    `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_DURATION / 1000}`
  );
  return response;
}

/**
 * 清除session cookie
 */
export function clearSessionCookie(response) {
  response.headers.set('Set-Cookie', 
    `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
  );
  return response;
}

/**
 * 登录失败限速检查
 */
export function checkLoginLimit(ip) {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);
  
  if (attempt && attempt.lockedUntil > now) {
    return { allowed: false, retryAfter: Math.ceil((attempt.lockedUntil - now) / 1000) };
  }
  
  if (attempt && attempt.lockedUntil <= now) {
    loginAttempts.delete(ip);
  }
  
  return { allowed: true };
}

/**
 * 记录登录失败
 */
export function recordLoginFailure(ip) {
  const now = Date.now();
  const attempt = loginAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  attempt.count++;
  
  if (attempt.count >= MAX_ATTEMPTS) {
    attempt.lockedUntil = now + LOCK_DURATION;
    attempt.count = 0;
  }
  
  loginAttempts.set(ip, attempt);
  return attempt;
}

/**
 * 清除登录失败记录
 */
export function clearLoginFailure(ip) {
  loginAttempts.delete(ip);
}

/**
 * 认证中间件 - 保护API端点
 */
export async function requireAuth(request, env) {
  const session = await getSession(request, env);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null;
}

/**
 * 延迟函数（用于限速）
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
