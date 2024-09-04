const fs = require('fs')

class SonarReporter {
  constructor (/* SinglePageResult[] */ resultsForAllPages, config, /* LoggingFacade */ logger) {
    this.resultsForAllPages = resultsForAllPages
    this.config = config
    this.outputPath = config.report.outputPath
    this.logger = logger
  }

  reportFindings () {
    this.logger.debug(`resultsForAllPages ${JSON.stringify(this.resultsForAllPages)}`)

    this.initReport()

    this.reportOverallSummary()

    this.reportAllPages()

    this.closeReport()
  }

  initReport () {
    this.logger.debug(`Creating Sonar report output path: ${this.outputPath}`)
    fs.mkdirSync(this.outputPath, { recursive: true })
  }
}

module.exports = { SonarReporter }
