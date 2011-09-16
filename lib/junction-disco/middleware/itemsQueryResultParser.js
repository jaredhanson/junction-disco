/**
 * Module dependencies.
 */
var JID = require('junction').JID;


/**
 * Parse items discovery result stanzas.
 *
 * This middleware parses information contained within _disco#items_ result
 * stanzas.  `stanza.items` indicates the items associated with the target
 * entity.
 *
 * Examples:
 *
 *      connection.use(junction.itemsQueryResultParser());
 *
 * References:
 * - [XEP-0030: Service Discovery](http://xmpp.org/extensions/xep-0030.html#items)
 *
 * @return {Function}
 * @api public
 */

module.exports = function itemsQueryResultParser() {
  
  return function itemsQueryResultParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    if (stanza.type != 'result') { return next(); }
    var query = stanza.getChild('query', 'http://jabber.org/protocol/disco#items');
    if (!query) { return next(); }
    
    stanza.items = [];
    query.getChildren('item', 'http://jabber.org/protocol/disco#items').forEach(function(el) {
      stanza.items.push({ jid: new JID(el.attrs.jid), node: el.attrs.node, name: el.attrs.name });
    });
    next();
  }
}
