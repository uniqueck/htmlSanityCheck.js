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
}

module.exports = Finding
