class SinglePageResult {
  constructor (htmlPage) {
    this.pageFilePath = htmlPage.filePath
    this.pageFileName = htmlPage.fileName
    this.pageTitle = htmlPage.getTitle()
    this.pageSize = htmlPage.getSize()
    this.allCheckerResults = []
  }

  addSingleCheckResult(singleCheckResult) {
    this.allCheckerResults.push(singleCheckResult)
  }

}

module.exports = SinglePageResult
