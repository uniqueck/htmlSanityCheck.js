/* global describe it */
'use strict'

const { createReporter } = require('../../../lib/reporter/SonarExternalIssuesReporter.js')
const { cwd } = require('../../../lib/utils')
const LoggingFacade = require('../../../lib/logging/LoggingFacade')
const fs = require('fs')
const path = require('path')
const os = require('os')

describe('SonarExternalIssuesReporter', () => {
  it('happyPath', () => {    
    const outputPath = fs.mkdtempSync(path.join(os.tmpdir(), 'SonarExternalIssuesReporter-'))
    const checkers = []
    const config = { sourceDir: `${cwd()}/test/fixtures`, traceLogging: false, reporter: { sonar: { outputPath, enabled: true } } }    
    const logger = new LoggingFacade(config)
    checkers.push(require('../../../lib/checker/BrokenHttpLinksChecker').createChecker(config, logger))
    const resultsForAllPages = []    
    const sonarExternalIssuesReporter = createReporter(config.reporter.sonar, logger)
    sonarExternalIssuesReporter.reportFindings(resultsForAllPages)
  })
})
