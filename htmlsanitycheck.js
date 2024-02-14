
const fs = require('fs')

function getFiles (dir, files_) {
  files_ = files_ || []
  const files = fs.readdirSync(dir)
  for (const i in files) {
    const name = dir + '/' + files[i]
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_)
    } else {
      files_.push(name)
    }
  }
  return files_
}

function getArgs () {
  const args = {}
  process.argv
    .slice(2, process.argv.length)
    .forEach(arg => {
      // long arg
      if (arg.slice(0, 2) === '--') {
        const longArg = arg.split('=')
        const longArgFlag = longArg[0].slice(2, longArg[0].length)
        args[longArgFlag] = longArg.length > 1 ? longArg[1] : true
      }
      // flags
      else if (arg[0] === '-') {
        const flags = arg.slice(1, arg.length).split('')
        flags.forEach(flag => {
          args[flag] = true
        })
      }
    })
  return args
}
const args = getArgs()
console.log(args)
