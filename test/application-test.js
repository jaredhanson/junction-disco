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
  
  'routing an items query to a null node': {
    topic: function() {
      var self = this;
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.items(null, function(req, res, next) {
        self.callback(null, req, res);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery();
        iq.id = '1';
        iq.c(query);
        connection.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, req, res) {
      assert.isNotNull(req);
    },
    'should set req properties': function (err, req, res) {
      assert.equal(req.query, 'items');
      assert.isNull(req.node);
    },
    'should prepare response': function (err, req, res) {
      assert.equal(res.name, 'iq');
      assert.equal(res.attrs.id, '1');
      assert.equal(res.attrs.type, 'result');
    },
  },
  
  'routing a query to a "root" node': {
    topic: function() {
      var self = this;
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.info(function(req, res, next) {
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
  
  'routing a query to a node': {
    topic: function() {
      var self = this;
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.items('music', function(req, res, next) {
        self.callback(null, req, res);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        connection.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, req, res) {
      assert.isNotNull(req);
    },
    'should set req properties': function (err, req, res) {
      assert.equal(req.query, 'items');
      assert.equal(req.node, 'music');
    },
    'should prepare response': function (err, req, res) {
      assert.equal(res.name, 'iq');
      assert.equal(res.attrs.id, '1');
      assert.equal(res.attrs.type, 'result');
    },
  },
  
  'routing a query to a node with middleware': {
    topic: function() {
      var self = this;
      
      function doSomething(req, res, next) {
        req.didSomething = true;
        next();
      }
      
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.items('music', doSomething, function(req, res, next) {
        self.callback(null, req, res);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        connection.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, req, res) {
      assert.isNotNull(req);
    },
    'should invoke middleware': function (err, req, res) {
      assert.isTrue(req.didSomething);
    },
  },
  
  'routing a query to a node with multiple middleware': {
    topic: function() {
      var self = this;
      
      function doSomething(req, res, next) {
        req.didSomething = true;
        next();
      }
      function doSomethingElse(req, res, next) {
        req.didSomethingElse = true;
        next();
      }
      
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.items('music', doSomething, doSomethingElse, function(req, res, next) {
        self.callback(null, req, res);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        connection.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, req, res) {
      assert.isNotNull(req);
    },
    'should invoke middleware': function (err, req, res) {
      assert.isTrue(req.didSomething);
      assert.isTrue(req.didSomethingElse);
    },
  },
  
  'routing a query to a node with multiple middleware as an array': {
    topic: function() {
      var self = this;
      
      function doSomething(req, res, next) {
        req.didSomething = true;
        next();
      }
      function doSomethingElse(req, res, next) {
        req.didSomethingElse = true;
        next();
      }
      var doAll = [doSomething, doSomethingElse];
      
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.items('music', doAll, function(req, res, next) {
        self.callback(null, req, res);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        connection.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, req, res) {
      assert.isNotNull(req);
    },
    'should invoke middleware': function (err, req, res) {
      assert.isTrue(req.didSomething);
      assert.isTrue(req.didSomethingElse);
    },
  },
  
  'routing a query to a node with multiple middleware as multiple arrays': {
    topic: function() {
      var self = this;
      
      function doSomething(req, res, next) {
        req.calls = ['doSomething'];
        next();
      }
      function doSomethingElse(req, res, next) {
        req.calls.push('doSomethingElse');
        next();
      }
      function otherStuff(req, res, next) {
        req.calls.push('otherStuff');
        next();
      }
      function otherThings(req, res, next) {
        req.calls.push('otherThings')
        next();
      }
      var doAll = [doSomething, doSomethingElse];
      var otherAll = [otherStuff, otherThings];
      
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.items('music', doAll, otherAll, function(req, res, next) {
        self.callback(null, req, res);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('music');
        iq.id = '1';
        iq.c(query);
        connection.emit('stanza', iq.toXML());
      });
    },
    
    'should dispatch a request': function (err, req, res) {
      assert.isNotNull(req);
    },
    'should invoke middleware': function (err, req, res) {
      assert.lengthOf(req.calls, 4);
      assert.equal(req.calls[0], 'doSomething');
      assert.equal(req.calls[1], 'doSomethingElse');
      assert.equal(req.calls[2], 'otherStuff');
      assert.equal(req.calls[3], 'otherThings');
    },
  },
  
  'routing a query to a node with a capture': {
    topic: function() {
      var self = this;
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.items('/people/:username', function(req, res, next) {
        self.callback(null, req, res);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('/people/johndoe');
        iq.id = '1';
        iq.c(query);
        connection.emit('stanza', iq.toXML());
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
      var connection = new events.EventEmitter();
      var app = disco();
      app.setup(connection);
      app.items('/music/:artist/tracks/:song', function(req, res, next) {
        self.callback(null, req);
      });
      process.nextTick(function () {
        var iq = new junction.elements.IQ('catalog.shakespeare.lit', 'romeo@montague.net/orchard', 'get');
        var query = new ItemsQuery('/music/counting-crows/tracks/mr-jones');
        iq.id = '1';
        iq.c(query);
        connection.emit('stanza', iq.toXML());
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
  
}).export(module);
