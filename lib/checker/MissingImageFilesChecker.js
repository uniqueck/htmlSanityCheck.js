const IMissingImageFilesChecker = require('./lfet/IMissingImageFilesChecker')
const MissingImageFilesCheckerDecisionLogic = require('./lfet/MissingImageFilesCheckerDecisionLogic')

class MissingImageFilesChecker extends IMissingImageFilesChecker.IMissingImageFilesChecker {

  constructor (config) {
    super(config)
  }

  initCheckingResultsDescription(singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Missing Local Images Check'
    singleCheckResult.soureItemName = 'img src attribute'
    singleCheckResult.targetItemName = 'missing image files'
  }

  check(singleCheckResult, htmlPage) {
    const processingModel = { htmlPage }
    new MissingImageFilesCheckerDecisionLogic().execute(this, processingModel)
    return singleCheckResult
  }

  doTrace(dtName, version, rules, rule, model) {
    console.log(`${dtName} - ${version} - ${rule} / ${rules}`)
  }

  doTraceAfterRule(dtName, version, rules, rule, model) {
    console.log(`${dtName} - ${version} - ${rule} / ${rules}`)
  }

  doGetAllImageTags(model) {
    model.imageTags = model.htmlPage.getAllImageTags()
    model.currentImageTagNr = 0
  }
  doSetCurrentDirTo(arg, model) {
    console.log(arg)
  }

  isOneMoreImageTagToCheckAvailable(model) {
    if (model.currentImageTagNr <= model.imageTags.length) {
      model.currentImageTag = model.imageTags[model.currentImageTagNr]
      model.currentImageTagNr++
    } else {
      model.currentImageTag = null
    }
    return model.currentImageTag !== null
  }

  doNextImageTag(model) {
    model.imageTags[model.currentImageTagNr]
    model.currentImageTagNr++
  }



}

module.exports = MissingImageFilesChecker
