// Node.js script to update package.json
const fs = require('fs');
const packageJsonPath = 'bookshop-react-app/package.json';
let packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageData.homepage = "https://naguirre1.github.io/danger_room/";
if (!packageData.scripts) {
  packageData.scripts = {};
}
packageData.scripts.predeploy = "npm run build";
packageData.scripts.deploy = "gh-pages -d build";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));
console.log('package.json updated successfully.');
