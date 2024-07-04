'use strict'

/**
 * Helper scripts for the `run` command
 * @see module:lib/cli/run
 * @module
 * @private
 */

/**
 * Coerce a comma-delimited string (or array thereof) into a flattened array of
 * strings
 * @param {string|string[]} str - Value to coerce
 * @returns {string[]} Array of strings
 * @private
 */
exports.list = str =>
  Array.isArray(str) ? exports.list(str.join(',')) : str.split(/ *, */)
