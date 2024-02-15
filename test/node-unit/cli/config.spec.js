/* global describe afterEach beforeEach it */
'use strict'

const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const rewiremock = require('rewiremock/node')
const { parsers } = require('../../../lib/cli/config')

describe('cli/config', () => {
  const phonyConfigObject = { ok: true }

  afterEach(() => {
    sinon.restore()
  })

  describe('loadConfig()', () => {
    let parsers
    let loadConfig

    beforeEach(() => {
      const config = rewiremock.proxy(
        require.resolve('../../../lib/cli/config')
      )
      parsers = config.parsers
      loadConfig = config.loadConfig
    })

    describe('when parsing succeeds', function () {
      beforeEach(function () {
        sinon.stub(parsers, 'yaml').returns(phonyConfigObject)
        sinon.stub(parsers, 'json').returns(phonyConfigObject)
        sinon.stub(parsers, 'js').returns(phonyConfigObject)
      })

      describe('when supplied a filepath with ".yaml" extension', function () {
        const filepath = 'foo.yaml'

        it('should use the YAML parser', function () {
          const conf = loadConfig(filepath)
          expect(parsers.yaml.calledOnce).to.be.true
          expect(conf).to.be.eq(phonyConfigObject)
        })
      })

      describe('when supplied a filepath with ".yml" extension', function () {
        const filepath = 'foo.yml'

        it('should use the YAML parser', function () {
          const conf = loadConfig(filepath)
          expect(conf).to.be.eq(phonyConfigObject)
          expect(parsers.yaml.calledWith(filepath)).to.be.true
          expect(parsers.yaml.calledOnce).to.be.true
        })
      })

      describe('when supplied a filepath with ".js" extension', function () {
        const filepath = 'foo.js'

        it('should use the JS parser', function () {
          const conf = loadConfig(filepath)
          expect(conf).to.be.eq(phonyConfigObject)
          expect(parsers.js.calledWith(filepath)).to.be.true
          expect(parsers.js.calledOnce).to.be.true
        })
      })

      describe('when supplied a filepath with ".json" extension', function () {
        const filepath = 'foo.json'

        it('should use the JSON parser', function () {
          const conf = loadConfig(filepath)
          expect(conf).to.be.eq(phonyConfigObject)
          expect(parsers.json.calledWith(filepath)).to.be.true
          expect(parsers.json.calledOnce).to.be.true
        })
      })
    })

    describe('when supplied a filepath with unsupported extension', function () {
      beforeEach(function () {
        sinon.stub(parsers, 'json').returns(phonyConfigObject)
      })

      it('should use the JSON parser', function () {
        loadConfig('foo.bar')
        expect(parsers.json, 'was called')
      })
    })

    describe('when config file parsing fails', function () {
      beforeEach(function () {
        sinon.stub(parsers, 'yaml').throws('goo.yaml is unparsable')
      })

      it('should throw', function () {
        expect(
          () => loadConfig('goo.yaml'),
          'to throw',
          'Unable to read/parse goo.yaml: goo.yaml is unparsable'
        )
      })
    })
  })
})
