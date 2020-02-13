const jwt = require('jsonwebtoken');
const secret = '$ULTRA_SECRET_2K20$';

let getToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(401).send({
            error: "Es necesario el token de autenticación"
        })
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, secret, function (err, userToken) {
        if (err) {
            return res.status(401).send({
                exp: 'El token ha expirado'
            })
        } else {
            req.user = userToken.sub
            next();
        }
    });

}

module.exports = {
    getToken
}