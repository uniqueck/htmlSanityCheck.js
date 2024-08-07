/* global describe it */
'use strict'

const { findFiles, cwd } = require('../../lib/utils')
const chai = require('chai')
const path = require('path')
const expect = chai.expect

describe('findFiles', () => {
  it('non recursive', () => {
    const files = findFiles(`${cwd()}/test/fixtures`, false, ['html'])
    expect(files).to.have.lengthOf(1)
    expect(files).has.deep.members([
      { filePath: path.join(cwd(), 'test', 'fixtures'), fileName: 'file-to-test.html' }
    ])
  })
  it('recursive', () => {
    const files = findFiles(`${cwd()}/test/fixtures`, true, ['html'])
    expect(files).to.have.lengthOf(5)
    expect(files).has.deep.members([
      { filePath: path.join(cwd(), 'test', 'fixtures'), fileName: 'file-to-test.html' },
      { filePath: path.join(cwd(), 'test', 'fixtures', 'html-files'), fileName: 'brokenHttpLinksChecker_127_0_0_2.html' },
      { filePath: path.join(cwd(), 'test', 'fixtures', 'html-files'), fileName: 'brokenHttpLinksChecker_github.com.html' },
      { filePath: path.join(cwd(), 'test', 'fixtures', 'html-files'), fileName: 'brokenHttpLinksChecker_localhost.html' },
      { filePath: path.join(cwd(), 'test', 'fixtures', 'sub_dr'), fileName: 'brokenHttpLinksChecker.html' }
    ])
  })
  it('empty extensions', () => {
    const files = findFiles(`${cwd()}/test/fixtures`, true, [])
    expect(files).to.have.lengthOf(0)
  })
})
