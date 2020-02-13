const mongo = require('mongoose');
const _publicationSchema = mongo.Schema({
    description: {
        type: String
    },
    user: {
        type: mongo.Schema.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: String,
    },
    image: {
        type: String,
        default: 'null'
    },
});

module.exports = mongo.model('Publication', _publicationSchema);