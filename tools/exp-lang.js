/* exp-lang.js — 判斷一則詳解的「說明文字」是不是用外語（日文／韓文）寫的。
   為什麼要有（2026-09-18 Tony 指出）：外語科目（導遊領隊 d005/l005 日語、d009/l009 韓語）
   有 300 多題的解析整段用日文／韓文寫，台灣考生看不懂。成因是 exp-dump.js 會拿「同科目已寫好的
   一題」當風格範例 —— 第一卷寫成日文後，後面每一卷都照抄，一路繁殖下去。
   認法：把 ✅／❌ 行裡「」『』引號內被引用的原文拿掉（那是正常的舉例），剩下的說明文字
   如果假名／諺文還佔三成以上，就是整段用外語寫的。實測 0.12～0.21 是正常中文解析、0.33 以上是日文。 */
function isForeignProse(exp) {
  if (!exp) return false;
  const body = String(exp).split('\n').filter(l => /^[✅❌]/.test(l)).join('')
    .replace(/[「『][^」』]*[」』]/g, '')
    .replace(/[\s()（）[\]0-9A-Za-z.,;:—－・~〜]/g, '');
  if (body.length < 30) return false;
  const foreign = (body.match(/[぀-ゟ゠-ヿ가-힣]/g) || []).length;
  return foreign / body.length >= 0.30;
}
module.exports = { isForeignProse };
