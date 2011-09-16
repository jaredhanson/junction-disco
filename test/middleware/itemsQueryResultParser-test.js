var vows = require('vows');
var assert = require('assert');
var util = require('util');
var JID = require('junction').JID;
var IQ = require('junction').elements.IQ;
var itemsQueryResultParser = require('junction-disco/middleware/itemsQueryResultParser');


vows.describe('itemsQueryResultParser').addBatch({

  'middleware': {
    topic: function() {
      return itemsQueryResultParser();
    },
    
    'when handling an info query result': {
      topic: function(itemsQueryResultParser) {
        var self = this;
        var res = new IQ('romeo@montague.net/orchard', 'catalog.shakespeare.lit', 'result');
        res.id = 'info1';
        res.c('query', { xmlns: 'http://jabber.org/protocol/disco#items' })
          .c('item', { jid: 'catalog.shakespeare.lit', node: 'books', name: 'Books by and about Shakespeare' }).up()
          .c('item', { jid: 'catalog.shakespeare.lit', node: 'music', name: 'Music from the time of Shakespeare' }).up()
        res = res.toXML();
        res.type = res.attrs.type;
        
        function next(err) {
          self.callback(err, res);
        }
        process.nextTick(function () {
          itemsQueryResultParser(res, next)
        });
      },
      
      'should set items property' : function(err, stanza) {
        assert.isArray(stanza.items);
        assert.length(stanza.items, 2);
        assert.instanceOf(stanza.items[0].jid, JID);
        assert.equal(stanza.items[0].jid, 'catalog.shakespeare.lit');
        assert.equal(stanza.items[0].node, 'books');
        assert.equal(stanza.items[0].name, 'Books by and about Shakespeare');
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
      
      'should not set items property' : function(err, stanza) {
        assert.isUndefined(stanza.items);
      },
    },
  },

}).export(module);
