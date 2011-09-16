/**
 * Module dependencies.
 */
var util = require('util')
  , StanzaError = require('junction').StanzaError;


/**
 * Parse info discovery stanzas.
 *
 * This middleware parses information contained within _disco#info_ stanzas.
 * `stanza.query` indicates the type of query, in this case always _info_.
 * `stanza.node` indicates the node identifier associated with an entity.
 *
 * Junction/Disco activates this middleware automatically.  Your program should
 * not need to use it manually.
 *
 * References:
 * - [XEP-0030: Service Discovery](http://xmpp.org/extensions/xep-0030.html#info)
 *
 * @return {Function}
 * @api private
 */

module.exports = function infoQueryParser() {
  
  return function infoQueryParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var query = stanza.getChild('query', 'http://jabber.org/protocol/disco#info');
    if (!query) { return next(); }
    
    if (stanza.type == 'set') {
      return next(new StanzaError("Query must be an IQ-get stanza.", 'modify', 'bad-request'));
    }
    
    stanza.query = 'info';
    stanza.node = query.attrs.node || null;
    next();
  }
}
