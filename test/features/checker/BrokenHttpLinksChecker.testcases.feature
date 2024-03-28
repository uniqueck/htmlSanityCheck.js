# Diese Datei wurde erzeugt durch LF-ET 2.3.0 (240312a) und Kommandozeile:
# -GenTest "/opt/data/github/htmlSanityCheck.js/lfet/checker/BrokenHttpLinksChecker.lfet" -Group "cucumber" -Config "cucmber" -ContinueOnError -GtdDirectory "../../test/features/testdata/" -GtdFileNamePattern "*.txt; *.csv" -SwitchCoverage "1" -NonExecutableRules "50" -RecommendedTestCases -OutGherkin "BrokenHttpLinksChecker.testcases.feature" -InputRootfolder "/opt/data/github/htmlSanityCheck.js/lfet" -OutputRootfolder "/opt/data/github/htmlSanityCheck.js/test/features"
# 
# Aktueller Benutzer: constantin
# Aktuelles Verzeichnis (user.dir): "/opt/data/github/htmlSanityCheck.js"
# Benötigte Zeit: 00:00:00.657 (13.03.2024 01:02:03.903 - 13.03.2024 01:02:04.560)
# 
# Entscheidungstabelle: /opt/data/github/htmlSanityCheck.js/lfet/checker/BrokenHttpLinksChecker.lfet
# 
# TestValueGroups: cucumber, *ti.att.cucumber, *ti.gtd.cucumber, *ti.check.cucumber
# Config: cucmber
# 
# Testfälle mit Fehlern: 0
# 
# Testfälle mit Warnungen: 0
# 
# Informationen: 1
# 
#     1. /opt/data/github/htmlSanityCheck.js/test/features/testdata/brokenHttpLinksChecker.gtd.txt
#            Erfolgreich eingelesen: HtmlFiles, 3 Sätze, Encoding UTF-8
#            Erfolgreich eingelesen: HttpStatusCodes, 3 Sätze, Encoding UTF-8

# language: en

Feature: BrokenHttpLinksChecker

  @recommended
  Scenario: 0001 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R05 : B04 ignore ip address check = Y
    R08
    R09 : B06 check http status code in configured success range = SUCCESS
    Given config option 'ignoreLocalHost' is 'enabled'
    *     config option 'ignoreIPAddresses' is 'enabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_localhost.html' is called

  @recommended
  Scenario: 0002 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R06 : B04 ignore ip address check = N ; B05 check if ip address = Y
    R08
    R10 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = Y
    Given config option 'ignoreLocalHost' is 'enabled'
    *     config option 'ignoreIPAddresses' is 'disabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_127_0_0_2.html' is called
    Then  check finding 'NUMERIC_IP' is reported
    *     check finding 'REDIRECT' is reported

  @recommended
  Scenario: 0003 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R11 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = N
    Given config option 'ignoreLocalHost' is 'enabled'
    *     config option 'ignoreIPAddresses' is 'disabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_github.com.html' is called

  @recommended
  Scenario: 0004 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R02 : B02 ignore localhost check = N ; B03 check if localhost = localhost
    R05 : B04 ignore ip address check = Y
    R08
    R12 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = *
    R14 : B06 check http status code in configured success range = * ; B07 check http status code in configured warning range = WARN
    Given config option 'ignoreLocalHost' is 'disabled'
    *     config option 'ignoreIPAddresses' is 'enabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_localhost.html' is called

  @recommended
  Scenario: 0005 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R02 : B02 ignore localhost check = N ; B03 check if localhost = localhost
    R06 : B04 ignore ip address check = N ; B05 check if ip address = Y
    R08
    R09 : B06 check http status code in configured success range = SUCCESS
    Given config option 'ignoreLocalHost' is 'disabled'
    *     config option 'ignoreIPAddresses' is 'disabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_127_0_0_2.html' is called
    Then  check finding 'NUMERIC_IP' is reported

  @recommended
  Scenario: 0006 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R02 : B02 ignore localhost check = N ; B03 check if localhost = localhost
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R10 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = Y
    Given config option 'ignoreLocalHost' is 'disabled'
    *     config option 'ignoreIPAddresses' is 'disabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_127_0_0_2.html' is called
    Then  check finding 'REDIRECT' is reported

  @recommended
  Scenario: 0007 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R03 : B02 ignore localhost check = N ; B03 check if localhost = 127.0.0.x
    R05 : B04 ignore ip address check = Y
    R08
    R10 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = Y
    Given config option 'ignoreLocalHost' is 'disabled'
    *     config option 'ignoreIPAddresses' is 'enabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_localhost.html' is called
    Then  check finding 'REDIRECT' is reported

  @recommended
  Scenario: 0008 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R03 : B02 ignore localhost check = N ; B03 check if localhost = 127.0.0.x
    R06 : B04 ignore ip address check = N ; B05 check if ip address = Y
    R08
    R11 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = N
    Given config option 'ignoreLocalHost' is 'disabled'
    *     config option 'ignoreIPAddresses' is 'disabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_localhost.html' is called
    Then  check finding 'NUMERIC_IP' is reported

  @recommended
  Scenario: 0009 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R03 : B02 ignore localhost check = N ; B03 check if localhost = 127.0.0.x
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R12 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = *
    R15 : B06 check http status code in configured success range = * ; B07 check http status code in configured warning range = * ; B08 check http status code in configured error range = ERROR
    Given config option 'ignoreLocalHost' is 'disabled'
    *     config option 'ignoreIPAddresses' is 'disabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_127_0_0_2.html' is called

  @recommended
  Scenario: 0010 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R05 : B04 ignore ip address check = Y
    R08
    R11 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = N
    Given config option 'ignoreLocalHost' is 'disabled'
    *     config option 'ignoreIPAddresses' is 'enabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_github.com.html' is called

  @recommended
  Scenario: 0011 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R06 : B04 ignore ip address check = N ; B05 check if ip address = Y
    R08
    R12 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = *
    R16 : B06 check http status code in configured success range = * ; B07 check http status code in configured warning range = * ; B08 check http status code in configured error range = *
    Given config option 'ignoreLocalHost' is 'disabled'
    *     config option 'ignoreIPAddresses' is 'disabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_github.com.html' is called
    Then  check finding 'NUMERIC_IP' is reported

  @recommended
  Scenario: 0012 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R09 : B06 check http status code in configured success range = SUCCESS
    Given config option 'ignoreLocalHost' is 'disabled'
    *     config option 'ignoreIPAddresses' is 'disabled'
    When  checker 'BrokenHttpLinksChecker' with html page 'brokenHttpLinksChecker_github.com.html' is called

### end of generated test cases ###