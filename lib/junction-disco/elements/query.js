var util = require('util');
var Element = require('junction').elements.Element;

function Query(node) {
  Element.call(this, 'query', 'http://jabber.org/protocol/disco#info');
  this.node = node;
}

util.inherits(Query, Element);

Query.prototype.xmlAttributes = function() {
  return { node: this.node };
}


exports = module.exports = Query;
