/* global describe it */
'use strict'

const AllChecksRunner = require('../../lib/allChecksRunner.js')
const { cwd } = require('../../lib/utils')

describe('allChecksRunner', () => {
  it('happyPath', () => {
    const config = { sourceDir: `${cwd()}/test/fixtures` }
    const allChecksRunner = new AllChecksRunner(config)
    allChecksRunner.performAllChecks()
  })
})
