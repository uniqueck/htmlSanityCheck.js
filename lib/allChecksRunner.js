const HtmlPage = require('./html/htmlPage')
const SinglePageResult = require('./singlePageResult')

class AllChecksRunner {
  constructor (config, /* LoggingFacade */ logger) {
    this.config = config
    this.logger = logger
  }

  async performAllChecks () {
    const resultsForAllPages = []

    const files = require('./utils').findFiles(this.config.sourceDir, this.config.recursive, this.config.extension)
    files.forEach((file) => {
      const singlePageResult = this.performCheckForOneFile(file)
      resultsForAllPages.push(singlePageResult)
    })
    return resultsForAllPages
  }

  performCheckForOneFile (file) {
    const htmlPage = new HtmlPage({ filePath: file.filePath, fileName: file.fileName })
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
