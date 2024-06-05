# Diese Datei wurde erzeugt durch LF-ET 2.3.0 (240603b) und Kommandozeile:
# -GenTest "/Users/shoelzle/workspaces/github/htmlSanityCheck.js/lfet/checker/BrokenHttpLinksChecker.lfet" -Group "cucumber" -Config "cucmber" -ContinueOnError -GtdDirectory "../../test/features/testdata/" -GtdFileNamePattern "*.txt; *.csv" -SwitchCoverage "2" -NonExecutableRules "50" -NonExecutableRuleSeq "50" -RecommendedTestCases -Statistics -Protocol -OutGherkin "BrokenHttpLinksChecker.testcases.feature" -InputRootfolder "/Users/shoelzle/workspaces/github/htmlSanityCheck.js/lfet" -OutputRootfolder "/Users/shoelzle/workspaces/github/htmlSanityCheck.js/test/features"
# 
# Aktueller Benutzer: shoelzle
# Aktuelles Verzeichnis (user.dir): "/Users/shoelzle/workspaces/github/htmlSanityCheck.js"
# Benötigte Zeit: 00:00:00.280 (05.06.2024 17:28:18.844 - 05.06.2024 17:28:19.124)
# 
# Entscheidungstabelle: /Users/shoelzle/workspaces/github/htmlSanityCheck.js/lfet/checker/BrokenHttpLinksChecker.lfet
# 
# TestValueGroups: cucumber, *ti.att.cucumber, *ti.gtd.cucumber, *ti.check.cucumber
# Config: cucmber
# 
# Testfälle mit Fehlern: 3
# 
#     1. Fehler in Testfall 2
#         
#         BrokenHttpLinksChecker
#         | R01 | B02=Y
#         | R05 | B04=Y
#         | R08
#         | R12 | B06=* | B09=*
#         | R13 | B06=SUCCESS
#         
#         Die dynamisch erzeugte GTD Teilmenge 'BrokenHttpLinksChecker' enthält keine Datensätze. {(BrokenHttpLinksChecker, BrokenHttpLinksCheckers, *, 8 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 4 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in [301 : 308], 2 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code in HttpStatusCode_Success.Filter=(200;201;203), 0 Sätze)}  (05.06.2024 17:28:19.034)
# 
#     2. Fehler in Testfall 6
#         
#         BrokenHttpLinksChecker
#         | R01 | B02=Y
#         | R07 | B04=N | B05=N
#         | R08
#         | R12 | B06=* | B09=*
#         | R14 | B06=* | B07=WARN
#         
#         Die dynamisch erzeugte GTD Teilmenge 'BrokenHttpLinksChecker' enthält keine Datensätze. {(BrokenHttpLinksChecker, BrokenHttpLinksCheckers, *, 8 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, TYPE != "NUMERIC", 6 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 4 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in [301 : 308], 2 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 2 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Get_Status_Code in HttpStatusCode_Warn.Filter=(301;302), 0 Sätze)}  (05.06.2024 17:28:19.063)
# 
#     3. Fehler in Testfall 11
#         
#         BrokenHttpLinksChecker
#         | R04 | B02=N | B03=*
#         | R05 | B04=Y
#         | R08
#         | R12 | B06=* | B09=*
#         | R15 | B06=* | B07=* | B08=ERROR
#         
#         Die dynamisch erzeugte GTD Teilmenge 'BrokenHttpLinksChecker' enthält keine Datensätze. {(BrokenHttpLinksChecker, BrokenHttpLinksCheckers, *, 8 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, URL contains not "//127.0.0", 7 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, URL contains not "//localhost", 5 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 3 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in [301 : 308], 1 Satz), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 1 Satz), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Get_Status_Code not in HttpStatusCode_Warn.Filter=(301;302), 1 Satz), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Get_Status_Code in HttpStatusCode_Error.Filter=(401;402;403), 0 Sätze)}  (05.06.2024 17:28:19.092)
# 
# Testfälle mit Warnungen: 0
# 
# Informationen: 1
# 
#     1. /Users/shoelzle/workspaces/github/htmlSanityCheck.js/test/features/testdata/brokenHttpLinksChecker.gtd.txt
#            Erfolgreich eingelesen: BrokenHttpLinksCheckers, 8 Sätze, Encoding UTF-8
#            Erfolgreich eingelesen: HttpStatusCodes, 3 Sätze, Encoding UTF-8

# language: en

Feature: BrokenHttpLinksChecker

  @recommended
  Scenario: 0001 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R05 : B04 ignore ip address check = Y
    R08
    R10 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = Y
    Given config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is enabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location                    |
      | https://github.com/uniqueck/asciidoctor-liquibase |         307 | https://github.com/uniqueck/htmlSanityCheck |
    *     config option httpSuccessCodes is [200,201,203]
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |
    Then  check finding 'Warning: href=https://github.com/uniqueck/asciidoctor-liquibase returned statuscode 307, new location: https://github.com/uniqueck/htmlSanityCheck' is reported

  @incomplete @recommended
  Scenario: 0002 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R05 : B04 ignore ip address check = Y
    R08
    R12 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = *
    R13 : B06 check http status code in configured success range = SUCCESS    messages:
    # Die dynamisch erzeugte GTD Teilmenge 'BrokenHttpLinksChecker' enthält keine Datensätze. {(BrokenHttpLinksChecker, BrokenHttpLinksCheckers, *, 8 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 4 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in [301 : 308], 2 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code in HttpStatusCode_Success.Filter=(200;201;203), 0 Sätze)}  (05.06.2024 17:28:19.034)

  @recommended
  Scenario: 0003 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R06 : B04 ignore ip address check = N ; B05 check if ip address = Y
    Given config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is disabled
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                           |
      | <html><body><a href="http://127.0.0.1/success"></a></body></html> |
    Then  check finding 'Warning: numerical urls (ip address) indicates suspicious environment dependency: href=http://127.0.0.1/success' is reported

  @recommended
  Scenario: 0004 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R09 : B06 check http status code in configured success range = SUCCESS
    Given config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is disabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         200 | empty                    |
    *     config option httpSuccessCodes is [200,201,203]
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |

  @recommended
  Scenario: 0005 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R11 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = N
    Given config option ignoreLocalHost is enabled
    *     config option ignoreIPAddresses is disabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         307 | empty                    |
    *     config option httpSuccessCodes is [200,201,203]
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |

  @incomplete @recommended
  Scenario: 0006 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R01 : B02 ignore localhost check = Y
    R07 : B04 ignore ip address check = N ; B05 check if ip address = N
    R08
    R12 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = *
    R14 : B06 check http status code in configured success range = * ; B07 check http status code in configured warning range = WARN    messages:
    # Die dynamisch erzeugte GTD Teilmenge 'BrokenHttpLinksChecker' enthält keine Datensätze. {(BrokenHttpLinksChecker, BrokenHttpLinksCheckers, *, 8 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, TYPE != "NUMERIC", 6 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 4 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in [301 : 308], 2 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 2 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Get_Status_Code in HttpStatusCode_Warn.Filter=(301;302), 0 Sätze)}  (05.06.2024 17:28:19.063)

  @recommended
  Scenario: 0007 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R02 : B02 ignore localhost check = N ; B03 check if localhost = localhost
    Given config option ignoreLocalHost is disabled
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                           |
      | <html><body><a href="http://localhost/success"></a></body></html> |
    Then  check finding 'Warning: localhost urls indicates suspicious environment dependency: href=http://localhost/success' is reported

  @recommended
  Scenario: 0008 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R03 : B02 ignore localhost check = N ; B03 check if localhost = 127.0.0.x
    Given config option ignoreLocalHost is disabled
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
    R09 : B06 check http status code in configured success range = SUCCESS
    Given config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is enabled
    *     'HEAD' request for
      | URL                        | Status Code | Redirect Header Location |
      | http://172.217.30.9/google |         200 | empty                    |
    *     config option httpSuccessCodes is [200,201,203]
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                             |
      | <html><body><a href="http://172.217.30.9/google"></a></body></html> |

  @recommended
  Scenario: 0010 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R05 : B04 ignore ip address check = Y
    R08
    R11 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = N
    Given config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is enabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location                    |
      | https://github.com/uniqueck/asciidoctor-liquibase |         307 | https://github.com/uniqueck/htmlSanityCheck |
    *     config option httpSuccessCodes is [200,201,203]
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |

  @incomplete @recommended
  Scenario: 0011 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R05 : B04 ignore ip address check = Y
    R08
    R12 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = *
    R15 : B06 check http status code in configured success range = * ; B07 check http status code in configured warning range = * ; B08 check http status code in configured error range = ERROR    messages:
    # Die dynamisch erzeugte GTD Teilmenge 'BrokenHttpLinksChecker' enthält keine Datensätze. {(BrokenHttpLinksChecker, BrokenHttpLinksCheckers, *, 8 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, URL contains not "//127.0.0", 7 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, URL contains not "//localhost", 5 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 3 Sätze), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in [301 : 308], 1 Satz), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Head_Status_Code not in HttpStatusCode_Success.Filter=(200;201;203), 1 Satz), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Get_Status_Code not in HttpStatusCode_Warn.Filter=(301;302), 1 Satz), (BrokenHttpLinksChecker, BrokenHttpLinksChecker, Get_Status_Code in HttpStatusCode_Error.Filter=(401;402;403), 0 Sätze)}  (05.06.2024 17:28:19.092)

  @recommended
  Scenario: 0012 BrokenHttpLinksChecker
    BrokenHttpLinksChecker
    R04 : B02 ignore localhost check = N ; B03 check if localhost = *
    R06 : B04 ignore ip address check = N ; B05 check if ip address = Y
    Given config option ignoreLocalHost is disabled
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
    R10 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = 30x ; B10 check if header contains location = Y
    Given config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is disabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location                    |
      | https://github.com/uniqueck/asciidoctor-liquibase |         307 | https://github.com/uniqueck/htmlSanityCheck |
    *     config option httpSuccessCodes is [200,201,203]
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
    R12 : B06 check http status code in configured success range = * ; B09 check http status code in redirect range = *
    R16 : B06 check http status code in configured success range = * ; B07 check http status code in configured warning range = * ; B08 check http status code in configured error range = *
    Given config option ignoreLocalHost is disabled
    *     config option ignoreIPAddresses is disabled
    *     'HEAD' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         403 | empty                    |
    *     config option httpSuccessCodes is [200,201,203]
    *     'GET' request for
      | URL                                               | Status Code | Redirect Header Location |
      | https://github.com/uniqueck/asciidoctor-liquibase |         500 | empty                    |
    *     config option httpSuccessCodes is [200,201,203]
    *     config option httpWarningCodes is [301,302]
    *     config option httpErrorCodes is [401,402,403]
    When  checker 'BrokenHttpLinksChecker' with html page
      | Content                                                                                    |
      | <html><body><a href="https://github.com/uniqueck/asciidoctor-liquibase"></a></body></html> |
    Then  check finding 'Error: Unknown or unclassified response code: href=https://github.com/uniqueck/asciidoctor-liquibase returned statuscode 500' is reported

### end of generated test cases ###