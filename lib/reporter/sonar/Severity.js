// have a look https://masteringjs.io/tutorials/fundamentals/enum
class Severity {
  static HIGH = new Severity('HIGH')
  static MEDIUM = new Severity('MEDIUM')
  static LOW = new Severity('LOW')

  constructor (value) {
    this.value = value
  }

  toString () {
    return `Severity.${this.value}`
  }
}

module.exports = Severity
