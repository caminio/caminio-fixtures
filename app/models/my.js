/*
 * nginuous
 * (c) 2014 by TASTENWERK
 * license: GPLv3
 *
 */

var mongoose = require('mongoose')

var MySchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('My', MySchema);
