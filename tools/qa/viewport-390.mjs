// QA helper: real viewport (390x844) check via CDP + headless Chrome.
// Usage: node tools/qa/viewport-390.mjs <url> [width] [height]
const url = process.argv[2];
const width = Number(process.argv[3] || 390);
const height = Number(process.argv[4] || 844);
const port = 9223;

async function main() {
  // Discover the page target
  let targets = [];
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      targets = await res.json();
      if (targets.some((t) => t.type === "page")) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  const page = targets.find((t) => t.type === "page");
  if (!page) throw new Error("no page target");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const mid = ++id;
      pending.set(mid, resolve);
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  await new Promise((r) => (ws.onopen = r));

  await send("Emulation.setDeviceMetricsOverride", {
    width, height, deviceScaleFactor: 1, mobile: true, screenWidth: width, screenHeight: height,
  });
  await send("Page.navigate", { url });
  await new Promise((r) => setTimeout(r, 6000));

  const expr = `(() => {
    const de = document.documentElement;
    const table = document.querySelector('table');
    const h1 = document.querySelector('h1');
    let tr = null;
    if (table) { const r = table.getBoundingClientRect(); tr = { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), scrollableParent: !!(table.parentElement && getComputedStyle(table.parentElement).overflowX !== 'visible') }; }
    return JSON.stringify({
      innerWidth: window.innerWidth,
      scrollWidth: de.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      overflowX: de.scrollWidth > window.innerWidth,
      table: tr,
      h1: h1 ? h1.textContent.trim() : null,
      tableCount: document.querySelectorAll('table').length,
      engDesignLinks: document.querySelectorAll('a[href="/zh/engineering-design/"]').length,
    });
  })()`;
  const out = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  console.log(out.result?.result?.value || JSON.stringify(out));
  ws.close();
}
main().catch((e) => { console.error("ERR", e.message); process.exit(1); });
