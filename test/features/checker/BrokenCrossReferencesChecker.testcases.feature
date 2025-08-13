# Diese Datei wurde erzeugt durch LF-ET 2.4.0 (250815a) und Kommandozeile:
# -GenTest "/home/constantin/Development/github/uniqueck/htmlSanityCheck.js/lfet/checker/BrokenCrossReferencesChecker.lfet" -Group "cucumber" -Config "cucumber" -ContinueOnError -GtdDirectory "../../test/features/testdata/" -GtdFileNamePattern "*.txt; *.csv" -DDTableName "BrokenCrossReferencesCheckers" -NonExecutableRules "50" -RecommendedTestCases -Statistics -Protocol -OutGherkin "BrokenCrossReferencesChecker.testcases.feature" -InputRootfolder "/home/constantin/Development/github/uniqueck/htmlSanityCheck.js/lfet" -OutputRootfolder "/home/constantin/Development/github/uniqueck/htmlSanityCheck.js/test/features"
# 
# Aktueller Benutzer: constantin
# Aktuelles Verzeichnis (user.dir): "/home/constantin/Development/github/uniqueck/htmlSanityCheck.js"
# Benötigte Zeit: 00:00:00.676 (25.08.2025 08:52:17.429 - 25.08.2025 08:52:18.105)
# 
# Entscheidungstabelle: /home/constantin/Development/github/uniqueck/htmlSanityCheck.js/lfet/checker/BrokenCrossReferencesChecker.lfet
# 
# Regelauswahl und Regelsortierung: Alle Regeln, Standardsortierung
# 
# TestValueGroups: cucumber, *ti.att.cucumber, *ti.gtd.cucumber, *ti.check.cucumber
# Config: cucumber
# 
# Testfälle mit Fehlern: 0
# 
# Testfälle mit Warnungen: 0
# 
# Informationen: 1
# 
#     1. /home/constantin/Development/github/uniqueck/htmlSanityCheck.js/test/features/testdata/BrokenCrossReferencesChecker.gtd.txt
#            Erfolgreich eingelesen: BrokenCrossReferencesCheckers, 12 Sätze, Encoding UTF-8
#         /home/constantin/Development/github/uniqueck/htmlSanityCheck.js/test/features/testdata/MissingImageFilesChecker.gtd.txt
#            Erfolgreich eingelesen: MissingImageFilesCheckers, 5 Sätze, Encoding UTF-8
#         /home/constantin/Development/github/uniqueck/htmlSanityCheck.js/test/features/testdata/brokenHttpLinksChecker.gtd.txt
#            Erfolgreich eingelesen: BrokenHttpLinksCheckers, 12 Sätze, Encoding UTF-8
#            Erfolgreich eingelesen: HttpStatusCodes, 4 Sätze, Encoding UTF-8

# language: en

Feature: BrokenCrossReferencesChecker

  @datadriven @ddcount_01 @r01 @recommended @rid25
  Scenario: 0001 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R01 : B01 href contains invalid chars = \* ; B05 count reference occurrences = >1
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                |
      | "<html><body><a href="*"/><a href="*"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link "*" contains illegal characters, reference count: 2' is reported
    *     check number of items checked is 1

  @datadriven @ddcount_01 @r02 @recommended @rid26
  Scenario: 0002 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R02 : B01 href contains invalid chars = \* ; B05 count reference occurrences = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                   |
      | "<html><body><a href="*"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link "*" contains illegal characters' is reported
    *     check number of items checked is 1

  @datadriven @ddcount_01 @r03 @recommended @rid37
  Scenario: 0003 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R03 : B01 href contains invalid chars = \$ ; B05 count reference occurrences = >1
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                |
      | "<html><body><a href="$"/><a href="$"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link "$" contains illegal characters, reference count: 2' is reported
    *     check number of items checked is 1

  @datadriven @ddcount_01 @r04 @recommended @rid38
  Scenario: 0004 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R04 : B01 href contains invalid chars = \$ ; B05 count reference occurrences = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                   |
      | "<html><body><a href="$"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link "$" contains illegal characters' is reported
    *     check number of items checked is 1

  @datadriven @ddcount_01 @r05 @recommended @rid35
  Scenario: 0005 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R05 : B01 href contains invalid chars = \s ; B05 count reference occurrences = >1
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                             |
      | "<html><body><a href=" "/><a href=" "/><a href=" "/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link " " contains illegal characters, reference count: 3' is reported
    *     check number of items checked is 1

  @datadriven @ddcount_01 @r06 @recommended @rid36
  Scenario: 0006 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R06 : B01 href contains invalid chars = \s ; B05 count reference occurrences = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                   |
      | "<html><body><a href=" "/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link " " contains illegal characters' is reported
    *     check number of items checked is 1

  @datadriven @ddcount_01 @r07 @recommended @rid27
  Scenario: 0007 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R07 : B01 href contains invalid chars = * ; B02 href starts with = # ; B03 href equal = #
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                   |
      | "<html><body><a href="#"/></body></html>" |
    But   check count findings 0 are reported
    Then  check number of items checked is 1

  @datadriven @ddcount_01 @r08 @recommended @rid32
  Scenario: 0008 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R08 : B01 href contains invalid chars = * ; B02 href starts with = # ; B03 href equal = * ; B04 exists link target = Y
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                           |
      | "<html><body><a href="#anchor"/><div id="anchor"/></body></html>" |
    But   check count findings 0 are reported
    Then  check number of items checked is 2

  @datadriven @ddcount_01 @r09 @recommended @rid33
  Scenario: 0009 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R09 : B01 href contains invalid chars = * ; B02 href starts with = # ; B03 href equal = * ; B04 exists link target = N ; B05 count reference occurrences = >1
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                            |
      | "<html><body><a href="#anchor"/><a href="#anchor"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link target "#anchor" missing, reference count: 2' is reported
    *     check number of items checked is 2

  @datadriven @ddcount_01 @r10 @recommended @rid34
  Scenario: 0010 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R10 : B01 href contains invalid chars = * ; B02 href starts with = # ; B03 href equal = * ; B04 exists link target = N ; B05 count reference occurrences = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                         |
      | "<html><body><a href="#anchor"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link target "#anchor" missing' is reported
    *     check number of items checked is 2

  @datadriven @ddcount_01 @r11 @recommended @rid31
  Scenario: 0011 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R11 : B01 href contains invalid chars = * ; B02 href starts with = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                              |
      | "<html><body><a href="https://"/><a href="https://"/></body></html>" |
    But   check count findings 0 are reported
    Then  check number of items checked is 1

  @datadriven @ddbase_0001 @r01 @rid25
  Scenario: 0012 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R01 : B01 href contains invalid chars = \* ; B05 count reference occurrences = >1
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                |
      | "<html><body><a href="*"/><a href="*"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link "*" contains illegal characters, reference count: 2' is reported
    *     check number of items checked is 1

  @datadriven @ddbase_0002 @r02 @rid26
  Scenario: 0013 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R02 : B01 href contains invalid chars = \* ; B05 count reference occurrences = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                   |
      | "<html><body><a href="*"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link "*" contains illegal characters' is reported
    *     check number of items checked is 1

  @datadriven @ddbase_0003 @r03 @rid37
  Scenario: 0014 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R03 : B01 href contains invalid chars = \$ ; B05 count reference occurrences = >1
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                |
      | "<html><body><a href="$"/><a href="$"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link "$" contains illegal characters, reference count: 2' is reported
    *     check number of items checked is 1

  @datadriven @ddbase_0004 @r04 @rid38
  Scenario: 0015 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R04 : B01 href contains invalid chars = \$ ; B05 count reference occurrences = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                   |
      | "<html><body><a href="$"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link "$" contains illegal characters' is reported
    *     check number of items checked is 1

  @datadriven @ddbase_0005 @r05 @rid35
  Scenario: 0016 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R05 : B01 href contains invalid chars = \s ; B05 count reference occurrences = >1
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                             |
      | "<html><body><a href=" "/><a href=" "/><a href=" "/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link " " contains illegal characters, reference count: 3' is reported
    *     check number of items checked is 1

  @datadriven @ddbase_0006 @r06 @rid36
  Scenario: 0017 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R06 : B01 href contains invalid chars = \s ; B05 count reference occurrences = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                   |
      | "<html><body><a href=" "/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link " " contains illegal characters' is reported
    *     check number of items checked is 1

  @datadriven @ddbase_0007 @r07 @rid27
  Scenario: 0018 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R07 : B01 href contains invalid chars = * ; B02 href starts with = # ; B03 href equal = #
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                   |
      | "<html><body><a href="#"/></body></html>" |
    But   check count findings 0 are reported
    Then  check number of items checked is 1

  @datadriven @ddbase_0008 @r08 @rid32
  Scenario: 0019 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R08 : B01 href contains invalid chars = * ; B02 href starts with = # ; B03 href equal = * ; B04 exists link target = Y
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                           |
      | "<html><body><a href="#anchor"/><div id="anchor"/></body></html>" |
    But   check count findings 0 are reported
    Then  check number of items checked is 2

  @datadriven @ddbase_0009 @r09 @rid33
  Scenario: 0020 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R09 : B01 href contains invalid chars = * ; B02 href starts with = # ; B03 href equal = * ; B04 exists link target = N ; B05 count reference occurrences = >1
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                                            |
      | "<html><body><a href="#anchor"/><a href="#anchor"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link target "#anchor" missing, reference count: 2' is reported
    *     check number of items checked is 2

  @datadriven @ddbase_0010 @r10 @rid34
  Scenario: 0021 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R10 : B01 href contains invalid chars = * ; B02 href starts with = # ; B03 href equal = * ; B04 exists link target = N ; B05 count reference occurrences = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                         |
      | "<html><body><a href="#anchor"/></body></html>" |
    Then  check count findings 1 are reported
    *     check finding 'link target "#anchor" missing' is reported
    *     check number of items checked is 2

  @datadriven @ddbase_0011 @r11 @rid31
  Scenario: 0022 BrokenCrossReferencesChecker
    BrokenCrossReferencesChecker
    R11 : B01 href contains invalid chars = * ; B02 href starts with = *
    When  checker 'BrokenCrossReferencesChecker' with html page
      | Content                                          |
      | "<html><body><a href="https://"/></body></html>" |
    But   check count findings 0 are reported
    Then  check number of items checked is 1

### end of generated test cases ###