'use strict'

const {format} = require('util')

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
function createNoFilesMatchPatternError(message, pattern) {
    var err = new Error(message);
    err.code = constants.NO_FILES_MATCH_PATTERN;
    err.pattern = pattern;
    return err;
}


module.exports = {
    constants,
    createNoFilesMatchPatternError
}