var vows = require('vows');
var assert = require('assert');
var QueryItems = require('junction-disco/elements/queryitems');


vows.describe('QueryItems').addBatch({

  'when constructed': {
    topic: function() {
      return new QueryItems();
    },
    
    'should not have a node': function (query) {
      assert.isUndefined(query.node);
    },
    'should build correct XML string': function(pubsub) {
      assert.equal(pubsub.toXML().toString(), '<query xmlns="http://jabber.org/protocol/disco#items"/>');
    },
  },
  
  'when constructed with a node': {
    topic: function() {
      return new QueryItems('http://jabber.org/protocol/commands');
    },
    
    'should have a node': function (query) {
      assert.equal(query.node, 'http://jabber.org/protocol/commands');
    },
    'should build correct XML string': function(pubsub) {
      assert.equal(pubsub.toXML().toString(), '<query node="http://jabber.org/protocol/commands" xmlns="http://jabber.org/protocol/disco#items"/>');
    },
  },

}).export(module);
