'use strict'

/**
 * Definition for HtmlSanityChecks's default ("run tests") command
 *
 * @module
 * @private
 */

const HtmlSanityCheck = require('../allChecksRunner')
const { types, aliases } = require('./run-option-metadata')

/**
 * Logical option groups
 * @constant
 */
const GROUPS = {
  FILES: 'File Handling',
  FILTERS: 'Test Filters',
  NODEJS: 'Node.js & V8',
  OUTPUT: 'Reporting & Output',
  RULES: 'Rules & Behavior',
  CONFIG: 'Configuration'
}

exports.command = ['$0', 'inspect']

exports.describe = 'Run tests with HtmlSanityCheck'

exports.builder = yargs =>
  yargs.options({
    config: {
      config: true,
      defaultDescription: '(nearest rc file)',
      description: 'Path to config file',
      group: GROUPS.CONFIG
    },
    exit: {
      description: 'Force HtmlSanityCheck to quit after tests complete',
      group: GROUPS.RULES
    },
    package: {
      description: 'Path to package.json for config',
      group: GROUPS.CONFIG,
      normalize: true,
      requiresArg: true
    },
    sourceDir: {
      description: 'Base directory for searching html files',
      group: GROUPS.FILES
    },
    recursive: {
      description: 'Look for html files in subdirectories',
      group: GROUPS.FILES
    }
  })
    .array(types.array)
    .boolean(types.boolean)
    .string(types.string)
    .number(types.number)
    .alias(aliases)

exports.handler = async function (argv) {
  try {
    await new HtmlSanityCheck(argv).performAllChecks()
  } catch (err) {
    console.error('\n Exception during run:', err)
    process.exit(1)
  }
}
