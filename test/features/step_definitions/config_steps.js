const { Given } = require('@cucumber/cucumber')

Given(/^config option (.*) is \[(.*)\]$/, function (optionName, optionValue) {
  // Handle both comma-separated and single values
  this.config[optionName] = optionValue.split(',').map(it => parseInt(it.trim(), 10))
})

Given(/^config option (.*) is (enabled|disabled)$/, function (optionName, optionValue) {
  this.config[optionName] = optionValue === 'enabled'
})

Given(/^all checkers enabled$/, function () {
  this.config.checker = [
    './checker/BrokenHttpLinksChecker',
    './checker/MissingImageFilesChecker',
    './checker/DuplicatedIdChecker',
    './checker/MissingAltInImageTagsChecker',
    './checker/ImageMapChecker',
    './checker/MissingLocalResourcesChecker'
  ]
})

Given(/^a HTML file with a size of 100 KB$/, function () {
  this.config.sourceDir = `${require('../../../lib/utils').cwd()}/test/fixtures/`
  this.config.recursive = false
  this.config.extension = ['html']
})
