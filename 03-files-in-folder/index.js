const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, items) => {
  if (err) console.log(err.message);
  else {
    items.forEach((item) => {
      if (!item.isDirectory()) {
        const result = [];
        const itemPath = path.join(__dirname, 'secret-folder', item.name);
        const extName = path.extname(itemPath).replace('.', '');
        const itemName = path.basename(itemPath).replace('.' + extName, '');
        fs.stat(itemPath, (err, stats) => {
          if (err) console.log(err.message);
          else {
            const fileSize = Number(stats.size / 1024).toFixed(3) + 'kB';
            result.push(itemName, extName, fileSize);
            console.log(result.join(' - '));
          }
        });
      }
    });
  }
});
