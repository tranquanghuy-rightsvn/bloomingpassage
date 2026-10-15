// Usage: node perf.mjs <url> <selector>   — mobile 390x844, CPU throttled 6x.
// Reports how busy the main thread is (TaskDuration share) while the section's idle animations run
// (a) with the section on screen and (b) after scrolling it out of view.
import { spawn } from 'node:child_process';
const [url, sel, css] = process.argv.slice(2);
const port = 9333 + Math.floor(Math.random() * 500);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, '--user-data-dir=/tmp/perf-' + port, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 50; i++) { try { const r = await fetch(`http://127.0.0.1:${port}/json/list`); const t = (await r.json()).find(x => x.type === 'page'); ws = new WebSocket(t.webSocketDebuggerUrl); break; } catch { await sleep(200); } }
await new Promise(r => ws.onopen = r);
let id = 0; const pend = {};
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m.result); delete pend[m.id]; } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Performance.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 3, mobile: true });
await send('Emulation.setCPUThrottlingRate', { rate: 6 });
await send('Page.navigate', { url }); await sleep(4000);
const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.value;
const metrics = async () => Object.fromEntries((await send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
if (css) await ev(`(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(css)};document.head.appendChild(s)})()`);
await ev(`(async()=>{const f=document.querySelector('${sel}');window.scrollTo(0,f.getBoundingClientRect().top+scrollY-120);})()`);
await sleep(9000); // reveal finishes, idle animations running
const window_ = async (label) => { const a = await metrics(); await sleep(5000); const b = await metrics();
  const busy = (b.TaskDuration - a.TaskDuration) / (b.Timestamp - a.Timestamp);
  console.log(label.padEnd(26), 'main thread busy', (busy * 100).toFixed(1) + '%', ' paint/style ms/s', (((b.RecalcStyleDuration - a.RecalcStyleDuration) + (b.LayoutDuration - a.LayoutDuration)) * 1000 / (b.Timestamp - a.Timestamp)).toFixed(1)); };
await window_('section on screen');
await ev(`window.scrollTo(0, document.body.scrollHeight)`); await sleep(1500);
await window_('section off screen');
ws.close(); chrome.kill();
