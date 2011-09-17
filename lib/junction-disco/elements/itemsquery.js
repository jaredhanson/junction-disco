/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `ItemsQuery` element.
 *
 * @param {String} node
 * @api public
 */
function ItemsQuery(node) {
  Element.call(this, 'query', 'http://jabber.org/protocol/disco#items');
  this.node = node;
}

/**
 * Inherit from `Element`.
 */
util.inherits(ItemsQuery, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
ItemsQuery.prototype.xmlAttributes = function() {
  return { node: this.node };
}


/**
 * Expose `ItemsQuery`.
 */
exports = module.exports = ItemsQuery;
