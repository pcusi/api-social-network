var express = require('express');
var router = express.Router();
var _auth = require('../middlewares/auth');


const _friendshipController = require('../controllers/friendship');
router.post('/friend-request', _auth.getToken, _friendshipController._newFriendRequest);

module.exports = router;