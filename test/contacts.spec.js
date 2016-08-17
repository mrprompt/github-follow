'use strict';

var contacts = require('../src/contacts'),
    should = require('should');

describe('Contacts', function() {
    it('should start object without errors', function(done) {
        should(contacts).be.a.Object();

        done();
    });

    it('should be have a load function defined', function(done) {
        should(contacts.load).be.a.Function();

        done();
    });

    it('run load function without parameters should be dispatch an error', function(done) {
        should(contacts.load()).be.a.TypeError;

        done();
    })

    it('run load function should be return a array', function(done) {
        should(contacts.load(__dirname + '/data/contacts.json')).be.a.Array;

        done();
    })
});