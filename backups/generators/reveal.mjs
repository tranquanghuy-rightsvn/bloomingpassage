// Frame timing during the painting's reveal (bloom) on an emulated phone, CPU throttled 4x.
import { spawn } from 'node:child_process';
const [url, sel, css] = process.argv.slice(2);
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, '--user-data-dir=/tmp/rv-' + port, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms)); let ws;
for (let i = 0; i < 50; i++) { try { const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(x => x.type === 'page'); ws = new WebSocket(t.webSocketDebuggerUrl); break; } catch { await sleep(200); } }
await new Promise(r => ws.onopen = r); let id = 0; const pend = {};
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m.result); delete pend[m.id]; } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 3, mobile: true });
await send('Emulation.setCPUThrottlingRate', { rate: 4 });
await send('Page.navigate', { url }); await sleep(5000);
const ev = async e => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result.value;
if (css) await ev(`(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s)})()`);
const r = await ev(`(async()=>{const f=document.querySelector('${sel}');window.scrollTo(0,f.getBoundingClientRect().top+scrollY-120);
  await new Promise(r=>{const c=()=>f.classList.contains('is-in')?r():requestAnimationFrame(c);c()});
  const t0=performance.now();const fr=[];let last=t0;
  await new Promise(r=>{const tick=n=>{fr.push([n-t0,n-last]);last=n; n-t0<6000?requestAnimationFrame(tick):r()};requestAnimationFrame(tick)});
  const win=(a,b)=>{const x=fr.filter(f=>f[0]>=a*1000&&f[0]<b*1000);const fps=x.length/(b-a);const long=x.filter(f=>f[1]>50).length;const worst=Math.max(...x.map(f=>f[1]));return [a+'-'+b+'s', fps.toFixed(0)+' fps', 'frames>50ms: '+long, 'worst '+worst.toFixed(0)+'ms']};
  return [win(0,2),win(2,3),win(3,4.5),win(4.5,6)];})()`);
r.forEach(x => console.log(x.join('  ')));
ws.close(); chrome.kill();
