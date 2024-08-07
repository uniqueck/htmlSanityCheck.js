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
    return this.allCheckerResults.length
  }

  nrOfFindingsOnPage () {
    return this.allCheckerResults.filter((singleCheckResult) => singleCheckResult.findings.length).length
  }

  addResultsForSingleCheck (/* SingleCheckResult */ singleCheckResult) {
    this.allCheckerResults.push(singleCheckResult)
  }
}

module.exports = SinglePageResult
