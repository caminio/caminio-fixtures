/**
 * nginuous test helper
 */

var fs = require('fs')
  , path = require('path');

var helper = {};

helper.chai = require('chai');
helper.chai.Assertion.includeStack = true;

helper.fixtures = require('../');


// fixtures
helper.fixtures = {};
fs
  .readdirSync(__dirname+'/fixtures')
  .filter(function(file) {
    return file.indexOf('.fixture.js') > 0
  })
  .forEach(function(file) {
    helper.fixtures[ file.replace('.fixture.js','') ] = require( path.join( __dirname, 'fixtures', file ) );
  });

module.exports = helper;
