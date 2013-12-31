/*
 * nginios
 * (c) 2014 by TASTENWERK
 * license: GPLv3
 *
 */

var fixtures = require('../../');

fixtures.define('My', {
  name: 'myFixture',
  dynamic: function(){ return Math.random(1000); }
});
