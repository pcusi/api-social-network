/* 
    !required
*/
const mongo = require('mongoose');
const _friendshipSchema = mongo.Schema({
    friend: {
        type: String
    },
    user: {
        type: mongo.Schema.ObjectId,
        ref: 'User'
    },
    friend_request: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongo.model('Friendship', _friendshipSchema);