var vows = require('vows');
var assert = require('assert');
var events = require('events');
var junction = require('junction');
var util = require('util');
var disco = require('junction-disco/index');
var InfoQuery = require('junction-disco/elements/infoquery');
var ItemsQuery = require('junction-disco/elements/itemsquery');

vows.describe('application').addBatch({
  
  'initialization': {
    topic: function() {
      return disco();
    },
    
    'should have query extensions': function (app) {
      assert.isFunction(app.info);
      assert.isFunction(app.items);
    },
    'should have implicit middleware': function (app) {
      assert.lengthOf(app._stack, 2);
      assert.lengthOf(app._filters, 0);
    },
  },
  
  'routing an info query to a null node': {
    topic: function() {
      var self = this;
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.info(null, function(req, res, next) {
        self.callback(null, req, res);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new InfoQuery();
        iq.id = '1';
        iq.c(query);
        connection.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, req, res) {
      assert.isNotNull(req);
    },
    'should set req properties': function (err, req, res) {
      assert.equal(req.query, 'info');
      assert.isNull(req.node);
    },
    'should prepare response': function (err, req, res) {
      assert.equal(res.name, 'iq');
      assert.equal(res.attrs.id, '1');
      assert.equal(res.attrs.type, 'result');
    },
  },
  
  /*
  'routing an items query to a null node': {
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
  
  'routing a query to a node': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
      client.items('music', function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
  },
  
  'routing a query to a node with middleware': {
    topic: function() {
      var self = this;
      
      function doSomething(req, res, next) {
        req.calls = 1;
        next();
      }
      
      var client = new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
      client.items('music', doSomething, function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should invoke middleware': function (err, stanza) {
      assert.equal(stanza.calls, 1);
    },
  },
  
  'routing a query to a node with multiple middleware': {
    topic: function() {
      var self = this;
      
      function doSomething(req, res, next) {
        req.calls = 1;
        next();
      }
      function doSomethingElse(req, res, next) {
        req.calls++;
        next();
      }
      
      var client = new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
      client.items('music', doSomething, doSomethingElse, function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should invoke middleware': function (err, stanza) {
      assert.equal(stanza.calls, 2);
    },
  },
  
  'routing a query to a node with multiple middleware as an array': {
    topic: function() {
      var self = this;
      
      function doSomething(req, res, next) {
        req.calls = 1;
        next();
      }
      function doSomethingElse(req, res, next) {
        req.calls++;
        next();
      }
      var doAll = [doSomething, doSomethingElse];
      
      var client = new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
      client.items('music', doAll, function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should invoke middleware': function (err, stanza) {
      assert.equal(stanza.calls, 2);
    },
  },
  
  'routing a query to a node with multiple middleware as multiple arrays': {
    topic: function() {
      var self = this;
      
      function doSomething(req, res, next) {
        req.calls = 1;
        next();
      }
      function doSomethingElse(req, res, next) {
        req.calls++;
        next();
      }
      function otherStuff(req, res, next) {
        req.calls++;
        next();
      }
      function otherThings(req, res, next) {
        req.calls++;
        next();
      }
      var doAll = [doSomething, doSomethingElse];
      var otherAll = [otherStuff, otherThings];
      
      var client = new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
      client.items('music', doAll, otherAll, function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should invoke middleware': function (err, stanza) {
      assert.equal(stanza.calls, 4);
    },
  },
  
  'routing a query to a node with a capture': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
      client.items('/people/:username', function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('/people/johndoe');
        iq.id = '1';
        iq.c(query);
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should set params': function (err, stanza) {
      assert.equal(stanza.params.username, 'johndoe');
    },
  },
  
  'routing a query to a node with multiple captures': {
    topic: function() {
      var self = this;
      var client = new Client({ jid: 'catalog.shakespeare.lit', disableStream: true });
      client.items('/music/:artist/tracks/:song', function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('/music/counting-crows/tracks/mr-jones');
        iq.id = '1';
        iq.c(query);
        client.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, stanza) {
      assert.isNotNull(stanza);
    },
    'should set params': function (err, stanza) {
      assert.equal(stanza.params.artist, 'counting-crows');
      assert.equal(stanza.params.song, 'mr-jones');
    },
  },
  */
  
}).export(module);
