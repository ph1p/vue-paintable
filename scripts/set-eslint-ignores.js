const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');

fs.readdir(distPath, (err, files) => {
  files.forEach(file => {
    const currentFilePath = path.join(distPath, file);
    const data = fs.readFileSync(currentFilePath, 'utf-8');

    if (!data.startsWith('/* eslint-disable */')) {
      const newFile = `/* eslint-disable */${data}/* eslint-enable */
`;
      fs.writeFileSync(currentFilePath, newFile, 'utf-8');

      console.log(currentFilePath);
    } else {
      console.log('already set', currentFilePath);
    }
  });
});
