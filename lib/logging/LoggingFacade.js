class LoggingFacade {
  constructor (config) {
    const { traceLogging } = config
    this.traceLogging = traceLogging
  }

  trace (msg) {
    this.log('trace', msg)
  }

  debug (msg) {
    this.log('debug', msg)
  }

  info (msg) {
    this.log('info', msg)
  }

  log (logLevel, msg) {
    if (logLevel === 'trace') {
      if (this.traceLogging) {
        console.log(msg)
      }
    } else {
      console.log(msg)
    }
  }
}

module.exports = LoggingFacade
