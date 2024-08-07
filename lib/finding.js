'use strict'

class Finding {
  constructor (/* string */ whatIsTheProblem, /* number */ nrOfOccurrences, /* string[] */ suggestions = []) {
    this.whatIsTheProblem = whatIsTheProblem
    this.nrOfOccurences = nrOfOccurrences
    this.suggestions = suggestions
  }

  toString () {
    return `Finding[${this.nrOfOccurences},${this.whatIsTheProblem}]`
  }
}

module.exports = Finding
