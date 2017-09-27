// User Collection - user-collection.js
var AmpCollection = require('ampersand-rest-collection');
var User = require('User');


module.exports = AmpCollection.extend({
    model: User,
    url: '/api/user'
});