'use strict';


var Israblog = require('./classes/israblog');
var DB = require('./classes/db');
var Email = require('./classes/email');
var config = require('./config');

var foundEmails;

(function main() {
    /*DB.getStoredItems().then(function(items) {
        foundEmails = items;
    });


    for(var i = 0; i < 20; i++) {
        Israblog.getRandomBlogId().then(function(blogId) {
            if(blogId) {
                Israblog.getBlogById(blogId).then(function(blog) {
                    if(blog.getGender() === config.GENDERS.FEMALE) {
                        var email = blog.getEmail();
                        if(email) {
                            if(!(email in foundEmails)) {
                                foundEmails[email] = blogId;
                                DB.storeItems(foundEmails);
                            }
                        }
                    }
                })
            }
        })
    }*/

    var mailSender = new Email();
    mailSender.sendMail('gabay.ephi@gmail.com');
})();