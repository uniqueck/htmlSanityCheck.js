const Checker = require('./Checker')
const IBrokenHttpLinksChecker = require('./lfet/IBrokenHttpLinksChecker')
const BrokenHttpLinksCheckerDecisionLogic = require('./lfet/BrokenHttpLinksCheckerDecisionLogic')
const Finding = require('./../finding')

class BrokenHttpLinksChecker extends Checker {
  constructor (config, logger) {
    super(config, logger)
  }

  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'External Links Check'
    singleCheckResult.sourceItemName = 'anchor href attribute'
    singleCheckResult.targetItemName = 'broken external link'
  }

  check (singleCheckResult, htmlPage) {
    // get set of all a-tags "<a href=..." in html file,
    // restricted to http(s) links
    const hrefs = htmlPage.getUniqueListOfHttpHrefs()

    // check for internet connection available
    if (this.noInternetConnection()) {
      singleCheckResult.newFinding('There seems to be a general problem with internet connectivity, all other checks for http/https links might yield incorrect results!')
    }
    const decisionTableLogic = new Logic(this.config, this.logger)
    hrefs.forEach(href => {
      const result = decisionTableLogic.check(href)
      singleCheckResult.nrOfItemsChecked += result.countChecks
      result.findings.forEach(finding => {
        singleCheckResult.addFinding(finding)
      })
    })

    return singleCheckResult
  }

  noInternetConnection () {
    const dns = require('node:dns')
    const options = {
      family: 6,
      hints: dns.ADDRCONFIG | dns.V4MAPPED
    }
    let success = false
    dns.lookup('github.com', options, (err, address, family) => {
      success = true
    })
    return success
  }
}

class Logic extends IBrokenHttpLinksChecker.DecisionTableLogic {
  constructor (config, logger) {
    super()
    this.config = config
    this.dtLogic = new BrokenHttpLinksCheckerDecisionLogic(logger)
  }

  check (href) {
    const model = {
      href,
      findings: [],
      config: this.config,
      responseStatusCode: undefined,
      locationHeader: undefined
    }
    this.dtLogic.execute(this, model)
    return { countChecks: 1, findings: model.findings }
  }

  isCheckIfLocalhost (arg0, model) {
    if (arg0.getSymbol() === 'localhost') {
      return model.href.toLowerCase().includes('//localhost')
    } else {
      return model.href.includes('//127.0.0.')
    }
  }

  isCheckHeadHttpStatusCodeInConfiguredSuccessRange_SUCCESS (model) {
    return model.config.httpSuccessCodes.includes(model.responseStatusCode)
  }

  isCheckHeadHttpStatusCodeInRedirectRange (/* CheckHeadHttpStatusCodeInRedirectRange */ arg, model) {
    return arg.isInTitleInterval(model.responseStatusCode)
  }

  isCheckIfHeaderContainsLocation (model) {
    return model.locationHeader !== undefined
  }

  isCheckGetHttpStatusCodeInConfiguredRanges_SUCCESS (model) {
    return model.config.httpSuccessCodes.includes(model.responseStatusCode)
  }

  isCheckGetHttpStatusCodeInConfiguredRanges_WARN (model) {
    return model.config.httpWarningCodes.includes(model.responseStatusCode)
  }

  isCheckGetHttpStatusCodeInConfiguredRanges_ERROR (model) {
    return model.config.httpErrorCodes.includes(model.responseStatusCode)
  }

  doCreateFinding (/* CreateFinding */ arg, model) {
    const findingMessage = arg.getTitle()
      .replaceAll('{href}', model.href)
      .replaceAll('{statusCode}', model.responseStatusCode)
      .replaceAll('{locationHeader}', model.locationHeader)
    model.findings.push(new Finding(findingMessage, 1, ''))
  }

  doExecuteHttpRequest (/* ExecuteHttpRequest */ arg, model) {
    if (global.XMLHttpRequest === undefined) {
      global.XMLHttpRequest = require('unxhr').XMLHttpRequest
    }
    const xhr = new global.XMLHttpRequest()
    xhr.open(arg.getSymbol(), model.href, false)
    xhr.followRedirects = false
    xhr.addEventListener('load', function () {
      model.responseStatusCode = this.status
      model.locationHeader = this.getResponseHeader('location')
    })
    xhr.send()
  }

  isIgnoreLocalhostCheck (model) {
    return model.config.ignoreLocalHost
  }

  isIgnoreIpAddressCheck (model) {
    return model.config.ignoreIPAddresses
  }

  isCheckIfIpAddress (model) {
    return model.href.match(/[0-9]*\.[0-9]*\.[0-9]*\.[0-9]/)
  }
}

module.exports = {
  createChecker: (config, logger) => {
    return new BrokenHttpLinksChecker(config, logger)
  }
}
