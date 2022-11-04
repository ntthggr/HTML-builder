const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) console.log(err.message);
  else {
    files.forEach((file) => {
      if (!file.isDirectory()) {
        const result = [];
        const pathToFile = path.join(__dirname, 'secret-folder', file.name);
        const extName = path.extname(pathToFile).replace('.', '');
        const fileName = path.basename(pathToFile).replace('.' + extName, '');
        fs.stat(pathToFile, (err, stats) => {
          if (err) console.log(err.message);
          else {
            const fileSize = Number(stats.size / 2000).toFixed(3) + 'kB';
            result.push(fileName, extName, fileSize);
            console.log(result.join(' - '));
          }
        });
      }
    });
  }
});
