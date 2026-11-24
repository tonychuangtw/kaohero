// Material still awaiting its daily release stays out of Pages and R2.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const release = require('./release-queue.json');
const groups = [...(release.preparing || []), ...release.queue.filter(g => g.holdAssets)];
const hidden = new Set(groups.flatMap(g => g.pids));
const [pageList, imageList] = process.argv.slice(2);
const hiddenImages = new Set(), visibleImages = new Set();
if (hidden.size) {
  const dir = path.join(root, 'js/data/exam');
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) {
    global.window = {};
    require(path.join(dir, file));
    const pid = file.slice(0, -3);
    const images = hidden.has(pid) ? hiddenImages : visibleImages;
    for (const q of window.APP_EXAM_PAPERS[pid].qs) {
      if (q.fig) images.add(path.basename(q.fig));
    }
  }
}
fs.writeFileSync(pageList, [...hidden].map(pid => '/js/data/exam/' + pid + '.js\n').join(''));
fs.writeFileSync(imageList, [...hiddenImages].filter(f => !visibleImages.has(f)).sort().map(f => f + '\n').join(''));
