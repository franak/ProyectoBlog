var express = require('express');
var router = express.Router();
const ds = require('../models/ds');
let mongoose = require('mongoose');
let jsonSchema = require('mongoose-jsonschema').modelToJSONSchema;
// https://www.npmjs.com/package/mongoose-jsonschema

// /$catalog/
router.get('/:dataClassName', function (req, res, next) {
    res.json(jsonSchema(mongoose.model(req.params.dataClassName)));
});


module.exports = router;
