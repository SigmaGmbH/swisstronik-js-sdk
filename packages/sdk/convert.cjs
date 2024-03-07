const fs = require('fs');
const path = require('path');


const modulesToConvert = [
  'file-type', 
  'uint8arrays',
  'multiformats'
];

modulesToConvert.forEach((module) => {
  const modulePath = path.resolve('node_modules', module);
  const outputDir = path.resolve(__dirname, 'deps', module); 
  convertDirectory(modulePath, outputDir); 
});

function convertDirectory(dirPath, outputDir) {
  if (!fs.existsSync(outputDir)) { 
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const outputFilePath = path.join(outputDir, file); // Correct output path

    if (fs.statSync(filePath).isDirectory()) {
      convertDirectory(filePath, outputFilePath); 
    } else if (filePath.endsWith('.js')) {
      try { 
        const transformed = require("@babel/core").transformFileSync(filePath, {
          plugins: ["@babel/plugin-transform-modules-commonjs"],
        });
        // const transformed = transformFileSync(filePath, { babelrc: true, filename: filePath });
        fs.writeFileSync(outputFilePath, transformed.code);
        console.log(`Converted: ${filePath}`);
        console.log("To:",outputFilePath) // Should show the correct path in 'deps' 
      } catch (error) {
        console.error(`Error converting ${filePath}: ${error.message}`); 
      }
    }
  });
}