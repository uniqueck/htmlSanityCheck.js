'use strict'

const debug = require('debug')('htmlSanityCheck:cli:options')

/**
 * Main entry point for handling filesystem-based configuration,
 * whether that's a config file or `package.json` or whatever.
 * @module lib/cli/options
 * @private
 */

const { loadConfig, findConfig, CONFIG_FILES } = require('./config')
const yargsParser = require('yargs-parser')
const ansi = require('ansi-colors')
const htmlsanitycheckrc = require('../htmlsanitycheckrc.json')
const { types, aliases } = require('./run-option-metadata')
const { list } = require('./run-helpers')

/**
 * Base yargs parser configuration
 * @private
 */
const YARGS_PARSER_CONFIG = {
  'combine-arrays': true,
  'short-option-groups': false,
  'dot-notation': false,
  'strip-aliased': true
}

/**
 * This is the config pulled from the `yargs` property of HtmlSanityCheck's
 * `package.json`, but it also disables camel case expansion as to
 * avoid outputting non-canonical keynames, as we need to do some
 * lookups.
 * @private
 * @ignore
 */
const configuration = Object.assign({}, YARGS_PARSER_CONFIG, {
  'camel-case-expansion': false
})

/**
 * This is a really fancy way to:
 * - `array`-type options: ensure unique values and evtl. split comma-delimited lists
 * - `boolean`/`number`/`string`- options: use last element when given multiple times
 * This is passed as the `coerce` option to `yargs-parser`
 * @private
 * @ignore
 */
const globOptions = ['spec', 'ignore']
const coerceOpts = Object.assign(
  types.array.reduce(
    (acc, arg) =>
      Object.assign(acc, {
        [arg]: v => Array.from(new Set(globOptions.includes(arg) ? v : list(v)))
      }),
    {}
  ),
  types.boolean
    .concat(types.string, types.number)
    .reduce(
      (acc, arg) =>
        Object.assign(acc, { [arg]: v => (Array.isArray(v) ? v.pop() : v) }),
      {}
    )
)

/**
 * We do not have a case when multiple arguments are ever allowed after a flag
 * (e.g., `--foo bar baz quux`), so we fix the number of arguments to 1 across
 * the board of non-boolean options.
 * This is passed as the `narg` option to `yargs-parser`
 * @private
 * @ignore
 */
const nargOpts = types.array
  .concat(types.string, types.number)
  .reduce((acc, arg) => Object.assign(acc, { [arg]: 1 }), {})

/**
 * Wrapper around `yargs-parser` which applies our settings
 * @param {string|string[]} args - Arguments to parse
 * @param {Object} defaultValues - Default values of mocharc.json
 * @param  {...Object} configObjects - `configObjects` for yargs-parser
 * @private
 * @ignore
 */
const parse = (args = [], defaultValues = {}, ...configObjects) => {
  // save node-specific args for special handling.
  // 1. when these args have a "=" they should be considered to have values
  // 2. if they don't, they just boolean flags
  // 3. to avoid explicitly defining the set of them, we tell yargs-parser they
  //    are ALL boolean flags.
  // 4. we can then reapply the values after yargs-parser is done.
  const nodeArgs = (Array.isArray(args) ? args : args.split(' '))

  const result = yargsParser.detailed(args, {
    configuration,
    configObjects,
    default: defaultValues,
    coerce: coerceOpts,
    narg: nargOpts,
    alias: aliases,
    string: types.string,
    array: types.array,
    number: types.number,
    boolean: types.boolean.concat(nodeArgs.map(pair => pair[0]))
  })

  if (result.error) {
    console.error(ansi.red(`Error: ${result.error.message}`))
    process.exit(1)
  }

  // reapply "=" arg values from above
  nodeArgs.forEach(([key, value]) => {
    result.argv[key] = value
  })

  return result.argv
}

/**
 * Given path to config file in `args.config`, attempt to load & parse config file.
 * @param {Object} [args] - Arguments object
 * @param {string|boolean} [args.config] - Path to config file or `false` to skip
 * @public
 * @alias module:lib/cli.loadRc
 * @returns {external:yargsParser.Arguments|void} Parsed config, or nothing if `args.config` is `false`
 */
const loadRc = (args = {}) => {
  let configFile
  if (args.config != null) {
    debug(`Loading config file specified by cli command: ${args.config}`)
    configFile = args.config
  } else {
    debug(`Searching for default config files: ${CONFIG_FILES}`)
    configFile = findConfig()
  }
  let config = {}
  if (configFile != null) {
    debug(`Loading config file ${configFile}`)
    config = loadConfig()
  } else {
    debug('No config file defined by cli command and no default config files found')
  }
  return config
}

module.exports.loadRc = loadRc

/**
 * Priority list:
 *
 * 1. Command-line args
 * 2. RC file (`.htmlsanitycheckrc.c?js`, `.htmlsanitycheckrc.ya?ml`, `htmlsanitycheckrc.json`)
 * 4. default configuration (`lib/htmlsanitycheckrc.json`)
 *
 * @summary Parses options read from `.htmlsanitycheckrc.*` and `package.json`.
 * @param {string|string[]} [argv] - Arguments to parse
 * @public
 * @alias module:lib/cli.loadOptions
 * @returns {external:yargsParser.Arguments} Parsed args from everything
 */
const loadOptions = (argv = []) => {
  let args = parse(argv)
  // short-circuit: look for a flag that would abort loading of options

  const rcConfig = loadRc(args)

  if (rcConfig) {
    args.config = false
    args._ = args._.concat(rcConfig._ || [])
  }

  debug(`Loading default config: ${JSON.stringify(htmlsanitycheckrc)}`)
  args = parse(args._, htmlsanitycheckrc, args, rcConfig || {})

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
module.exports.YARGS_PARSER_CONFIG = YARGS_PARSER_CONFIG
