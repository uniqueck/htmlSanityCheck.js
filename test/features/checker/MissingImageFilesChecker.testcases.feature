# Diese Datei wurde erzeugt durch LF-ET 2.3.0 (240629a) und Kommandozeile:
# -GenTest "/opt/data/github/htmlSanityCheck.js/lfet/checker/MissingImageFilesChecker.lfet" -Group "cucumber" -Config "cucumber" -ContinueOnError -GtdDirectory "../../test/features/testdata/" -GtdRecursive -NonExecutableRules "50" -RecommendedTestCases -Statistics -Protocol -OutGherkin "MissingImageFilesChecker.testcases.feature" -InputRootfolder "/opt/data/github/htmlSanityCheck.js/lfet" -OutputRootfolder "/opt/data/github/htmlSanityCheck.js/test/features"
# 
# Aktueller Benutzer: constantin
# Aktuelles Verzeichnis (user.dir): "/opt/data/github/htmlSanityCheck.js"
# Benötigte Zeit: 00:00:00.061 (14.07.2024 00:13:16.645 - 14.07.2024 00:13:16.706)
# 
# Entscheidungstabelle: /opt/data/github/htmlSanityCheck.js/lfet/checker/MissingImageFilesChecker.lfet
# 
# Regelauswahl und Regelsortierung: Alle Regeln, Standardsortierung
# 
# TestValueGroups: cucumber, *ti.att, *ti.gtd, *ti.check
# Config: cucumber
# 
# Testfälle mit Fehlern: 0
# 
# Testfälle mit Warnungen: 0
# 
# Informationen: 1
# 
#     1. /opt/data/github/htmlSanityCheck.js/test/features/testdata/MissingImageFilesChecker.gtd.txt
#            Erfolgreich eingelesen: MissingImageFilesCheckers, 5 Sätze, Encoding UTF-8
#         /opt/data/github/htmlSanityCheck.js/test/features/testdata/brokenHttpLinksChecker.gtd.txt
#            Erfolgreich eingelesen: BrokenHttpLinksCheckers, 12 Sätze, Encoding UTF-8
#            Erfolgreich eingelesen: HttpStatusCodes, 4 Sätze, Encoding UTF-8

# language: en

Feature: MissingImageFilesChecker

  @recommended
  Scenario: 0001 MissingImageFilesChecker
    MissingImageFilesChecker
    R01 : B01 image src is data uri = Y ; B03 image src contains data = Y
    When  checker 'MissingImageFilesChecker' with html page
      | Content                                                                             | filePath         |
      | <html><body><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEU="/></body></html> | ./test/fixtures/ |
    But   check count findings 0 are reported
    Then  check number of items checked is 1

  @recommended
  Scenario: 0002 MissingImageFilesChecker
    MissingImageFilesChecker
    R02 : B01 image src is data uri = Y ; B03 image src contains data = N
    When  checker 'MissingImageFilesChecker' with html page
      | Content                                                       | filePath         |
      | <html><body><img src="data:image/jpg;base64,"/></body></html> | ./test/fixtures/ |
    Then  check count findings 1 are reported
    *     check finding 'data-uri image missing' is reported
    *     check number of items checked is 1

  @recommended
  Scenario: 0003 MissingImageFilesChecker
    MissingImageFilesChecker
    R03 : B01 image src is data uri = N ; B02 image src is remote uri = Y
    When  checker 'MissingImageFilesChecker' with html page
      | Content                                                                                        | filePath         |
      | <html><body><img src="https://docs.asciidoctor.org/_/img/asciidoctor-logo.svg"/></body></html> | ./test/fixtures/ |
    But   check count findings 0 are reported
    Then  check number of items checked is 0

  @recommended
  Scenario: 0004 MissingImageFilesChecker
    MissingImageFilesChecker
    R04 : B01 image src is data uri = N ; B02 image src is remote uri = N ; B04 local image file exists = Y
    When  checker 'MissingImageFilesChecker' with html page
      | Content                                                   | filePath         |
      | <html><body><img src="./images/aim42.png"/></body></html> | ./test/fixtures/ |
    But   check count findings 0 are reported
    Then  check number of items checked is 1

  @recommended
  Scenario: 0005 MissingImageFilesChecker
    MissingImageFilesChecker
    R05 : B01 image src is data uri = N ; B02 image src is remote uri = N ; B04 local image file exists = N
    When  checker 'MissingImageFilesChecker' with html page
      | Content                                                           | filePath         |
      | <html><body><img src="./images/aim42_missing.png"/></body></html> | ./test/fixtures/ |
    Then  check count findings 1 are reported
    *     check finding 'image \"test/fixtures/images/aim42_missing.png\" missing' is reported
    *     check number of items checked is 1

### end of generated test cases ###