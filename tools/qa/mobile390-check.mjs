// Mobile 390px QA via CDP (headless Chrome)
// Usage: node tools/qa/mobile390-check.mjs <url> [url2 ...]
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333 + Math.floor(Math.random() * 400);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getJSON(url, timeout = 10000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    return await res.json();
  } finally { clearTimeout(t); }
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => resolve(ws);
    ws.onerror = (e) => reject(new Error('ws error: ' + e.message));
  });
}

async function main() {
  const urls = process.argv.slice(2);
  if (!urls.length) { console.error('usage: node mobile390-check.mjs <url>...'); process.exit(1); }

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

  for (const url of urls) {
    const t1 = await send('Target.createTarget', { url: 'about:blank' });
    const targetId = t1.result.targetId;
    const a2 = await send('Target.attachToTarget', { targetId, flatten: true });
    const sessionId = a2.result.sessionId;
    const s = (method, params = {}) => send(method, params, sessionId);

    await s('Emulation.setDeviceMetricsOverride', {
      width: 390, height: 844, deviceScaleFactor: 1, mobile: true
    });
    await s('Page.enable');
    await s('Page.navigate', { url });
    // wait for load
    for (let i = 0; i < 60; i++) {
      await sleep(300);
      const r = await s('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
      if (r.result && r.result.result && r.result.result.value === 'complete') break;
    }
    await sleep(1500);

    const expr = `(function(){
      var de = document.documentElement;
      var body = document.body;
      var sw = Math.max(de.scrollWidth, body ? body.scrollWidth : 0);
      var overflowX = sw > 390;
      var t = document.body.innerText;
      var report = {
        viewport: window.innerWidth,
        scrollWidth: sw,
        overflowX: overflowX,
        tables: [].slice.call(document.querySelectorAll('.params-table, .params-table-wrapper, table')).length,
        faqItems: [].slice.call(document.querySelectorAll('.faq-item, .detail-faq .faq-item')).length,
        evidenceItems: [].slice.call(document.querySelectorAll('.evidence-item, .chain-item, .chain-step')).length,
        formPresent: !!document.querySelector('form, #quote, .quote-form'),
        ctaButtons: [].slice.call(document.querySelectorAll('a,button')).filter(function(el){
          var txt = (el.innerText||'').trim();
          return /提交|查看|获取|发送|Send|View|Get|Submit/i.test(txt);
        }).length
      };
      return JSON.stringify(report);
    })()`;

    const r = await s('Runtime.evaluate', { expression: expr, returnByValue: true });
    let parsed = {};
    try {
      const rr = r.result && r.result.result;
      if (rr && typeof rr.value === 'string') { parsed = JSON.parse(rr.value); }
      else { parsed = { raw: JSON.stringify(r.result).slice(0, 500) }; }
    } catch (e) { parsed = { raw: 'parse-error: ' + e.message, result: JSON.stringify(r).slice(0, 300) }; }
    console.log('URL: ' + url);
    console.log(JSON.stringify(parsed, null, 2));
    await s('Target.closeTarget', { targetId });
  }

  browserWs.close();
  chrome.kill();
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
