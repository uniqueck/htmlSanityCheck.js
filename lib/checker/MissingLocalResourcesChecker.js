const Checker = require('./Checker')

class MissingLocalResourcesChecker extends Checker {
  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Missing Local Resources Check'
    singleCheckResult.sourceItemName = 'anchor tag href attribute'
    singleCheckResult.targetItemName = 'missing local resources'
  }

  check (singleCheckResult, htmlPage) {
    // get list of all anchor-tags containing href="xyz" in html file
    const allHrefs = htmlPage.getUniqueListOfHrefs()

    allHrefs.filter(el => el.match(/^https?:/i))

    return singleCheckResult
  }

  isLocalResource (href) {
    if (href === null) {
      return false
    }
  }
}

module.exports = {
  createChecker: (config, logger) => {
    return new MissingLocalResourcesChecker(config, logger)
  }
}
