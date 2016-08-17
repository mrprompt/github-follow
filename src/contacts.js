'use strict';

var fs = require('fs');

var contacts = {};
    contacts.load = load;

function load(file) {
    var list = [];
    
    if (typeof file === "undefined") {
        return list;
    }

    var contactsList = JSON.parse(fs.readFileSync(file, 'utf8'));

    contactsList.connections.forEach(function(contact) {
        if ("emailAddresses" in contact === false) {
            return;
        }

        list.push(contact.emailAddresses[0].value);
    });

    return list;
}

module.exports = contacts;