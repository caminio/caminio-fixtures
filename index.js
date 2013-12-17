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

function concat( options, properties ){
  options = options || {};
  for( var i in properties )
    if( !options[i] )
      options[i] = properties[i];

  return options;
}
/**
 * define a new fixture
 *
 * helps setting up a fixture with attributes
 * that can invoke database actions and memorize
 * users
 */
fixtures.define = function define( name, properties ){

  var fixture = {};
  var modelName = name.substr(0,1).toUpperCase()+name.substr(1,name.length-1);

  if( orm && !orm.models[modelName] )
    throw new Error(modelName+' was not found in orm models');

  fixture.attributes = function( options ){
    return new Fixture( concat(options, properties) ).toJSON();
  }

  fixture.build = function( options ){
    if( orm )
      return new orm.models[modelName]( new Fixture( concat(options, properties ) ).toJSON() );
    return new Fixture( concat(options, properties) );
  }

  fixture.create = function( options, callback ){
    if( arguments.length === 1 ){
      callback = options;
      options = null;
    }

    if( orm )
      return orm.models[modelName].create( this.attributes( options ), callback );

    throw new Error('no orm adapter present! aborting.');
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
