// https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/importing-external-issues/generic-issue-import-format/#list-of-report-fields
class Rule {
  constructor (/* string */ id, /* string */ name, /* string */ description, /* CleanCodeAttribute */ cleanCodeAttribute, /* Impact[] */ impacts) {
    this.id = id
    this.name = name
    this.description = description
    this.engineId = 'HtmlSanityCheck.js'
    this.cleanCodeAttribute = cleanCodeAttribute.value
    this.impacts = impacts
  }
}

module.exports = Rule
