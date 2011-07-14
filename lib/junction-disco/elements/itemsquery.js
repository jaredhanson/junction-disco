var util = require('util');
var Element = require('junction').elements.Element;

function ItemsQuery(node) {
  Element.call(this, 'query', 'http://jabber.org/protocol/disco#items');
  this.node = node;
}

util.inherits(ItemsQuery, Element);

ItemsQuery.prototype.xmlAttributes = function() {
  return { node: this.node };
}


exports = module.exports = ItemsQuery;
