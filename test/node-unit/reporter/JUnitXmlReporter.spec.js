/* global describe beforeEach afterEach it */
'use strict'

const chai = require('chai')
const expect = chai.expect

const Logger = require('../../../lib/logging/LoggingFacade')
const fs = require('fs')
const { findFiles, cwd } = require('../../../lib/utils')
const os = require('os')
const SingleCheckResult = require('../../../lib/singleCheckResult')
const SinglePageResult = require('../../../lib/singlePageResult')
const HtmlPage = require('../../../lib/html/htmlPage')
const HTMLParser = require('node-html-parser')
const path = require('path')
const { XMLParser } = require('fast-xml-parser')
const Finding = require('../../../lib/finding')
const { createReporter } = require('../../../lib/reporter/JUnitXmlReporter')

describe('JUnitXmlReporter', () => {
  let underTest
  let logger
  let tempDir
  let reporterConfig
  let xmlParser

  const testFilePath = path.join(cwd(), 'test', 'fixtures')

  const createResultsForAllPages = function (/* SingleCheckResult */ singleCheckResult) {
    const resultsForAllPages = []
    const singlePageResult = new SinglePageResult(new HtmlPage({
      filePath: testFilePath,
      fileName: 'file-to-test.html'
    }))
    singlePageResult.addResultsForSingleCheck(singleCheckResult)
    resultsForAllPages.push(singlePageResult)
    return resultsForAllPages
  }

  const createReport = function (/* SinglePageResult[] */ resultsForAllPages) {
    underTest.reportFindings(resultsForAllPages)

    const reports = findFiles(tempDir, true, ['xml'])
    logger.trace('Reports: ' + JSON.stringify(reports))
    expect(reports).has.lengthOf(1)

    const xmlContent = fs.readFileSync(path.join(reports[0].filePath, reports[0].fileName), 'utf-8')
    logger.trace('Report content: ' + xmlContent)
    return xmlParser.parse(xmlContent)
  }

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'JUnitXmlReporter-test-'))
    reporterConfig = {
      outputPath: tempDir
    }
    logger = new Logger({ traceLogging: false })
    logger.trace('Temporary output directory: ' + fs.realpathSync(tempDir))
    xmlParser = new XMLParser({ ignoreAttributes: false })
    underTest = createReporter(reporterConfig, logger)
  })

  it('emptyReporter', function () {
    const resultsForAllPages = []
    underTest = createReporter(reporterConfig, logger)
    underTest.reportFindings(resultsForAllPages)

    expect(findFiles(tempDir, true, ['xml']).length).to.equal(0)
  })

  it('fileName', function () {
    const singlePageResult = new SinglePageResult(new HtmlPage({
      filePath: null,
      fileName: 'file-to-test.html',
      content: HTMLParser.parse('<html><head><title>testTitle</title></head><body></body></html>')
    }))
    singlePageResult.addResultsForSingleCheck(new SingleCheckResult())
    const resultsForAllPages = [singlePageResult]

    underTest = createReporter(reporterConfig, logger)
    underTest.reportFindings(resultsForAllPages)

    const expectedFiles = findFiles(tempDir, true, ['xml'])
    expect(expectedFiles.length).to.equal(1)
    expect(/^TEST-unit-html-[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}.xml$/i.test(expectedFiles[0].fileName)).to.equal(true)
  })

  it('zeroChecks', function () {
    const resultsForAllPages = createResultsForAllPages(new SingleCheckResult())

    const parsedXml = createReport(resultsForAllPages)

    expect(parsedXml['?xml']).to.be.deep.equal({ '@_version': '1.0', '@_encoding': 'UTF-8' })
    expect(parsedXml).to.have.property('testsuite')
    expect(parsedXml.testsuite['@_tests']).to.equal('0')
    expect(parsedXml.testsuite['@_failures']).to.equal('0')
    expect(parsedXml.testsuite['@_errors']).to.equal('0')
    expect(parsedXml.testsuite['@_name']).to.equal('file-to-test.html: Test File for HTML Sanity Check')
    expect(parsedXml.testsuite.testcase).to.be.deep.equal({
      '@_assertions': '0',
      '@_time': '0',
      '@_name': 'unknown whatIsChecked'
    })
  })

  it('singleFindingWithoutChecks', function () {
    const singleCheckResult = new SingleCheckResult()
    const numberOfOccurrences = 3
    const suggestions = ['suggestion #1', 'suggestion #2']
    const finding = new Finding('The problem is.. ', numberOfOccurrences, suggestions)
    singleCheckResult.addFinding(finding)
    const resultsForAllPages = createResultsForAllPages(singleCheckResult)

    const parsedXml = createReport(resultsForAllPages)

    expect(parsedXml['?xml']).to.be.deep.equal({ '@_version': '1.0', '@_encoding': 'UTF-8' })
    expect(parsedXml).to.have.property('testsuite')
    expect(parsedXml.testsuite['@_tests']).to.equal('0')
    expect(parsedXml.testsuite['@_failures']).to.equal('1')
    expect(parsedXml.testsuite['@_errors']).to.equal('0')
    expect(parsedXml.testsuite['@_name']).to.equal('file-to-test.html: Test File for HTML Sanity Check')
    expect(parsedXml.testsuite.testcase).to.be.deep.equal({
      '@_assertions': '0',
      '@_time': '0',
      '@_name': 'unknown whatIsChecked',
      failure: {
        '#text': 'suggestion #1, suggestion #2',
        '@_message': 'The problem is..',
        '@_type': 'unknown sourceItemName - unknown targetItemName'
      }
    })
  })

  it('oneFindingOneCheck', function () {
    const singleCheckResult = new SingleCheckResult()
    const numberOfOccurrences = 3
    const suggestions = ['suggestion #1', 'suggestion #2']
    const finding = new Finding('The problem is.. ', numberOfOccurrences, suggestions)
    singleCheckResult.whatIsChecked = 'singleFindingWithoutChecks'
    singleCheckResult.addFinding(finding)
    singleCheckResult.incNrOfItemsChecked()
    const resultsForAllPages = createResultsForAllPages(singleCheckResult)

    const parsedXml = createReport(resultsForAllPages)

    expect(parsedXml['?xml']).to.be.deep.equal({ '@_version': '1.0', '@_encoding': 'UTF-8' })
    expect(parsedXml).to.have.property('testsuite')
    expect(parsedXml.testsuite['@_tests']).to.equal('1')
    expect(parsedXml.testsuite['@_failures']).to.equal('1')
    expect(parsedXml.testsuite['@_errors']).to.equal('0')
    expect(parsedXml.testsuite['@_name']).to.equal('file-to-test.html: Test File for HTML Sanity Check')
    expect(parsedXml.testsuite.testcase).to.be.deep.equal({
      '@_assertions': '1',
      '@_time': '0',
      '@_name': 'singleFindingWithoutChecks',
      failure: {
        '#text': 'suggestion #1, suggestion #2',
        '@_message': 'The problem is..',
        '@_type': 'unknown sourceItemName - unknown targetItemName'
      }
    })
  })

  it('oneFindingTenChecks', function () {
    const singleCheckResult = new SingleCheckResult()
    const numberOfOccurrences = 3
    const suggestions = ['suggestion #1', 'suggestion #2']
    const finding = new Finding('The problem is.. ', numberOfOccurrences, suggestions)
    singleCheckResult.addFinding(finding)
    singleCheckResult.setNrOfChecks(10)
    const resultsForPages = createResultsForAllPages(singleCheckResult)

    const parsedXml = createReport(resultsForPages)

    expect(parsedXml['?xml']).to.be.deep.equal({ '@_version': '1.0', '@_encoding': 'UTF-8' })
    expect(parsedXml).to.have.property('testsuite')
    expect(parsedXml.testsuite['@_tests']).to.equal('10')
    expect(parsedXml.testsuite['@_failures']).to.equal('1')
    expect(parsedXml.testsuite['@_errors']).to.equal('0')
    expect(parsedXml.testsuite['@_name']).to.equal('file-to-test.html: Test File for HTML Sanity Check')
    expect(parsedXml.testsuite.testcase).to.be.deep.equal({
      '@_assertions': '10',
      '@_time': '0',
      '@_name': 'unknown whatIsChecked',
      failure: {
        '#text': 'suggestion #1, suggestion #2',
        '@_message': 'The problem is..',
        '@_type': 'unknown sourceItemName - unknown targetItemName'
      }
    })
  })

  it('threeFindingTenChecks', function () {
    const singleCheckResult = new SingleCheckResult()
    const numberOfOccurrences = 3
    const suggestions = ['suggestion #1', 'suggestion #2']
    for (let i = 1; i <= 3; i++) {
      const finding = new Finding(`Finding #${i}`, numberOfOccurrences, suggestions)
      singleCheckResult.addFinding(finding)
    }
    singleCheckResult.whatIsChecked = 'threeFindingTenChecks'
    singleCheckResult.setNrOfChecks(10)
    const resultsForAllPages = createResultsForAllPages(singleCheckResult)

    const parsedXml = createReport(resultsForAllPages)

    expect(parsedXml['?xml']).to.be.deep.equal({ '@_version': '1.0', '@_encoding': 'UTF-8' })
    expect(parsedXml).to.have.property('testsuite')
    expect(parsedXml.testsuite['@_tests']).to.equal('10')
    expect(parsedXml.testsuite['@_failures']).to.equal('3')
    expect(parsedXml.testsuite['@_errors']).to.equal('0')
    expect(parsedXml.testsuite['@_name']).to.equal('file-to-test.html: Test File for HTML Sanity Check')
    expect(parsedXml.testsuite.testcase).to.be.deep.equal({
      '@_assertions': '10',
      '@_time': '0',
      '@_name': 'threeFindingTenChecks',
      failure: [
        {
          '#text': 'suggestion #1, suggestion #2',
          '@_message': 'Finding #1',
          '@_type': 'unknown sourceItemName - unknown targetItemName'
        },
        {
          '#text': 'suggestion #1, suggestion #2',
          '@_message': 'Finding #2',
          '@_type': 'unknown sourceItemName - unknown targetItemName'
        },
        {
          '#text': 'suggestion #1, suggestion #2',
          '@_message': 'Finding #3',
          '@_type': 'unknown sourceItemName - unknown targetItemName'
        }
      ]
    })
  })

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true })
  })
})
