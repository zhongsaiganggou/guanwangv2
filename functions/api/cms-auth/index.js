// Cloudflare Pages Function for Sveltia CMS GitHub OAuth
// Handles OAuth callback and token exchange

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Get configuration from environment variables
  const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID || '';
  const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET || '';
  
  // If this is the OAuth callback (has code parameter)
  const code = url.searchParams.get('code');
  
  if (code) {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.access_token) {
      // Redirect back to admin with token
      const adminUrl = new URL('/admin/', url.origin);
      adminUrl.searchParams.set('access_token', tokenData.access_token);
      adminUrl.searchParams.set('token_type', 'bearer');
      
      return Response.redirect(adminUrl.toString(), 302);
    } else {
      return new Response('OAuth token exchange failed', { status: 400 });
    }
  }
  
  // If no code, redirect to GitHub authorization
  if (!GITHUB_CLIENT_ID) {
    return new Response(
      'CMS OAuth not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables.',
      { status: 500, headers: { 'Content-Type': 'text/plain' } }
    );
  }
  
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.set('redirect_uri', `${url.origin}/api/cms-auth`);
  githubAuthUrl.searchParams.set('scope', 'repo');
  
  return Response.redirect(githubAuthUrl.toString(), 302);
}
