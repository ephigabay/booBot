'use strict';


var Israblog = require('./classes/israblog');
var DB = require('./classes/db');
var Email = require('./classes/email');
var config = require('./config');

var foundEmails;

(function main() {
    /*DB.getStoredItems().then(function(items) {
     foundEmails = items;
     });*/

    var blogsToCrawl = 5;

    for(var i = 0; i < blogsToCrawl; i++) {
        Israblog.getRandomBlogId().then(function(blogId) {
            if(blogId) {
                Israblog.getBlogById(blogId).then(function(blog) {
                    console.log(blog.getAge());
                })
            }
        })
    }


/*var mailSender = new Email();
 mailSender.sendMail('gabay.ephi@gmail.com');*/
})();

/*var males = 0;
 var females = 0;
 var unknownGender = 0;

 var malesWithEmail = 0;
 var femalesWithEmail = 0;
 var unknownGenderWithEmail = 0;

 var blogsToCrawl = 100;

 for(var i = 0; i < blogsToCrawl; i++) {
 Israblog.getRandomBlogId().then(function(blogId) {
 if(blogId) {
 Israblog.getBlogById(blogId).then(function(blog) {
 if(blog.getGender() === config.GENDERS.FEMALE) {
 females++;
 if(blog.getEmail()) {
 femalesWithEmail++;
 }
 }
 else if(blog.getGender() === config.GENDERS.MALE) {
 males++;
 if(blog.getEmail()) {
 malesWithEmail++;
 }
 }
 else {
 unknownGender++;
 if(blog.getEmail()) {
 unknownGenderWithEmail++;
 }
 }

 if(males + females + unknownGender === blogsToCrawl) {
 console.log("Males: " + males / blogsToCrawl);
 console.log("Females: " + females / blogsToCrawl);
 console.log("Unknown: " + unknownGender / blogsToCrawl);
 console.log("---");
 console.log("Males with mail: " + malesWithEmail / males);
 console.log("Females with mail: " + femalesWithEmail / females);
 console.log("Unknown with mail: " + unknownGenderWithEmail / unknownGender);
 }
 //if(blog.getGender() === config.GENDERS.FEMALE) {
 //    var email = blog.getEmail();
 //    if(email) {
 //        if(!(email in foundEmails)) {
 //            foundEmails[email] = blogId;
 //            DB.storeItems(foundEmails);
 //        }
 //    }
 //}
 })
 }
 })
 }
 */