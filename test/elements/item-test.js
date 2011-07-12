var vows = require('vows');
var assert = require('assert');
var Item = require('junction-disco/elements/item');


vows.describe('Item').addBatch({

  'when constructed with a JID': {
    topic: function() {
      return new Item('people.shakespeare.lit');
    },
    
    'should have a JID': function (item) {
      assert.equal(item.jid, 'people.shakespeare.lit');
    },
    'should not have a node': function (item) {
      assert.isUndefined(item.node);
    },
    'should not have a name': function (item) {
      assert.isUndefined(item.displayName);
    },
    'should build correct XML string': function(iq) {
      assert.equal(iq.toXML().toString(), '<item jid="people.shakespeare.lit" xmlns="http://jabber.org/protocol/disco#items"/>');
    },
  },
  
  'when constructed with a JID and node': {
    topic: function() {
      return new Item('catalog.shakespeare.lit', 'books');
    },
    
    'should have a JID': function (item) {
      assert.equal(item.jid, 'catalog.shakespeare.lit');
    },
    'should have a node': function (item) {
      assert.equal(item.node, 'books');
    },
    'should not have a name': function (item) {
      assert.isUndefined(item.displayName);
    },
    'should build correct XML string': function(iq) {
      assert.equal(iq.toXML().toString(), '<item jid="catalog.shakespeare.lit" node="books" xmlns="http://jabber.org/protocol/disco#items"/>');
    },
  },
  
  'when constructed with a JID, node, and name': {
    topic: function() {
      return new Item('catalog.shakespeare.lit', 'books', 'Books by and about Shakespeare');
    },
    
    'should have a JID': function (item) {
      assert.equal(item.jid, 'catalog.shakespeare.lit');
    },
    'should have a node': function (item) {
      assert.equal(item.node, 'books');
    },
    'should have a name': function (item) {
      assert.equal(item.displayName, 'Books by and about Shakespeare');
    },
    'should build correct XML string': function(iq) {
      assert.equal(iq.toXML().toString(), '<item jid="catalog.shakespeare.lit" node="books" name="Books by and about Shakespeare" xmlns="http://jabber.org/protocol/disco#items"/>');
    },
  },

}).export(module);
