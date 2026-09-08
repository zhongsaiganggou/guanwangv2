// 检查管理员session
import { getSession } from '../../lib/auth';

export async function onRequestGet(context) {
  const { request, env } = context;
  
  const session = await getSession(request, env);
  
  if (!session) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  return new Response(JSON.stringify({ 
    authenticated: true, 
    username: session.username,
    role: session.role,
    expiresAt: new Date(session.exp * 1000).toISOString(),
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
