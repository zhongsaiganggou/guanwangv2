/**
 * ZhongSai V2 - Lead File Download API
 * Cloudflare Pages Function: GET /api/lead-file?key=xxx
 * 
 * Downloads a file from R2 by key. Validates that the key exists in lead_files table.
 * Used for attachment download links in WeChat Work notifications.
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const fileKey = url.searchParams.get('key');

  if (!fileKey) {
    return new Response(JSON.stringify({ error: 'Missing key parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Validate that the file exists in lead_files table
    const fileRecord = await env.LEADS_DB.prepare(
      'SELECT id, lead_id, original_filename, content_type, size FROM lead_files WHERE file_key = ?'
    ).bind(fileKey).first();

    if (!fileRecord) {
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get file from R2
    const object = await env.LEAD_FILES.get(fileKey);

    if (!object) {
      return new Response(JSON.stringify({ error: 'File not found in storage' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Set response headers
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('Content-Length', object.size);
    headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(fileRecord.original_filename)}"`);
    headers.set('Cache-Control', 'private, max-age=3600');

    // Return the file
    return new Response(object.body, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Lead file download error:', error.message);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
