const FILE_EXTENSION = 'xml'
const { create } = require('xmlbuilder2')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const Reporter = require('./Reporter')

class JUnitXmlReporter extends Reporter {
  constructor (/* JUnitXmlReporterConfig */ config, /* LoggingFacade */ logger) {
    super(config, logger)
    this.config = config
  }

  reportFindings (/* SinglePageResult[] */ resultsForAllPages) {
    this.log.trace(`resultsForAllPages ${JSON.stringify(resultsForAllPages)}`)

    this.initReport()

    this.reportOverallSummary()

    this.reportAllPages(resultsForAllPages)

    this.closeReport()
  }

  initReport () {
    this.log.trace(`Creating JUnit XML report output path: ${this.outputPath}`)
    fs.mkdirSync(this.outputPath, { recursive: true })
  }

  reportOverallSummary () {
    // https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/JUnitXmlReporter.groovy#L50
    // empty in original impl
  }

  reportAllPages (/* SinglePageResult[] */ resultsForAllPages) {
    // https://github.com/aim42/htmlSanityCheck/blob/main/src/main/groovy/org/aim42/htmlsanitycheck/report/Reporter.groovy#L73
    resultsForAllPages.forEach(pageResult => {
      this.reportPageSummary(pageResult)
      this.reportPageDetails(pageResult)
      this.reportPageFooter()
    })
  }

  reportPageSummary (/* SinglePageResult */ pageResult) {
    // https://github.com/aim42/htmlSanityCheck/blob/main/htmlSanityCheck-core/src/main/java/org/aim42/htmlsanitycheck/report/JUnitXmlReporter.java#L99-L104
    // Determine the name based on a UUID
    const name = uuidv4()

    // https://github.com/aim42/htmlSanityCheck/blob/main/htmlSanityCheck-core/src/main/java/org/aim42/htmlsanitycheck/report/JUnitXmlReporter.java#L57-L59
    const sanitizedPath = name.replace(/[^A-Za-z0-9_-]+/g, '_')
    const testOutputFileName = `TEST-unit-html-${sanitizedPath}.${FILE_EXTENSION}`
    const testOutputFilePath = path.join(this.outputPath, testOutputFileName)

    // Initialize the XML document
    const doc = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('testsuite', {
        tests: pageResult.nrOfItemsCheckedOnPage().toString(),
        failures: pageResult.nrOfFindingsOnPage().toString(),
        errors: '0',
        time: '0',
        name: `${pageResult.pageFileName}: ${pageResult.pageTitle}`
      })

    // Add test cases
    pageResult.allCheckerResults?.forEach(singleCheckResult => {
      const testcase = doc.ele('testcase', {
        assertions: singleCheckResult.nrOfItemsChecked.toString(),
        time: '0',
        name: singleCheckResult.whatIsChecked || ''
      })

      singleCheckResult.findings.forEach(finding => {
        testcase.ele('failure', {
          type: singleCheckResult.sourceItemName + ' - ' + singleCheckResult.targetItemName,
          message: finding.whatIsTheProblem
        }).txt(finding.suggestions?.join(', ') || '')
      })
    })

    // Convert the document to string
    const xmlString = doc.end({ prettyPrint: true })

    // Write the XML string to a file
    this.log.trace(`Writing JUnit XML report to ${testOutputFilePath}`)
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
}

module.exports = {
  createReporter: (/* JUnitXmlReporterConfig */ config, /* LoggingFacade */ logger) => {
    return new JUnitXmlReporter(config, logger)
  }
}
