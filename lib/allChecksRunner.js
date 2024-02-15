const fs = require('fs')
const path = require('path')
const HTMLParser = require('node-html-parser')

class AllChecksRunner {
  constructor (config) {
    this.config = config
  }

  performAllChecks () {
    const resultsForAllPages = []

    fs.readdir(this.config.sourceDir, { recursive: true, withFileTypes: true }, (err, files) => {
      if (!err) {
        files.filter((file) => {
          return file.isFile() && file.name.toLowerCase().endsWith('.html')
        }).forEach((file) => {
          fs.readFile(path.join(file.path, file.name), (err, content) => {
            if (!err) {
              const htmlContent = HTMLParser.parse(content)
              const pageFilePath = path.join(file.path, file.name)
              const pageFileName = file.name
              const pageSize = fs.statSync(pageFilePath).size
              const pageTitle = htmlContent.querySelector('html head title').innerHTML
              const allCheckerResults = []

              const singlePageResult = { pageFilePath, pageFileName, pageTitle, pageSize, allCheckerResults }

              const DuplicatedIdChecker = require('./checker/DuplicatedIdChecker')
              const singleCheckResult = new DuplicatedIdChecker(this.config).performCheck(htmlContent)
              singlePageResult.allCheckerResults.push(singleCheckResult)
              resultsForAllPages.push(singlePageResult)
              console.log(singlePageResult)
            }
          })
        })
      } else {
        console.log(err)
      }
    })
  }
}

module.exports = AllChecksRunner
