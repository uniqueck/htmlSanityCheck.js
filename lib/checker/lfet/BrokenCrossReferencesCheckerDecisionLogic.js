// *** WARNING: DO NOT MODIFY *** This is a generated JavaScript source code!
//
// Generated by LF-ET 2.3.0 (240629a), https://www.lohrfink.de/lfet
// From decision table
// "../htmlSanityCheck.js/lfet/checker/BrokenCrossReferencesChecker.lfet"
// 16.08.2024 16:31
//

// Prolog Standard ---->
// profile LFET.Java.Prolog.Standard.Interface.Dt.ini not found
// used LF-ET 2.3.0 (240629a) build in default

// cav = condition and action values
const cav = require('./IBrokenCrossReferencesChecker.js')

class BrokenCrossReferencesCheckerDecisionLogic {
  constructor (/* LoggingFacade */ logger) {
    this.logger = logger
  }

  execute (/* IBrokenCrossReferencesChecker */ iface, model) {
    // Prolog Standard <----

    if (iface.isHrefContainsInvalidChars(cav.HREF_CONTAINS_INVALID_CHARS_001, model) /* \* - Star character */) {
      if (iface.isCountReferenceOccurrences(cav.COUNT_REFERENCE_OCCURRENCES_001, model) /* >1 - more than once referenced */) {
        // Rule R01 ---->

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 1 / 11 - ${JSON.stringify(model)}`)

        iface.doCreateFinding(cav.CREATE_FINDING_002, model) // ILCRC - link "$href" contains illegal characters, reference count: $refCount
        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_001, model) // +1 - one check

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 1 / 11 - ${JSON.stringify(model)}`)

        // Rule R01 <----
      } else /* count reference occurrences * - zero or one referenced */ {
        // Rule R02 ---->

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 2 / 11 - ${JSON.stringify(model)}`)

        iface.doCreateFinding(cav.CREATE_FINDING_001, model) // ILC - link "$href" contains illegal characters
        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_001, model) // +1 - one check

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 2 / 11 - ${JSON.stringify(model)}`)

        // Rule R02 <----
      }
    } else if (iface.isHrefContainsInvalidChars(cav.HREF_CONTAINS_INVALID_CHARS_002, model) /* \$ - Dollar character */) {
      if (iface.isCountReferenceOccurrences(cav.COUNT_REFERENCE_OCCURRENCES_001, model) /* >1 - more than once referenced */) {
        // Rule R03 ---->

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 3 / 11 - ${JSON.stringify(model)}`)

        iface.doCreateFinding(cav.CREATE_FINDING_002, model) // ILCRC - link "$href" contains illegal characters, reference count: $refCount
        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_001, model) // +1 - one check

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 3 / 11 - ${JSON.stringify(model)}`)

        // Rule R03 <----
      } else /* count reference occurrences * - zero or one referenced */ {
        // Rule R04 ---->

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 4 / 11 - ${JSON.stringify(model)}`)

        iface.doCreateFinding(cav.CREATE_FINDING_001, model) // ILC - link "$href" contains illegal characters
        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_001, model) // +1 - one check

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 4 / 11 - ${JSON.stringify(model)}`)

        // Rule R04 <----
      }
    } else if (iface.isHrefContainsInvalidChars(cav.HREF_CONTAINS_INVALID_CHARS_003, model) /* \s - Whitespace */) {
      if (iface.isCountReferenceOccurrences(cav.COUNT_REFERENCE_OCCURRENCES_001, model) /* >1 - more than once referenced */) {
        // Rule R05 ---->

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 5 / 11 - ${JSON.stringify(model)}`)

        iface.doCreateFinding(cav.CREATE_FINDING_002, model) // ILCRC - link "$href" contains illegal characters, reference count: $refCount
        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_001, model) // +1 - one check

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 5 / 11 - ${JSON.stringify(model)}`)

        // Rule R05 <----
      } else /* count reference occurrences * - zero or one referenced */ {
        // Rule R06 ---->

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 6 / 11 - ${JSON.stringify(model)}`)

        iface.doCreateFinding(cav.CREATE_FINDING_001, model) // ILC - link "$href" contains illegal characters
        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_001, model) // +1 - one check

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 6 / 11 - ${JSON.stringify(model)}`)

        // Rule R06 <----
      }
    } else /* href contains invalid chars * - No invalid characters */ {
      if (iface.isHrefStartsWith(cav.HREF_STARTS_WITH_001, model) /* # - href starts with a # */) {
        if (iface.isHrefEqual(cav.HREF_EQUAL_001, model) /* # - href starts with a # */) {
          // Rule R07 ---->

          this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 7 / 11 - ${JSON.stringify(model)}`)

          iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_001, model) // +1 - one check

          this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 7 / 11 - ${JSON.stringify(model)}`)

          // Rule R07 <----
        } else /* href equal * - starts with a other char */ {
          if (iface.isExistsLinkTarget(model)) {
            // Rule R08 ---->

            this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 8 / 11 - ${JSON.stringify(model)}`)

            iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_002, model) // +2 - two checks

            this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 8 / 11 - ${JSON.stringify(model)}`)

            // Rule R08 <----
          } else /* exists link target N - No */ {
            if (iface.isCountReferenceOccurrences(cav.COUNT_REFERENCE_OCCURRENCES_001, model) /* >1 - more than once referenced */) {
              // Rule R09 ---->

              this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 9 / 11 - ${JSON.stringify(model)}`)

              iface.doCreateFinding(cav.CREATE_FINDING_004, model) // BLTRC - link target "$href" missing, reference count: $refCount
              iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_002, model) // +2 - two checks

              this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 9 / 11 - ${JSON.stringify(model)}`)

              // Rule R09 <----
            } else /* count reference occurrences * - zero or one referenced */ {
              // Rule R10 ---->

              this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 10 / 11 - ${JSON.stringify(model)}`)

              iface.doCreateFinding(cav.CREATE_FINDING_003, model) // BLT - link target "$href" missing
              iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_002, model) // +2 - two checks

              this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 10 / 11 - ${JSON.stringify(model)}`)

              // Rule R10 <----
            }
          }
        }
      } else /* href starts with * - starts with a other char */ {
        // Rule R11 ---->

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 11 / 11 - ${JSON.stringify(model)}`)

        iface.doIncNumberOfChecks(cav.INC_NUMBER_OF_CHECKS_001, model) // +1 - one check

        this.logger.trace(`BrokenCrossReferencesChecker - 20240816.163152 - 11 / 11 - ${JSON.stringify(model)}`)

        // Rule R11 <----
      }
    }

    // Epilog Standard ---->
    // profile LFET.Java.Epilog.Standard.Interface.Dt.ini not found
    // used LF-ET 2.3.0 (240629a) build in default
  }
}

module.exports = BrokenCrossReferencesCheckerDecisionLogic

// Epilog Standard <----

// End of generated JavaScript source code
// Generated by LF-ET 2.3.0 (240629a), https://www.lohrfink.de/lfet