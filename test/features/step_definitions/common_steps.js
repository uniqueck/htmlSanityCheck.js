const { When, Then, Given, Before, After } = require('@cucumber/cucumber')
const HtmlPage = require('../../../lib/html/htmlPage')
const { assert } = require('referee')
const { newServer } = require('mock-xmlhttprequest')

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

    }
  }
})

After(function () {
  this.attach(this.loggerMock.messages.join('\n'))
  delete global.XMLHttpRequest
})

When('checker {string} with html page', function (checkerName, dataTable) {
  const Checker = require(`../../../lib/checker/${checkerName}`)
  const HtmlPage = require('../../../lib/html/htmlPage')
  const htmlFile = new HtmlPage({filePath : "", fileName: "", content: require('node-html-parser').parse(dataTable.hashes()[0]['Content'])})
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
  const schema = dataTable.hashes()[0]['Schema']
  const hostName = dataTable.hashes()[0]['Hostname']
  const path = dataTable.hashes()[0]['Path']
  const statusCode = parseInt(dataTable.hashes()[0]['Status Code'])
  global.routes[requestMethod.toLowerCase()].url = `${schema}://${hostName}${path}`
  global.routes[requestMethod.toLowerCase()].status = statusCode
})

Given(/^config option (.*) is \[(.*)\]$/, function (optionName, optionValue) {
  this.config[optionName] = optionValue.split(',').map(it => parseInt(it))
})

Given(/^config option (.*) is (enabled|disabled)$/, function (optionName, optionValue) {
  this.config[optionName] = optionValue === 'enabled'
})

Then('check finding {string} is reported', function (finding) {
  assert(this.singleCheckResult.findings.find(it => it === finding) === true)
})
