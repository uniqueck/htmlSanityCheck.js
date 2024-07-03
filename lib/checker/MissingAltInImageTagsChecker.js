const Checker = require('./Checker')

class MissingAltInImageTagsChecker extends Checker {
  constructor (config, logger) {
    super(config, logger)
  }

  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Missing alt-attribute declaration in image tags'
    singleCheckResult.sourceItemName = 'img'
    singleCheckResult.targetItemName = 'missing alt attributes'
  }

  check (singleCheckResult, htmlPageToCheck) {
    const allImgTags = htmlPageToCheck.getAllImageTags()
    singleCheckResult.setNrOfChecks(allImgTags.length)

    allImgTags.filter(imgTag => !imgTag.getAttribute('alt')).forEach(imgTag => {
      const imageName = imgTag.getAttribute('src')
      singleCheckResult.newFinding(`Image "${imageName}" is missing alt-attribute`)
    })
    return singleCheckResult
  }
}

module.exports = {
  createChecker: (config, logger) => {
    return new MissingAltInImageTagsChecker(config, logger)
}
}
