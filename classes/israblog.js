/**
 * Created by ephi on 4/17/15.
 */
var http = require('q-io/http');
var q = require('q');
var windows1255 = require('windows-1255');
var config = require('../config');

module.exports = Israblog;

/**
 * Israblog blog class
 * @param {string} blogId - Blog id
 * @param {string} [html] - blog html content
 * @constructor
 */
function Israblog(blogId, html) {
    this.blogId = blogId;
    this.html = html;
}

/* Public methods */
/**
 * Gets the gender of the blog
 * @returns {Number} one of the following: config.GENDERS.MALE, config.GENDERS.FEMALE, config.GENDERS.UNKNOWN
 */
Israblog.prototype.getGender = function() {
    if(!this.html) {
        return config.GENDERS.UNKNOWN;
    }

    if(this.html.match(/<b>בת:<\/b>/)) {
        return config.GENDERS.FEMALE;
    }

    if(this.html.match(/<b>בן:<\/b>/g)) {
        return config.GENDERS.MALE;
    }

    return config.GENDERS.UNKNOWN;
};

/**
 * Gets the email of the user in the blog
 * @returns {string} the email if exists otherwise null
 */
Israblog.prototype.getEmail = function() {
    if(!this.html) {
        return null;
    }

    var regexMatches = this.html.match(/displayEmail\(.*?,'(.*?)','(.*?)'/);
    if(regexMatches) {
        return regexMatches[1] + '@' + regexMatches[2];
    }
    return null;
};

/* Static methods */

/**
 * Gets a random blog number
 * @returns {Promise} A promise with the blog id as a string
 */
Israblog.getRandomBlogId = function() {
    return http.request(config.ISRABLOG.RANDOM_PAGE).then(function(res) {
        return res.body.read().then(function(bodyStream){
            var body = bodyStream.toString('UTF-8');
            var matches = body.match(/\?blog=(\d+)/);
            if(!matches || matches.length < 2) {
                return null;
            }
            return matches[1];
        });
    });
};

/**
 * Fetches data from a specific blog by blog id
 * @param {string} blogId - the id of the blog
 */
Israblog.getBlogById = function(blogId) {
    var blogUrl = config.ISRABLOG.BLOG_URL.replace('{BLOG_ID}', blogId);
    return http.request(blogUrl).then(function(res) {
        return res.body.read().then(function(bodyStream){
            var body = windows1255.decode( bodyStream.toString('binary'));
            return new Israblog(blogId, body);
        });
    })
};
