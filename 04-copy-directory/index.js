const fs = require('fs/promises');
const path = require('path');

const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');

const copyDir = async (src, dest) => {
  const [items] = await Promise.all([fs.readdir(src, { withFileTypes: true }), fs.mkdir(dest, { recursive: true })]);

  await Promise.all(
    items.map((item) => {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);
      if (item.isDirectory()) {
        copyDir(srcPath, destPath);
      } else fs.copyFile(srcPath, destPath);
    })
  );
};

copyDir(source, destination);
