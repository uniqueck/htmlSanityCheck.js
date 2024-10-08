/* global describe it beforeEach */
'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire').noCallThru()
const referee = require('@sinonjs/referee')
const assert = referee.assert

describe('run handler', () => {
  let handler
  let createReportersMock
  let LoggerMock, HtmlSanityCheckMock, JUnitXmlReporterMock
  let loggerInstance, htmlSanityCheckInstance, jUnitXmlReporterInstance

  beforeEach(() => {
    loggerInstance = { info: sinon.stub() }
    htmlSanityCheckInstance = { performAllChecks: sinon.stub().resolves('results') }
    jUnitXmlReporterInstance = { reportFindings: sinon.stub().resolves() }

    LoggerMock = sinon.stub().returns(loggerInstance)
    HtmlSanityCheckMock = sinon.stub().returns(htmlSanityCheckInstance)
    JUnitXmlReporterMock = sinon.stub().returns(jUnitXmlReporterInstance)
    createReportersMock = sinon.stub().returns([jUnitXmlReporterInstance])

    handler = proxyquire('../../lib/cli/run', {
      '../logging/LoggingFacade': LoggerMock,
      '../allChecksRunner': HtmlSanityCheckMock,
      '../reporters/JUnitXmlReporter': JUnitXmlReporterMock,
      '../utils': { createReporters: createReportersMock },
      debug: () => sinon.stub()
    }).handler
  })

  it('should run all checks and create a report', async () => {
    const argv = {
      reporter: {
        junit: {
          outputPath: './test-results/htmlSanityCheck'
        }
      }
    }

    await handler(argv)

    assert(LoggerMock.calledWith(argv))
    assert(HtmlSanityCheckMock.calledWith(argv, loggerInstance))
    assert(htmlSanityCheckInstance.performAllChecks.calledOnce)
    assert(createReportersMock.calledWith(argv.reporter, loggerInstance))
    assert(jUnitXmlReporterInstance.reportFindings.calledWith('results'))
  })

  it('should handle errors', async () => {
    const argv = { reporter: 'someReporter' }
    const error = new Error('Test error')
    htmlSanityCheckInstance.performAllChecks.rejects(error)

    const exitStub = sinon.stub(process, 'exit')
    const consoleErrorStub = sinon.stub(console, 'error')

    await handler(argv)

    assert(consoleErrorStub.calledWith('\n Exception during run:', error))
    assert(exitStub.calledWith(1))

    exitStub.restore()
    consoleErrorStub.restore()
  })
})
