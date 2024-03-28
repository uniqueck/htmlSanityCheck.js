module.exports = {
    default: {
        paths: ['test/features/**/*.testcases.feature'],
        recursive: true,
        format: ['html:reports/cucumber.html', 'json:reports/cucumber.json'],
        tags: "not @ignore"
    },
}