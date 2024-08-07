'use strict'

/**
 * Metadata about various options of the `run` command
 * @see module:lib/cli/run
 * @module
 * @private
 */

/**
 * Dictionary of yargs option types to list of options having said type
 * @type {{string:string[]}}
 * @private
 */
/* eslint-disable-next-line no-unused-vars */
const TYPES = (exports.types = {
  array: [
  ],
  boolean: [
    'recursive',
    'exit'
  ],
  number: ['retries', 'jobs'],
  string: [
    'config',
    'sourceDir',
    'package'
  ]
})

/**
 * Option aliases keyed by canonical option name.
 * Arrays used to reduce
 * @type {{string:string[]}}
 * @private
 */
exports.aliases = {
  'async-only': ['A'],
  bail: ['b'],
  color: ['c', 'colors'],
  fgrep: ['f'],
  global: ['globals'],
  grep: ['g'],
  ignore: ['exclude'],
  invert: ['i'],
  jobs: ['j'],
  'no-colors': ['C'],
  'node-option': ['n'],
  parallel: ['p'],
  reporter: ['R'],
  'reporter-option': ['reporter-options', 'O'],
  require: ['r'],
  slow: ['s'],
  sort: ['S'],
  timeout: ['t', 'timeouts'],
  ui: ['u'],
  watch: ['w']
}
