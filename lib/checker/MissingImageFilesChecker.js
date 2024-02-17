const IMissingImageFileChecker = require('./lfet/IMissingImageFilesChecker')

class MissingImageFilesChecker extends IMissingImageFileChecker {

  constructor (config) {
    super(config)
  }

  initCheckingResultsDescription(singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Missing Local Images Check'
    singleCheckResult.soureItemName = 'img src attribute'
    singleCheckResult.targetItemName = 'missing image files'
  }

  check(singleCheckResult, htmlPage) {
    const currentDir = htmlPage.filePath

    const allImageTags = htmlPage.getAllImageTags()
  }

}

module.exports = MissingImageFilesChecker
