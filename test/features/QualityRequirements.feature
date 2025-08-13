# language: en

Feature: Quality Goals
  In order to ensure the quality of the HTML output
  As a developer
  I want to define and check quality requirements

Scenario: Efficient - Performance

  HTML file processing must meet acceptable time and resource constraints
  For more details see https://quality.arc42.org/tag-efficient/ and https://quality.arc42.org/qualities/performance
  
  Given a HTML file with a size of 100 KB
  And all checkers enabled
  When HtmlSanityCheck processes the html file
  Then the processing should complete within 10 seconds

  # Acceptance Criteria:
  # - Processing time for 100KB HTML file: < 10 seconds (end-to-end)
  # - Time to first feedback: < 2 seconds (responsiveness)
  # - Memory consumption: < 200 MB peak usage
  # - Performance should be consistent across different content types
  # - Large files (>1MB) should process without timeouts or memory issues