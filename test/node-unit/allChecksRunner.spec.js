/* global describe it */
'use strict'

const AllChecksRunner = require('../../lib/allChecksRunner.js')
const { cwd } = require('../../lib/utils')
const Logger = require('../../lib/logging/LoggingFacade')

describe('allChecksRunner', () => {
  it('happyPath', () => {
    const config = {
      sourceDir: `${cwd()}/test/fixtures`,
      traceLogging: 'false'
    }
    const logger = new Logger(config)
    const allChecksRunner = new AllChecksRunner(config, logger)
    allChecksRunner.performAllChecks()
  })
})
