var vows = require('vows');
var assert = require('assert');
var Identity = require('junction-disco/elements/identity');


vows.describe('Identity').addBatch({

  'when constructed with a category and type': {
    topic: function() {
      return new Identity('conference', 'text');
    },
    
    'should have a category': function (identity) {
      assert.equal(identity.category, 'conference');
    },
    'should have a type': function (identity) {
      assert.equal(identity.type, 'text');
    },
    'should not have an name': function (iq) {
      assert.isUndefined(iq.displayName);
    },
    'should build correct XML string': function(iq) {
      assert.equal(iq.toXML().toString(), '<identity category="conference" type="text" xmlns="http://jabber.org/protocol/disco#info"/>');
    },
  },
  
  'when constructed with a category, type, and name': {
    topic: function() {
      return new Identity('conference', 'text', 'Play-Specific Chatrooms');
    },
    
    'should have a category': function (identity) {
      assert.equal(identity.category, 'conference');
    },
    'should have a type': function (identity) {
      assert.equal(identity.type, 'text');
    },
    'should have an name': function (identity) {
      assert.equal(identity.displayName, 'Play-Specific Chatrooms');
    },
    'should build correct XML string': function(iq) {
      assert.equal(iq.toXML().toString(), '<identity category="conference" type="text" name="Play-Specific Chatrooms" xmlns="http://jabber.org/protocol/disco#info"/>');
    },
  },

}).export(module);
