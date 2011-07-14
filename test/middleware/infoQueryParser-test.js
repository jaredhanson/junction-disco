var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var StanzaError = require('junction').StanzaError;
var InfoQuery = require('junction-disco/elements/infoquery');
var ItemsQuery = require('junction-disco/elements/itemsquery');
var infoQueryParser = require('junction-disco/middleware/infoQueryParser');


vows.describe('infoQueryParser').addBatch({

  'middleware': {
    topic: function() {
      return infoQueryParser();
    },
    
    'when handling an info request': {
      topic: function(infoQueryParser) {
        var self = this;
        var iq = new IQ('plays.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var queryEl = new InfoQuery('http://jabber.org/protocol/commands');
        iq.c(queryEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          infoQueryParser(iq, next)
        });
      },
      
      'should set query property' : function(err, stanza) {
        assert.equal(stanza.query, 'info');
      },
      'should set node property' : function(err, stanza) {
        assert.equal(stanza.node, 'http://jabber.org/protocol/commands');
      },
    },
    
    'when handling an info request without a node': {
      topic: function(infoQueryParser) {
        var self = this;
        var iq = new IQ('plays.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var queryEl = new InfoQuery();
        iq.c(queryEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          infoQueryParser(iq, next)
        });
      },
      
      'should set node property to null' : function(err, stanza) {
        assert.isNull(stanza.node);
      },
    },
    
    'when handling a non-info request': {
      topic: function(infoQueryParser) {
        var self = this;
        var iq = new IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var queryEl = new ItemsQuery('music');
        iq.c(queryEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          infoQueryParser(iq, next)
        });
      },
      
      'should not set query property' : function(err, stanza) {
        assert.isUndefined(stanza.query);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
    },
    
    'when handling a non-IQ-get info request': {
      topic: function(infoQueryParser) {
        var self = this;
        var iq = new IQ('plays.shakespeare.lit', 'romeo@montague.net/orchard', 'set');
        var queryEl = new InfoQuery('http://jabber.org/protocol/commands');
        iq.c(queryEl);
        iq = iq.toXML();
        iq.type = iq.attrs.type;
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          infoQueryParser(iq, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'bad-request');
      },
    },
    
    'when handling an IQ stanza that is not a disco stanza': {
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
      
      'should not set query property' : function(err, stanza) {
        assert.isUndefined(stanza.query);
      },
      'should not set node property' : function(err, stanza) {
        assert.isUndefined(stanza.node);
      },
    },
  },

}).export(module);
