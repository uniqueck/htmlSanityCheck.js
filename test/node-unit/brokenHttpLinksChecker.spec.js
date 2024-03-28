/* global describe afterEach beforeEach it */
'use strict'

const sinon = require('sinon')
const chai = require('chai')
const BrokenHttpLinksChecker = require('../../lib/checker/BrokenHttpLinksChecker.js')
const HtmlPage = require('../../lib/html/htmlPage.js')
const { cwd } = require('../../lib/utils')

describe('BrokenHttpLinksChecker', () => {
  it('happyPath', () => {
    const config = { sourceDir: `${cwd()}/test/fixtures` }
    const sut = new BrokenHttpLinksChecker(config)
    const singleCheckResult = sut.performCheck(new HtmlPage(`${cwd()}/test/fixtures/sub_dr`, 'brokenHttpLinksChecker.html'))
    console.log(singleCheckResult)
  })
})
