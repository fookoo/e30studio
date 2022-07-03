const fs = require('fs')
const fse = require('fs-extra')

fse.copy('dist/', './', function (err) {
  if (err) {
    console.error(err)
  } else {
    console.log('success!')
  }
})
