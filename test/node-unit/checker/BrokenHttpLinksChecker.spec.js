const sinon = require('sinon')
const proxyquire = require('proxyquire')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
chai.use(dirtyChai)
const { expect } = chai

describe('BrokenHttpLinksChecker', () => {
  let checker
  let dnsStub
  let createChecker

  beforeEach(() => {
    // Stub the dns module
    dnsStub = sinon.stub()
    const dnsModule = {
      lookup: dnsStub,
      ADDRCONFIG: 1,
      V4MAPPED: 2
    }

    // Use proxyquire to inject the stubbed dns module
    createChecker = proxyquire('../../../lib/checker/BrokenHttpLinksChecker', {
      'node:dns': dnsModule
    }).createChecker

    checker = createChecker({}, {})
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('noInternetConnection', () => {
    it('should return true when DNS lookup is successful (callback executes)', () => {
      // Simulate successful DNS lookup by calling the callback immediately
      dnsStub.callsArgWith(2, null, '140.82.112.3', 4)

      const result = checker.noInternetConnection()

      // When callback executes immediately, success gets set to true
      expect(result).to.equal(true)
      expect(dnsStub.calledWith('github.com', {
        family: 6,
        hints: 3 // dns.ADDRCONFIG | dns.V4MAPPED
      })).to.be.true()
    })

    it('should return true when DNS lookup fails (callback executes)', () => {
      // Simulate failed DNS lookup by calling callback with error
      dnsStub.callsArgWith(2, new Error('DNS lookup failed'))

      const result = checker.noInternetConnection()

      // When callback executes immediately, success gets set to true regardless of error
      expect(result).to.equal(true)
      expect(dnsStub.calledWith('github.com', {
        family: 6,
        hints: 3
      })).to.be.true()
    })

    it('should return false immediately without waiting for callback', () => {
      // Don't call the callback to simulate async behavior
      dnsStub.returns(undefined)

      const result = checker.noInternetConnection()

      // The method returns false because success is initialized to false
      // and returned before any callback can execute
      expect(result).to.equal(false)
      expect(dnsStub.calledOnce).to.be.true()
    })
  })
})
