/**
 * nginios test helper
 */

var fs = require('fs')
  , mongoose = require('mongoose')
  , path = require('path');

var helper = {};

helper.chai = require('chai');
helper.chai.Assertion.includeStack = true;

require('../app/models/test_item');
require('../app/models/my');

helper.fixtures = require('../');
helper.fixtures.enableORM(mongoose);
helper.fixtures.readFixtures();

helper.orm = mongoose;

var dbPath = 'mongodb://localhost:27017/nginios_fixtures_test';

var connection;

helper.connectDB = function( callback ){
  if( connection )
    return callback();

  connection = mongoose.connect(dbPath);
  mongoose.connection.on('error', function( err ){
    console.log('failed to connect to database', dbPath);
  }).once('open', function(){
    callback();
  });
}

module.exports = helper;
