var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');

var files = multipart({uploadDir: './comments'});
var _auth = require('../middlewares/auth');


const _commentController = require('../controllers/comment');
router.post('/new-comment/:id', _auth.getToken, _commentController._createComment);
router.get('/comments/:id', _commentController._getAllComments);
router.post('/comment-image/:id', [_auth.getToken, files], _commentController._commentWithImages);

module.exports = router;