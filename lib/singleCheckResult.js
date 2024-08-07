const Finding = require('./finding')

class SingleCheckResult {
  constructor (
    /* string */ whatIsChecked = 'unknown whatIsChecked',
    /* string */ sourceItemName = 'unknown sourceItemName',
    /* string */ targetItemName = 'unknown targetItemName',
    /* string */ generalRemark = 'no generalRemark',
    /* number */ nrOfItemsChecked = 0,
    /* number */ nrOfIssues = 0,
    /* Finding[] */ findings = []
  ) {
    this.whatIsChecked = whatIsChecked
    this.sourceItemName = sourceItemName
    this.targetItemName = targetItemName
    this.generalRemark = generalRemark
    this.nrOfItemsChecked = nrOfItemsChecked
    this.nrOfIssues = nrOfIssues
    this.findings = findings
  }

  newFinding (message) {
    this.addFinding(new Finding(message, 1))
  }

  addFinding (/* Finding */ finding) {
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
