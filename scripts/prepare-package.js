const fs = require('fs')
const packageJSON = require('./../package.json')

const cb = (err) => {
  if (err) throw err
}
// eslint-disable-next-line no-console
console.log('Copying README.md ...')
fs.copyFile('README.md', './dist/README.md', cb)
fs.copyFile('LICENSE', './dist/LICENSE', cb)
delete packageJSON.devDependencies
delete packageJSON.scripts
// eslint-disable-next-line no-console
console.log('Writing package.json ...')
fs.writeFile('./dist/package.json', JSON.stringify(packageJSON, null, '\t'), (err) => {
  if (err) {
    console.error(err)
  }
})
