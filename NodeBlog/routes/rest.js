var express = require('express');
var router = express.Router();
/* Aquí no se usa */
const mongoose = require('mongoose');
const ds = require('../models/ds');
const middleware = require('../middleware');

//primero comprueba el token
// router.use(middleware.checkAuth); Middleware sólo para cuando quiera "crear" entradas o categorías
/* /rest/ */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.redirect('/');

    res.json({ 'respuesta': 'hola' });
    // res.render('index', { title: 'Express' });
    // res.sendFile('./public/index.html')
});

// https://www.npmjs.com/package/mongoose-paginate-v2
router.get('/:dataClass', function (req, res, next) {
    let dataClass = ds.getFromCatalog(req);
    let traerId = req.params.dataClass.indexOf('(');
    let titulo;
    let categoria;
    if (req.query.titulo) {
        titulo = req.query.titulo.split('-').join(' ');
    }
    if (req.query.categoria) {
        // categoria = req.query.categoria;
        console.log('todo: ', categoria)
        // res.json({ error: 'Sin Implementar' });
    }
    let entityCollection;
    if (traerId != -1) {
        let parametros = req.params.dataClass;
        let id = parametros.split('(')[1];
        let _id = id.replace('(', '').replace(')', '');
        dataClass.findById(_id, function (err, result) {
            if (err) res.json({ error: err })
            entityCollection = ds.getCollectionObject(id[0], result);
            res.json(entityCollection);
        });
    } else if (titulo) {
        dataClass.findOne({ titulo: titulo }, (err, result) => {
            entityCollection = ds.getCollectionObject(dataClass.modelName, result);
            res.json(entityCollection);
        })
    } else {
        dataClass.find((err, result) => {
            if (err) throw err;
            entityCollection = ds.getCollectionObject(req.params.dataClass, result);
            res.json(entityCollection);
        });
    }
});


router.post('/:dataClass/create', middleware.checkAuth, (req, res) => {

    let dataClass = ds.getFromCatalog(req);
    // let nuevoRegistro = new dataClass();
    // nuevoRegistro._doc = Object.assign(datos);
    // nuevoRegistro._doc._id = new mongoose.Types.ObjectId();
    // nuevoRegistro.save();
    try {
        dataClass.create(req.body, (err, result) => {
            console.log(result)
            if (err) res.json({ error: 'hay un error' })
            nuevoRegistro = result;
            let resultado = {};
            res.json(result);
        })
    } catch (e) {
        res.json({ error: 'No existe la tabla' });
    }
});

// , middleware.checkAuth
router.post('/:dataClass/new', (req, res) => {
    let dataClass = ds.getFromCatalog(req);
    let datos = req.body;
    try {
        let nuevoRegistro = {};
        nuevoRegistro.titulo = datos.titulo;
        nuevoRegistro.contenido = datos.contenido;
        nuevoRegistro.categorias = datos.categoria;
        nuevoRegistro.fecha_creacion = Date.now();
        nuevoRegistro._id = new mongoose.Types.ObjectId();
        let newRecord = new dataClass();
        newRecord._doc = nuevoRegistro;
        newRecord.save();
        res.json(newRecord);
        // dataClass.create(req.body, (err, result) => {
        //     console.log(result)
        //     if (err) res.json({ error: 'hay un error' })
        //     nuevoRegistro = result;
        //     let resultado = {};
        //     res.json(result);
        // })
    } catch (e) {
        res.json({ error: 'No existe la tabla' });
    }


});



router.get('/:dataClass/:id', (req, res) => {
    let id = req.params.id;
    let dataClass = ds.getFromCatalog(req);
    try {
        dataClass.findById(id).exec(function (err, result) {
            if (err) res.json({ error: err })
            res.json({ result: result });
        })
        // dataClass.findById(id, function (err, result) {
        //     if (err) res.json({ error: err })
        //     res.json({ result: result });
        // });
    } catch (e) {
        res.json({ catch: e })
    }
});


router.put('/:dataClass/:id', (req, res, next) => {
    let id = req.params.id;
    let dataClass = ds.getFromCatalog(req);
    dataClass.findByIdAndUpdate(id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:dataClass/:id', (req, res, next) => {
    let id = req.params.id;
    let dataClass = ds.getFromCatalog(req);
    dataClass.findByIdAndRemove(id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;
