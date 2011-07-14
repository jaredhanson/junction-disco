var vows = require('vows');
var assert = require('assert');
var util = require('util');
var junction = require('junction');
var Client = require('junction-disco/client');
var InfoQuery = require('junction-disco/elements/infoquery');
var ItemsQuery = require('junction-disco/elements/itemsquery');


vows.describe('Client').addBatch({
  
  'initialization': {
    topic: function() {
      return new Client({ jid: 'catalog.shakespeare.lit' });
    },
    
    'should have an empty stack': function (c) {
      assert.length(c._stack, 0);
    },
    'should have an info function': function (c) {
      assert.isFunction(c.info);
    },
    'should have an items function': function (c) {
      assert.isFunction(c.info);
    },
  },
  
  'receiving an info query': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'catalog.shakespeare.lit' });
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
  
  'receiving an items query': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'catalog.shakespeare.lit' });
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
