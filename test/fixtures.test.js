/**
 * testing application
 */


var helper = require('./helper')
  , nginuous = helper.nginuous
  , expect = helper.chai.expect
  , fixtures = require('../')
  , Fixture = require('../lib/fixture');

describe( 'Fixtures', function(){

  before( function(done){
    helper.connectDB( done );
  });

  describe('define', function(){
 
    it('defines a new fixture', function(){
      expect( fixtures.define('testItem', {name: 'test'}) ).to.be.a('object');
    });

    it('defines a new fixture with dynamic properties', function(){
      var dynFixt = fixtures.define('testItem', {name: 'test', dynamic: function(){ return Math.random(100)*(new Date().getTime()); } });
      expect( dynFixt ).to.be.a('object');
      var dyn1 = dynFixt.build();
      var dyn2 = dynFixt.build();
      expect( dyn1.dynamic ).to.not.eq( dyn2.dynamic );
    });

  });

  describe('provides', function(){
  
    it('fixtures which have been stored in test/fixtures directory', function(){
      expect(fixtures.testItem).to.be.a('object'); 
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

  });

  describe('hooks', function(){

    describe('build', function(){
    
      it('callback after built fixture', function(done){
        fixtures.define('testItem', { name: 'test', dynamic: function(){ return Math.random(100); } } )
          .afterBuild( function( testItem, next ){
            expect( testItem ).to.be.instanceOf(helper.orm.models['TestItem']);
            next( testItem );
          });
        fixtures.testItem.build( function( testItem ){
          expect( testItem ).to.be.instanceOf(helper.orm.models['TestItem']);
          done();
        });
      });

    });

    describe('create', function(){
      
      it('callback after after create fixture', function(done){
        fixtures.define('testItem', { name: 'test', dynamic: function(){ return Math.random(100); } } )
          .beforeCreate( function( err, testItem, next ){
            expect(testItem).to.be.instanceOf(helper.orm.models.TestItem);
            next( testItem );
          });
        fixtures.testItem.create( function( testItem ){
          expect(testItem).to.be.instanceOf(helper.orm.models.TestItem);
          done();
        })
      });
      
      it('callback after after build and create fixture', function(done){
        fixtures.define('testItem', { name: 'test', dynamic: function(){ return Math.random(100); } } )
          .afterBuild( function( testItem, next ){
            testItem.name = 'before';
            expect(testItem).to.be.instanceOf(helper.orm.models.TestItem);
            next( testItem );
          })
          .beforeCreate( function( err, testItem, next ){
            expect(testItem).to.be.instanceOf(helper.orm.models.TestItem);
            next( testItem );
          });
        fixtures.testItem.create( function( testItem ){
          expect(testItem).to.be.instanceOf(helper.orm.models.TestItem);
          expect(testItem.name).to.eq('before');
          done();
        })
      });

    });

  });

});
