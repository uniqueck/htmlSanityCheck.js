class AllChecksResult {
  constructor (/* Rule[] */ sonarRules) {
    this.resultsForAllPages = []
    this.sonarRules = sonarRules
  }

  addSinglePageResult (/* SinglePageResult */ singlePageResult) {
    this.resultsForAllPages.push(singlePageResult)
  }
}

module.exports = AllChecksResult
