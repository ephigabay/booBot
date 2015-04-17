'use strict';


var Israblog = require('./classes/israblog');
var config = require('./config');

for(var i = 0; i < 10; i++) {
    Israblog.getRandomBlogId().then(function(blogId) {
        if(blogId) {
            Israblog.getBlogById(blogId).then(function(blog) {
                if(blog.getGender() === config.GENDERS.FEMALE) {
                    var email = blog.getEmail();
                    if(email) {
                        console.log(email);
                    }
                }
            })
        }
    })
}
