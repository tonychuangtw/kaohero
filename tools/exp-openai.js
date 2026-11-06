#!/usr/bin/env node
/* exp-openai.js — 用 OpenAI API 贈額寫一卷的詳解，產出 exp-worker.sh 要的 patch.json / skip.json。
   用法：node tools/exp-openai.js <pid> <outdir>
   給 exp-worker.sh 的 EXP_ENGINE=openai 用；也可以單獨跑一卷測試（2026-11-06 主線派工 1106-1215-az 加的）。

   只經 claude-shared/tools/openai-credit.py 打 API（金鑰只在 runner，那支自己會經 ssh 交過去、自己記帳、
   自己守 31 天 US$100 上限）。⛔ 不要在這裡自己拿金鑰或用別的方式打 OpenAI。

   做法照 exp-deepseek.js：純文字 API，沒有 Write 工具 → 叫它「一行一個 JSON」回來，這支負責撈、驗、寫檔。
   跟 DeepSeek 不同的地方：
     1. 讀得了圖：有 fig 的題把圖檔用 --image 附上，題目裡的「圖檔：路徑」改寫成「圖檔：附圖 k」，不延後
     2. 輸出上限預設 16000（思考也算），不要像 DeepSeek 壓到 8192；要省錢用 --effort 壓思考量
     3. 離開碼：10＝贈額暫停（到上限／用完／金鑰被拒）→ 整卷放棄、什麼都不寫、本程式也回 10，worker 看到就停，不重試
                11＝被 --max-output 截斷（有計費）→ 撈得到的照收，其他題進重試
                12＝這次失敗 → 等 60 秒同一段再打一次，再失敗就進重試
   每一次呼叫的 stderr 最後一行 `openai-credit: … cost=<美元> …` 撈出來加總，最後印給 worker（total_cost_usd）。

   環境變數：EXP_OA_MODEL（預設 gpt-6-astra）、EXP_OA_FLEX（預設 1；只有有 Flex 牌價的模型才會帶）、
            EXP_OA_EFFORT（預設 medium；空字串＝模型預設）、EXP_OA_CHUNK（20）、EXP_OA_PAR（3）、
            EXP_OA_TAG（kaohero-exp）、EXP_OA_STATS（給一個路徑就把逐題統計寫成 JSON，試寫比較用）
   格式驗證直接呼叫 tools/set-exp.js（不帶 --write）；被退或沒回來的題重試一次，再不行記成 DEFER-OA 留給 claude。 */
const fs = require('fs'), path = require('path'), { spawn, spawnSync, execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const { isForeignProse } = require('./exp-lang.js');

const [pid, outdir] = process.argv.slice(2);
if (!pid || !outdir) { console.error('用法：node tools/exp-openai.js <pid> <outdir>'); process.exit(2); }
const OC = path.join(process.env.HOME, 'TelegramClaude/claude-shared/tools/openai-credit.py');
const MODEL = process.env.EXP_OA_MODEL || 'gpt-6-astra';
const FLEX = (process.env.EXP_OA_FLEX ?? '1') === '1' && MODEL === 'gpt-6-astra';   // gpt-5.4-mini 沒有 Flex 牌價
const EFFORT = process.env.EXP_OA_EFFORT ?? 'medium';
const CHUNK = parseInt(process.env.EXP_OA_CHUNK || '20', 10);
const PAR = parseInt(process.env.EXP_OA_PAR || '3', 10);
const TAG = process.env.EXP_OA_TAG || 'kaohero-exp';
const log = m => console.error(`[oa ${pid}] ${m}`);

const sh = (cmd, args, input) => new Promise(res => {
  const p = spawn(cmd, args, { stdio: ['pipe', 'pipe', 'pipe'] });
  let out = '', err = '', done = false;
  const t = setTimeout(() => { try { p.kill('SIGKILL'); } catch {} }, 1800000);
  p.stdout.on('data', d => out += d); p.stderr.on('data', d => err += d);
  p.on('error', e => { err += String(e); });
  p.on('close', code => { if (done) return; done = true; clearTimeout(t); res({ code, stdout: out, stderr: err }); });
  p.stdin.on('error', () => {});
  p.stdin.end(input || '');
});
const dump = a => execFileSync('node', [path.join(__dirname, 'exp-dump.js'), pid, ...a],
  { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] });

class Paused extends Error {}
const usage = { in: 0, out: 0, calls: 0, cost: 0, truncated: 0, failed: 0 };
async function ask(questionsText, extra) {
  // 題目裡的圖檔路徑換成「附圖 k」，路徑本身用 --image 附上（模型看不到本機路徑，寫路徑只會讓它以為要自己去讀）
  const imgs = [];
  const q = questionsText.replace(/圖檔：(\S+)/g, (_, p) => { imgs.push(p); return `圖檔：附圖 ${imgs.length}`; });
  const prompt = fs.readFileSync(path.join(__dirname, 'exp-prompt-oa.md'), 'utf8')
    .replace(/__PID__/g, pid).replace('__QUESTIONS__', q) + (extra || '');
  const args = [OC, '--tag', TAG, '--model', MODEL];
  if (FLEX) args.push('--flex');
  if (EFFORT) args.push('--effort', EFFORT);
  for (const im of imgs) args.push('--image', im);
  for (let attempt = 0; attempt < 2; attempt++) {
    const r = await sh('python3', args, prompt);
    usage.calls++;
    const last = r.stderr.trim().split('\n').filter(l => l.startsWith('openai-credit:')).pop() || '';
    const m = last.match(/in=(\d+).*out=(\d+).*cost=([\d.]+)/);
    if (m) { usage.in += +m[1]; usage.out += +m[2]; usage.cost += +m[3]; }
    if (r.code === 0) return r.stdout;
    if (r.code === 10) { log(`贈額暫停：${r.stderr.trim().slice(-200)}`); throw new Paused(); }
    if (r.code === 11) { usage.truncated++; log('一段被 --max-output 截斷，撈得到的照收'); return r.stdout; }
    usage.failed++;
    log(`一段失敗（rc=${r.code}）：${r.stderr.trim().slice(-200)}`);
    if (r.code !== 12 || attempt) return '';
    await new Promise(z => setTimeout(z, 60000));
  }
  return '';
}

// 撈回覆裡每一個 {"n":…} 物件（同 exp-deepseek.js：逐字掃括號，截斷的半截物件自然被丟掉）
function harvest(text) {
  const out = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== '{') continue;
    let depth = 0, str = false, esc = false, j = i;
    for (; j < text.length; j++) {
      const c = text[j];
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === '"') { str = !str; continue; }
      if (str) continue;
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (!depth) break; }
    }
    if (depth !== 0) break;
    const raw = text.slice(i, j + 1);
    let o = null;
    try { o = JSON.parse(raw); } catch {
      try { o = JSON.parse(raw.replace(/\r/g, '').replace(/\n(?=(?:[^"]*"[^"]*")*[^"]*"[^"]*$)/g, '\\n')); } catch {}
    }
    if (o && typeof o.n !== 'undefined') out.push(o);
    i = j;
  }
  return out;
}

function validate(patch) {
  const bad = new Map();
  let cur = patch.slice();
  for (let round = 0; round < 10 && cur.length; round++) {
    const tmp = path.join(outdir, '.oa-chk.json');
    fs.writeFileSync(tmp, JSON.stringify(cur));
    const r = spawnSync('node', [path.join(__dirname, 'set-exp.js'), tmp],
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 16 << 20 });
    fs.unlinkSync(tmp);
    const txt = (r.stdout || '') + (r.stderr || '');
    const errs = [...txt.matchAll(/✗\s+\S+\s+#(\d+)[：:]\s*(.+)/g)].map(m => [+m[1], m[2].trim()]);
    if (!errs.length) break;
    errs.forEach(([n, why]) => bad.set(n, why));
    const drop = new Set(errs.map(e => e[0]));
    cur = cur.filter(p => !drop.has(p.n));
  }
  return { ok: cur, bad };
}

const pool = async (items, n, fn) => {
  const res = []; let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) { const k = i++; res[k] = await fn(items[k], k); }
  }));
  return res;
};
const chunk = ns => { const c = []; for (let i = 0; i < ns.length; i += CHUNK) c.push(ns.slice(i, i + CHUNK)); return c; };

(async () => {
  const t0 = Date.now();
  const todo = JSON.parse(dump(['--list']));
  const all = todo.map(q => q.n);
  const patch = new Map(), skip = new Map();
  const stats = { first: 0, retry: 0, gaveup: 0, skipped: 0 };
  log(`待寫 ${all.length} 題（圖 ${todo.filter(q => q.fig).length}）；${MODEL}${FLEX ? ' flex' : ''} effort=${EFFORT || '預設'}、${chunk(all).length} 段 × ${CHUNK}`);

  const take = (objs, want) => {
    const got = new Set();
    for (const o of objs) {
      const n = parseInt(o.n, 10);
      if (!want.includes(n) || got.has(n)) continue;
      if (o.exp && String(o.exp).trim()) {
        if (isForeignProse(o.exp)) continue;
        patch.set(n, String(o.exp).trim()); got.add(n);
      } else if (o.skip) { skip.set(n, String(o.skip).slice(0, 110)); got.add(n); }
    }
    return want.filter(n => !got.has(n));
  };

  try {
    const missed = (await pool(chunk(all), PAR, async (ns, k) => {
      const left = take(harvest(await ask(dump(['--only', ns.join(',')]))), ns);
      if (left.length) log(`第 ${k + 1} 段少了 ${left.length} 題：${left.join(',')}`);
      return left;
    })).flat();
    let { ok, bad } = validate([...patch].map(([n, exp]) => ({ pid, n, exp })));
    patch.clear(); ok.forEach(p => patch.set(p.n, p.exp));
    stats.first = patch.size;
    const retry = [...new Set([...missed, ...bad.keys()])].sort((a, b) => a - b);
    if (retry.length) {
      log(`重試 ${retry.length} 題（格式退回 ${bad.size}、沒回來 ${missed.length}）`);
      const hint = bad.size ? '\n\n=== 上一次這幾題被退回，錯誤如下，請重寫 ===\n'
        + [...bad].map(([n, why]) => `#${n}：${why}`).join('\n') : '';
      await pool(chunk(retry), PAR, async ns => take(harvest(await ask(dump(['--only', ns.join(',')]), hint)), ns));
      const v = validate([...patch].map(([n, exp]) => ({ pid, n, exp })));
      patch.clear(); v.ok.forEach(p => patch.set(p.n, p.exp));
      v.bad.forEach((why, n) => { if (!patch.has(n)) skip.set(n, `DEFER-OA：格式兩次不合（${why}）`.slice(0, 110)); });
      stats.retry = patch.size - stats.first;
    }
  } catch (e) {
    if (!(e instanceof Paused)) throw e;
    // 贈額暫停：這卷什麼都不寫（不留半卷），讓 worker 照原本的退路走
    console.log(JSON.stringify({ usage: { input_tokens: usage.in, output_tokens: usage.out },
      num_turns: usage.calls, total_cost_usd: usage.cost, paused: true }));
    process.exit(10);
  }
  for (const n of all) if (!patch.has(n) && !skip.has(n)) skip.set(n, 'DEFER-OA：OpenAI 未回傳，留給 claude 補');
  stats.gaveup = [...skip.values()].filter(r => r.startsWith('DEFER-OA')).length;
  stats.skipped = skip.size - stats.gaveup;

  fs.writeFileSync(path.join(outdir, 'patch.json'),
    JSON.stringify([...patch].sort((a, b) => a[0] - b[0]).map(([n, exp]) => ({ pid, n, exp })), null, 1));
  fs.writeFileSync(path.join(outdir, 'skip.json'),
    JSON.stringify([...skip].sort((a, b) => a[0] - b[0]).map(([n, reason]) => ({ n, reason })), null, 1));
  const secs = Math.round((Date.now() - t0) / 1000);
  log(`寫 ${patch.size} 題（一次過 ${stats.first}、重試後過 ${stats.retry}）、模型判跳 ${stats.skipped}、放棄 ${stats.gaveup}；` +
      `API ${usage.calls} 次、US$${usage.cost.toFixed(4)}、${secs}s`);
  if (process.env.EXP_OA_STATS) fs.writeFileSync(process.env.EXP_OA_STATS, JSON.stringify({
    pid, model: MODEL, flex: FLEX, effort: EFFORT, total: all.length, ...stats, secs, ...usage }, null, 1));
  console.log(JSON.stringify({ usage: { input_tokens: usage.in, output_tokens: usage.out },
    num_turns: usage.calls, total_cost_usd: usage.cost }));
})();
