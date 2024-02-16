const fs = require('fs')
const path = require('path')
const HTMLParser = require('node-html-parser')
class HtmlPage {
  constructor (filePath, fileName) {
    this.filePath = filePath
    this.fileName = fileName
    this.content = HTMLParser.parse(fs.readFileSync(path.join(filePath, fileName)))
  }

  getAllImageTags() {
    return this.content.querySelectorAll('img')
  }

  getSize() {
    return fs.statSync(path.join(this.filePath, this.fileName)).size
  }

  getTitle() {
    return this.content.querySelector('html head title').innerHTML
  }

  getAllIds() {
    return this.content.querySelectorAll('[id]').map(el => el.id)
  }

}

module.exports = HtmlPage
