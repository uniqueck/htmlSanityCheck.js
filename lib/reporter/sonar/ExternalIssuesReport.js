class ExternalIssuesReport {
  constructor (/* Rule[] */ rules, /* Issue[] */ issues) {
    this.rules = rules
    this.issues = issues
  }
}

module.exports = ExternalIssuesReport
