'use strict';

var fs = require('fs');
var github = require('octonode');
var contacts = {};
    contacts.load = load;

function load(file) {
    if (typeof file === "undefined") {
        return false;
    }

    var token = process.env.GITHUB_CLIENT || '';
    var contactsList = JSON.parse(fs.readFileSync(file, 'utf8'));
    var githubClient = github.client(token);
    var me = githubClient.me();
    var search = githubClient.search();

    contactsList.connections.forEach(function(contact) {
        setTimeout(function() {
            if ("emailAddresses" in contact === false) {
                return;
            }

            var email = contact.emailAddresses[0].value;

            search.users({
                q: `${email} in:email`,
                sort: 'created',
                order: 'asc'
            }, function (err, data) {
                if (err) {
                    console.error('ERROR: ' + err.body.message);
                    return;
                }

                if (data.total_count > 0) {
                    var username = data.items[0].login;

                    me.follow(username, function(err, result) {
                        console.log(email + ' => @' + username);
                    });
                }
            })
        }, 10000);
    });
}

module.exports = contacts;