'use strict'

module.exports = {
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
      junit: './reporter/JUnitXmlReporter'
    }
    logger.info(`config.reporter: ${JSON.stringify(reporterFromConfig)}`)
    Object.entries(reporterFromConfig)
      .filter(([_, reporterConfig]) => reporterConfig.enabled)
      .forEach(([reporterName, reporterConfig]) => {
        const importPath = reporterKeyToImportPath[reporterName]
        logger.info(`Creating reporter from ${importPath}`)
        enabledReporters.push(require(importPath).createReporter(reporterConfig, logger))
      })
    return enabledReporters
  }
}
