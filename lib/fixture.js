/*
 * nginios
 * (c) 2014 by TASTENWERK
 * license: GPLv3
 *
 */

/**
 * Fixture
 *
 * @param {Object} properties to fill this fixture with
 *
 */
var Fixture = function( properties ){

  for( var i in properties )
    if( typeof(properties[i]) === 'function' )
      this[i] = properties[i]();
    else
      this[i] = properties[i];

}

/**
 * returns plain json properties
 *
 */
Fixture.prototype.toJSON = function(){
  var json = {};
  for( var i in this )
    if( typeof(this[i]) !== 'function' )
      json[i] = this[i];
  return json;
}


module.exports = Fixture;
