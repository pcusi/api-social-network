const mongo = require('mongoose');
const _commentSchema = mongo.Schema({
    user: {
        type: mongo.Schema.ObjectId,
        ref: 'User'
    },
    publication: {
        type: mongo.Schema.ObjectId,
        ref: 'Publication'
    },
    comment: {
        type: String
    },
    image: {
        type: String,
        default: 'null',
    }
});

module.exports = mongo.model('Comment', _commentSchema);