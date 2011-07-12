var util = require('util');
var Element = require('junction').elements.Element;

function Feature(variation) {
  Element.call(this, 'feature', 'http://jabber.org/protocol/disco#info');
  this.variation = variation;
}

util.inherits(Feature, Element);

Feature.prototype.xmlAttributes = function() {
  return { 'var': this.variation };
}


exports = module.exports = Feature;
