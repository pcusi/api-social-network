const Publication = require('../models/Publication');
const moment = require('moment');
const Like = require('../models/Likes');

async function _newUserPublication(req, res) {
    if (!req.user) {
        return res.status(403).send({
            message: 'No tienes autorización para publicar en nuestra plataforma!'
        });
    }

    let {
        description
    } = req.body;
    let p = new Publication();
    p.description = description;
    p.created_at = moment().unix();
    p.user = req.user;
    /* save publication */
    p.save().then(publication => {
        return res.status(200).send({
            publication
        });
    }).catch(err => res.status(500).send({
        err: `${err}`
    }));
}

async function _likePublication(req, res) {
    let id = req.params.id;
    /* we need find an isset publication  */
    let pub = await Publication.findById(id);

    if (pub) {

        Like.find({
            '$or': [{
                'user': req.user,
                'publication': id
            }]
        }).populate('user').then(result => {
            let like = new Like();
            like.publication = id;
            like.like += 1;


            if (!result) {
                like.user = req.user;
                like.save().then(likes => {
                    return res.status(200).send({
                        likes
                    })
                });
            }


            if (result && result.length >= 1) {
                return res.status(200).send({
                    message: 'Ya diste like a esta publicación'
                });
            } else {
                Like.update({
                    '$push': {
                        'user': [req.user]
                    }
                }).then(likes => {
                    return res.status(200).send({
                        likes
                    });
                }).catch(err => res.status(400).send({
                    message: `${err}`
                }));
            }
        })

    }

}

module.exports = {
    _newUserPublication,
    _likePublication
}