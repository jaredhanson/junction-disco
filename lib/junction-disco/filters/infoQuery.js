/**
 * Set pending properties on outgoing info discovery stanzas.
 *
 * This filter processes outgoing info discovery stanzas, setting properties on
 * the pending object.  When using pending middleware, these properties will be
 * restored and can be inspected when the response arrives.
 *
 * Properties:
 *  - `pending.xmlns` is set to `http://jabber.org/protocol/disco#info`
 *  - `pending.query` is set to `info`
 *  - `pending.jid`   indicates the target entity
 *  - `pending.node`  indicates the node identifier associated with the target entity
 *
 * Examples:
 *
 *      connection.filter(disco.filters.infoQuery());
 *
 * References:
 * - [XEP-0030: Service Discovery](http://xmpp.org/extensions/xep-0030.html#info)
 *
 * @return {Function}
 * @api public
 */
module.exports = function infoQuery() {
  return function infoQuery(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    if (stanza.attrs.type != 'get') { return next(); }
    
    var query = stanza.getChild('query', 'http://jabber.org/protocol/disco#info');
    if (!query) { return next(); }
    
    stanza.pending = stanza.pending || {};
    stanza.pending.xmlns = 'http://jabber.org/protocol/disco#info';
    stanza.pending.query = 'info';
    stanza.pending.jid = stanza.attrs.to;
    stanza.pending.node = query.attrs.node;
    next();
  }
}
