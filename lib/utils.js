'use strict'

module.exports = {
  createChecker: function (checkerConfigs, /* LoggingFacade */ logger) {
    const checkers = []
    for (const [checker, checkerConfig] of Object.entries(checkerConfigs)) {
      checkers.push(require(`./checker/${checker}`).createChecker(checkerConfig, logger))
    }
    return checkers
  },
  cwd: function cwd () {
    return process.cwd()
  },
  findFiles: function (/* string */ sourceDir, /* boolean */ recursive, /* string[] */ fileExtensions) {
    const fs = require('fs')
    const path = require('path')
    const files = fs.readdirSync(sourceDir, { recursive, withFileTypes: false })
    return files.filter((file) => {
      let fileExt = path.extname(file).toLowerCase()
      if (fileExt) {
        fileExt = fileExt.substring(1)
      }
      return fileExtensions.includes(fileExt)
    }).map((file) => {
      return {
        filePath: path.join(sourceDir, path.dirname(file)),
        fileName: path.basename(file)
      }
    }
    )
  },
  createReporters: function (reporterFromConfig, /* LoggingFacade */ logger) {
    const enabledReporters = []
    const reporterKeyToImportPath = {
      junit: './reporter/JUnitXmlReporter',
      sonar: './reporter/SonarExternalIssuesReporter'
    }
    logger.trace(`config.reporter: ${JSON.stringify(reporterFromConfig)}`)
    Object.entries(reporterFromConfig)
      .filter(([_, reporterConfig]) => reporterConfig.enabled)
      .forEach(([reporterName, reporterConfig]) => {
        const importPath = reporterKeyToImportPath[reporterName]
        logger.trace(`Creating reporter from ${importPath}`)
        enabledReporters.push(require(importPath).createReporter(reporterConfig, logger))
      })
    return enabledReporters
  }
}
