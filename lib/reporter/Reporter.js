class Reporter {
  constructor (/* ReporterConfig */ config, /* LoggingFacade */ logger) {
    this.config = config
    this.outputPath = config.outputPath
    this.log = logger
    this.createdOnDate = new Date().toISOString()
  }

  reportFindings (/* SinglePageResult[] */ resultsForAllPages) {
    // Method must be implemented by all sub classes
  }
}

module.exports = Reporter
