// Contact CRO Final E2E Gate — real browser (CDP headless Chrome)
// Usage: node tools/qa/contact-e2e.mjs
// Covers: A WeChat-only / B Phone+code / C Empty contact / D Phone no code
//         E QA isolation / F File upload / G project_form_start timing
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9444 + Math.floor(Math.random() * 300);
const BASE = 'https://preview-contact-cro.zhongsai-website-v2.pages.dev';
const ZH = BASE + '/zh/contact/';
const EN = BASE + '/en/contact/';
const __dirname = dirname(fileURLToPath(import.meta.url));
const TEST_PNG = join(__dirname, '..', '..', 'tmp-e2e-file.png');

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

const HOOK = `(function(){
  if (window.__qa_hooked) return;
  window.__qa_events = [];
  var timer = setInterval(function(){
    if (typeof window.trackEvent === 'function' && typeof window.trackLeadConversion === 'function') {
      clearInterval(timer);
      var te = window.trackEvent, tlc = window.trackLeadConversion;
      window.trackEvent = function(name, params){ window.__qa_events.push({ n: name, p: params || {} }); };
      window.trackLeadConversion = function(params){ window.__qa_events.push({ n: '__LEAD_CONVERSION__', p: params || {} }); };
      window.__qa_hooked = true;
    }
  }, 100);
})();`;

async function main() {
  // tiny 1x1 PNG fixture for file-upload scenario
  const pngB64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  mkdirSync(dirname(TEST_PNG), { recursive: true });
  writeFileSync(TEST_PNG, Buffer.from(pngB64, 'base64'));

  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    '--disable-blink-features=AutomationControlled',
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
  const respIds = [];
  let activeSession = null;
  browserWs.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    if (msg.method === 'Network.responseReceived' && msg.sessionId === activeSession) {
      const u = msg.params.response.url;
      if (u.includes('/api/project-inquiry')) {
        respIds.push({ id: msg.params.requestId, url: u, status: msg.params.response.status });
      }
    }
  };
  const send = (method, params = {}, sess = null) => new Promise((resolve) => {
    const id = ++msgId;
    pending.set(id, resolve);
    const msg = { id, method, params };
    if (sess) msg.sessionId = sess;
    browserWs.send(JSON.stringify(msg));
  });

  async function newTab() {
    const t1 = await send('Target.createTarget', { url: 'about:blank' });
    const targetId = t1.result.targetId;
    const a2 = await send('Target.attachToTarget', { targetId, flatten: true });
    const sessionId = a2.result.sessionId;
    activeSession = sessionId;
    const s = (method, params = {}) => send(method, params, sessionId);
    await s('Page.enable');
    await s('Network.enable');
    await s('Page.addScriptToEvaluateOnNewDocument', { source: HOOK });
    respIds.length = 0;
    return { targetId, s, close: () => send('Target.closeTarget', { targetId }) };
  }

  async function waitLoad(s) {
    for (let i = 0; i < 60; i++) {
      await sleep(300);
      const r = await s('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
      if (r.result && r.result.result && r.result.result.value === 'complete') break;
    }
    await sleep(1200);
  }

  async function evalJson(s, expr) {
    const r = await s('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    try {
      const v = r.result && r.result.result && r.result.result.value;
      if (typeof v === 'string') return JSON.parse(v);
      return { raw: JSON.stringify(r.result).slice(0, 600) };
    } catch (e) { return { raw: 'parse-error', detail: JSON.stringify(r.result).slice(0, 600) }; }
  }

  const FILL = (payload) => `(function(){
    var f = document.querySelector('form.quote-form-v2');
    if (!f) return { ok: false, err: 'no form' };
    var payload = ${JSON.stringify(payload)};
    var set = function(name, val){
      var el = f.querySelector('[name="' + name + '"]');
      if (!el) return false;
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('blur', { bubbles: true }));
      return true;
    };
    var out = {};
    Object.keys(payload).forEach(function(k){ out[k] = set(k, payload[k]); });
    return { ok: true, set: out };
  })()`;

  const CLICK_SUBMIT = `(function(){
    var f = document.querySelector('form.quote-form-v2');
    if (!f) return { ok: false, err: 'no form' };
    var btn = f.querySelector('.btn-submit-full');
    if (!btn) return { ok: false, err: 'no submit btn' };
    btn.click();
    return { ok: true };
  })()`;

  const READ_STATE = `(function(){
    var out = {};
    var se = document.querySelector('.form-success');
    out.success = se ? (se.textContent || '').trim() : '';
    out.successShow = se ? se.classList.contains('show') : false;
    var ee = document.querySelector('.form-error');
    out.error = ee ? (ee.textContent || '').trim() : '';
    out.fieldErrors = {};
    document.querySelectorAll('.field-error').forEach(function(span){
      if ((span.textContent || '').trim()) out.fieldErrors[span.dataset.errorFor || '?'] = span.textContent.trim();
    });
    out.events = window.__qa_events || [];
    out.hooked = !!window.__qa_hooked;
    out.formHidden = (function(){ var f = document.querySelector('form.quote-form-v2'); return f ? f.querySelector('.form-grid') && getComputedStyle(f.querySelector('.form-grid')).display === 'none' : false; })();
    return JSON.stringify(out);
  })()`;

  const TURNSTILE = `(function(){
    var el = document.querySelector('.cf-turnstile');
    if (!el) return { token: '', ok: false, why: 'no widget' };
    var t = el.dataset.token || '';
    if (!t && window.turnstile && el.dataset.widgetId) {
      try { t = window.turnstile.getResponse(el.dataset.widgetId) || ''; } catch (e) {}
    }
    return { token: t, ok: !!t };
  })()`;

  async function waitTurnstile(s, timeoutMs = 20000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const st = await evalJson(s, TURNSTILE);
      if (st.ok) return st;
      await sleep(500);
    }
    return { token: '', ok: false, why: 'timeout' };
  }

  async function getApiResponses(s) {
    await sleep(1500);
    const out = [];
    for (const r of respIds) {
      const b = await s('Network.getResponseBody', { requestId: r.id }).catch(() => ({ result: {} }));
      let body = '';
      try { body = b.result && b.result.body ? (b.result.base64Encoded ? Buffer.from(b.result.body, 'base64').toString() : b.result.body) : ''; } catch (e) { body = ''; }
      out.push({ url: r.url, status: r.status, body: body.slice(0, 1200) });
    }
    return out;
  }

  const baseFill = {
    name: 'Gate Name', country: 'Malaysia', intendedUse: 'Warehouse extension',
    length: '40', width: '25', height: '8', projectType: '工业厂房与车间',
    message: 'E2E gate scenario'
  };

  const results = {};
  const log = (key, val) => { results[key] = val; console.log('=== ' + key + ' ==='); console.log(JSON.stringify(val, null, 2)); };

  // ---- A. WeChat-only valid (ZH) ----
  {
    const tab = await newTab();
    await tab.s('Page.navigate', { url: ZH });
    await waitLoad(tab.s);
    const fill = await evalJson(tab.s, FILL({ ...baseFill, name: 'Gate A - WeChat Only', wechat: 'gate_a_wechat' }));
    const ts = await waitTurnstile(tab.s);
    const clicked = await evalJson(tab.s, CLICK_SUBMIT);
    await sleep(3500);
    const state = await evalJson(tab.s, READ_STATE);
    const api = await getApiResponses(tab.s);
    log('A_wechat_only', { fill, turnstile: ts, clicked, state, api });
    await tab.close();
  }

  // ---- B. Phone + country code valid (EN) ----
  {
    const tab = await newTab();
    await tab.s('Page.navigate', { url: EN });
    await waitLoad(tab.s);
    const fill = await evalJson(tab.s, FILL({ ...baseFill, name: 'Gate B - Phone Only', phone_code: '+86', phone: '13800138000' }));
    const ts = await waitTurnstile(tab.s);
    const clicked = await evalJson(tab.s, CLICK_SUBMIT);
    await sleep(3500);
    const state = await evalJson(tab.s, READ_STATE);
    const api = await getApiResponses(tab.s);
    log('B_phone_code', { fill, turnstile: ts, clicked, state, api });
    await tab.close();
  }

  // ---- C. Empty contact (ZH) ----
  {
    const tab = await newTab();
    await tab.s('Page.navigate', { url: ZH });
    await waitLoad(tab.s);
    const fill = await evalJson(tab.s, FILL({ ...baseFill, name: 'Gate C - No Contact' }));
    const clicked = await evalJson(tab.s, CLICK_SUBMIT);
    await sleep(2000);
    const state = await evalJson(tab.s, READ_STATE);
    const api = await getApiResponses(tab.s);
    log('C_empty_contact', { fill, clicked, state, apiCount: api.length, api });
    await tab.close();
  }

  // ---- D. Phone without country code (EN) ----
  {
    const tab = await newTab();
    await tab.s('Page.navigate', { url: EN });
    await waitLoad(tab.s);
    const fill = await evalJson(tab.s, FILL({ ...baseFill, name: 'Gate D - No Code', phone: '12345678' }));
    const clicked = await evalJson(tab.s, CLICK_SUBMIT);
    await sleep(2000);
    const state = await evalJson(tab.s, READ_STATE);
    const api = await getApiResponses(tab.s);
    log('D_phone_no_code', { fill, clicked, state, apiCount: api.length, api });
    await tab.close();
  }

  // ---- E. QA submission (ZH) ----
  {
    const tab = await newTab();
    await tab.s('Page.navigate', { url: ZH });
    await waitLoad(tab.s);
    const fill = await evalJson(tab.s, FILL({ ...baseFill, name: 'v2 qa test contact gate E', wechat: 'gate_e_qa' }));
    const ts = await waitTurnstile(tab.s);
    const clicked = await evalJson(tab.s, CLICK_SUBMIT);
    await sleep(3500);
    const state = await evalJson(tab.s, READ_STATE);
    const api = await getApiResponses(tab.s);
    log('E_qa_submission', { fill, turnstile: ts, clicked, state, api });
    await tab.close();
  }

  // ---- F. File upload (ZH) ----
  {
    const tab = await newTab();
    await tab.s('Page.navigate', { url: ZH });
    await waitLoad(tab.s);
    const doc = await tab.s('DOM.getDocument');
    const q = await tab.s('DOM.querySelector', { nodeId: doc.result.root.nodeId, selector: 'form.quote-form-v2 input[type="file"]' });
    if (q.result && q.result.nodeId) {
      await tab.s('DOM.setFileInputFiles', { nodeId: q.result.nodeId, files: [TEST_PNG] });
    }
    const fill = await evalJson(tab.s, FILL({ ...baseFill, name: 'Gate F - File Upload', wechat: 'gate_f_file' }));
    const ts = await waitTurnstile(tab.s);
    const clicked = await evalJson(tab.s, CLICK_SUBMIT);
    await sleep(4000);
    const state = await evalJson(tab.s, READ_STATE);
    const api = await getApiResponses(tab.s);
    log('F_file_upload', { fill, turnstile: ts, clicked, state, api });
    await tab.close();
  }

  // ---- G. project_form_start timing (ZH, no submit) ----
  {
    const tab = await newTab();
    await tab.s('Page.navigate', { url: ZH });
    await waitLoad(tab.s);
    const before = await evalJson(tab.s, READ_STATE);
    await evalJson(tab.s, FILL({ name: 'Gate G' })); // first real interaction
    await sleep(400);
    const afterFirst = await evalJson(tab.s, READ_STATE);
    await evalJson(tab.s, FILL({ name: 'Gate G Again' })); // second interaction
    await sleep(400);
    const afterSecond = await evalJson(tab.s, READ_STATE);
    log('G_form_start', {
      eventsBefore: before.events,
      eventsAfterFirst: afterFirst.events,
      eventsAfterSecond: afterSecond.events,
      formStartCount: afterSecond.events.filter(e => e.n === 'project_form_start').length
    });
    await tab.close();
  }

  browserWs.close();
  chrome.kill();
  console.log('\n==== E2E GATE SUMMARY ====');
  const counts = {};
  counts.A = { successShow: results.A_wechat_only.state.successShow, apiStatus: results.A_wechat_only.api.map(a => a.status) };
  counts.B = { successShow: results.B_phone_code.state.successShow, apiStatus: results.B_phone_code.api.map(a => a.status) };
  counts.C = { apiCount: results.C_empty_contact.apiCount, fieldErrors: results.C_empty_contact.state.fieldErrors };
  counts.D = { apiCount: results.D_phone_no_code.apiCount, fieldErrors: results.D_phone_no_code.state.fieldErrors };
  counts.E = { apiStatus: results.E_qa_submission.api.map(a => a.status), events: results.E_qa_submission.state.events.map(e => e.n) };
  counts.F = { successShow: results.F_file_upload.state.successShow, apiStatus: results.F_file_upload.api.map(a => a.status) };
  counts.G = { formStartCount: results.G_form_start.formStartCount };
  console.log(JSON.stringify(counts, null, 2));
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
