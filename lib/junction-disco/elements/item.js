/**
 * Module dependencies.
 */
var util = require('util')
  , Element = require('junction').elements.Element;

/**
 * Initialize a new `Item` element.
 *
 * @param {String} jid
 * @param {String} node
 * @param {String} name
 * @api public
 */
function Item(jid, node, name) {
  Element.call(this, 'item', 'http://jabber.org/protocol/disco#items');
  this.jid = jid;
  this.node = node;
  this.displayName = name;
}

/**
 * Inherit from `Element`.
 */
util.inherits(Item, Element);

/**
 * Build XML attributes.
 *
 * @api private
 */
Item.prototype.xmlAttributes = function() {
  return { jid: this.jid, node: this.node, name: this.displayName };
}


/**
 * Expose `Feature`.
 */
exports = module.exports = Item;
