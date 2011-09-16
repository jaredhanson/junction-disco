var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var infoQueryResultParser = require('junction-disco/middleware/infoQueryResultParser');


vows.describe('infoQueryResultParser').addBatch({

  'middleware': {
    topic: function() {
      return infoQueryResultParser();
    },
    
    'when handling an info query result': {
      topic: function(infoQueryResultParser) {
        var self = this;
        var res = new IQ('romeo@montague.net/orchard', 'plays.shakespeare.lit', 'result');
        res.id = 'info1';
        res.c('query', { xmlns: 'http://jabber.org/protocol/disco#info' })
          .c('identity', { category: 'conference', type: 'text', name: 'Play-Specific Chatrooms' }).up()
          .c('identity', { category: 'directory', type: 'chatroom' }).up()
          .c('feature', { 'var': 'http://jabber.org/protocol/disco#info' }).up()
          .c('feature', { 'var': 'http://jabber.org/protocol/disco#items' }).up()
          .c('feature', { 'var': 'http://jabber.org/protocol/muc' }).up();
        res = res.toXML();
        res.type = res.attrs.type;
        
        function next(err) {
          self.callback(err, res);
        }
        process.nextTick(function () {
          infoQueryResultParser(res, next)
        });
      },
      
      'should set identities property' : function(err, stanza) {
        assert.isArray(stanza.identities);
        assert.length(stanza.identities, 2);
        assert.equal(stanza.identities[0].category, 'conference');
        assert.equal(stanza.identities[0].type, 'text');
        assert.equal(stanza.identities[0].name, 'Play-Specific Chatrooms');
        assert.equal(stanza.identities[1].category, 'directory');
        assert.equal(stanza.identities[1].type, 'chatroom');
        assert.isUndefined(stanza.identities[1].name);
      },
      'should set features property' : function(err, stanza) {
        assert.isArray(stanza.features);
        assert.length(stanza.features, 3);
        assert.equal(stanza.features[0], 'http://jabber.org/protocol/disco#info');
        assert.equal(stanza.features[1], 'http://jabber.org/protocol/disco#items');
        assert.equal(stanza.features[2], 'http://jabber.org/protocol/muc');
      },
    },
    
    'when handling an IQ stanza that is not a disco result': {
      topic: function(infoQueryParser) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          infoQueryParser(iq, next)
        });
      },
      
      'should not set identities property' : function(err, stanza) {
        assert.isUndefined(stanza.identities);
      },
      'should not set features property' : function(err, stanza) {
        assert.isUndefined(stanza.features);
      },
    },
  },

}).export(module);
