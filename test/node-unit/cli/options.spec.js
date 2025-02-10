/* global describe it */
'use strict'

const chai = require('chai')
const expect = chai.expect
const { loadOptions } = require('../../../lib/cli/options')

describe('options', () => {
  it('load default options', function () {
    const actualOptions = loadOptions()
    expect(actualOptions).to.be.deep.equal({
      _: [],
      config: false,
      sourceDir: '.',
      extension: ['html'],
      recursive: true,
      package: './package.json',
      reporter: {
        junit: {
          outputPath: './test-results/htmlSanityCheck',
          enabled: true
        },
        sonar: {
          outputPath: './test-results/htmlSanityCheck',
          enabled: false
        }
      },
      checkers: {
        BrokenHttpLinksChecker: {
          ignoreLocalHost: false,
          ignoreIPAddresses: false,
          httpConnectionTimeout: 5000,
          httpSuccessCodes: [
            200, 201, 202, 203,
            204, 205, 206, 207,
            208, 226
          ],
          httpWarningCodes: [
            100, 101, 102, 300,
            301, 302, 303, 304,
            305, 306, 307, 308
          ],
          httpErrorCodes: [
            400, 401, 402, 403, 404, 405, 406, 407, 408,
            409, 410, 411, 412, 413, 414, 415, 416, 417,
            418, 419, 420, 421, 422, 423, 424, 425, 426,
            427, 428, 429, 430, 431, 432, 433, 434, 435,
            436, 437, 438, 439, 440, 441, 442, 443, 444,
            445, 446, 447, 448, 449, 450, 451, 500, 501,
            502, 503, 504, 505, 506, 507, 508, 509, 510,
            511
          ]
        },
        MissingImageFilesChecker : {},
        DuplicatedIdChecker: {},
        MissingAltInImageTagsChecker: {},
        ImageMapChecker: {},
        MissingLocalResourcesChecker: {}
      },
      traceLogging: false,
      checkingResultDir: './reports/htmlSanityCheck'
    })
  })
})
