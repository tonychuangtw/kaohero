#!/usr/bin/env node
/* exp-deepseek.js — 用 DeepSeek 寫一卷的詳解，產出 exp-worker.sh 要的 patch.json / skip.json。
   用法：node tools/exp-deepseek.js <pid> <outdir>
   給 exp-worker.sh 的 EXP_ENGINE=deepseek 用；也可以單獨跑一卷測試。

   為什麼要另外寫一支（不能像 claude／agy 那樣直接餵 exp-prompt.md）：
   DeepSeek 是純文字 chat API，沒有 Write／Read 工具，也沒有 agent loop，所以
     1. 它不能自己寫檔 → 改成「一行一個 JSON」回來，這支腳本負責撈、驗、寫檔
     2. 它讀不了圖 → 有 fig 的題整批延後（skip 理由開頭 DEFER-FIG），最後用 claude 補
        （要把延後的題放回佇列：node tools/exp-skip-drop.js --reason-match '^DEFER' --write）
     3. 輸出上限 8192 tokens，一卷 80 題一定截斷 → 切成每段 EXP_DS_CHUNK（預設 20）題送，
        平行 EXP_DS_PAR（預設 3）段。2026-09-18 實測一次送 26 題就被 max_tokens 砍掉半截 JSON。
     4. ⚠ 一定要帶 --no-think：deepseek-flash 預設會先思考，思考的字數也算 max_tokens。
        同一份 15 題 prompt 不加時 133 秒、out=8192 全被思考吃掉、content 是空字串（看起來像
        「模型什麼都沒回」，而且 API 回 200、不會報錯）；加了只要 10 秒、2,552 tokens，品質一樣。
   金鑰只在 runner（~/.config/deepseek/.env），所以每一段都 ssh 過去跑 ~/.local/bin/deepseek。

   格式驗證直接呼叫 tools/set-exp.js（不帶 --write），跟 worker 用的是同一套規則；
   被退回或沒回來的題重試一次，再不行就記成 DEFER-DS 留給 claude。 */
const fs = require('fs'), path = require('path'), { spawn, spawnSync, execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const { isForeignProse } = require('./exp-lang.js');

const [pid, outdir] = process.argv.slice(2);
if (!pid || !outdir) { console.error('用法：node tools/exp-deepseek.js <pid> <outdir>'); process.exit(2); }
const HOST = process.env.EXP_DS_HOST || 'tonychuangtw@192.168.1.173';
const MODEL = process.env.EXP_DS_MODEL || 'deepseek-flash';
const CHUNK = parseInt(process.env.EXP_DS_CHUNK || '20', 10);
const PAR = parseInt(process.env.EXP_DS_PAR || '3', 10);
const MAXTOK = process.env.EXP_DS_MAXTOK || '8192';
const SSHOPT = ['-o', 'ConnectTimeout=10', '-o', 'ServerAliveInterval=60', '-o', 'BatchMode=yes'];
const log = m => console.error(`[ds ${pid}] ${m}`);

// 跑一個外部命令，prompt 從 stdin 灌進去（execFile 不收 stdin，所以自己 spawn）
const sh = (cmd, args, input) => new Promise(res => {
  const p = spawn(cmd, args, { stdio: ['pipe', 'pipe', 'pipe'] });
  let out = '', err = '', done = false;
  const t = setTimeout(() => { try { p.kill('SIGKILL'); } catch {} }, 900000);
  p.stdout.on('data', d => out += d); p.stderr.on('data', d => err += d);
  p.on('error', e => { err += String(e); });
  p.on('close', code => { if (done) return; done = true; clearTimeout(t); res({ code, stdout: out, stderr: err }); });
  p.stdin.on('error', () => {});
  p.stdin.end(input || '');
});
const dump = a => execFileSync('node', [path.join(__dirname, 'exp-dump.js'), pid, ...a],
  { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] });

// 一段題目送一次 API。prompt 從 stdin 灌進 runner 的暫存檔，避免 128KB 命令列上限。
let usage = { in: 0, out: 0, calls: 0 };
async function ask(questionsText, extra) {
  const prompt = fs.readFileSync(path.join(__dirname, 'exp-prompt-ds.md'), 'utf8')
    .replace(/__PID__/g, pid).replace('__QUESTIONS__', questionsText) + (extra || '');
  const tmp = `/tmp/exp-ds.${process.pid}.${Math.random().toString(36).slice(2, 8)}.md`;
  const remote = `cat > ${tmp} && $HOME/.local/bin/deepseek -f ${tmp} --model ${MODEL} --max-tokens ${MAXTOK} --no-think --timeout 600; rc=$?; rm -f ${tmp}; exit $rc`;
  const r = await sh('ssh', [...SSHOPT, HOST, remote], prompt);
  usage.calls++;
  const m = r.stderr.match(/in=(\d+).*out=(\d+)/);
  if (m) { usage.in += +m[1]; usage.out += +m[2]; }
  if (r.code !== 0 && !r.stdout.trim()) log(`一段失敗（rc=${r.code}）：${r.stderr.trim().slice(0, 200)}`);
  return r.stdout;
}

// 撈回覆裡每一個 {"n":…} 物件。模型偶爾會包成陣列、加 ``` 圍欄、或被 max_tokens 從中間砍斷，
// 所以不整包 JSON.parse，改成逐字掃括號、只收完整的物件（截斷的那個自然被丟掉）。
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
    if (depth !== 0) break;                       // 這裡起是半截物件，後面不用看了
    const raw = text.slice(i, j + 1);
    let o = null;
    try { o = JSON.parse(raw); } catch {
      // 常見瑕疵：exp 裡的換行沒跳脫成 \n，整個物件 parse 不了 —— 把字串內的實體換行補跳脫再試一次
      try { o = JSON.parse(raw.replace(/\r/g, '').replace(/\n(?=(?:[^"]*"[^"]*")*[^"]*"[^"]*$)/g, '\\n')); } catch {}
    }
    if (o && typeof o.n !== 'undefined') out.push(o);
    i = j;
  }
  return out;
}

// 用 set-exp.js（不寫入）驗格式，被退的題連同理由丟出來。跟 worker 事後跑的是同一套規則，
// 所以這裡過得了的，worker 那關也過得了。set-exp 一次只印前 20 筆錯，重複驗到全過為止。
function validate(patch) {
  const bad = new Map();
  let cur = patch.slice();
  for (let round = 0; round < 10 && cur.length; round++) {
    const tmp = path.join(outdir, '.ds-chk.json');
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

const pool = async (items, n, fn) => {            // 極簡平行池：同時最多 n 個
  const res = []; let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) { const k = i++; res[k] = await fn(items[k], k); }
  }));
  return res;
};

(async () => {
  const todo = JSON.parse(dump(['--list']));
  const figs = todo.filter(q => q.fig).map(q => q.n);
  const text = todo.filter(q => !q.fig).map(q => q.n);
  const patch = new Map(), skip = new Map();
  figs.forEach(n => skip.set(n, 'DEFER-FIG：圖片題，DeepSeek 讀不了圖，留給 claude 補'));

  const chunks = [];
  for (let i = 0; i < text.length; i += CHUNK) chunks.push(text.slice(i, i + CHUNK));
  log(`待寫 ${todo.length} 題：文字 ${text.length}（${chunks.length} 段 × ${CHUNK}）、圖片 ${figs.length} 延後`);

  const take = (objs, want) => {                  // 把模型回的物件收進 patch／skip，回傳還沒拿到的題號
    const got = new Set();
    for (const o of objs) {
      const n = parseInt(o.n, 10);
      if (!want.includes(n)) continue;
      if (o.exp && String(o.exp).trim()) {
        if (isForeignProse(o.exp)) continue;      // 整段外語的解析不收，留給重試
        patch.set(n, String(o.exp).trim()); got.add(n);
      } else if (o.skip) { skip.set(n, String(o.skip).slice(0, 110)); got.add(n); }
    }
    return want.filter(n => !got.has(n));
  };

  const missed = (await pool(chunks, PAR, async (ns, k) => {
    const left = take(harvest(await ask(dump(['--only', ns.join(',')]))), ns);
    if (left.length) log(`第 ${k + 1} 段少了 ${left.length} 題：${left.join(',')}`);
    return left;
  })).flat();

  // 驗格式，被退的題跟沒回來的題一起重試一次（把退件理由寫進 prompt）
  let { ok, bad } = validate([...patch].map(([n, exp]) => ({ pid, n, exp })));
  patch.clear(); ok.forEach(p => patch.set(p.n, p.exp));
  let retry = [...new Set([...missed, ...bad.keys()])].sort((a, b) => a - b);
  if (retry.length) {
    log(`重試 ${retry.length} 題（格式退回 ${bad.size}、沒回來 ${missed.length}）`);
    const hint = bad.size ? '\n\n=== 上一次這幾題被退回，錯誤如下，請重寫 ===\n'
      + [...bad].map(([n, why]) => `#${n}：${why}`).join('\n') : '';
    const rchunks = [];
    for (let i = 0; i < retry.length; i += CHUNK) rchunks.push(retry.slice(i, i + CHUNK));
    await pool(rchunks, PAR, async ns => take(harvest(await ask(dump(['--only', ns.join(',')]), hint)), ns));
    const v = validate([...patch].map(([n, exp]) => ({ pid, n, exp })));
    patch.clear(); v.ok.forEach(p => patch.set(p.n, p.exp));
    v.bad.forEach((why, n) => { if (!patch.has(n)) skip.set(n, `DEFER-DS：格式兩次不合（${why}）`.slice(0, 110)); });
  }
  // 兩輪都沒寫出來也沒說跳過的題：標成 DEFER-DS，免得這一卷永遠留在佇列被無限重做
  for (const n of text) if (!patch.has(n) && !skip.has(n)) skip.set(n, 'DEFER-DS：DeepSeek 未回傳，留給 claude 補');

  fs.writeFileSync(path.join(outdir, 'patch.json'),
    JSON.stringify([...patch].sort((a, b) => a[0] - b[0]).map(([n, exp]) => ({ pid, n, exp })), null, 1));
  fs.writeFileSync(path.join(outdir, 'skip.json'),
    JSON.stringify([...skip].sort((a, b) => a[0] - b[0]).map(([n, reason]) => ({ n, reason })), null, 1));
  log(`寫 ${patch.size} 題、跳／延後 ${skip.size} 題、API ${usage.calls} 次`);
  // 給 exp-worker.sh 的 usage 解析用（DeepSeek 按量計價，費用最後用餘額差算，不逐卷回報）
  console.log(JSON.stringify({ usage: { input_tokens: usage.in, output_tokens: usage.out }, num_turns: usage.calls }));
})();
