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

You can even use a orm which supports mongoose like syntax and shorthand
these syntax by nginuous-fixtures. To enable this you must set

    fixtures.enableORM( mongoose );

or similar. Within nginuous engines, you can also provide nginuous 

    fixtures.enableORM( nginuous );

Now you can use the following to create a fixture in the database

    helper.fixtures.myFixture.create( function( err, myFixture ){
      // myFixture should now be a persisted database entry with
      // properties set up like defined above
    });

