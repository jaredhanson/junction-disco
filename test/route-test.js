var vows = require('vows');
var assert = require('assert');
var util = require('util');
var Route = require('junction-disco/route');


vows.describe('Route').addBatch({
  
  'initialize with query, node, and callbacks': {
    topic: function() {
      return new Route('info', 'music', [ function(){} ]);
    },
    
    'should have a query property': function (route) {
      assert.equal(route.query, 'info');
    },
    'should have a node property': function (route) {
      assert.equal(route.node, 'music');
    },
    'should have a callbacks property': function (route) {
      assert.isArray(route.callbacks);
    },
    'should have a regexp property': function (route) {
      assert.instanceOf(route.regexp, RegExp);
    },
  },
  
  'initialize with query, null node, and callbacks': {
    topic: function() {
      return new Route('info', null, [ function(){} ]);
    },
    
    'should have a query property': function (route) {
      assert.equal(route.query, 'info');
    },
    'should have a node property set to null': function (route) {
      assert.isNull(route.node);
    },
    'should have a callbacks property': function (route) {
      assert.isArray(route.callbacks);
    },
    'should have a regexp property set to null': function (route) {
      assert.isNull(route.regexp);
    },
    'should match a null node': function (route) {
      assert.isArray(route.match(null));
      assert.lengthOf(route.match(null), 0);
    },
    'should not match a node': function (route) {
      assert.isNull(route.match('node'));
    },
  },
  
}).export(module);
