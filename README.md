[![Build Status](https://travis-ci.org/tastenwerk/nginuous-fixtures.png)](https://travis-ci.org/tastenwerk/nginuous-fixtures)

# nginuous-fixtures

this is an extension for nginuous. It can simplify the testing process
within nginuous

## installation

    npm install --save nginuous-fixtures

## usage

In your /test directory, create a fixtures directory and put
your fixtures in there. Note, they mast carry a .fixtures.js suffix
in order to get recognized bye the fixtures helper

### test/fixtures/my_fixture.js

    var fixtures = require('nginuous-fixtures');
    
    fixtures.define('myFixture', {
      name: 'test',
      dynamic: function(){ return Math.random(1000); }
    });

In the example above, a *dynamic* value is created in order to ease a
unique field set up in the database.

### test/helper.js

    // test/helper.js
    
    ...

    helper.fixtures = require('nginuous-fixtures');
    helper.fixtures.readFixtures();
    
    ...

## using fixtures

    var myFixture = helper.fixtures.myFixture.build();

myFixture should have properties:

    { name: 'test', dynamic: <randomValue> }

### create database entry

    helper.fixtures.myFixture.create( function( err, myFixture ){
      // myFixture should now be a persisted database entry with
      // properties set up like defined above
    });
