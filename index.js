/*
 * nginuous
 * (c) 2014 by TASTENWERK
 * license: GPLv3
 *
 */

var path = require('path')
  , fs = require('fs')
  , Fixture = require('./lib/fixture')
  , nginuous = require('nginuous');


// initialize the app directory in case
// of a self test and start up nginuous
if( process.env.NODE_ENV === 'test' && process.env.NGINUOUS_FIXTURES_TEST){
  new nginuous.Gear();
  var app = nginuous();
  // clean testitems collection, maybe it has been modified from outside
  nginuous.orm.connection.collections['testitems'].drop( function(err) {
    console.log('collection dropped');
  });
}


var fixtures = {};

/**
 * define a new fixture
 *
 * helps setting up a fixture with attributes
 * that can invoke database actions and memorize
 * users
 */
fixtures.define = function define( name, properties ){

  var fixture = {};

  fixture.build = function( options ){
    options = options || {};
    for( var i in properties )
      if( !options[i] )
        options[i] = properties[i];
    return new Fixture( options );
  }

  fixture.create = function( options, callback ){
    if( arguments.length === 1 ){
      callback = options;
      options = null;
    }
    var modelName = name.substr(0,1).toUpperCase()+name.substr(1,name.length-1);
    nginuous.orm.models[modelName].create( this.build( options ).toJSON(), callback );
  }

  this[name] = fixture;
  return fixture;

}

/**
 * read in fixtures from fixtures directory
 *
 * this expects a test/fixtures directory
 * to exist
 */
fixtures.readFixtures = function( alternativePath ){

  var pth = alternativePath || path.join( process.cwd(), 'test', 'fixtures' );

  if( !fs.existsSync( pth ) )
    throw new Error('fixtures path ' + pth + ' was not found');

  fs
    .readdirSync(pth)
    .filter(function(file) {
      return file.indexOf('.fixture.js') > 0
    })
    .forEach(function(file) {
      require( path.join( pth, file ) );
    });

}

module.exports = fixtures;
