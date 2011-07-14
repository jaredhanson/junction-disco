var vows = require('vows');
var assert = require('assert');
var ItemsQuery = require('junction-disco/elements/itemsquery');


vows.describe('ItemsQuery').addBatch({

  'when constructed': {
    topic: function() {
      return new ItemsQuery();
    },
    
    'should not have a node': function (query) {
      assert.isUndefined(query.node);
    },
    'should build correct XML string': function(query) {
      assert.equal(query.toXML().toString(), '<query xmlns="http://jabber.org/protocol/disco#items"/>');
    },
  },
  
  'when constructed with a node': {
    topic: function() {
      return new ItemsQuery('http://jabber.org/protocol/commands');
    },
    
    'should have a node': function (query) {
      assert.equal(query.node, 'http://jabber.org/protocol/commands');
    },
    'should build correct XML string': function(query) {
      assert.equal(query.toXML().toString(), '<query node="http://jabber.org/protocol/commands" xmlns="http://jabber.org/protocol/disco#items"/>');
    },
  },

}).export(module);
