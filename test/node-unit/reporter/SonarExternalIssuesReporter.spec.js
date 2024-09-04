/* global describe it */
'use strict'

const SonarExternalIssuesReporter = require('../../../lib/reporter/SonarExternalIssuesReporter.js')
const { cwd } = require('../../../lib/utils')
const LoggingFacade = require('../../../lib/logging/LoggingFacacde')
const fs = require('fs')
const path = require('path')
const os = require('os')

describe('SonarExternalIssuesReporter', () => {
  it('happyPath', () => {
    const outputPath = fs.mkdtempSync(path.join(os.tmpdir(), 'SonarExternalIssuesReporter-'))
    const checkers = []
    const config = { sourceDir: `${cwd()}/test/fixtures`, traceLogging: true, report: { outputPath } }
    const logger = new LoggingFacade(config)
    checkers.push(require('../../../lib/checker/BrokenHttpLinksChecker').createChecker(config, logger))
    const resultsForAllPages = []
    console.log(JSON.stringify(config))
    const sonarExternalIssuesReporter = new SonarExternalIssuesReporter(resultsForAllPages, config, logger, checkers)
    sonarExternalIssuesReporter.reportFindings()
  })
})
