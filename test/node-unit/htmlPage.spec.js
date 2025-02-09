/* global describe it */
'use strict'

const HtmlPage = require('../../lib/html/htmlPage')
const chai = require('chai')
const expect = chai.expect
const HTMLParser = require('node-html-parser')

describe('htmlPage', () => {
  describe('title', () => {
    it('missing', () => {
      const htmlPage = new HtmlPage({
        content: HTMLParser.parse(`<!DOCTYPE html>
                <meta charset="utf-8">
                <script>location="url/to/page.html"</script>
                <meta http-equiv="refresh" content="0; url=url/to/page.html">
                <meta name="robots" content="noindex">
                <title>Redirect Notice</title>
                <h1>Redirect Notice</h1>
                <p>The page you requested has been relocated to <a href="url/to/page.html">url/to/page.html</a>.</p>
            `
        )
      })
      expect(htmlPage.getTitle()).eq('')
    })
    it('exists', () => {
      const htmlPage = new HtmlPage({
        content: HTMLParser.parse(`<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <title>Long Title with spaces</title>
                    <meta name="generator" content="Antora 3.1.9">
                    <link rel="stylesheet" href="../../antora/css/site.css">
                    <link rel="stylesheet" href="../../antora/css/custom.css">
                    <link rel="stylesheet" href="../../antora/css/font-awesome.min.css">
                    <link rel="stylesheet" href="../../antora/css/extra.css">
                    <script>var uiRootPath = '../../antora'</script>
                  </head>
                  <body></body>
                </html>
            `
        )
      })
      expect(htmlPage.getTitle()).eq('Long Title with spaces')
    })
    it('long title with spaces around', () => {
      const htmlPage = new HtmlPage({
        content: HTMLParser.parse(`<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title> Long Title with spaces around </title>
                <meta name="generator" content="Antora 3.1.9">
                <link rel="stylesheet" href="../../antora/css/site.css">
                <link rel="stylesheet" href="../../antora/css/custom.css">
                <link rel="stylesheet" href="../../antora/css/font-awesome.min.css">
                <link rel="stylesheet" href="../../antora/css/extra.css">
                <script>var uiRootPath = '../../antora'</script>
              </head>
              <body></body>
            </html>
        `
        )
      })
      expect(htmlPage.getTitle()).eq('Long Title with spaces around')
    })
  })
  it('metaData', () => {
    const htmlPage = new HtmlPage({
      content: HTMLParser.parse(`<!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width,initial-scale=1">
                  <title>Long Title with spaces</title>
                  <meta name="generator" content="Antora 3.1.9">
                  <link rel="stylesheet" href="../../antora/css/site.css">
                  <link rel="stylesheet" href="../../antora/css/custom.css">
                  <link rel="stylesheet" href="../../antora/css/font-awesome.min.css">
                  <link rel="stylesheet" href="../../antora/css/extra.css">
                  <script>var uiRootPath = '../../antora'</script>
                </head>
                <body></body>
              </html>`.trim())
    })
    expect(htmlPage.getSize()).eq(775)
    expect(htmlPage.getTitle()).eq('Long Title with spaces')
  })
})
