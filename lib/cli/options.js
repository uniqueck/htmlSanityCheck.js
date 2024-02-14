'use strict'

/**
 * Main entry point for handling filesystem-based configuration,
 * whether that's a config file or `package.json` or whatever.
 * @module lib/cli/options
 * @private
 */

const fs = require('fs')
const { loadConfig, findConfig } = require('./config')

/**
 * Priority list:
 *
 * 1. Command-line args
 * 2. RC file (`.mocharc.c?js`, `.mocharc.ya?ml`, `mocharc.json`)
 * 3. `mocha` prop of `package.json`
 * 4. default configuration (`lib/mocharc.json`)
 *
 * If a {@link module:lib/cli/one-and-dones.ONE_AND_DONE_ARGS "one-and-done" option} is present in the `argv` array, no external config files will be read.
 * @summary Parses options read from `.mocharc.*` and `package.json`.
 * @param {string|string[]} [argv] - Arguments to parse
 * @public
 * @alias module:lib/cli.loadOptions
 * @returns {external:yargsParser.Arguments} Parsed args from everything
 */
const loadOptions = (argv = []) => {
  let args = parse(argv)
  // short-circuit: look for a flag that would abort loading of options
  if (
    Array.from(ONE_AND_DONE_ARGS).reduce(
      (acc, arg) => acc || arg in args,
      false
    )
  ) {
    return args
  }

  const rcConfig = loadRc(args)
  const pkgConfig = loadPkgRc(args)

  if (rcConfig) {
    args.config = false
    args._ = args._.concat(rcConfig._ || [])
  }
  if (pkgConfig) {
    args.package = false
    args._ = args._.concat(pkgConfig._ || [])
  }

  args = parse(args._, mocharc, args, rcConfig || {}, pkgConfig || {})

  // recombine positional arguments and "spec"
  if (args.spec) {
    args._ = args._.concat(args.spec)
    delete args.spec
  }

  // make unique
  args._ = Array.from(new Set(args._))

  return args
}

module.exports.loadOptions = loadOptions
