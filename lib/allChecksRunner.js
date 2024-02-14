const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

class AllChecksRunner {

    constructor (config) {
        this.config = config
    }

    performAllChecks () {

        const resultsForAllPages = []


        fs.readdir(this.config.sourceDir,{ recursive: true, withFileTypes: true }, (err, files) => {
          if (! err) {

              files.filter((file) => {
                  return file.isFile() && file.name.toLowerCase().endsWith('.html')
              }).forEach((file) => {

                  fs.readFile(path.join(file.path, file.name),  (err, content) =>{
                      if (! err) {
                          const htmlContent = new JSDOM(content, { contentType: 'text/html' })
                          console.log(htmlContent)
                      }
                  })
                  let singlePageResult = { pageFilePath: path.join(file.path, file.name), pageFileName: file.name, allCheckerResults: [] }
                  resultsForAllPages.push(singlePageResult)
                  // call decision table with config and singlePageResult
              })


          } else {
              console.log(err)
          }
        })
    }


}


module.exports = AllChecksRunner
