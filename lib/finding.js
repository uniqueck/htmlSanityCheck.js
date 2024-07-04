'use strict'

class Finding {
  constructor (whatIsTheProblem, nrOfOccurences) {
    this.whatIsTheProblem = whatIsTheProblem
    this.nrOfOccurences = nrOfOccurences
  }

  toString () {
    return `Finding[${this.nrOfOccurences},${this.whatIsTheProblem}]`
  }
}

module.exports = Finding
