var vows = require('vows');
var assert = require('assert');
var junction = require('junction');
var util = require('util');
var Client = require('junction-disco/client');
var InfoQuery = require('junction-disco/elements/infoquery');
var ItemsQuery = require('junction-disco/elements/itemsquery');


vows.describe('Client').addBatch({
  
  'initialization': {
    topic: function() {
      return new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
    },
    
    'should have an info function': function (c) {
      assert.isFunction(c.info);
    },
    'should have an items function': function (c) {
      assert.isFunction(c.items);
    },
  },
  
  'receiving an info query registered with a null node': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
      client.info(null, function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new InfoQuery();
        iq.id = '1';
        iq.c(query);
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
  },
  
  'receiving an items query registered with a null node': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
      client.items(null, function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery();
        iq.id = '1';
        iq.c(query);
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
  },
  
}).export(module);
