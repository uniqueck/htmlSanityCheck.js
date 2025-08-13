/* global describe it */
'use strict'

const AllChecksRunner = require('../../lib/allChecksRunner.js')
const { cwd } = require('../../lib/utils')
const Logger = require('../../lib/logging/LoggingFacade')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
chai.use(dirtyChai)
const { expect } = chai

describe('allChecksRunner', () => {
  it('happyPath', async () => {
    const config = {
      sourceDir: `${cwd()}/test/fixtures`,
      traceLogging: false,
      recursive: true,
      extension: ['html', 'htm']
    }
    const logger = new Logger(config)
    const allChecksRunner = new AllChecksRunner(config, logger)
    const resultsForAllPages = await allChecksRunner.performAllChecks()

    // Basic structure assertions
    expect(resultsForAllPages).to.have.length(6)
    expect(resultsForAllPages).to.be.an('array')

    // Each result should be a SinglePageResult instance
    resultsForAllPages.forEach((result, index) => {
      expect(result, `Result ${index} should be an object`).to.be.an('object')
      expect(result).to.have.property('pageFilePath').that.is.a('string')
      expect(result).to.have.property('pageFileName').that.is.a('string')
      expect(result).to.have.property('pageTitle').that.is.a('string')
      expect(result).to.have.property('pageSize').that.is.a('number')
      expect(result).to.have.property('allCheckerResults').that.is.an('array')

      // Validate file paths exist and are meaningful
      expect(result.pageFilePath).to.not.be.empty()
      expect(result.pageFileName).to.not.be.empty()
      expect(result.pageSize).to.be.at.least(0)

      // Method existence checks
      expect(result).to.respondTo('nrOfItemsCheckedOnPage')
      expect(result).to.respondTo('nrOfFindingsOnPage')
      expect(result).to.respondTo('addResultsForSingleCheck')

      // Method return type checks
      expect(result.nrOfItemsCheckedOnPage()).to.be.a('number').and.at.least(0)
      expect(result.nrOfFindingsOnPage()).to.be.a('number').and.at.least(0)
    })

    // Aggregate checks - verify we processed expected files
    const fileNames = resultsForAllPages.map(result => result.pageFileName)
    expect(fileNames).to.include('file-to-test.html')
    expect(fileNames).to.include('brokenHttpLinksChecker_127_0_0_2.html')
    expect(fileNames).to.include('pageWithoutTitle.html')

    // Since no checkers are configured, all results should have empty checker results
    resultsForAllPages.forEach((result, index) => {
      expect(result.allCheckerResults, `Result ${index} should have empty checker results when no checkers configured`).to.be.empty()
      expect(result.nrOfItemsCheckedOnPage(), `Result ${index} should have 0 items checked when no checkers configured`).to.equal(0)
      expect(result.nrOfFindingsOnPage(), `Result ${index} should have 0 findings when no checkers configured`).to.equal(0)
    })

    // Verify specific file properties for known test files
    const fileToTest = resultsForAllPages.find(r => r.pageFileName === 'file-to-test.html')
    expect(fileToTest).to.exist()
    expect(fileToTest.pageTitle).to.not.be.empty()
    expect(fileToTest.pageSize).to.be.above(0)

    const pageWithoutTitle = resultsForAllPages.find(r => r.pageFileName === 'pageWithoutTitle.html')
    expect(pageWithoutTitle).to.exist()
    expect(pageWithoutTitle.pageTitle).to.be.empty() // This file should have no title
  })

  it('with checkers configured', async () => {
    const config = {
      sourceDir: `${cwd()}/test/fixtures`,
      traceLogging: false,
      recursive: true,
      extension: ['html', 'htm'],
      checker: [`${cwd()}/lib/checker/DuplicatedIdChecker.js`] // Add a simple checker with absolute path
    }
    const logger = new Logger(config)
    const allChecksRunner = new AllChecksRunner(config, logger)
    const resultsForAllPages = await allChecksRunner.performAllChecks()

    // Basic structure assertions (same as before)
    expect(resultsForAllPages).to.have.length(6)
    expect(resultsForAllPages).to.be.an('array')

    // With checkers configured, we should have checker results
    resultsForAllPages.forEach((result, index) => {
      expect(result.allCheckerResults, `Result ${index} should have checker results when checkers are configured`).to.not.be.empty()
      expect(result.allCheckerResults).to.have.length(1) // We configured one checker

      // Each checker result should be a SingleCheckResult
      const checkerResult = result.allCheckerResults[0]
      expect(checkerResult).to.have.property('whatIsChecked').that.is.a('string')
      expect(checkerResult).to.have.property('sourceItemName').that.is.a('string')
      expect(checkerResult).to.have.property('targetItemName').that.is.a('string')
      expect(checkerResult).to.have.property('generalRemark').that.is.a('string')
      expect(checkerResult).to.have.property('nrOfItemsChecked').that.is.a('number').and.at.least(0)
      expect(checkerResult).to.have.property('nrOfIssues').that.is.a('number').and.at.least(0)
      expect(checkerResult).to.have.property('findings').that.is.an('array')

      // The aggregated counts should match the individual checker results
      expect(result.nrOfItemsCheckedOnPage()).to.equal(checkerResult.nrOfItemsChecked)
      expect(result.nrOfFindingsOnPage()).to.equal(checkerResult.nrOfIssues)
    })
  })
})
