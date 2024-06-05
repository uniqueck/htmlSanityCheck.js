class Finding {
  constructor (whatIsTheProblem, nrOfOccurences, suggestions) {
    this.whatIsTheProblem = whatIsTheProblem
    this.nrOfOccurences = nrOfOccurences
    this.suggestions = suggestions
  }

  addSingleSuggestion (suggestion) {
    this.suggestions.push(suggestion)
  }

  setNrOfOccurences (nrOfOccurences) {
    this.nrOfOccurences = nrOfOccurences
  }

  toString() {
    return `Finding[${this.nrOfOccurences},${this.whatIsTheProblem}]`
  }

}

module.exports = Finding
