/**
 * Module dependencies.
 */
var junction = require('junction')
  , application = require('./application')
  , utils = require('./utils');


/**
 * Expose `create()`.
 */
exports = module.exports = create;

/**
 * Framework version.
 */
require('pkginfo')(module, 'version');

/**
 * Create a Junction/Disco application.
 *
 * @return {Function}
 * @api public
 */
function create() {
  var app = junction();
  utils.merge(app, application);
  app.init();
  return app;
}

/**
 * Expose `.create()` as module method.
 */
exports.create = create;

/**
 * Expose element constructors.
 */
exports.elements = {};
exports.elements.InfoQuery = require('./elements/infoquery');
exports.elements.Identity = require('./elements/identity');
exports.elements.Feature = require('./elements/feature');
exports.elements.ItemsQuery = require('./elements/itemsquery');
exports.elements.Item = require('./elements/item');

/**
 * Expose bundled middleware.
 */
exports.middleware = {};
exports.middleware.infoQueryResultParser = require('./middleware/infoQueryResultParser');
exports.middleware.itemsQueryResultParser = require('./middleware/itemsQueryResultParser');

/**
 * Expose bundled filters.
 */
exports.filters = {};
exports.filters.infoQuery = require('./filters/infoQuery');
