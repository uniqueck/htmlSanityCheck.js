const SingleCheckResult = require('../singleCheckResult')
class Checker {
  constructor (config, logger) {
    if (this.constructor === Checker) {
      throw new Error("Class is of abstract type and can't be instantiated")
    }

    if (this.initCheckingResultsDescription === undefined) {
      throw new Error('initCheckingResultsDescription(singleCheckResult) method must be implemented')
    }

    if (this.check === undefined) {
      throw new Error('check(singleCheckResult, htmlPage) method must be implemented')
    }

    this.config = config
    this.logger = logger
  }

  performCheck (htmlPage) {
    const singleCheckResult = new SingleCheckResult()
    this.initCheckingResultsDescription(singleCheckResult)
    return this.check(singleCheckResult, htmlPage)
  }
}

module.exports = Checker
