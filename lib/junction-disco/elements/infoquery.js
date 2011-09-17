/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `InfoQuery` element.
 *
 * @param {String} node
 * @api public
 */
function InfoQuery(node) {
  Element.call(this, 'query', 'http://jabber.org/protocol/disco#info');
  this.node = node;
}

/**
 * Inherit from `Element`.
 */
util.inherits(InfoQuery, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
InfoQuery.prototype.xmlAttributes = function() {
  return { node: this.node };
}


/**
 * Expose `InfoQuery`.
 */
exports = module.exports = InfoQuery;
