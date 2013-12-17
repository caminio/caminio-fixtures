/*
 * nginuous
 * (c) 2014 by TASTENWERK
 * license: GPLv3
 *
 */

var nginuous = require('nginuous')
  , orm = nginuous.orm;

var TestSchema = orm.Schema({
    name: { type: String, required: true },
    dynamic: { type: Number, required: true, index: { unique: true } }
});

module.exports = orm.model('TestItem', TestSchema);
