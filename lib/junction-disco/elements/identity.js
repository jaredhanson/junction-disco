var util = require('util');
var Element = require('junction').elements.Element;

function Identity(category, type, name) {
  Element.call(this, 'identity', 'http://jabber.org/protocol/disco#info');
  this.category = category;
  this.type = type;
  this.displayName = name;
}

util.inherits(Identity, Element);

Identity.prototype.xmlAttributes = function() {
  return { category: this.category, type: this.type, name: this.displayName };
}


exports = module.exports = Identity;
