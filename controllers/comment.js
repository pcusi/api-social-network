const Comment = require('../models/Comment');
const Publication = require('../models/Publication');
const path = require('path');


async function _createComment(req, res) {
    let id = req.params.id;
    let {
        comment
    } = req.body;
    let c = new Comment();
    c.user = req.user;
    c.publication = id;
    c.comment = comment;
    if (!req.user) {
        return res.status(401).send({
            message: 'No tienes autorización'
        });
    }
    await Publication.findById(id).then(publication => {
        if (publication) {
            c.save().then(comment => {
                return res.status(200).send({
                    comment
                });
            });
        } else {
            res.status(200).send({
                message: 'La publicación no existe!'
            });
        }
    });
}

async function _commentWithImages(req, res) {
    let id = req.params.id;


    if (!req.user) {
        try {
            return res.status(401).send({
                message: 'No tienes autorización'
            });
        } catch (err) {
            return res.status(404).send({
                message: 'Error'
            })
        }
    }

    if (req.files) {
        let image = req.files.image.path;

        Comment.findByIdAndUpdate(id, {
            'image': image,
        }, {
            new: true
        }).then(comment => {
            return res.status(200).send({
                comment
            });
        });

    } else {
        return res.status(500).send({
            message: 'La imagen no existe'
        });
    }
}

async function _getAllComments(req, res) {
    let id = req.params.id;
    let p = await Publication.find({
        id
    });
    if (p) {
        Comment.countDocuments().then(comments => {
            return res.status(200).send({
                comments
            });
        });
    }
}

module.exports = {
    _createComment,
    _getAllComments,
    _commentWithImages
}