const Checker = require('./Checker')
const MissingImageFileChecker = require('./lfet/MissingImageFilesChecker')

class MissingImageFilesChecker extends Checker {

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
