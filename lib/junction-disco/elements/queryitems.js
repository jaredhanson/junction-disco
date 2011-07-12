var util = require('util');
var Element = require('junction').elements.Element;

function QueryItems(node) {
  Element.call(this, 'query', 'http://jabber.org/protocol/disco#items');
  this.node = node;
}

util.inherits(QueryItems, Element);

QueryItems.prototype.xmlAttributes = function() {
  return { node: this.node };
}


exports = module.exports = QueryItems;
