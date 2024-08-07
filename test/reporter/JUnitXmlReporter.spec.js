/* global describe beforeEach afterEach it */
'use strict'

const chai = require('chai')
const expect = chai.expect

const { JUnitXmlReporter, FILE_EXTENSION } = require('../../lib/reporter/JUnitXmlReporter.js')
const Logger = require('../../lib/logging/LoggingFacacde')
const fs = require('fs')
const { findFiles, cwd } = require('../../lib/utils')
const os = require('os')
const SingleCheckResult = require('../../lib/singleCheckResult')
const SinglePageResult = require('../../lib/singlePageResult')
const HtmlPage = require('../../lib/html/htmlPage')
const path = require('path')
const { XMLParser } = require('fast-xml-parser')

describe('JUnitXmlReporter', () => {
  let underTest
  let logger
  let tempDir
  let config
  let xmlParser

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'JUnitXmlReporter-'))
    config = {
      report: {
        outputPath: tempDir
      }
    }
    logger = new Logger(config)
    logger.info('Temporary output directory: ' + fs.realpathSync(tempDir))
    xmlParser = new XMLParser({ ignoreAttributes: false })
  })

  it('emptyReporter', function () {
    const resultsForAllPages = []
    underTest = new JUnitXmlReporter(resultsForAllPages, config, logger)
    underTest.reportFindings()
    expect(findFiles(tempDir, true, [FILE_EXTENSION]).length).to.equal(0)
  })

  it('zeroChecks', function () {
    const singleCheckResult = new SingleCheckResult()
    const testFilePath = path.join(cwd(), 'test', 'fixtures')
    const singlePageResult = new SinglePageResult(new HtmlPage({
      filePath: testFilePath,
      fileName: 'file-to-test.html'
    }))
    singlePageResult.addResultsForSingleCheck(singleCheckResult)
    const resultsForAllPages = [singlePageResult]
    underTest = new JUnitXmlReporter(resultsForAllPages, config, logger)
    underTest.addCheckingResultsForOnePage(singlePageResult)

    underTest.reportFindings()

    const reports = findFiles(tempDir, true, [FILE_EXTENSION])
    logger.info('Reports: ' + JSON.stringify(reports))
    expect(reports).has.lengthOf(1)

    const xmlContent = fs.readFileSync(path.join(reports[0].filePath, reports[0].fileName), 'utf-8')
    logger.info('Report content: ' + xmlContent)
    const parsedXml = xmlParser.parse(xmlContent)
    expect(parsedXml['?xml']).to.be.deep.equal({ '@_version': '1.0', '@_encoding': 'UTF-8' })
    expect(parsedXml).to.have.property('testsuite')
    expect(parsedXml.testsuite.testcase).to.be.deep.equal({
      '@_assertions': '0',
      '@_time': '0',
      '@_name': ''
    })
    // TODO should be assertEquals("expected no check", "0", testsuite.@tests.text())
    expect(parsedXml.testsuite['@_tests']).to.equal('0')
    expect(parsedXml.testsuite['@_failures']).to.equal('1')
    // TODO parsedXml should contain failures object: assertEquals("One testcase failures expected", 1, testsuite.testcase.failure.size())
  })

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true })
  })
})
