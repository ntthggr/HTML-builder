const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'styles');
const destination = path.join(__dirname, 'project-dist/bundle.css');
const writeStream = fs.createWriteStream(destination);

fs.readdir(source, { withFileTypes: true }, (err, items) => {
  if (err) console.log(err.message);
  else {
    items.forEach((item) => {
      const itemPath = path.join(source, item.name);
      const itemName = path.basename(itemPath);
      const extName = path.extname(itemPath);
      if (!item.isDirectory() && extName === '.css') {
        const readStream = fs.createReadStream(path.join(source, itemName));
        readStream.pipe(writeStream);
      }
    });
  }
});
