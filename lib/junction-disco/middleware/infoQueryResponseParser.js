var util = require('util');


module.exports = function infoQueryResponseParser(options) {
  options = options || {};
  
  return function infoQueryResponseParser(stanza, next) {
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
