const Finding = require('./finding')
class SingleCheckResult {
  constructor () {
    this.whatIsChecked = ''
    this.sourceItemName = ''
    this.targetItemName = ''
    this.generalRemark = ''
    this.nrOfItemsChecked = 0
    this.nrOfIssues = 0
    this.findings = []
  }

  newFinding (message) {
    this.addFinding(new Finding(message, 1, ''))
  }

  addFinding (finding) {
    this.findings.push(finding)
    this.nrOfIssues++
  }

  setNrOfChecks (nrOfItemsChecked) {
    this.nrOfItemsChecked = nrOfItemsChecked
  }

  incNrOfItemsChecked () {
    this.nrOfItemsChecked++
  }
}

module.exports = SingleCheckResult
