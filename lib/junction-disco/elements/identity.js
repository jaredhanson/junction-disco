/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `Identity` element.
 *
 * @param {String} category
 * @param {String} type
 * @param {String} name
 * @api public
 */
function Identity(category, type, name) {
  Element.call(this, 'identity', 'http://jabber.org/protocol/disco#info');
  this.category = category;
  this.type = type;
  this.displayName = name;
}

/**
 * Inherit from `Element`.
 */
util.inherits(Identity, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
Identity.prototype.xmlAttributes = function() {
  return { category: this.category, type: this.type, name: this.displayName };
}


/**
 * Expose `Identity`.
 */
exports = module.exports = Identity;
