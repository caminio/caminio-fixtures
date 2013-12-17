/**
 * nginuous test helper
 */

var fs = require('fs')
  , path = require('path');

var helper = {};

helper.chai = require('chai');
helper.chai.Assertion.includeStack = true;

helper.fixtures = require('../');
helper.fixtures.readFixtures();

module.exports = helper;
