const Checker = require('./Checker')
const IBrokenHttpLinksChecker = require('./lfet/IBrokenHttpLinksChecker')
const BrokenHttpLinksCheckerDecisionLogic = require('./lfet/BrokenHttpLinksCheckerDecisionLogic')
const Finding = require('./../finding')
global.XMLHttpRequest = require('unxhr').XMLHttpRequest

class BrokenHttpLinksChecker extends Checker {
  constructor (config, logger, httpRequestFacade) {
    super(config, logger)
    this.httpRequestFacade = httpRequestFacade
  }

  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'External Links Check'
    singleCheckResult.sourceItemName = 'anchor href attribute'
    singleCheckResult.targetItemName = 'broken external link'
  }

  check (singleCheckResult, htmlPage) {

    //get set of all a-tags "<a href=..." in html file,
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
      hints: dns.ADDRCONFIG | dns.V4MAPPED,
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
      responseHeaders: undefined
      // toJSON: () => { return { href: model.href, findings: model.findings, httpStatusCode: model.responseStatusCode } }
    }
    this.dtLogic.execute(this, model)
    return { countChecks: 1, findings: model.findings }
  }

  isCheckIfLocalhost (arg0, model) {
    return (new URL(model.href).host.startsWith(arg0.getTitle()))
  }

  isCheckHttpStatusCodeInConfiguredSuccessRange_SUCCESS (model) {
    return model.responseStatusCode >= 200 && model.responseStatusCode < 300
  }

  isCheckHttpStatusCodeInRedirectRange (/* CheckHttpStatusCodeInRedirectRange */ arg, model) {
    return arg.isInTitleInterval(model.responseStatusCode)
  }

  isCheckIfHeaderContainsLocation(model) {
    return model.responseHeaders['location'] !== undefined
  }

  isCheckHttpStatusCodeInConfiguredWarningRange_WARN(model) {
    return model.responseStatusCode >= 400 && model.responseStatusCode < 500
  }

  isCheckHttpStatusCodeInConfiguredErrorRange_ERROR(model) {
    return model.responseStatusCode >= 500
  }

  doCreateFinding_LOCALHOST (model) {
    model.findings.push(new Finding(`Warning: localhost urls indicates suspicious environment dependency: href=${model.href}`))
  }

  doCreateFinding_NUMERIC_IP (model) {
    model.findings.push(new Finding(`Warning: numerical urls (ip address) indicates suspicious environment dependency: href=${model.href}`))
  }

  doCreateFinding_REDIRECT (model) {
    model.findings.push(new Finding(`Warning: http response is a redirect to location: ${model.responseHeaders['location']}; href=${model.href}`))
  }

  doExecuteHttpRequest (/* ExecuteHttpRequest */ arg, model) {
    const xhr = new global.XMLHttpRequest()
    xhr.open(arg.getSymbol(), model.href, false)
    xhr.followRedirects = false
    xhr.addEventListener('load', function () {
      model.responseStatusCode = this.status
      model.locationHeader = this.getResponseHeader('Location')
    })
    xhr.send()
  }

  isIgnoreLocalhostCheck (model) {
    return model.config.ignoreLocalHost
  }

  isIgnoreIpAddressCheck (model) {
    return model.config.ignoreIPAddresses
  }

  isCheckIfIpAddress(model) {
    return model.href.match(/[0-9]*\.[0-9]*\.[0-9]*\.[0-9]/)
  }

}

module.exports = {
  createChecker: (config, logger) => {
    return new BrokenHttpLinksChecker(config, logger)
  }
}