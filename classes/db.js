/**
 * Created by ephi on 4/17/15.
 */
var config = require('../config');
var FS = require("q-io/fs");

module.exports = {
    getStoredItems: function() {
        return FS.read(config.DB.FILE_PATH).then(function(items) {
            return JSON.parse(items);
        });
    },

    storeItems: function(items) {
        FS.write(config.DB.FILE_PATH, JSON.stringify(items));
    }
}