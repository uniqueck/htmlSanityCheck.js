const IMissingImageFilesChecker = require('./lfet/IMissingImageFilesChecker')
const MissingImageFilesCheckerDecisionLogic = require('./lfet/MissingImageFilesCheckerDecisionLogic')
const Checker = require('./Checker')
const Finding = require('../finding')
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
    const decisionTableLogic = new Logic()
    htmlPage.getAllImageTags().forEach(imgTag => {
      const result = decisionTableLogic.check(imgTag.getAttribute('src'))
    })
    return singleCheckResult
  }

}

class Logic extends IMissingImageFilesChecker {

  check(imageSrcTagValue) {
    const model = { imageSrcTagValue, countChecks: 0, finding: null }
    new MissingImageFilesCheckerDecisionLogic().execute(this, model)
    return { countChecks: model.countChecks, finding: model.finding }
  }

  doTrace(dtName, version, rules, rule, model) {
    console.log(`${dtName} - ${version} - ${rule} / ${rules} - ${JSON.stringify(model)}`)
  }

  doTraceAfterRule(dtName, version, rules, rule, model) {
    console.log(`${dtName} - ${version} - ${rule} / ${rules} - ${JSON.stringify(model)}`)
  }

  doIncNumberOfChecks(arg, model) {
    model.countChecks += arg
  }

  doCreateFinding(model) {
    model.finding = new Finding()
  }

  isImageSrcIsDataUri(model) {
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
    return
  }

}

module.exports = MissingImageFilesChecker
