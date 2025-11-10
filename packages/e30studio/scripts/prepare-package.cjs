const fs = require('fs')
const path = require('node:path')

const packagePath = path.resolve(__dirname, '../package.json')
const distDir = path.resolve(__dirname, '../dist')
const packageJSON = require(packagePath)

const cb = (err) => {
  if (err) throw err
}

console.log('Copying README.md ...')
fs.copyFile(path.resolve(__dirname, '../../../README.md'), path.join(distDir, 'README.md'), cb)
fs.copyFile(path.resolve(__dirname, '../LICENSE'), path.join(distDir, 'LICENSE'), cb)

delete packageJSON.devDependencies
delete packageJSON.scripts

console.log('Writing package.json ...')
const packageText = JSON.stringify(packageJSON, null, '\t').replace(/\.\/dist\//g, './')

fs.writeFile(path.join(distDir, 'package.json'), packageText, (err) => {
  if (err) {
    console.error(err)
  }
})
