/**
 * Parse info discovery result stanzas.
 *
 * This middleware parses information contained within _disco#info_ result
 * stanzas.  `stanza.identities` indicates the target entity's identity.
 * `stanza.features` indicates the features offered and protocols supported by
 * the target entity.
 *
 * Examples:
 *
 *      connection.use(junction.infoQueryResultParser());
 *
 * References:
 * - [XEP-0030: Service Discovery](http://xmpp.org/extensions/xep-0030.html#info)
 *
 * @return {Function}
 * @api public
 */

module.exports = function infoQueryResultParser() {
  
  return function infoQueryResultParser(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    if (stanza.type != 'result') { return next(); }
    var query = stanza.getChild('query', 'http://jabber.org/protocol/disco#info');
    if (!query) { return next(); }
    
    stanza.identities = [];
    stanza.features = [];
    query.getChildren('identity', 'http://jabber.org/protocol/disco#info').forEach(function(el) {
      stanza.identities.push({ category: el.attrs.category, type: el.attrs.type, name: el.attrs.name });
    });
    query.getChildren('feature', 'http://jabber.org/protocol/disco#info').forEach(function(el) {
      stanza.features.push(el.attrs.var);
    });
    next();
  }
}
