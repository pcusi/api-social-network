var express = require('express');
var router = express.Router();
var _auth = require('../middlewares/auth');
var multipart = require('connect-multiparty');

var files = multipart({uploadDir: './user'});

/* import user controller from dir controllers */
const _userController = require('../controllers/user');
router.post('/new-user', _userController._newUserCreated);
router.post('/log-In', _userController._userLogIn);
router.post('/create-photo/:id', [_auth.getToken, files], _userController._userPhotoCreated);
router.get('/user-profile/:id', _userController._getUserProfile);

module.exports = router;