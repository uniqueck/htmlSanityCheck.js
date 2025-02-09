const fs = require('fs')
const ExternalIssuesReport = require('./sonar/ExternalIssuesReport')
const Reporter = require('./Reporter')
const path = require('path')

class SonarExternalIssuesReporter extends Reporter {
  reportFindings (/* AllChecksResult */ allChecksResult) {
    this.log.debug(`resultsForAllPages ${JSON.stringify(allChecksResult)}`)
    const { outputPath } = this.config
    this.initReport()

    const issues = []
    const externalIssuesReport = new ExternalIssuesReport(allChecksResult.sonarRules, issues)

    fs.writeFileSync(path.join(outputPath, 'sonar-issues.json'), JSON.stringify(externalIssuesReport))
  }

  initReport () {
    const { outputPath } = this.config
    this.log.debug(`Creating Sonar external issues report output path: ${outputPath}`)
    fs.mkdirSync(outputPath, { recursive: true })
  }
}

module.exports = SonarExternalIssuesReporter
