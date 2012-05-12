var vows = require('vows');
var assert = require('assert');
var junction = require('junction');
var disco = require('junction-disco');
var util = require('util');


/*
vows.describe('Library').addBatch({
  
  'junction-disco': {
    topic: function() {
      return null;
    },
    
    'should report a version': function (x) {
      assert.isString(disco.version);
    },
  },
  
  'create connection with client type': {
    topic: function() {
      return new disco.createConnection({ type: 'client', jid: 'user@invalid.host', disableStream: true });
    },
    
    'should be an instance of Client': function (c) {
      assert.instanceOf(c, disco.Client);
    },
  },
  
  'create connection with component type': {
    topic: function() {
      return new disco.createConnection({ type: 'component', jid: 'component.invalid.host', host: 'invalid.host', port: 5060, disableStream: true });
    },
    
    'should be an instance of Component': function (c) {
      assert.instanceOf(c, disco.Component);
    },
  },
  
}).export(module);
*/

