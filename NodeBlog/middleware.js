let jwt = require('jwt-simple');
let config = require('./config');
let moment = require('moment');
// let Usuario = require('../models/usuarios')
const Usuarios = require('./models/catalog').Usuarios;

let checkAuthentication = (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .json({ error: 'Tu petición debe incluir la cabecera de autenticación' })
    }

    let token = req.headers.authorization;
    let body;
    try {
        body = jwt.decode(token, config.PASSPHRASE);
    } catch {
        return res.status(403).json({ error: 'el token es incorrecto' })
    }

    if (body.expire <= moment().unix()) {
        return res.status(403).json({ error: 'el token ha expirado' })
    }

    Usuarios.findById(body.usu, (err, usuario) => {
        if (err || !usuario) {
            return res.status(403).json({ error: 'el usuario es incorrecto' })
        } else {
            req.user = body.usu;
            next();
        }
    })
    console.log(body);

}

module.exports = {
    checkAuth: checkAuthentication
}