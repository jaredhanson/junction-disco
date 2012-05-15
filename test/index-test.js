var vows = require('vows');
var assert = require('assert');
var disco = require('junction-disco');
var util = require('util');


vows.describe('junction-disco').addBatch({
  
  'should export version': function() {
    assert.isString(disco.version);
  },
  
  'should export create function': function() {
    assert.isFunction(disco);
    assert.isFunction(disco.create);
    assert.equal(disco, disco.create);
  },
  
  'should export elements': function() {
    assert.isFunction(disco.elements.InfoQuery);
    assert.isFunction(disco.elements.Identity);
    assert.isFunction(disco.elements.Feature);
    assert.isFunction(disco.elements.ItemsQuery);
    assert.isFunction(disco.elements.Item);
  },
  
  'should export middleware': function() {
    assert.isFunction(disco.middleware.infoQueryResultParser);
    assert.isFunction(disco.middleware.itemsQueryResultParser);
  },
  
  'should export filters': function() {
    assert.isFunction(disco.filters.infoQuery);
  },
  
}).export(module);
