'use strict';


var Israblog = require('./classes/israblog');
var DB = require('./classes/db');
var Email = require('./classes/email');
var config = require('./config');

var BLOG_TO_CRAWL = 50;
var foundEmails;

(function main() {
    var mailSender = new Email();

     DB.getStoredItems().then(function(items) {
        foundEmails = items;
     });


    for(var i = 0; i < BLOG_TO_CRAWL; i++) {
        Israblog.getRandomBlogId().then(function(blogId) {
            if(blogId) {
                Israblog.getBlogById(blogId).then(function(blog) {
                    var age = blog.getAge();
                    if((age <= config.AGES.MAX && age >= config.AGES.MIN) || age === -1) {
                        if(blog.getGender() === config.GENDERS.FEMALE) {
                            var email = blog.getEmail();
                                if(email) {
                                    if(!(email in foundEmails)) {
                                        foundEmails[email] = {blogId: blogId, age: age};
                                        mailSender.sendMail(email);
                                        DB.storeItems(foundEmails);
                                    }
                                }
                        }
                    }
                })
            }
        })
    }
})();