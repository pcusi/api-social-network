const Friendship = require('../models/Friendship');
const User = require('../models/User');

async function _newFriendRequest(req, res) {
    let {
        friend
    } = req.body;
    let fr = new Friendship();
    fr.user = req.user;
    fr.friend = friend;

    if (!req.user) {
        return res.status(403).send({
            message: 'Tienes que iniciar sesión'
        });
    }

    await Friendship.find({
        '$or': [{
            friend: friend,
            user: req.user,
        }]
    }).then(friendship => {
        if (friendship && friendship.length >= 1) {
            return res.status(200).send({
                message: 'Ya le enviaste solicitud'
            })
        } else {
            fr.save().then(friend => {
                return res.status(200).send({
                    friend
                });
            }).catch(err => res.status(401).send({
                message: `Err ${err}`
            }));
        }
    });


}

module.exports = {
    _newFriendRequest
}