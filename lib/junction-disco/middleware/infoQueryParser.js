var util = require('util');
var StanzaError = require('junction').StanzaError;


module.exports = function infoQueryParser(options) {
  options = options || {};
  
  return function publish(stanza, next) {
    if (!stanza.is('iq')) { return next(); }
    var query = stanza.getChild('query', 'http://jabber.org/protocol/disco#info');
    if (!query) { return next(); }
    
    if (stanza.type != 'get') {
      return next(new StanzaError("Query must be an IQ-get stanza.", 'modify', 'bad-request'));
    }
    
    stanza.query = 'info';
    stanza.node = query.attrs.node || null;
    next();
  }
}
