class Impact {
  constructor (/* SoftwareQuality */ softwareQuality, /* Severity */ severity) {
    this.softwareQuality = softwareQuality.value
    this.severity = severity.value
  }
}

module.exports = Impact
