const { When, Then, Given, Before, After } = require('@cucumber/cucumber')
const { assert } = require('referee')

Before(function () {
  // Clear the HTTP cache before each test to avoid interference
  const BrokenHttpLinksChecker = require('../../../lib/checker/BrokenHttpLinksChecker')
  BrokenHttpLinksChecker.cache.clear()

  this.config = {}
  this.loggerMock = {
    messages: [],
    trace: function (message) {
      this.messages.push(message)
    },
    debug: function (message) {
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
    open (method, url, async) {
      assert.equals(false, async)
      this.method = method.toLowerCase()
      this.url = url
    }

    addEventListener (event, callback) {
      assert.equals('load', event)
      this.callback = callback
    }

    send () {
      const route = global.routes[this.method]
      this.status = route.status
      // Only assert URL match if URL was set for this method

      assert(route.url !== undefined, `Test setup error: route.url is undefined for method "${this.method}". This may mask test failures. Please ensure route.url is set.`)
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

  // Clean up global mocks and cache
  delete global.XMLHttpRequest
  delete global.routes
})

When('checker {string} with html page', function (checkerName, dataTable) {
  const Checker = require(`../../../lib/checker/${checkerName}`)
  const HtmlPage = require('../../../lib/html/htmlPage')
  let filePath = ''
  if (dataTable.hashes()[0].filePath) {
    filePath = dataTable.hashes()[0].filePath
  }
  const htmlFile = new HtmlPage({
    filePath,
    fileName: '',
    content: require('node-html-parser').parse(dataTable.hashes()[0].Content)
  })
  const checkerInstance = Checker.createChecker(this.config, this.loggerMock)
  this.singleCheckResult = checkerInstance.performCheck(htmlFile)
})

When('checker {string} with html page {string} is called', function (checkerName, htmlFilePath) {
  const Checker = require(`../../../lib/checker/${checkerName}`)
  const path = require('path')
  const HtmlPage = require('../../../lib/html/htmlPage')
  const htmlFile = path.parse(path.join(__dirname, '/../../fixtures/html-files/', htmlFilePath))
  this.singleCheckResult = new Checker(this.config, this.loggerMock).performCheck(new HtmlPage(htmlFile.dir, htmlFile.base))
})

Given('{string} request for', function (requestMethod, dataTable) {
  const url = dataTable.hashes()[0].URL
  const statusCode = parseInt(dataTable.hashes()[0]['Status Code'])
  const redirectHeaderLocation = dataTable.hashes()[0]['Redirect Header Location']
  global.routes[requestMethod.toLowerCase()].url = url
  global.routes[requestMethod.toLowerCase()].status = statusCode
  if (redirectHeaderLocation === '-') {
    global.routes[requestMethod.toLowerCase()].headers = { location: undefined }
  } else {
    global.routes[requestMethod.toLowerCase()].headers = { location: redirectHeaderLocation }
  }
})

Then('check finding {string} is reported', function (finding) {
  const Finding = require('../../../lib/finding')
  assert.equals(1, this.singleCheckResult.findings.length)
  assert.equals(new Finding(finding, 1), this.singleCheckResult.findings[0])
})

Then('check count findings {float} are reported', function (countFindings) {
  assert.equals(countFindings, this.singleCheckResult.findings.length)
})

Then('check number of items checked is {int}', function (nrOfItemsChecked) {
  assert.equals(nrOfItemsChecked, this.singleCheckResult.nrOfItemsChecked)
})

When(/^HtmlSanityCheck processes the html file$/, async function () {
  this.startTime = Date.now()
  const AllChecksRunner = require('../../../lib/allChecksRunner')
  await new AllChecksRunner(this.config, this.loggerMock).performAllChecks()
  this.endTime = Date.now()
})

Then(/^the processing should complete within (\d+) seconds$/, function (maxDuration) {
  const duration = (this.endTime - this.startTime) / 1000
  assert.equals(duration <= maxDuration, true)
})
