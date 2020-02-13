var mongo = require('mongoose');
var _userSchema = mongo.Schema({
    names: {
        type: String,
    },
    surnames: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
        default: 1
    },
    photo: {
        type: String,
        default: 'null',
    },
    created_at: {
        type: String
    },

});

module.exports = mongo.model('User', _userSchema);