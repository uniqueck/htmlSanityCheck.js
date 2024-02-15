const SingleCheckResult = require('../singleCheckResult')
class Checker {
  constructor (config) {
    if (this.constructor == Checker) {
      throw new Error("Class is of abstract type and can't be instantiated")
    }

    if (this.initCheckingResultsDescription == undefined) {
      throw new Error('initCheckingResultsDescription(singleCheckResult) method must be implemented')
    }

    this.config = config
  }

  performCheck (htmlPageToCheck) {
    const singleCheckResult = new SingleCheckResult()
    this.initCheckingResultsDescription(singleCheckResult)
    return this.check(singleCheckResult, htmlPageToCheck)
  }

}

module.exports = Checker
