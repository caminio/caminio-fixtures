/*
 * nginuous
 * (c) 2014 by TASTENWERK
 * license: GPLv3
 *
 */

var fixtures = require('../../');

var testFixture = fixtures.define('testItem', {
  name: 'test',
  dynamic: function(){ return parseInt(Math.random(1000)*(new Date().getTime())); }
});

module.exports = testFixture;
