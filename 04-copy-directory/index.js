const fs = require('fs/promises');
const path = require('path');

const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');

const deleteAndCopy = async (dir) => {
  try {
    await fs.rm(dir, { recursive: true });
  } catch (err) {}
  copy(source, destination);
};

const copy = async (src, dest) => {
  const [items] = await Promise.all([fs.readdir(src, { withFileTypes: true }), fs.mkdir(dest, { recursive: true })]);

  await Promise.all(
    items.map((item) => {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);
      if (item.isDirectory()) {
        copy(srcPath, destPath);
      } else fs.copyFile(srcPath, destPath);
    })
  );
};

deleteAndCopy(destination);
