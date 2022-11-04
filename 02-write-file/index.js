const fs = require('fs');
const path = require('path');
const { stdout } = process;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Type your message...\n');

rl.on('line', (text) => {
  if (text.toString().trim() === 'exit') {
    console.log('ヾ(^_^) byebye!!');
    process.exit();
  } else {
    writeStream.write(text + '\n');
  }
});

rl.on('SIGINT', () => {
  console.log('ヾ(^_^) byebye!!');
  process.exit();
});
