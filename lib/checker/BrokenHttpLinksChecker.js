const Checker = require('./Checker')
const IBrokenHttpLinksChecker = require('./lfet/IBrokenHttpLinksChecker')
const BrokenHttpLinksCheckerDecisionLogic = require('./lfet/BrokenHttpLinksCheckerDecisionLogic')
const Finding = require('./../finding')

class BrokenHttpLinksChecker extends Checker {
  constructor (config) {super(config)}

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
      singleCheckResult.newFinding("There seems to be a general problem with internet connectivity, all other checks for http/https links might yield incorrect results!")
    }

    const decisionTableLogic = new Logic(this.config)
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

  constructor (config) {
    super()
    this.config = config
  }

  check(href) {
    const model = {href, findings: [], config: this.config}
    new BrokenHttpLinksCheckerDecisionLogic().execute(this, model)
    return { countChecks: 1, findings: model.findings }
  }

  isCheckIfLocalhost(arg0, model) {
    return model.href.match(arg0.getTitle())
  }

  doCreateFinding_LOCALHOST(model) {
    model.findings.push(new Finding(`Warning: localhost urls indicates suspicious environment dependency: href=${model.href}`))
  }

  doCreateFinding_NUMERIC_IP(model) {
    model.findings.push(new Finding(`Warning: numerical urls (ip address) indicates suspicious environment dependency: href=${model.href}`))
  }

  doCreateFinding_REDIRECT(model) {
    model.findings.push(new Finding(`Warning: numerical urls (ip address) indicates suspicious environment dependency: href=${model.href}`))
  }

  doExecuteHttpRequest(/* ExecuteHttpRequest */ arg, model) {
    // noinspection HttpUrlsUsage
    const http = require(model.href.startsWith('http://') ? 'http' : 'https')
    http.request(model.href, { method: arg.getSymbol()}, (res) => {
      console.log(res.statusCode)
    })
  }

  isIgnoreLocalhostCheck(model) {
    return model.config.ignoreLocalHost
  }

  isIgnoreIpAddressCheck(model) {
    return model.config.ignoreIPAddresses
  }




}

module.exports = BrokenHttpLinksChecker