/*
 * nginuous
 * (c) 2014 by TASTENWERK
 * license: GPLv3
 *
 */

var path = require('path')
  , fs = require('fs')
  , Fixture = require('./lib/fixture');



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

    if( orm )
      orm.models[modelName].create( this.build( options ).toJSON(), callback );
  }

  this[name] = fixture;
  return fixture;

}

var orm;
/**
 * enable orm
 */
fixtures.enableORM = function( _orm ){
  orm = _orm.orm ? _orm.orm : _orm;
  if( 'testitems' in orm.connection.collections )
    orm.connection.collections['testitems'].drop();
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
