'use strict';


var Israblog = require('./classes/israblog');
var DB = require('./classes/db');
var config = require('./config');

var foundEmails;

(function main() {
    DB.getStoredItems().then(function(items) {
        foundEmails = items;
    });


    for(var i = 0; i < 10; i++) {
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
    }
})();