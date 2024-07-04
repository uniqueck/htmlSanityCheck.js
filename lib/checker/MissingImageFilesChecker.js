const IMissingImageFilesChecker = require('./lfet/IMissingImageFilesChecker')
const MissingImageFilesCheckerDecisionLogic = require('./lfet/MissingImageFilesCheckerDecisionLogic')
const Checker = require('./Checker')
const Finding = require('../finding')
const fs = require('fs')
const path = require('path')

class MissingImageFilesChecker extends Checker {
  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Missing Local Images Check'
    singleCheckResult.soureItemName = 'img src attribute'
    singleCheckResult.targetItemName = 'missing image files'
  }

  check (singleCheckResult, htmlPage) {
    const decisionTableLogic = new Logic(this.config, this.logger)
    htmlPage.getAllImageTags().forEach(imgTag => {
      const result = decisionTableLogic.check(htmlPage.filePath, imgTag.getAttribute('src'))
      singleCheckResult.nrOfItemsChecked += result.countChecks
      if (result.finding) {
        singleCheckResult.addFinding(result.finding)
      }
    })
    return singleCheckResult
  }
}

class Logic extends IMissingImageFilesChecker.DecisionTableLogic {
  constructor (config, logger) {
    super()
    this.config = config
    this.dtLogic = new MissingImageFilesCheckerDecisionLogic(logger)
  }

  check (filePath, imageSrcTagValue) {
    const model = {
      filePath,
      imageSrcTagValue,
      countChecks: 0,
      finding: null,
      toJSON: function () {
        const result = {}
        for (const x in this) {
          if (x !== 'imageSrcTagValue') {
            result[x] = this[x]
          } else {
            if (x === 'imageSrcTagValue') {
              result[x] = `${this[x].length} digits`
            }
          }
        }
        return result
      }
    }
    this.dtLogic.execute(this, model)
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
      model.finding = new Finding(arg.getTitle().replace('$relativePathToImageFile', path.join(model.filePath, model.imageSrcTagValue)).replace(/\\/g, '/'), 1)
    } else {
      model.finding = new Finding(arg.getTitle(), 1)
    }
  }
}

module.exports = {
  createChecker: (config, logger) => {
    return new MissingImageFilesChecker(config, logger)
  }
}
