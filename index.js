/*
 * nginios
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
    throw Error(modelName+' was not found in orm models '+Object.keys(orm.models).join(','));

  fixture.attributes = function( options ){
    return new Fixture( concat(options, properties) ).toJSON();
  }

  fixture.build = function( options, callback ){
    if( typeof(options) === 'function' && arguments.length < 2 ){
      callback = options;
      options = null;
    }
    if( !orm.models[modelName] )
      console.log('Model name', modelName, 'was not found in', Object.keys(orm.models).join(',') );
    if( typeof(callback) === 'function' ){
      if( this.hooks.build )
        return this.hooks.build( new orm.models[modelName]( (new Fixture( concat(options, properties ) )).toJSON() ), callback );
      return callback( new orm.models[modelName]( (new Fixture( concat(options, properties) )).toJSON() ) );
    }
    if( typeof(this.hooks.build) === 'function' )
      console.log('nginios FIXTURES WARNING: no callback was passed, but a callback hook is defined for this fixture');
    return orm.models[modelName]( (new Fixture( concat(options, properties) )).toJSON() );
  }

  fixture.create = function( options, callback ){
    if( typeof(options) === 'function' && arguments.length < 2 ){
      callback = options;
      options = null;
    }

    if( typeof(this.hooks.create) === 'function' ){
      return fixture.build( options, function( modelItem ){
        modelItem.save( function( err ){
          fixture.hooks.create( err, modelItem, callback );
        });
      });
    }
    orm.models[modelName].create( fixture.attributes( options ), callback );
  }

  // hooks [build,create]
  fixture.hooks = {};

  /**
   * adds a callback function to the fixture
   *
   * @param {Function} callback( fixture )
   */
  fixture.afterBuild = function( callback ){
    fixture.hooks.build = callback;
    return fixture;
  }

  /**
   * adds a callback function to the fixture
   *
   * @param {Function} callback( fixture )
   */
  fixture.beforeCreate = function( callback ){
    fixture.hooks.create = callback;
    return fixture;
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
    throw Error('fixtures path ' + pth + ' was not found');

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
