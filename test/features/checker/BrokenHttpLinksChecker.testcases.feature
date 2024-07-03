# Diese Datei wurde erzeugt durch LF-ET 2.3.0 (240629a) und Kommandozeile:
# -GenTest "/Users/shoelzle/workspaces/github/htmlSanityCheck.js/lfet/checker/BrokenHttpLinksChecker.lfet" -Group "cucumber" -Config "cucmber" -ContinueOnError -GtdDirectory "../../test/features/testdata/" -GtdFileNamePattern "*.txt; *.csv" -SwitchCoverage "2" -NonExecutableRules "50" -NonExecutableRuleSeq "50" -RecommendedTestCases -Statistics -Protocol -OutGherkin "BrokenHttpLinksChecker.testcases.feature" -InputRootfolder "/Users/shoelzle/workspaces/github/htmlSanityCheck.js/lfet" -OutputRootfolder "/Users/shoelzle/workspaces/github/htmlSanityCheck.js/test/features"
# 
# Aktueller Benutzer: shoelzle
# Aktuelles Verzeichnis (user.dir): "/Users/shoelzle/workspaces/github/htmlSanityCheck.js"
# Benötigte Zeit: 00:00:01.365 (03.07.2024 11:37:33.617 - 03.07.2024 11:37:34.982)
# 
# Entscheidungstabelle: /Users/shoelzle/workspaces/github/htmlSanityCheck.js/lfet/checker/BrokenHttpLinksChecker.lfet
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
#     1. /Users/shoelzle/workspaces/github/htmlSanityCheck.js/test/features/testdata/brokenHttpLinksChecker.gtd.txt
#            Erfolgreich eingelesen: BrokenHttpLinksCheckers, 12 Sätze, Encoding UTF-8
#            Erfolgreich eingelesen: HttpStatusCodes, 4 Sätze, Encoding UTF-8

# language: en

Feature: BrokenHttpLinksChecker

  @recommended
  Scenario: 0001 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R05 : B04 ignore ip address check = Y
    R08
    R10 : B06 check HEAD http status code in configured success range = * ; B07 check HEAD http status code in redirect range = 30x ; B09 check if header contains location = Y
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [301,302]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is enabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location                    |
      | https://github.com/uniqueck/asciidoctor-liquibase |         307 | https://github.com/uniqueck/htmlSanityCheck |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |
    Then  check finding 'Warning: href=https://github.com/uniqueck/asciidoctor-liquibase returned statuscode 307, new location: https://github.com/uniqueck/htmlSanityCheck' is reported

  @recommended
  Scenario: 0002 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R05 : B04 ignore ip address check = Y
    R08
    R12 : B06 check HEAD http status code in configured success range = * ; B07 check HEAD http status code in redirect range = *
    R13 : B08 check GET http status code in configured ranges = SUCCESS
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [309,310]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is enabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         403 | empty                    |
    *     'GET' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         200 | empty                    |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |

  @recommended
  Scenario: 0003 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R06 : B04 ignore ip address check = N ; B05 check if ip address = Y
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [301,302]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is disabled
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                             |
      | <html><body><a href="http://172.217.30.9/google"></a></body></html> |
    Then  check finding 'Warning: numerical urls (ip address) indicates suspicious environment dependency: href=http://172.217.30.9/google' is reported

  @recommended
  Scenario: 0004 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R09 : B06 check HEAD http status code in configured success range = SUCCESS
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [309,310]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is disabled
    *     'HEAD' request for
      | URL                      | Status Code | Redirect Header Location |
      | http://localhost/success |         200 | empty                    |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                           |
      | <html><body><a href="http://localhost/success"></a></body></html> |

  @recommended
  Scenario: 0005 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R11 : B06 check HEAD http status code in configured success range = * ; B07 check HEAD http status code in redirect range = 30x ; B09 check if header contains location = N
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [301,302]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is disabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         307 | empty                    |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |

  @recommended
  Scenario: 0006 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R12 : B06 check HEAD http status code in configured success range = * ; B07 check HEAD http status code in redirect range = *
    R14 : B08 check GET http status code in configured ranges = WARN
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [309,310]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is disabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         403 | empty                    |
    *     'GET' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         309 | empty                    |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |
    Then  check finding 'Warning: href=https://github.com/uniqueck/asciidoctor-liquibase returned statuscode 309' is reported

  @recommended
  Scenario: 0007 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R02 : B02 ignore localhost check = N ; B03 check if localhost = localhost
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [309,310]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is disabled
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                         |
      | <html><body><a href="https://localhost/fail"></a></body></html> |
    Then  check finding 'Warning: localhost urls indicates suspicious environment dependency: href=https://localhost/fail' is reported

  @recommended
  Scenario: 0008 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R03 : B02 ignore localhost check = N ; B03 check if localhost = 127.0.0.x
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [301,302]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is disabled
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                           |
      | <html><body><a href="http://127.0.0.1/success"></a></body></html> |
    Then  check finding 'Warning: localhost urls indicates suspicious environment dependency: href=http://127.0.0.1/success' is reported

  @recommended
  Scenario: 0009 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R05 : B04 ignore ip address check = Y
    R08
    R09 : B06 check HEAD http status code in configured success range = SUCCESS
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [301,302]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is enabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         200 | empty                    |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |

  @recommended
  Scenario: 0010 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R05 : B04 ignore ip address check = Y
    R08
    R11 : B06 check HEAD http status code in configured success range = * ; B07 check HEAD http status code in redirect range = 30x ; B09 check if header contains location = N
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [309,310]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is enabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         307 | empty                    |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |

  @recommended
  Scenario: 0011 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R05 : B04 ignore ip address check = Y
    R08
    R12 : B06 check HEAD http status code in configured success range = * ; B07 check HEAD http status code in redirect range = *
    R15 : B08 check GET http status code in configured ranges = ERROR
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [301,302]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is enabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         309 | empty                    |
    *     'GET' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         402 | empty                    |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |
    Then  check finding 'Error: href=https://github.com/uniqueck/asciidoctor-liquibase returned statuscode 402' is reported

  @recommended
  Scenario: 0012 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R06 : B04 ignore ip address check = N ; B05 check if ip address = Y
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [309,310]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is disabled
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                             |
      | <html><body><a href="http://172.217.30.9/google"></a></body></html> |
    Then  check finding 'Warning: numerical urls (ip address) indicates suspicious environment dependency: href=http://172.217.30.9/google' is reported

  @recommended
  Scenario: 0013 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R10 : B06 check HEAD http status code in configured success range = * ; B07 check HEAD http status code in redirect range = 30x ; B09 check if header contains location = Y
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [301,302]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is disabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location                    |
      | https://github.com/uniqueck/asciidoctor-liquibase |         307 | https://github.com/uniqueck/htmlSanityCheck |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |
    Then  check finding 'Warning: href=https://github.com/uniqueck/asciidoctor-liquibase returned statuscode 307, new location: https://github.com/uniqueck/htmlSanityCheck' is reported

  @recommended
  Scenario: 0014 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R12 : B06 check HEAD http status code in configured success range = * ; B07 check HEAD http status code in redirect range = *
    R16 : B08 check GET http status code in configured ranges = *
    Given config option httpSuccessCodes is [200,201,203]
    *     config option httpWarnCodes is [309,310]
    *     config option httpErrorCodes is [401,402,403]
    *     config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is disabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         404 | empty                    |
    *     'GET' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         301 | empty                    |
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |
    Then  check finding 'Error: Unknown or unclassified response code: href=https://github.com/uniqueck/asciidoctor-liquibase returned statuscode 301' is reported

### end of generated test cases ###