// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require('./../package.json')

const cb = (err) => {
  if (err) throw err
}
// eslint-disable-next-line no-console
console.log('Copying README.md ...')
fs.copyFile('README.md', './dist/README.md', cb)
delete packageJSON.devDependencies
delete packageJSON.scripts
// eslint-disable-next-line no-console
console.log('Writing package.json ...')
fs.writeFile('./dist/package.json', JSON.stringify(packageJSON, null, '\t'), (err) => {
  if (err) {
    console.error(err)
  }
})
