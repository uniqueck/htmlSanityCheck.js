// *** WARNING: DO NOT MODIFY *** This is a generated JavaScript source code!
//
// Generated by LF-ET 2.3.0 (240629a), https://www.lohrfink.de/lfet
// From decision table
// "../htmlSanityCheck.js/lfet/checker/MissingImageFilesChecker.lfet"
// 12.08.2024 23:31
//

// Prolog Standard ---->
// profile LFET.Java.Prolog.Standard.Interface.Dt.ini not found
// used LF-ET 2.3.0 (240629a) build in default

// cav = condition and action values
const cav = require('./IMissingImageFilesChecker.js')

class MissingImageFilesCheckerDecisionLogic {
  constructor (/* LoggingFacade */ logger) {
    this.logger = logger
  }

  execute (/* IMissingImageFilesChecker */ iface, model) {
    // Prolog Standard <----

    if (iface.isImageSrcIsDataUri(model)) {
      if (iface.isImageSrcContainsData(model)) {
        // Rule R01 ---->

        this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 1 / 5 - ${JSON.stringify(model)}`)

        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_1, model) // +1 - one check

        this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 1 / 5 - ${JSON.stringify(model)}`)

        // Rule R01 <----
      } else /* image src contains data N - No */ {
        // Rule R02 ---->

        this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 2 / 5 - ${JSON.stringify(model)}`)

        iface.doCreateFinding(cav.CREATE_FINDING_DATA, model) // DATA - data-uri image missing
        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_1, model) // +1 - one check

        this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 2 / 5 - ${JSON.stringify(model)}`)

        // Rule R02 <----
      }
    } else /* image src is data uri N - No */ {
      if (iface.isImageSrcIsRemoteUri(model)) {
        // Rule R03 ---->

        this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 3 / 5 - ${JSON.stringify(model)}`)

        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_0, model) // 0 - 0 checks

        this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 3 / 5 - ${JSON.stringify(model)}`)

        // Rule R03 <----
      } else /* image src is remote uri N - No */ {
        if (iface.isLocalImageFileExists(model)) {
          // Rule R04 ---->

          this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 4 / 5 - ${JSON.stringify(model)}`)

          iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_1, model) // +1 - one check

          this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 4 / 5 - ${JSON.stringify(model)}`)

          // Rule R04 <----
        } else /* local image file exists N - No */ {
          // Rule R05 ---->

          this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 5 / 5 - ${JSON.stringify(model)}`)

          iface.doCreateFinding(cav.CREATE_FINDING_FILE, model) // FILE - image "$relativePathToImageFile" missing
          iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_1, model) // +1 - one check

          this.logger.trace(`MissingImageFilesChecker - 20240812.233137 - 5 / 5 - ${JSON.stringify(model)}`)

          // Rule R05 <----
        }
      }
    }

    // Epilog Standard ---->
    // profile LFET.Java.Epilog.Standard.Interface.Dt.ini not found
    // used LF-ET 2.3.0 (240629a) build in default
  }
}

module.exports = MissingImageFilesCheckerDecisionLogic

// Epilog Standard <----

// End of generated JavaScript source code
// Generated by LF-ET 2.3.0 (240629a), https://www.lohrfink.de/lfet
