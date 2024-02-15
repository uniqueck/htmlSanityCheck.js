const Checker = require('./Checker')
class DuplicatedIdChecker extends Checker {
  constructor (config) {
    super(config)
  }

  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Duplicate Definition of id Check'
    singleCheckResult.sourceItemName = 'id'
    singleCheckResult.targetItemName = 'duplicate id'
  }

  check (singleCheckResult, htmlPageToCheck) {
    const listOfIds = htmlPageToCheck.querySelectorAll('[id]').map(el => el.id)
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

module.exports = DuplicatedIdChecker
