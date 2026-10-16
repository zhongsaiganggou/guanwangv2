import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
const CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT=9777+Math.floor(Math.random()*100);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function getJSON(u){const c=new AbortController();const t=setTimeout(()=>c.abort(),8000);try{const r=await fetch(u,{signal:c.signal});return await r.json()}finally{clearTimeout(t)}}
function connect(w){return new Promise((res,rej)=>{const s=new WebSocket(w);s.onopen=()=>res(s);s.onerror=e=>rej(new Error(e.message))})}
const chrome=spawn(CHROME,["--headless=new","--disable-gpu","--no-sandbox","--disable-blink-features=AutomationControlled",`--remote-debugging-port=${PORT}`,"--user-data-dir=C:/Users/Administrator/AppData/Local/Temp/chrome-cdp-"+randomUUID().slice(0,8),"about:blank"],{stdio:"ignore"});
let v=null;for(let i=0;i<40;i++){try{v=await getJSON(`http://127.0.0.1:${PORT}/json/version`);break}catch{await sleep(250)}}
if(!v){console.error("no cdp");process.exit(1)}
const ws=await connect(v.webSocketDebuggerUrl);let id=0;const pend=new Map();
ws.onmessage=ev=>{const m=JSON.parse(ev.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id)}};
const send=(method,params={},sess=null)=>new Promise(res=>{const i=++id;pend.set(i,res);const m={id:i,method,params};if(sess)m.sessionId=sess;ws.send(JSON.stringify(m))});
const t1=await send("Target.createTarget",{url:"about:blank"});const tid=t1.result.targetId;
const a2=await send("Target.attachToTarget",{targetId:tid,flatten:true});const sid=a2.result.sessionId;
const s=(m,p={})=>send(m,p,sid);
await s("Page.enable");await s("Page.navigate",{url:"https://preview-contact-cro.zhongsai-website-v2.pages.dev/zh/contact/"});
for(let i=0;i<60;i++){await sleep(300);const r=await s("Runtime.evaluate",{expression:"document.readyState",returnByValue:true});if(r.result&&r.result.result&&r.result.result.value==="complete")break}
await sleep(4000);
const expr=`(function(){
  var el=document.querySelector(".cf-turnstile");
  if(!el) return {found:false};
  var out={found:true, dataset:{}};
  for(var k in el.dataset) out.dataset[k]=el.dataset[k];
  out.html=el.outerHTML.slice(0,400);
  out.iframes=el.querySelectorAll("iframe").length;
  out.winTurnstile=typeof window.turnstile;
  out.turnstileKeys=typeof window.turnstile==="object"?Object.keys(window.turnstile||{}).slice(0,10):[];
  return out;
})()`;
const r=await s("Runtime.evaluate",{expression:expr,returnByValue:true});
console.log(JSON.stringify(r.result&&r.result.result?r.result.result.value:r.result,null,2));
ws.close();chrome.kill();process.exit(0);
