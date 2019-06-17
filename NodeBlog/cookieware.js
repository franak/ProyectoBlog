// https://www.npmjs.com/package/universal-cookie-express
let jwt = require('jwt-simple');
let config = require('./config');
let moment = require('moment');

const ds = require('./models/ds');


const { SESSIONS_COUNT = 1 } = process.env;

const checkCookie = (req, res, next) => {
    // res.json({ token: createToken('guest') })
    // check if client sent cookie
    let cookie = req.cookies.WASID;
    if (cookie === undefined) {
        // no: set a new cookie
        // var randomNumber = Math.random().toString();
        // randomNumber = randomNumber.substring(2, randomNumber.length);
        // res.cookie('appID', randomNumber, { maxAge: 900000, httpOnly: true });
        let tokenString = ds.createToken('default guest');
        res.cookie('WASID', tokenString, { maxAge: 900000, httpOnly: true });
        console.log('Creado nuevo cookie guest user');
    } else {
        console.log('tiene cookie: ', cookie)
    }

    next(); // <-- important

    // res._headers.setCookie = { SSDI: createToken('guest') };
    // next();
}


/* Traslado a ds.js
let createToken = (pUsuario) => {
    let body = {
        usu: pUsuario._id,
        create: moment().unix(),
        expire: moment().add(5, "h").unix()
    }
    return jwt.encode(body, config.PASSPHRASE)
}
 */
module.exports = {
    checkCookie: checkCookie
}