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

    if (this.createSonarRule === undefined) {
      throw new Error('createSonarRule():Rule method must be implemented')
    }
    this.config = config
    this.logger = logger
  }

  performCheck (htmlPage) {
    const singleCheckResult = new SingleCheckResult()
    this.initCheckingResultsDescription(singleCheckResult)
    return this.check(singleCheckResult, htmlPage)
  }

  check (/* SingleCheckResult */ singleCheckResult, /* HtmlPage */ htmlPage) {
    return singleCheckResult
  }

  initCheckingResultsDescription (/* SingleCheckResult */ singleCheckResult) {

  }
}

module.exports = Checker
