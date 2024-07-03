const Checker = require('./Checker')

class DuplicatedIdChecker extends Checker {
  constructor (config, logger) {
    super(config, logger)
  }

  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Duplicate Definition of id Check'
    singleCheckResult.sourceItemName = 'id'
    singleCheckResult.targetItemName = 'duplicate id'
  }

  check (singleCheckResult, htmlPage) {
    const listOfIds = htmlPage.getAllIds()
    const unqiueListOfIds = [...new Set(listOfIds)]
    unqiueListOfIds.forEach((id) => {
      singleCheckResult.nrOfItemsChecked++
      const nrOfOccurrences = listOfIds.filter(item => item === id).length
      if (nrOfOccurrences > 1) {
        singleCheckResult.newFinding(`id '${id}' has ${nrOfOccurrences} definitions.`)
      }
    })
    return singleCheckResult
  }
}

module.exports = {
  createChecker: (config, logger) => {
    return new DuplicatedIdChecker(config, logger)
}
}
