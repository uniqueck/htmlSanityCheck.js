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

  newFinding(message) {
    this.findings.push(message)
    this.nrOfIssues++
  }
  setNrOfChecks(nrOfItemsChecked) {
    this.nrOfItemsChecked = nrOfItemsChecked
  }
}

module.exports = SingleCheckResult
