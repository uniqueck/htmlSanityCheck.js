// have a look https://masteringjs.io/tutorials/fundamentals/enum
class SoftwareQuality {
  static MAINTAINABILITY = new SoftwareQuality('MAINTAINABILITY')
  static RELIABILITY = new SoftwareQuality('RELIABILITY')
  static SECURITY = new SoftwareQuality('SECURITY')

  constructor (value) {
    this.value = value
  }

  toString () {
    return `SoftwareQuality.${this.value}`
  }
}

module.exports = SoftwareQuality
