'use strict';

var argv = require('minimist')(process.argv.slice(2));

var contacts = require('./src/contacts');
    contacts.load(argv._[0]);