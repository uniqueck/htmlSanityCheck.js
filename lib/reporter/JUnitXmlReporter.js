const FILE_EXTENSION = 'xml'
const { create } = require('xmlbuilder2')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

class JUnitXmlReporter {

  constructor (/* SinglePageResult[] */ resultsForAllPages, config, /* LoggingFacade */ logger) {
    this.resultsForAllPages = resultsForAllPages
    this.config = config
    this.outputPath = config.report.outputPath
    this.log = logger
    this.createdOnDate = new Date().toISOString()
    // put a date here https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/Reporter.groovy#L29
  }

  reportFindings () {
    this.log.info(`resultsForAllPages ${JSON.stringify(this.resultsForAllPages)}`)

    this.initReport()

    this.reportOverallSummary()

    this.reportAllPages()

    this.closeReport()
  }

  initReport () {
    this.log.info(`Creating JUnit XML report output path: ${this.outputPath}`)
    fs.mkdirSync(this.outputPath, { recursive: true })
  }

  reportOverallSummary () {
    // https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/JUnitXmlReporter.groovy#L50
    // empty in original impl
  }

  reportAllPages () {
    // https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/Reporter.groovy#L73
    this.resultsForAllPages.forEach(pageResult => {
      this.reportPageSummary(pageResult)
      this.reportPageDetails(pageResult)
      this.reportPageFooter()
    })
  }

  reportPageSummary (/* SinglePageResult */ pageResult) {
    // https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/JUnitXmlReporter.groovy#L54
    // Determine the name based on available properties or generate a UUID
    const name = pageResult.pageFilePath || pageResult.pageTitle || uuidv4()
    const sanitizedPath = name.replace(/[^A-Za-z0-9_-]+/g, '_')
    const testOutputFileName = `TEST-unit-html-${sanitizedPath}.${FILE_EXTENSION}`
    const testOutputFilePath = path.join(this.outputPath, testOutputFileName)

    // Initialize the XML document
    const doc = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('testsuite', {
        tests: pageResult.nrOfItemsCheckedOnPage(),
        failures: pageResult.nrOfFindingsOnPage(),
        errors: 0,
        time: 0,
        name: name
      })

    // Add test cases
    pageResult.allCheckerResults?.forEach(singleCheckResult => {
      const testcase = doc.ele('testcase', {
        assertions: singleCheckResult.nrOfItemsChecked,
        time: 0,
        name: singleCheckResult.whatIsChecked || ''
      })

      singleCheckResult.findings.forEach(finding => {
        testcase.ele('failure', {
          type: [singleCheckResult.sourceItemName, singleCheckResult.targetItemName].filter(Boolean).join(' - '),
          message: finding.whatIsTheProblem
        }).txt(finding.suggestions?.join(', ') || '')
      })
    })

    // Convert the document to string
    const xmlString = doc.end({ prettyPrint: true })

    // Write the XML string to a file
    this.log.info(`Writing JUnit XML report to ${testOutputFilePath}`)
    fs.writeFileSync(testOutputFilePath, xmlString)
  }

  reportPageDetails (/* SinglePageResult */ pageResult) {
    pageResult.allCheckerResults.forEach(resultForOneCheck => {
      this.reportSingleCheckSummary(resultForOneCheck)
      this.reportSingleCheckDetails(resultForOneCheck)
    })
  }

  reportPageFooter () {
    // empty in original impl: https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/JUnitXmlReporter.groovy#L87
  }

  reportSingleCheckSummary (/* SingleCheckResult */ resultForOneCheck) {
    // empty in original impl: https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/JUnitXmlReporter.groovy#L90
  }

  reportSingleCheckDetails (/* SingleCheckResult */ resultForOneCheck) {
    // empty in original impl: https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/JUnitXmlReporter.groovy#L94
  }

  closeReport () {
    // empty in original impl: https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/JUnitXmlReporter.groovy#L98
  }

  addCheckingResultsForOnePage (/* SinglePageResult */ singlePageResult) {
    this.resultsForAllPages.push(singlePageResult)
    this.resultsForAllPages.sort() // enforce sorting, fixing issue #128
  }
}

module.exports = { JUnitXmlReporter, FILE_EXTENSION }
