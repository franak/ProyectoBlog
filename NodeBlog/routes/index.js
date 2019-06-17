var express = require('express');
var router = express.Router();
/* 
const mongoose = require('mongoose');
const ds = require('../models/ds');
 */
/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.redirect('/');
  // res.json({ 'respuesta': 'hola' });
  // res.render('index', { title: 'Express' });
  res.sendFile('./public/index.html')
});

module.exports = router;
