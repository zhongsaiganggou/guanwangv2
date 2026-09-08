// 管理员登出API
import { clearSessionCookie } from '../../lib/auth';

export async function onRequestPost(context) {
  const response = new Response(JSON.stringify({ success: true, message: 'Logged out' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
  
  return clearSessionCookie(response);
}
