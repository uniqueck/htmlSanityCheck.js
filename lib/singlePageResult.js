class SinglePageResult {
  constructor (/* HtmlPage */ htmlPage) {
    this.pageFilePath = htmlPage.filePath
    this.pageFileName = htmlPage.fileName
    this.pageTitle = htmlPage.getTitle()
    this.pageSize = htmlPage.getSize()
    this.allCheckerResults = []
  }

  addSingleCheckResult (/* SingleCheckResult */ singleCheckResult) {
    this.allCheckerResults.push(singleCheckResult)
  }

  nrOfItemsCheckedOnPage () {
    return this.allCheckerResults.map(result => result.nrOfItemsChecked).reduce((sum, current) => sum + current, 0)
  }

  nrOfFindingsOnPage () {
    return this.allCheckerResults.map(result => result.nrOfIssues).reduce((sum, current) => sum + current, 0)
  }

  addResultsForSingleCheck (/* SingleCheckResult */ singleCheckResult) {
    this.allCheckerResults.push(singleCheckResult)
  }
}

module.exports = SinglePageResult
