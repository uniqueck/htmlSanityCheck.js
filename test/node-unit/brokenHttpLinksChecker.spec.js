/* global describe afterEach beforeEach it */
'use strict'

const sinon = require('sinon')
const chai = require('chai')
const BrokenHttpLinksChecker = require('../../lib/checker/BrokenHttpLinksChecker.js')
const HtmlPage = require('../../lib/html/htmlPage.js')
const { cwd } = require('../../lib/utils')
const HttpRequestMock = require('http-request-mock')
const mocker = HttpRequestMock.setup()

describe('BrokenHttpLinksChecker', () => {
  it('happyPath', () => {
    mocker.mock({
      url: 'https://some.api.com/name',
      method: 'head', // get, post, put, patch or delete
      delay: 0,
      status: 307,
      headers: { // respone headers
        'location': 'http://localhost/200',
      },
    })

    const LoggingFacade = require('../../lib/logging/LoggingFacacde')
    const config = { sourceDir: `${cwd()}/test/fixtures` }
    const sut = BrokenHttpLinksChecker.createChecker(config, new LoggingFacade())
    const singleCheckResult = sut.performCheck(new HtmlPage({filePath:`${cwd()}/test/fixtures/sub_dr`, fileName:'brokenHttpLinksChecker.html'}))
    console.log(singleCheckResult)
  })
})
