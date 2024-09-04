// see https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/
class CleanCodeAttribute {
  static FORMATTED = new CleanCodeAttribute('FORMATTED') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#formatted
  static CONVENTIONAL = new CleanCodeAttribute('CONVENTIONAL') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#conventional
  static IDENTIFIABLE = new CleanCodeAttribute('IDENTIFIABLE') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#identifiable
  static CLEAR = new CleanCodeAttribute('CLEAR') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#clear
  static LOGICAL = new CleanCodeAttribute('LOGICAL') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#logical
  static COMPLETE = new CleanCodeAttribute('COMPLETE') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#complete
  static EFFICIENT = new CleanCodeAttribute('EFFICIENT') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#efficient
  static FOCUSED = new CleanCodeAttribute('FOCUSED') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#focused
  static DISTINCT = new CleanCodeAttribute('DISTINCT') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#distinct
  static MODULAR = new CleanCodeAttribute('MODULAR') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#modular
  static TESTED = new CleanCodeAttribute('TESTED') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#tested
  static LAWFUL = new CleanCodeAttribute('LAWFUL') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#lawful
  static TRUSTWORTHY = new CleanCodeAttribute('TRUSTWORTHY') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#trustworthy
  static RESPECTFUL = new CleanCodeAttribute('RESPECTFUL') // https://docs.sonarsource.com/sonarqube/latest/user-guide/clean-code/definition/#respectful

  constructor (/* string */ value) {
    this.value = value
  }

  toString () {
    return `CleanCodeAttribute.${this.value}`
  }
}

module.exports = CleanCodeAttribute
