const Checker = require('./Checker')

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
      console.log('address: %j family: IPv%s', address, family)
      success = true
    })
    return success
  }

}

module.exports = BrokenHttpLinksChecker