class LoggingFacade {
  logDecisionTableTrace (decisionTableName, decisionTableVersion, currentRule, maxRules, additionalLoggingContext = {}) {
    if (additionalLoggingContext !== undefined) {
      console.log(`${decisionTableName} - ${decisionTableVersion} - ${currentRule} / ${maxRules} - ${JSON.stringify(additionalLoggingContext)}`)
    } else {
      console.log(`${decisionTableName} - ${decisionTableVersion} - ${currentRule} / ${maxRules}`)
    }
  }

  log (msg) {
    console.log(msg)
  }
}

module.exports = LoggingFacade
