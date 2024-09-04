const fs = require('fs')
const ExternalIssuesReport = require('./sonar/ExternalIssuesReport')

class SonarExternalIssuesReporter {
  constructor (/* SinglePageResult[] */ resultsForAllPages, config, /* LoggingFacade */ logger, /* Checker[] */ checkers) {
    this.resultsForAllPages = resultsForAllPages
    this.config = config
    this.logger = logger
    this.checkers = checkers
  }

  reportFindings () {
    this.logger.debug(`resultsForAllPages ${JSON.stringify(this.resultsForAllPages)}`)

    this.initReport()

    const rules = []
    const issues = []
    const externalIssuesReport = new ExternalIssuesReport(rules, issues)

    this.checkers.forEach((checker) => {
      rules.push(checker.createSonarRule())
    })

    console.log(JSON.stringify(externalIssuesReport))
  }

  initReport () {
    const { report } = this.config
    const { outputPath } = report
    this.logger.debug(`Creating Sonar external issues report output path: ${outputPath}`)
    fs.mkdirSync(outputPath, { recursive: true })
  }
}

module.exports = SonarExternalIssuesReporter
