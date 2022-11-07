const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const assetsSource = path.join(__dirname, 'assets');
const assetsDestination = path.join(__dirname, 'project-dist/assets');
const styleSource = path.join(__dirname, 'styles');
const styleDestination = path.join(__dirname, 'project-dist/style.css');
const templateSource = path.join(__dirname, 'template.html');
const componentsSource = path.join(__dirname, 'components');
const indexDestination = path.join(__dirname, 'project-dist/index.html');

const copyDir = async (src, dest) => {
  const [items] = await Promise.all([fsPromises.readdir(src, { withFileTypes: true }), fsPromises.mkdir(dest, { recursive: true })]);

  await Promise.all(
    items.map((item) => {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);
      if (item.isDirectory()) {
        copyDir(srcPath, destPath);
      } else fsPromises.copyFile(srcPath, destPath);
    })
  );
};

copyDir(assetsSource, assetsDestination);

fs.readdir(styleSource, { withFileTypes: true }, (err, items) => {
  if (err) console.log(err.message);
  else {
    const writeStyleStream = fs.createWriteStream(styleDestination);
    items.forEach((item) => {
      const itemPath = path.join(styleSource, item.name);
      const itemName = path.basename(itemPath);
      const extName = path.extname(itemPath);
      if (!item.isDirectory() && extName === '.css') {
        const readStream = fs.createReadStream(path.join(styleSource, itemName));
        readStream.pipe(writeStyleStream);
      }
    });
  }
});

fs.readdir(componentsSource, (err, items) => {
  if (err) console.log(err.message);
  else {
    fs.readFile(templateSource, 'utf8', (err, item) => {
      if (err) console.log(err.message);
      else {
        items.forEach((file) => {
          const extName = path.extname(file);
          if (extName === '.html') {
            const htmlTagName = path.join(componentsSource, `${file}`);
            fs.readFile(htmlTagName, (err, tag) => {
              if (err) console.log(err.message);
              else {
                const writeStream = fs.createWriteStream(indexDestination);
                item = item.replace(`{{${path.parse(htmlTagName).name}}}`, tag);
                writeStream.write(item);
              }
            });
          }
        });
      }
    });
  }
});
