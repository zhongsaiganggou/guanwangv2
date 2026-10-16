// Shared QuoteForm regression + console/network error check via CDP
// Usage: node tools/qa/shared-form-regression.mjs [baseUrl]
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9800 + Math.floor(Math.random() * 150);
const BASE = process.argv[2] || 'https://preview-contact-cro.zhongsai-website-v2.pages.dev';
const URLS = [
  BASE + '/zh/contact/', BASE + '/en/contact/',
  BASE + '/zh/engineering-design/', BASE + '/en/engineering-design/',
  BASE + '/zh/manufacturing-quality/', BASE + '/en/manufacturing-quality/',
  BASE + '/zh/export-delivery/', BASE + '/en/export-delivery/',
  BASE + '/zh/components/steel-trusses/', BASE + '/en/components/steel-trusses/',
];
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function getJSON(url, timeout = 10000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try { const res = await fetch(url, { signal: ctrl.signal }); return await res.json(); }
  finally { clearTimeout(t); }
}
function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => resolve(ws);
    ws.onerror = (e) => reject(new Error('ws error: ' + e.message));
  });
}
async function main() {
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + 'C:/Users/Administrator/AppData/Local/Temp/chrome-cdp-' + randomUUID().slice(0, 8),
    'about:blank'
  ], { stdio: 'ignore' });
  let version = null;
  for (let i = 0; i < 40; i++) {
    try { version = await getJSON(`http://127.0.0.1:${PORT}/json/version`); break; }
    catch { await sleep(250); }
  }
  if (!version) { console.error('CDP not ready'); chrome.kill(); process.exit(1); }
  const browserWs = await connect(version.webSocketDebuggerUrl);
  let msgId = 0;
  const pending = new Map();
  browserWs.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  };
  const send = (method, params = {}, sess = null) => new Promise((resolve) => {
    const id = ++msgId;
    pending.set(id, resolve);
    const msg = { id, method, params };
    if (sess) msg.sessionId = sess;
    browserWs.send(JSON.stringify(msg));
  });

  const results = [];
  for (const url of URLS) {
    const t1 = await send('Target.createTarget', { url: 'about:blank' });
    const targetId = t1.result.targetId;
    const a2 = await send('Target.attachToTarget', { targetId, flatten: true });
    const sessionId = a2.result.sessionId;
    const s = (method, params = {}) => send(method, params, sessionId);
    const consoleErrors = [];
    const httpErrors = [];
    browserWs.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
      if (msg.sessionId !== sessionId) return;
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        const text = (msg.params.args || []).map(a => a.value || a.description || '').join(' ').slice(0, 300);
        consoleErrors.push(text);
      }
      if (msg.method === 'Network.responseReceived') {
        const st = msg.params.response.status;
        if (st >= 400 && st < 600) {
          httpErrors.push({ url: msg.params.response.url.slice(0, 200), status: st });
        }
      }
    };
    await s('Page.enable');
    await s('Runtime.enable');
    await s('Network.enable');
    await s('Page.navigate', { url });
    for (let i = 0; i < 60; i++) {
      await sleep(300);
      const r = await s('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
      if (r.result && r.result.result && r.result.result.value === 'complete') break;
    }
    await sleep(1800);
    const expr = `(function(){
      var out = { url: location.pathname };
      out.form = !!document.querySelector('form.quote-form-v2');
      out.submitBtn = !!document.querySelector('form.quote-form-v2 .btn-submit-full');
      out.wechatField = !!document.querySelector('form.quote-form-v2 input[name="wechat"]');
      out.phoneField = !!document.querySelector('form.quote-form-v2 input[name="phone"]');
      out.projectType = !!document.querySelector('form.quote-form-v2 select[name="projectType"]');
      out.turnstile = !!document.querySelector('form.quote-form-v2 .cf-turnstile');
      out.successEl = !!document.querySelector('form.quote-form-v2 .form-success');
      var c = document.querySelector('link[rel="canonical"]'); out.canonical = c ? c.href : '';
      var alts = [].map.call(document.querySelectorAll('link[rel="alternate"][hreflang]'), function(l){return l.hreflang + '=' + l.href;});
      out.hreflang = alts;
      return JSON.stringify(out);
    })()`;
    const r = await s('Runtime.evaluate', { expression: expr, returnByValue: true });
    let parsed = {};
    try { parsed = JSON.parse(r.result.result.value); }
    catch (e) { parsed = { raw: 'parse-error:' + e.message, detail: JSON.stringify(r.result).slice(0, 400) }; }
    parsed.consoleErrors = consoleErrors;
    parsed.httpErrors = httpErrors;
    results.push(parsed);
    await s('Target.closeTarget', { targetId });
  }
  browserWs.close();
  chrome.kill();
  for (const r of results) console.log(JSON.stringify(r, null, 2));
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
