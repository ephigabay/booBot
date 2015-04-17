'use strict';

var http = require("q-io/http");
var windows1255 = require('windows-1255');

var ISRABLOG_PATH = 'http://israblog.nana10.co.il/';
var ISRABLOG_RANDOM_PAGE = ISRABLOG_PATH + 'random.asp';
var ISRABLOG_BLOG_URL = ISRABLOG_PATH + 'blogread.asp?blog={BLOG_ID}';


function getBlogContent(blogId) {
    http.request(ISRABLOG_BLOG_URL.replace('{BLOG_ID}', blogId)).then(function(res) {
        return res.body.read().then(function(bodyStream){

            var body = windows1255.decode( bodyStream.toString('binary'));
            if(body.match(/<b>בת:<\/b>/g)) {
                var regexMatches = body.match(/displayEmail\(.*?,'(.*?)','(.*?)'/);
                if(regexMatches) {
                    console.log(regexMatches[1] + '@' + regexMatches[2]);
                }
            }
        });
    })
}

function getRandomBlogId() {
    http.request(ISRABLOG_RANDOM_PAGE).then(function(res) {
        return res.body.read().then(function(bodyStream){
            var body = bodyStream.toString('UTF-8');
            getBlogContent(body.match(/\?blog=(\d+)/)[1]);
        });
    });
}

for(var i = 0; i < 20; i++) {
    getRandomBlogId();
}
