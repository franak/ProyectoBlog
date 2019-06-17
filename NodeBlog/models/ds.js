
const catalog = require('../models/catalog');
// const mongoose = require('mongoose');
let jwt = require('jwt-simple');
let config = require('../config');
let moment = require('moment');
// un token con id que identifique el usuario y una fecha y una fecha de expiración
// npm install jwt-simple
// npm install moment

const createToken = (pUsuario) => {
    let body = {
        usu: pUsuario._id,
        create: moment().unix(),
        expire: moment().add(5, "h").unix()
    }
    return jwt.encode(body, config.PASSPHRASE)
}


const getDataClass = dataClassName => {
    let dataClass = catalog;
    return dataClass;
}

const getFromCatalog = req => {
    let params = req.params;
    // let params = req.params;
    let parentesis = params.dataClass.indexOf('(');
    let dataClass;
    let pdataClass
    if (parentesis != -1) {
        let origen = params.dataClass;
        pdataClass = origen.split('(')[0];
        dataClass = catalog[pdataClass];

    } else {
        dataClass = catalog[params.dataClass];
    }

    return dataClass;

}

const getSchemaFromCatalog = req => {

    let dataClass = req.params.dataClass;
    let schema = catalog[dataClass].schema._userProvidedOptions;
    return schema;
}

const getCollectionObject = (dataClassName, entityCollection) => {

    var miObjeto = {};
    miObjeto.__entityModel = dataClassName || 'N/A';

    miObjeto.__CUSTOM = {};

    miObjeto.__ENTITIES = entityCollection;
    cantidad = entityCollection.length;
    miObjeto.__COUNT = cantidad || 0;
    miObjeto.__SENT = cantidad || 0;
    miObjeto.__FIRST = 1;
    return miObjeto;
}


module.exports = {
    getDataClass: getDataClass,
    getFromCatalog: getFromCatalog,
    getSchemaFromCatalog: getSchemaFromCatalog,
    getCollectionObject: getCollectionObject,
    createToken: createToken
};