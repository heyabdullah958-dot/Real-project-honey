const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/assets/products');

fs.readdirSync(dir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.png' || ext === '.jpeg' || ext === '.jpg') {
    const filePath = path.join(dir, file);
    const newFileName = path.basename(file, ext) + '.webp';
    const newFilePath = path.join(dir, newFileName);
    
    sharp(filePath)
      .webp({ quality: 90 })
      .toFile(newFilePath)
      .then(info => {
        console.log(`Converted ${file} to ${newFileName} (Size: ${info.size} bytes)`);
        fs.unlinkSync(filePath); // delete original
      })
      .catch(err => {
        console.error(`Error converting ${file}:`, err);
      });
  }
});
