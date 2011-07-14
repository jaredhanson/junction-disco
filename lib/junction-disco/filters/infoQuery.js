var util = require('util');

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
