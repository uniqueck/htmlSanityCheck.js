/* global describe it beforeEach afterEach */
'use strict'

const { findFiles, cwd, createReporters } = require('../../lib/utils')
const chai = require('chai')
const path = require('path')
const fs = require('fs')
const os = require('os')
const Logger = require('../../lib/logging/LoggingFacade')
const SinglePageResult = require('../../lib/singlePageResult')
const HtmlPage = require('../../lib/html/htmlPage')
const SingleCheckResult = require('../../lib/singleCheckResult')
const expect = chai.expect

describe('findFiles', () => {
  it('non recursive', () => {
    const files = findFiles(`${cwd()}/test/fixtures`, false, ['html'])
    expect(files).to.have.lengthOf(1)
    expect(files).has.deep.members([
      { filePath: path.join(cwd(), 'test', 'fixtures'), fileName: 'file-to-test.html' }
    ])
  })
  it('recursive', () => {
    const files = findFiles(`${cwd()}/test/fixtures`, true, ['html'])
    expect(files).to.have.lengthOf(6)
    expect(files).has.deep.members([
      { filePath: path.join(cwd(), 'test', 'fixtures'), fileName: 'file-to-test.html' },
      { filePath: path.join(cwd(), 'test', 'fixtures', 'html-files'), fileName: 'brokenHttpLinksChecker_127_0_0_2.html' },
      { filePath: path.join(cwd(), 'test', 'fixtures', 'html-files'), fileName: 'brokenHttpLinksChecker_github.com.html' },
      { filePath: path.join(cwd(), 'test', 'fixtures', 'html-files'), fileName: 'brokenHttpLinksChecker_localhost.html' },
      { filePath: path.join(cwd(), 'test', 'fixtures', 'html-files'), fileName: 'pageWithoutTitle.html' },
      { filePath: path.join(cwd(), 'test', 'fixtures', 'html-files', 'sub_dr'), fileName: 'brokenHttpLinksChecker.html' }
    ])
  })
  it('empty extensions', () => {
    const files = findFiles(`${cwd()}/test/fixtures`, true, [])
    expect(files).to.have.lengthOf(0)
  })
})

describe('createReporters', () => {
  let logger
  let tempDir
  let config

  const testFilePath = path.join(cwd(), 'test', 'fixtures')

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'JUnitXmlReporter-test-'))
    logger = new Logger({ traceLogging: false })
    logger.trace('Temporary output directory: ' + fs.realpathSync(tempDir))
  })

  it('withJUnitXmlReporter enabled', function () {
    config = {
      sourceDir: `${cwd()}/test/fixtures`,
      reporter: {
        junit: {
          outputPath: tempDir,
          enabled: true
        }
      }
    }

    const createdReporters = createReporters(config.reporter, logger)

    const singlePageResult = new SinglePageResult(new HtmlPage({
      filePath: testFilePath,
      fileName: 'file-to-test.html'
    }))
    singlePageResult.addResultsForSingleCheck(new SingleCheckResult())
    const resultsForAllPages = [singlePageResult]

    createdReporters.forEach(/* Reporter */ reporter => reporter.reportFindings(resultsForAllPages))

    const reports = findFiles(tempDir, true, ['xml'])
    logger.trace('Reports: ' + JSON.stringify(reports))
    expect(reports).has.lengthOf(1)
  })

  it('withJUnitXmlReporter disabled', function () {
    config = {
      sourceDir: `${cwd()}/test/fixtures`,
      reporter: {
        junit: {
          outputPath: tempDir,
          enabled: false
        }
      }
    }

    const createdReporters = createReporters(config.reporter, logger)
    expect(createdReporters).has.lengthOf(0)
  })

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true })
  })
})
