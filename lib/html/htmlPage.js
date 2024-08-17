const fs = require('fs')
const path = require('path')
const HTMLParser = require('node-html-parser')
class HtmlPage {
  constructor (params = {}) {
    this.filePath = params.filePath
    this.fileName = params.fileName
    if (params.content) {
      this.content = params.content
    } else {
      this.content = HTMLParser.parse(fs.readFileSync(path.join(this.filePath, this.fileName)))
    }
  }

  getAllImageTags () {
    return this.content.querySelectorAll('img')
  }

  getSize () {
    return fs.statSync(path.join(this.filePath, this.fileName)).size
  }

  getTitle () {
    const title = this.content.querySelector('html head title')
    if (title) {
      return title.innerHTML.trim()
    } else {
      return ''
    }
  }

  getAllIds () {
    return this.content.querySelectorAll('[id]').map(el => el.id)
  }

  getImagesWithUsemapDeclaration () {
    return this.content.querySelectorAll('img[usemap]')
  }

  getAllImageMaps () {
    return this.content.querySelectorAll('map')
  }

  getAllMapNames () {
    return this.getAllImageMaps().map(map => map.getAttribute('name').innerHTML)
  }

  getAllUsemapRefs () {
    return this.getImagesWithUsemapDeclaration().map(img => img.getAttribute('usemap'))
  }

  getAllAreasForMapName (mapName) {
    const maps = this.content.querySelectorAll(`map[name=${mapName}]`)
    const areas = []
    maps.forEach(map => {
      areas.push(map.querySelectorAll('area'))
    })
    return areas
  }

  getUniqueListOfHttpHrefs () {
    let anchors = this.content.querySelectorAll('a[href]')
    anchors = anchors.map(el => el.getAttribute('href')).filter(el => el.match(/^https?:/i))
    return [...new Set(anchors)]
  }

  getUniqueListOfHrefs () {
    return [...new Set(this.getListOfHrefs())]
  }

  getListOfHrefs () {
    const anchors = this.content.querySelectorAll('a[href]')
    return anchors.map(el => el.getAttribute('href'))
  }
}

module.exports = HtmlPage
