var vows = require('vows');
var assert = require('assert');
var Feature = require('junction-disco/elements/feature');


vows.describe('Feature').addBatch({

  'when constructed with a variation': {
    topic: function() {
      return new Feature('http://jabber.org/protocol/muc');
    },
    
    'should have a variation': function (feature) {
      assert.equal(feature.variation, 'http://jabber.org/protocol/muc');
    },
    'should build correct XML string': function(iq) {
      assert.equal(iq.toXML().toString(), '<feature var="http://jabber.org/protocol/muc" xmlns="http://jabber.org/protocol/disco#info"/>');
    },
  },

}).export(module);
