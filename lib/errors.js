'use strict'

/**
 * When HtmlSanityCheck throws exceptions (or rejects `Promise`s), it attempts to assign a `code` property to the `Error` object, for easier handling. These are the potential values of `code`.
 * @public
 * @namespace
 * @memberof module:lib/errors
 */

const constants = {
  /**
     * No files matched the pattern provided by the user
     * @constant
     * @default
     */
  NO_FILES_MATCH_PATTERN: 'ERR_HTMLSANITYCHECK_NO_FILES_MATCH_PATTERN',

  /**
   * Input file is not able to be parsed
   * @constant
   * @default
   */
  UNPARSABLE_FILE: 'ERR_MOCHA_UNPARSABLE_FILE',

  /**
   * The type of an argument to a function call is invalid
   * @constant
   * @default
   */
  INVALID_ARG_TYPE: 'ERR_MOCHA_INVALID_ARG_TYPE'
}

/**
 * Creates an error object to be thrown when no files to be tested could be found using specified pattern.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} pattern - User-specified argument value.
 * @returns {Error} instance detailing the error condition
 */
function createNoFilesMatchPatternError (message, pattern) {
  const err = new Error(message)
  err.code = constants.NO_FILES_MATCH_PATTERN
  err.pattern = pattern
  return err
}

/**
 * Creates an error object to be thrown when file is unparsable
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} filename - File name
 * @returns {Error} Error with code {@link constants.UNPARSABLE_FILE}
 */
function createUnparsableFileError (message, filename) {
  const err = new Error(message)
  err.code = constants.UNPARSABLE_FILE
  return err
}

/**
 * Creates an error object to be thrown when an argument did not use the supported type
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} expected - Expected argument datatype.
 * @returns {Error} instance detailing the error condition
 */
function createInvalidArgumentTypeError (message, argument, expected) {
  const err = new TypeError(message)
  err.code = constants.INVALID_ARG_TYPE
  err.argument = argument
  err.expected = expected
  err.actual = typeof argument
  return err
}

/**
 * Creates an error object to be thrown when an argument is missing.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} expected - Expected argument datatype.
 * @returns {Error} instance detailing the error condition
 */
function createMissingArgumentError (message, argument, expected) {
  return createInvalidArgumentTypeError(message, argument, expected)
}

module.exports = {
  constants,
  createNoFilesMatchPatternError,
  createUnparsableFileError,
  createMissingArgumentError
}
