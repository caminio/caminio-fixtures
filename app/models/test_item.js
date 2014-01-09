/*
 * caminio
 * (c) 2014 by TASTENWERK
 * license: GPLv3
 *
 */

var mongoose = require('mongoose')

var TestSchema = mongoose.Schema({
    name: { type: String, required: true },
    dynamic: { type: Number, required: true, index: { unique: true } }
});

module.exports = mongoose.model('TestItem', TestSchema);
