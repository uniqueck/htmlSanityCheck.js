const IMissingImageFilesChecker = require('./lfet/IMissingImageFilesChecker')
const MissingImageFilesCheckerDecisionLogic = require('./lfet/MissingImageFilesCheckerDecisionLogic')
const Checker = require('./Checker')
const Finding = require('../finding')
const fs = require('fs')
const path = require('path')
class MissingImageFilesChecker extends Checker {
  constructor (config) {
    super(config)
  }

  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Missing Local Images Check'
    singleCheckResult.soureItemName = 'img src attribute'
    singleCheckResult.targetItemName = 'missing image files'
  }

  check (singleCheckResult, htmlPage) {
    const decisionTableLogic = new Logic()
    htmlPage.getAllImageTags().forEach(imgTag => {
      const result = decisionTableLogic.check(htmlPage.filePath, imgTag.getAttribute('src'))
      // TODO add result to singleCheckResult
    })
    return singleCheckResult
  }
}

class Logic extends IMissingImageFilesChecker.DecisionTableLogic {
  check (filePath, imageSrcTagValue) {
    const model = { filePath, imageSrcTagValue, countChecks: 0, finding: null }
    new MissingImageFilesCheckerDecisionLogic().execute(this, model)
    return { countChecks: model.countChecks, finding: model.finding }
  }

  doIncNumberOfChecks (arg, model) {
    model.countChecks += arg.getSymbolInteger()
  }

  isImageSrcIsDataUri (model) {
    return model.imageSrcTagValue.match(/^(data:image).*$/)
  }

  isImageSrcIsRemoteUri (model) {
    return model.imageSrcTagValue.match(/^(https?|ftp|telnet|ssh|ssl|gopher|localhost):\/\/.*$/)
  }

  isImageSrcContainsData (model) {
    return model.imageSrcTagValue.match('^data:image/[a-z]+;base64,.{1,}')
  }

  isLocalImageFileExists (model) {
    const file = model.imageSrcTagValue
    return fs.existsSync(path.join(model.filePath, file))
  }

  doCreateFinding (arg, model) {
    if (arg.getSymbol() === 'FILE') {
      model.finding = new Finding(arg.getTitle().replace('$relativePathToImageFile', path.join(model.filePath, model.imageSrcTagValue)), 1, '')
    } else {
      model.finding = new Finding(arg.getTitle(), 1, '')
    }
  }
}

module.exports = MissingImageFilesChecker
