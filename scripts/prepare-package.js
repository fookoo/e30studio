const fs = require('fs')
const packageJSON = require('./../package.json')
const cb = (err) => {
  if (err) throw err
}

fs.copyFile('README.md', './dist/README.md', cb)
delete packageJSON.devDependencies
delete packageJSON.scripts
fs.writeFile('./dist/package.json', JSON.stringify(packageJSON, null, '\t'), (err) => {
  if (err) {
    console.error(err)
  }
})
