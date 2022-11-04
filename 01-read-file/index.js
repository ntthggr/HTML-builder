const fs = require('fs');
const path = require('path');

const ReadStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
ReadStream.on('data', (chunk) => {
  console.log(chunk.toString());
});
