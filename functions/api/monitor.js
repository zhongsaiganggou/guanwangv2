// /api/monitor - Daily lead count monitor + auto alert
// GET ?check=1  triggers alert check: if 0 leads in 24h, sends WeCom alert

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const shouldCheck = url.searchParams.get('check') === '1';

  try {
    const { results } = await env.LEADS_DB.prepare(
      `SELECT COUNT(*) as count FROM leads WHERE created_at > datetime('now', '-48 hours') AND test_record = 0`
    ).all();

    const count = results[0]?.count || 0;
    const isPreview = env.PREVIEW_MODE === 'true';

    let alertSent = false;

    // Auto-alert: if 0 leads in 48h and not preview, send WeCom notification
    if (shouldCheck && count === 0 && !isPreview && env.WECHAT_WORK_WEBHOOK_URL) {
      try {
        await fetch(env.WECHAT_WORK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            msgtype: 'text',
            text: {
              content: `⚠️ 询盘监控告警\n\n过去 48 小时没有收到新的客户询盘！\n\n可能原因：\n1. Turnstile 验证组件加载失败\n2. 表单提交出错\n3. 后端服务异常\n\n请尽快检查 https://zhongsai-steelstructure.com/zh/contact/ 表单是否正常。`
            },
          }),
        });
        alertSent = true;
      } catch (e) {
        console.error('WeCom alert failed:', e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        leads_last_48h: count,
        alert_triggered: shouldCheck,
        alert_sent: alertSent,
        is_preview: isPreview,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
