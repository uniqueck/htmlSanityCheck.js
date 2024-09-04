class Issue {
  constructor (/* Location */ primaryLocation, /* string */ effortMinutes, /* Location[] */ secondaryLocations) {
    this.primaryLocation = primaryLocation
    this.effortMinutes = effortMinutes
    this.secondaryLocations = secondaryLocations
  }
}

module.exports = Issue
