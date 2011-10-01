/**
 * Module dependencies.
 */
var Client = require('./client');
var Component = require('./component');

/**
 * Framework version.
 */
exports.version = '0.1.0';


/**
 * Create a new Junction/Disco connection.
 *
 * Options:
 *   - `jid`            JID
 *   - `password`       Password, for authentication
 *   - `host`
 *   - `port`
 *   - `type`           Type of connection, see below for types
 *   - `disableStream`  Disable underlying stream, defaults to _false_
 *
 * Connection Types:
 *   - `client`     XMPP client connection
 *   - `component`  XMPP component connection
 *
 * Examples:
 *
 *     var client = disco.createConnection({
 *       type: 'client',
 *       jid: 'user@example.com',
 *       password: 'secret',
 *       host: 'example.com',
 *       port: 5222
 *     });
 *
 * @param {Object} options
 * @return {Connection}
 * @api public
 */
exports.createConnection = function (options) {
  if (options.type == 'component') {
    return new Component(options);
  }
  return new Client(options);
};


/**
 * Expose constructors.
 */
exports.Client = Client;
exports.Component = Component;

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

/**
 * Expose bundled filters.
 */
exports.filters = {};
exports.filters.infoQuery = require('./filters/infoQuery');
