var util = require('util');
var Element = require('junction').elements.Element;

function Item(jid, node, name) {
  Element.call(this, 'item', 'http://jabber.org/protocol/disco#items');
  this.jid = jid;
  this.node = node;
  this.displayName = name;
}

util.inherits(Item, Element);

Item.prototype.xmlAttributes = function() {
  return { jid: this.jid, node: this.node, name: this.displayName };
}


exports = module.exports = Item;
