const Publication = require('../models/Publication');
const moment = require('moment');

async function _newUserPublication(req, res) {
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



module.exports = {
    _newUserPublication,
}