/*
 * nginuous
 * (c) 2014 by TASTENWERK
 * license: GPLv3
 *
 */

var Fixture = require('./lib/fixture')
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
    console.log('trying to craete a new ', modelName);
    nginuous.orm.models[modelName].create( this.build( options ).toJSON(), callback );
  }

  return fixture;

}

module.exports = fixtures;
