#!/usr/bin/env node
'use strict';

var argv = require('minimist')(process.argv.slice(2), {verbose: false});
var result = require('./src/contacts').load(argv._[0]);

if (argv.verbose === true) {
    result.forEach(function(row) {
        console.log(row);
    });
}
