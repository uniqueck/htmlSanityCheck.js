const { When, Then, Given, Before, After } = require('@cucumber/cucumber')

Before(function ()  {
  this.config = {}
})
When('checker {string} with html page {string} is called', function (checkerName, htmlFilePath) {
  const Checker = require(`../../../lib/checker/${checkerName}`)
  const path = require('path')
  const HtmlPage = require('../../../lib/html/htmlPage')
  const htmlFile = path.parse(path.join(`${__dirname}/../../fixtures/html-files/`, htmlFilePath))
  this.singleCheckResult = new Checker(this.config).performCheck(new HtmlPage(htmlFile.dir, htmlFile.base))
})

Given('config option {string} is {string}', function (optionName, optionValue) {
  this.config[optionName] = optionValue === 'enabled'
})

Then('check finding {string} is reported', function (finding) {

  console.log(finding)
  console.log(this.singleCheckResult)
})