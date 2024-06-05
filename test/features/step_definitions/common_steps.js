const { When, Then, Given, Before, After } = require('@cucumber/cucumber')
const HtmlPage = require('../../../lib/html/htmlPage')
const { assert } = require('referee')

Before(function () {
  this.config = {}
  this.loggerMock = {
    messages: [],
    log: function (message) {
      this.messages.push(message)
    }
  }
  global.routes = {
    head: {
      url: undefined,
      status: -1,
      headers: {}
    },
    get: {
      url: undefined,
      status: -1,
      headers: {}
    }
  }
  global.XMLHttpRequest = class MockXMLHttpRequest {
    constructor () {}

    open (method, url, async) {
      assert.equals(false, async)
      this.method = method.toLowerCase()
      this.url = url
    }

    addEventListener (event, callback) {
      this.callback = callback
    }

    send () {
      const route = global.routes[this.method]
      this.status = route.status
      assert.equals(route.url, this.url)
      this.callback()
    }

    getResponseHeader (headerName) {
      return global.routes[this.method].headers[headerName]
    }
  }
})

After(function () {
  this.attach(this.loggerMock.messages.join('\n'))
  delete global.XMLHttpRequest
  delete global.routes
})

When('checker {string} with html page', function (checkerName, dataTable) {
  const Checker = require(`../../../lib/checker/${checkerName}`)
  const HtmlPage = require('../../../lib/html/htmlPage')
  const htmlFile = new HtmlPage({
    filePath: '',
    fileName: '',
    content: require('node-html-parser').parse(dataTable.hashes()[0]['Content'])
  })
  const checkerInstance = Checker.createChecker(this.config, this.loggerMock)
  this.singleCheckResult = checkerInstance.performCheck(htmlFile)
})

When('checker {string} with html page {string} is called', function (checkerName, htmlFilePath) {
  const Checker = require(`../../../lib/checker/${checkerName}`)
  const path = require('path')
  const HtmlPage = require('../../../lib/html/htmlPage')
  const htmlFile = path.parse(path.join(`${__dirname}/../../fixtures/html-files/`, htmlFilePath))
  this.singleCheckResult = new Checker(this.config, this.loggerMock).performCheck(new HtmlPage(htmlFile.dir, htmlFile.base))
})

Given('{string} request for', function (requestMethod, dataTable) {
  const url = dataTable.hashes()[0].URL
  const statusCode = parseInt(dataTable.hashes()[0]['Status Code'])
  const redirectHeaderLocation = dataTable.hashes()[0]['Redirect Header Location']
  global.routes[requestMethod.toLowerCase()].url = url
  global.routes[requestMethod.toLowerCase()].status = statusCode
  global.routes[requestMethod.toLowerCase()].headers = { location: redirectHeaderLocation }
})

Given(/^config option (.*) is \[(.*)\]$/, function (optionName, optionValue) {
  this.config[optionName] = optionValue.split(',').map(it => parseInt(it))
})

Given(/^config option (.*) is (enabled|disabled)$/, function (optionName, optionValue) {
  this.config[optionName] = optionValue === 'enabled'
})

Then('check finding {string} is reported', function (finding) {
  assert.contains(this.singleCheckResult.findings, finding)
})
