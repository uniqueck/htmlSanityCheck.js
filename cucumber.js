module.exports = {
    default: {
        paths: ['test/features/**/*.testcases.feature'],
        recursive: true,
        format: ['html:reports/cucumber/cucumber.html', 'json:reports/cucumber/cucumber.json'],
        tags: "not @incomplete"
    },
}