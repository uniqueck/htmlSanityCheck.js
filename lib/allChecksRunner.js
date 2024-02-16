const fs = require('fs')
const path = require('path')
const HTMLParser = require('node-html-parser')
const HtmlPage = require('./html/htmlPage')
const SinglePageResult = require('./singlePageResult')

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
          const htmlPage = new HtmlPage(file.path, file.name)
          const singlePageResult = new SinglePageResult(htmlPage)

          const DuplicatedIdChecker = require('./checker/DuplicatedIdChecker')
          singlePageResult.addSingleCheckResult(new DuplicatedIdChecker(this.config).performCheck(htmlPage))
          const MissingAltInImageTagsChecker = require('./checker/MissingAltInImageTagsChecker')
          singlePageResult.addSingleCheckResult(new MissingAltInImageTagsChecker(this.config).performCheck(htmlPage))
          const MissingImageFilesCheckers = require('./checker/MissingImageFilesChecker')
          singlePageResult.addSingleCheckResult(new MissingImageFilesCheckers(this.config).performCheck(htmlPage))

          resultsForAllPages.push(singlePageResult)
        })
      } else {
        console.log(err)
      }
    })
  }
}

module.exports = AllChecksRunner
