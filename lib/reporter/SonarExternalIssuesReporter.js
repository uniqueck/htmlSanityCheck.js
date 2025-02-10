const fs = require('fs')
const ExternalIssuesReport = require('./sonar/ExternalIssuesReport')
const Reporter = require('./Reporter')
const path = require('path')

class SonarExternalIssuesReporter extends Reporter {
  constructor (/* SonarExternalIssuesReporterConfig */ config, /* LoggingFacade */ logger) {
    super(config, logger)
  }

  reportFindings (/* AllChecksResult */ allChecksResult) {
    this.initReport()

    const issues = []
    const externalIssuesReport = new ExternalIssuesReport(allChecksResult.sonarRules, issues)

    fs.writeFileSync(path.join(this.outputPath, 'sonar-issues.json'), JSON.stringify(externalIssuesReport))
  }

  initReport () {
    this.log.trace(`Creating Sonar external issues report output path: ${this.outputPath}`)
    fs.mkdirSync(this.outputPath, { recursive: true })
  }
}

module.exports = {
  createReporter: (/* SonarExternalIssuesReporterConfig */ config, /* LoggingFacade */ logger) => {
    return new SonarExternalIssuesReporter(config, logger)
  }
}