#!/usr/bin/env node

'use strict'

process.title = 'HtmlSanityCheck'

const { loadOptions } = require('../lib/cli/options')

const htmlSanityCheckArgs = {}

const opts = loadOptions(process.argv.slice(2))
// sort options into "node" and "mocha" buckets
Object.keys(opts).forEach(opt => {
  htmlSanityCheckArgs[opt] = opts[opt]
})

require('../lib/cli/cli').main([], htmlSanityCheckArgs)
