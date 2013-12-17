/**
 * testing application
 */


var helper = require('./helper')
  , expect = helper.chai.expect
  , fixtures = require('../');

describe( 'Fixtures', function(){

  describe('define', function(){
 
    it('defines a new fixture', function(){
      expect( fixtures.define('testItem', {name: 'test'}) ).to.be.a('object');
    });

    it('defines a new fixture with dynamic properties', function(){
      var dynFixt = fixtures.define('testFixt', {name: 'test', dynamic: function(){ return Math.random(100)*(new Date().getTime()); } });
      expect( dynFixt ).to.be.a('object');
      var dyn1 = dynFixt.build();
      var dyn2 = dynFixt.build();
      expect( dyn1.dynamic ).to.not.eq( dyn2.dynamic );
    });

  });

  describe('provides', function(){
  
    it('fixtures which have been stored in test/fixtures directory', function(){
      expect(fixtures.myFixture).to.be.a('object'); 
    });

  });

  describe('methods', function(){

    before( function(){
      this.fixt = fixtures.define('testItem', { name: 'test', dynamic: function(){ return Math.random(100); } } );
    });

    it('can .build a new fixture', function(){
      expect(this.fixt).to.have.property('build');
      expect(this.fixt.build().name).to.eq('test');
    });

    it('can .create a new fixture (stored to the database', function( done ){
      expect(this.fixt).to.have.property('create');
      this.fixt.create( function( err, testItem ){
        console.log( err );
        expect(testItem.name).to.eq('test');
        done();
      });
    });

  });

});
