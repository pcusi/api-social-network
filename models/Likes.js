const mongo = require('mongoose');
const _likeSchema = mongo.Schema({
    publication: {
        type: mongo.Schema.ObjectId,
        ref: 'Publication'
    },
    user: [{
        type: mongo.Schema.ObjectId,
        ref: 'User',   
    }],
    like: {
        type: Number,
        default: 0
    },
});

module.exports = mongo.model('Likes', _likeSchema);