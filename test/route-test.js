var vows = require('vows');
var assert = require('assert');
var util = require('util');
var Route = require('junction-disco/route');


vows.describe('Route').addBatch({
  
  'initialize with query, node, and callback': {
    topic: function() {
      return new Route('info', 'music', function(){});
    },
    
    'should have a query property': function (route) {
      assert.equal(route.query, 'info');
    },
    'should have a node property': function (route) {
      assert.equal(route.node, 'music');
    },
    'should have a callback property': function (route) {
      assert.isFunction(route.callback);
    },
    'should not have a middleware property': function (route) {
      assert.isUndefined(route.middleware);
    },
  },
  
  'initialize with query, node, callback, and middleware options': {
    topic: function() {
      return new Route('info', 'music', function(){}, { middleware: [] });
    },
    
    'should have a query property': function (route) {
      assert.equal(route.query, 'info');
    },
    'should have a node property': function (route) {
      assert.equal(route.node, 'music');
    },
    'should have a callback property': function (route) {
      assert.isFunction(route.callback);
    },
    'should not have a middleware property': function (route) {
      assert.length(route.middleware, 0);
    },
  },
  
  'initialize with query and callback': {
    topic: function() {
      return new Route('info', function(){});
    },
    
    'should have a query property': function (route) {
      assert.equal(route.query, 'info');
    },
    'should not have a node property': function (route) {
      assert.isNull(route.node);
    },
    'should have a callback property': function (route) {
      assert.isFunction(route.callback);
    },
    'should not have a middleware property': function (route) {
      assert.isUndefined(route.middleware);
    },
  },
  
  'initialize with query, callback, and middleware options': {
    topic: function() {
      return new Route('info', function(){}, { middleware: [] });
    },
    
    'should have a query property': function (route) {
      assert.equal(route.query, 'info');
    },
    'should not have a node property': function (route) {
      assert.isNull(route.node);
    },
    'should have a callback property': function (route) {
      assert.isFunction(route.callback);
    },
    'should not have a middleware property': function (route) {
      assert.length(route.middleware, 0);
    },
  },
  
}).export(module);
