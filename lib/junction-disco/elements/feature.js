/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `Feature` element.
 *
 * @param {String} variation
 * @api public
 */
function Feature(variation) {
  Element.call(this, 'feature', 'http://jabber.org/protocol/disco#info');
  this.variation = variation;
}

/**
 * Inherit from `Element`.
 */
util.inherits(Feature, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
Feature.prototype.xmlAttributes = function() {
  return { 'var': this.variation };
}


/**
 * Expose `Feature`.
 */
exports = module.exports = Feature;
