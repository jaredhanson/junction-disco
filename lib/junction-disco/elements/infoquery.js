var util = require('util');
var Element = require('junction').elements.Element;

function InfoQuery(node) {
  Element.call(this, 'query', 'http://jabber.org/protocol/disco#info');
  this.node = node;
}

util.inherits(InfoQuery, Element);

InfoQuery.prototype.xmlAttributes = function() {
  return { node: this.node };
}


exports = module.exports = InfoQuery;
