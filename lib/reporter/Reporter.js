class Reporter {
  constructor (/* ReporterConfig */ config, /* LoggingFacade */ logger) {
    if (this.constructor === Reporter) {
      throw new Error("Class is of abstract type and can't be instantiated")
    }
    this.config = config
    this.outputPath = config.outputPath
    this.log = logger
    this.createdOnDate = new Date().toISOString()
  }

  reportFindings (/* AllChecksResult */ allChecksResult) {
    // Method must be implemented by all sub classes
  }
}

module.exports = Reporter
