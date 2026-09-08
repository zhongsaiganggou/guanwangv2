// 管理员登录API - 单密码登录
import { verifySinglePassword, createJWT, setSessionCookie, checkLoginLimit, recordLoginFailure, clearLoginFailure, delay } from '../../lib/auth';

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // 获取客户端IP用于限速
  const ip = request.headers.get('CF-Connecting-IP') || 
             request.headers.get('X-Forwarded-For') || 
             'unknown';
  
  // 检查登录限速
  const limitCheck = checkLoginLimit(ip);
  if (!limitCheck.allowed) {
    return new Response(JSON.stringify({ 
      error: 'Too many login attempts', 
      retryAfter: limitCheck.retryAfter 
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // 解析请求体
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const { password } = body;
  
  if (!password) {
    await delay(300); // 延迟防止用户名枚举
    return new Response(JSON.stringify({ error: 'Password required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // 从环境变量获取管理员密码和session secret
  const ADMIN_PASSWORD = env.ADMIN_PASSWORD;
  const ADMIN_SESSION_SECRET = env.ADMIN_SESSION_SECRET || env.JWT_SECRET;
  
  if (!ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) {
    return new Response(JSON.stringify({ 
      error: 'Admin not configured. Please set ADMIN_PASSWORD and ADMIN_SESSION_SECRET environment variables.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // 验证密码（恒定时间比较）
  const passwordValid = await verifySinglePassword(password, ADMIN_PASSWORD);
  
  if (!passwordValid) {
    recordLoginFailure(ip);
    await delay(500); // 密码错误后延迟，防止暴力破解
    return new Response(JSON.stringify({ error: 'Incorrect password.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // 登录成功，清除失败记录
  clearLoginFailure(ip);
  
  // 创建JWT session
  const token = await createJWT({ role: 'admin', loginAt: new Date().toISOString() }, ADMIN_SESSION_SECRET);
  
  // 返回成功，设置cookie
  const response = new Response(JSON.stringify({ 
    success: true, 
    message: 'Login successful',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
  
  return setSessionCookie(response, token);
}

// 处理OPTIONS预检请求
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
