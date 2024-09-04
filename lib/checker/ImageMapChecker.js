const Checker = require('./Checker')

class ImageMapChecker extends Checker {
  initCheckingResultsDescription (singleCheckResult) {
    singleCheckResult.whatIsChecked = 'Consistency of ImageMaps'
    singleCheckResult.sourceItemName = 'imageMap'
    singleCheckResult.targetItemName = 'map/area and usemap-references'
  }

  createSonarRule () {
    return {}
  }

  check (singleCheckResult, htmlPage) {
    // get all <img src="x" usemap="y">
    const imagesWithUsemapRefs = htmlPage.getImagesWithUsemapDeclaration()

    // get the names of all maps
    const mapNames = htmlPage.getAllMapNames()

    // get all referenced maps from image tags with usemap-attribute
    const usemapRefs = htmlPage.getAllUsemapRefs()

    this.checkBrokenImageMapReferences(singleCheckResult, imagesWithUsemapRefs, mapNames)

    this.checkDuplicateMapNames(singleCheckResult, mapNames)

    this.checkDanglingMaps(singleCheckResult, mapNames, usemapRefs)

    this.checkEmptyMaps(singleCheckResult, mapNames, htmlPage)

    return singleCheckResult
  }

  checkBrokenImageMapReferences (singleCheckResult, imagesWithUsemapRefs, mapNames) {
    imagesWithUsemapRefs.forEach(img => {
      const usemapRef = img.getAttribute('usemap')

      singleCheckResult.incNrOfItemsChecked()

      if (mapNames.findAll(it => usemapRef === it) === 0) {
        const imageName = img.getAttribute('src').innerHTML
        const findingText = `ImageMap "${usemapRef}" (referenced by image "${imageName}") is missing.`
        singleCheckResult.newFinding(findingText)
      }
    })
  }

  checkDuplicateMapNames (singleCheckResult, mapNames) {
    const mapNameSet = [...new Set(mapNames)]
    mapNameSet.forEach(mapName => {
      singleCheckResult.incNrOfItemsChecked()
      const mapNameCount = mapNames.count(mapName)
      if (mapNameCount > 0) {
        singleCheckResult.newFinding(`${mapNameCount} imagemaps with identical name "${mapName}" exist.`)
      }
    })
  }

  /*
     search for maps that are NOT referenced by any image-tag
     */
  checkDanglingMaps (singleCheckResult, mapNames, usemapRefs) {
    mapNames.forEach(mapName => {
      singleCheckResult.incNrOfItemsChecked()

      // check if mapName is contained in collection of usemap-references
      if (!usemapRefs.contains(mapName)) {
        singleCheckResult.newFinding(`ImageMap "${mapName}" not referenced by any image.`)
      }
    })
  }

  checkEmptyMaps (singleCheckResults, mapNames, pageToCheck) {
    mapNames.forEach(mapName => {
      pageToCheck.getAllAreasForMapName(mapName)
    })
  }
}

module.exports = {
  createChecker: (config, logger) => {
    return new ImageMapChecker(config, logger)
  }
}
