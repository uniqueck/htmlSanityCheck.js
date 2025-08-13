module.exports = {
    default: {
        paths: ['test/features/**/*.feature'],
        recursive: true,
        format: ['html:reports/cucumber/cucumber.html', 'json:reports/cucumber/cucumber.json'],
        tags: "not @incomplete"
    },
}