const HtmlPage = require('./html/htmlPage')
const SinglePageResult = require('./singlePageResult')
const { createChecker, findFiles } = require('./utils')
const AllChecksResult = require('./allChecksResult')

class AllChecksRunner {
  constructor (config, /* LoggingFacade */ logger) {
    this.config = config
    this.logger = logger
  }

  async performAllChecks () {
    const checkers = createChecker(this.config.checkers)
    const sonarRules = checkers.map(checker => checker.createSonarRule())
    const allChecksResult = new AllChecksResult(sonarRules)
    const files = findFiles(this.config.sourceDir, this.config.recursive, this.config.extension)
    files.forEach((file) => {
      const htmlPage = new HtmlPage({ filePath: file.filePath, fileName: file.fileName })
      const singlePageResult = new SinglePageResult(htmlPage)

      checkers.forEach((checker) => {
        const singleCheckResult = checker.performCheck(htmlPage)
        singlePageResult.addSingleCheckResult(singleCheckResult)
      })

      allChecksResult.addSinglePageResult(singlePageResult)
    })
    return allChecksResult.resultsForAllPages
  }
}

module.exports = AllChecksRunner
