[![Build Status](https://travis-ci.org/tastenwerk/nginious-fixtures.png)](https://travis-ci.org/tastenwerk/nginious-fixtures)

# nginious-fixtures

this is an extension for nginious. It can simplify the testing process
within nginious

## installation

    npm install --save nginious-fixtures

## usage

In your /test directory, create a fixtures directory and put
your fixtures in there. Note, they mast carry a .fixtures.js suffix
in order to get recognized bye the fixtures helper

### test/fixtures/my_fixture.js

    var fixtures = require('nginious-fixtures');
    
    fixtures.define('My', {
      name: 'test',
      dynamic: function(){ return Math.random(1000); }
    });

In the example above, a *dynamic* value is created in order to ease a
unique field set up in the database.

### test/helper.js

    // test/helper.js
    
    ...

    helper.fixtures = require('nginious-fixtures');
    helper.fixtures.readFixtures();
    
    ...

## using fixtures

    var myFixture = helper.fixtures.myFixture.build();

myFixture should have properties:

    { name: 'test', dynamic: <randomValue> }

### create database entry

You can even use a orm which supports mongoose like syntax and shorthand
these syntax by nginious-fixtures. To enable this you must set

    fixtures.enableORM( mongoose );

or similar. Within nginious engines, you can also provide nginious 

    fixtures.enableORM( nginious );

Now you can use the following to create a fixture in the database

    helper.fixtures.myFixture.create( function( err, myFixture ){
      // myFixture should now be a persisted database entry with
      // properties set up like defined above
    });

## other useful functions

### attributes

    fixtures.user.attributes

returns just the attributes set up in the fixture (as object)

### build (with orm present)

returns an orm (mongoose) model instane

    fixtures.user.build()
    >>> <mongoose model instance>

### build (without orm)

return an object (same as: attributes)

### create (with orm present)

    fixtures.user.create()
    >>> <mongoose persisted model instance>

## hooks

hooks help to do database actions, that need a callback

### afterBuild

    fixtures.define('My', {
      name: 'test',
      dynamic: function(){ return Math.random(1000); }
    })
    .afterBuild( function( my, next ){
      my.name = 'other';  
      next( my );
    });

of course, one has to call build with callback function in order
to get afterBuild results:

    fixtures.My.build( function( my ){
      // do something with my
    });

### beforeCreate

runs before orm save() method is called.

    fixtures.define('My', {
      name: 'test',
      dynamic: function(){ return Math.random(1000); }
    })
    .beforeCreate( function( err, my, next ){
      if( err ) console.log('error:', err);
      my.name = 'other';  
      next( my );
    });

