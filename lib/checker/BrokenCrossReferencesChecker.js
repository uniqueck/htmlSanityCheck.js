const Checker = require('./Checker')
const IBrokenCrossReferencesChecker = require('./lfet/IBrokenCrossReferencesChecker')
const BrokenCrossReferencesCheckerDecisionLogic = require('./lfet/BrokenCrossReferencesCheckerDecisionLogic')
const Finding = require('./../finding')

class BrokenCrossReferencesChecker extends Checker {
  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Broken Internal Links Check'
    singleCheckResult.sourceItemName = 'href'
    singleCheckResult.targetItemName = 'missing id'
  }

  check (singleCheckResult, htmlPage) {
    const decisionTableLogic = new Logic(this.config, this.logger)
    // get list of all a-tags "<a href=..." in html file
    const hrefs = htmlPage.getListOfHrefs()
    // get list of all id="XYZ"
    const listOfIds = htmlPage.getAllIds()
    // only use unique list to check
    const uniqueList = [...new Set(hrefs)]
    uniqueList.forEach(href => {
      const result = decisionTableLogic.check(href, listOfIds, hrefs.filter((it) => it === href).length)
      singleCheckResult.nrOfItemsChecked += result.countChecks
      if (result.finding) {
        singleCheckResult.addFinding(result.finding)
      }
    })
    return singleCheckResult
  }
}

class Logic extends IBrokenCrossReferencesChecker.DecisionTableLogic {
  constructor (config, logger) {
    super()
    this.config = config
    this.dtLogic = new BrokenCrossReferencesCheckerDecisionLogic(logger)
  }

  check (href, listOfIds, countOccurrences) {
    const model = {
      href,
      listOfIds,
      finding: null,
      countChecks: 0,
      countOccurrences,
      config: this.config
    }
    this.dtLogic.execute(this, model)
    return { countChecks: model.countChecks, finding: model.finding }
  }

  isHrefContainsInvalidChars (/* HrefContainsInvalidChars */ arg, model) {
    const re = new RegExp(arg.getSymbol())
    return re.test(model.href)
  }

  isHrefStartsWith (/* HrefStartsWith */ arg, model) {
    return model.href.startsWith(arg.getSymbol())
  }

  isHrefEqual (/* HrefEqual */ arg, model) {
    return model.href === arg.getSymbol()
  }

  isExistsLinkTarget (model) {
    const linkTarget = model.href.substring(1)
    return model.listOfIds.includes(linkTarget)
  }

  isCountReferenceOccurrences (/* CountReferenceOccurrences */ arg, model) {
    return arg.isInSymbolInterval(model.countOccurrences)
  }

  doCreateFinding (/* CreateFinding */ arg, model) {
    model.finding = new Finding(arg.getTitle().replace('$href', model.href).replace('$refCount', model.countOccurrences), 1)
  }

  doIncNumberOfChecks (/* IncNumberOfChecks */ arg, model) {
    model.countChecks += arg.getSymbolInteger()
  }
}

module.exports = {
  createChecker: (config, logger) => {
    return new BrokenCrossReferencesChecker(config, logger)
  }
}
