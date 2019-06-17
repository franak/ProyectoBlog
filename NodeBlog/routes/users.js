var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator/check');
const Usuarios = require('../models/catalog').Usuarios;
//Se usa para crear el token, en ds.js
// let jwt = require('jwt-simple');
// let moment = require('moment');
// const config = require('../config');

const ds = require('../models/ds');
// para instalar bcrypt teclear en el terminal:  npm install bcrypt
// bcrypt tiene dos funciones: 1-hash ; 2- compare un texto plano con una codificada en la base de datos

router.post('/signup', [
  // username must be an email
  check('userusuarioname').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 })
], async (req, res) => {
  //  req.body.password = bcrypt.hashSync(req.body.password, 10) // nos genera una password aleatoria tipo ramdon
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10)
    Usuarios.create(req.body, (err, usuario) => {
      if (err) return res.status(500).json({ error: err })
      console.log(err)
      res.json(usuario)
    })
  } catch (err) {
    console.log(err)
  }
})

router.post('/login', async (req, res) => {
  Usuarios.findOne({ username: req.body.username }, async (err, usuario) => {
    if (err || !usuario) {
      res.status(404).json({ error: 'nombre de usuario y/o contraseña incorrecta' })
    } else {
      let passwordEquals = await bcrypt.compare(req.body.password, usuario.password)
      if (passwordEquals) {
        let elToken = ds.createToken(usuario);
        res.cookie('WASID', elToken, { maxAge: 900000, httpOnly: true });
        res.json({ token: elToken })
      } else {
        res.status(500).json({ error: 'nombre de usuario y/o contraseña incorrecta' })
      }
    }
  })
})

router.post('/logout', async (req, res) => {
  Usuarios.findOne({ username: req.body.username }, async (err, usuario) => {
    if (err || !usuario) {
      res.status(404).json({ error: 'nombre de usuario y/o contraseña incorrecta' })
    } else {
      let elToken = {};
      res.cookie('WASID', elToken, { maxAge: 900000, httpOnly: true });
      res.json({ message: '¡Gracias por venir!' })
    }
  })
})

// un token con id que identifique el usuario y una fecha y una fecha de expiración
// npm install jwt-simple
// npm install moment
/* Traslado a ds.js:
let createToken = (pUsuario) => {
  let body = {
    usu: pUsuario._id,
    create: moment().unix(),
    expire: moment().add(5, "h").unix()
  }
  return jwt.encode(body, config.PASSPHRASE)
}
 */
// Decodificamos el token

module.exports = router;
