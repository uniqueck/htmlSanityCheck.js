const Checker = require('./Checker')
const { html } = require('mocha/lib/reporters')
class BrokenHttpLinksChecker extends Checker {
  constructor (config) {super(config)}

  initCheckingResultsDescription(singleCheckResult) {
    singleCheckResult.whatIsChecked = "External Links Check"
    singleCheckResult.sourceItemName = "anchor href attribute"
    singleCheckResult.targetItemName = "broken external link"
  }

  check(singleCheckResult, htmlPage) {

    //get set of all a-tags "<a href=..." in html file,
    // restricted to http(s) links
    htmlPage.getAllHttpHrefStringsAsSet()


    return singleCheckResult
  }


}

module.exports = BrokenHttpLinksChecker