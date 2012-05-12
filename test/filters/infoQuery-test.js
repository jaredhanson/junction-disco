var vows = require('vows');
var assert = require('assert');
var util = require('util');
var junction = require('junction');
var IQ = require('junction').elements.IQ;
var infoQuery = require('junction-disco/filters/infoQuery');


vows.describe('infoQuery').addBatch({

  'filter': {
    topic: function() {
      return infoQuery();
    },
    
    'when processing an info request': {
      topic: function(infoQuery) {
        var self = this;
        var iq = new IQ('mim.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        iq.c('query', { xmlns: 'http://jabber.org/protocol/disco#info', node: 'http://jabber.org/protocol/commands' });
        iq = iq.toXML();
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          infoQuery(iq, next)
        });
      },
      
      'should have pending property' : function(err, stanza) {
        assert.isNotNull(stanza.pending);
      },
      'should set xmlns property' : function(err, stanza) {
        assert.equal(stanza.pending.xmlns, 'http://jabber.org/protocol/disco#info');
      },
      'should set query property' : function(err, stanza) {
        assert.equal(stanza.pending.query, 'info');
      },
      'should set jid property' : function(err, stanza) {
        assert.equal(stanza.pending.jid, 'mim.shakespeare.lit');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.pending.node, 'http://jabber.org/protocol/commands');
      },
    },
    
    'when processing an info result': {
      topic: function(infoQuery) {
        var self = this;
        var iq = new IQ('romeo@montague.net/orchard', 'mim.shakespeare.lit', 'result');
        iq.c('query', { xmlns: 'http://jabber.org/protocol/disco#info', node: 'http://jabber.org/protocol/commands' })
          .c('identity', { category: 'automation', type: 'command-list' });
        iq = iq.toXML();
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          infoQuery(iq, next)
        });
      },
      
      'should not have pending property' : function(err, stanza) {
        assert.isUndefined(stanza.pending);
      },
    },
    
    'when processing a generic IQ stanza': {
      topic: function(infoQuery) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          infoQuery(iq, next)
        });
      },
      
      'should not have pending property' : function(err, stanza) {
        assert.isUndefined(stanza.pending);
      },
    },
  },

}).export(module);
