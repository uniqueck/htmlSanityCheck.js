class TextRange {
  constructor (/* string */ startLine, /* string */ endLine, /* string */ startColumn, /* string */ endColumn) {
    this.startLine = startLine
    this.endLine = endLine
    this.startColumn = startColumn
    this.endColumn = endColumn
  }
}

module.exports = TextRange
