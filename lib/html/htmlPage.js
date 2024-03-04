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

  getImagesWithUsemapDeclaration() {
    return this.content.querySelectorAll('img[usemap]')
  }

  getAllImageMaps() {
    return this.content.querySelectorAll('map')
  }

  getAllMapNames() {
    return this.getAllImageMaps().map(map => map.getAttribute('name').innerHTML)
  }

  getAllUsemapRefs() {
    return this.getImagesWithUsemapDeclaration().map(img => img.getAttribute('usemap'))
  }

  getAllAreasForMapName(mapName) {
    console.log(mapName)
    const maps = this.content.querySelectorAll(`map[name=${mapName}]`)
    const areas = []
    maps.forEach(map => {
      areas.push(map.querySelectorAll('area'))
    })
    console.log(areas)
    return areas
  }

  getAllHttpHrefs() {
    const anchors = this.content.querySelectorAll("a[href]")
    console.log(anchors)
  }

}

module.exports = HtmlPage
