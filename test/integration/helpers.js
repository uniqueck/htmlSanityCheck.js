'use strict'

const debug = require('debug')('htmlSanityCheck.js:test:integration:helpers')

/**
 * Path to `mocha` executable
 */
const HTMLSANITYCHECK_EXECUTABLE = require.resolve('../../bin/htmlsanitycheck')

/**
 * Invoke `mocha` with default arguments. Calls `done` upon exit. Does _not_ accept a fixture path.
 *
 * Good for testing error conditions. This is low-level, and you likely want
 * {@link runMocha} or even {@link runMochaJSON} if you are running test fixtures.
 *
 * @param {string[]|RawResultCallback} args - Args to `mocha` or callback
 * @param {RawResultCallback|Object} done - Callback or options
 * @param {Object} [opts] - Options
 * @returns {ChildProcess}
 */
function invokeHtmlSanityCheck (args, done, opts = {}) {
  if (typeof args === 'function') {
    opts = done
    done = args
    args = []
  }
  return createSubprocess(
    defaultArgs([HTMLSANITYCHECK_EXECUTABLE].concat(args)),
    done,
    opts
  );
}

/**
 * Creates a subprocess and calls callback `done` when it has exited.
 *
 * This is the most low-level function and should _not_ be exported.
 *
 * @param {string[]} args - Path to executable and arguments
 * @param {RawResultCallback} done - Callback
 * @param {Object|string} [opts] - Options to `child_process` or 'pipe' for shortcut to `{stdio: pipe}`
 * @param {boolean} [opts.fork] - If `true`, use `child_process.fork` instead
 * @returns {import('child_process').ChildProcess}
 */
function createSubprocess (args, done, opts = {}) {
  let output = ''

  if (opts === 'pipe') {
    opts = { stdio: ['inherit', 'pipe', 'pipe'] }
  }

  const env = { ...process.env }
  // prevent DEBUG from borking STDERR when piping, unless explicitly set via `opts`
  delete env.DEBUG;

  opts = {
    cwd: process.cwd(),
    stdio: ['inherit', 'pipe', 'inherit'],
    env,
    ...opts
  }

  /**
   * @type {import('child_process').ChildProcess}
   */
  let htmlsanitycheck
  if (opts.fork) {
    const { fork } = require('child_process')
    // to use ipc, we need a fourth item in `stdio` array.
    // opts.stdio is usually an array of length 3, but it could be smaller
    // (pad with `null`)
    for (let i = opts.stdio.length; i < 4; i++) {
      opts.stdio.push(i === 3 ? 'ipc' : null)
    }
    debug('forking: %s', args.join(' '))
    htmlsanitycheck = fork(args[0], args.slice(1), opts)
  } else {
    const {spawn} = require('child_process')
    debug('spawning: %s', [process.execPath].concat(args).join(' '))
    htmlsanitycheck = spawn(process.execPath, args, opts)
  }

  const listener = data => {
    output += data
  }

  htmlsanitycheck.stdout.on('data', listener)
  if (mocha.stderr) {
    htmlsanitycheck.stderr.on('data', listener)
  }
  htmlsanitycheck.on('error', done)

  htmlsanitycheck.on('close', code => {
    done(null, {
      output,
      code,
      args,
      command: args.join(' ')
    })
  })

  return htmlsanitycheck
}
