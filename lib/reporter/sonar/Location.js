class Location {
  constructor (/* string */ message, /* string */ filePath, /* TextRange */ textRange) {
    this.message = message
    this.filePath = filePath
    this.textRange = textRange
  }
}

module.exports = Location
