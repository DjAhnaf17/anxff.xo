const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          if(file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
};

walk('./src', (err, results) => {
  if (err) throw err;
  results.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/accent-coral/g, 'accent-neon');
    content = content.replace(/text-coral/g, 'text-neon');
    content = content.replace(/Jawwad Ahnaf/g, 'anxff.xo');
    content = content.replace(/Jawwad_OS/g, 'anxff_OS');
    content = content.replace(/AHNAF PORTFOLIO/g, 'anxff.xo');
    content = content.replace(/Portfolio\./g, 'anxff.xo');
    fs.writeFileSync(file, content);
  });
  console.log('Done replacements');
});
