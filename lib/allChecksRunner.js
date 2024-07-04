const fs = require('fs')
const HtmlPage = require('./html/htmlPage')
const SinglePageResult = require('./singlePageResult')
const Logger = require('./logging/LoggingFacacde')

class AllChecksRunner {
  constructor (config) {
    this.config = config
    this.logger = new Logger(config)
  }

  async performAllChecks () {
    const resultsForAllPages = []

    fs.readdir(this.config.sourceDir, { recursive: this.config.recursive, withFileTypes: true }, (err, files) => {
      if (!err) {
        files.filter((file) => {
          return file.isFile() && file.name.toLowerCase().endsWith('.html')
        }).forEach((file) => {
          const singlePageResult = this.performCheckForOneFile(file)
          resultsForAllPages.push(singlePageResult)
        })
      } else {
        console.log(err)
      }
    })
    return resultsForAllPages
  }

  performCheckForOneFile (file) {
    const htmlPage = new HtmlPage({ filePath: file.parentPath, fileName: file.name })
    const singlePageResult = new SinglePageResult(htmlPage)

    const { checker = [] } = this.config

    checker.forEach((checkerPath) => {
      const singleCheckResult = require(checkerPath).createChecker(this.config, this.logger).performCheck(htmlPage)
      singlePageResult.addSingleCheckResult(singleCheckResult)
    })

    return singlePageResult
  }
}

module.exports = AllChecksRunner
