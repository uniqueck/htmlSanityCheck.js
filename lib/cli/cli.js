#!/usr/bin/env node

'use strict'

const yargs = require('yargs/yargs')
const path = require('path')
const ansi = require('ansi-colors')
const symbols = require('log-symbols')
const commands = require('./commands')

const {
    loadRc,
    loadPkgRc,
    loadOptions,
    YARGS_PARSER_CONFIG
} = require('./options')

const lookupFiles = require('./lookup-files')

const {repository, homepage, version, discord} = require('../../package.json')
const {cwd} = require('../utils')

exports.main = (argv = process.argv.slice(2), htmlSanityCheckArgs) => {
    // ensure we can require() from current working directory
    if (typeof module.paths !== 'undefined') {
        module.paths.push(cwd(), path.resolve('node_modules'));
    }

    Error.stackTraceLimit = Infinity; // configurable via --stack-trace-limit?

    const args = htmlSanityCheckArgs || loadOptions(argv)

    yargs()
        .scriptName('htmlSanityCheck')
        .command(commands.run)
        .updateStrings({
            'Positionals:': 'Positional Arguments',
            'Options:': 'Other Options',
            'Commands:': 'Commands'
        })
        .fail((msg, err, yargs) => {
            debug('caught error sometime before command handler: %O', err);
            yargs.showHelp();
            console.error(`\n${symbols.error} ${ansi.red('ERROR:')} ${msg}`);
            process.exitCode = 1;
        })
        .help('help', 'Show usage information & exit')
        .alias('help', 'h')
        .version('version', 'Show version number & exit', version)
        .alias('version', 'V')
        .wrap(process.stdout.columns ? Math.min(process.stdout.columns, 80) : 80)
        .epilog(
            `HtmlSanityCheck Resources
  GitHub: ${ansi.blue(repository.url)}
    Docs: ${ansi.yellow(homepage)}
      `
        )
        .parserConfiguration(YARGS_PARSER_CONFIG)
        .config(args)
        .parse(args._)
}


exports.lookupFiles = lookupFiles;
exports.loadOptions = loadOptions;
exports.loadPkgRc = loadPkgRc;
exports.loadRc = loadRc

// allow direct execution
if (require.main === module) {
    exports.main();
}

