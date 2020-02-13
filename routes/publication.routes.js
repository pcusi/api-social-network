var express = require('express');
var router = express.Router();
var _auth = require('../middlewares/auth');

const _publicationController = require('../controllers/publication');
router.post('/new-publication', _auth.getToken, _publicationController._newUserPublication);
router.post('/like-publication/:id', _auth.getToken, _publicationController._likePublication);


module.exports = router;