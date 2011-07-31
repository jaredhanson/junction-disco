var Client = require('./client');

exports.createConnection = function (options) {
  // @todo: Implement support for component connections.
  return new Client(options);
};


exports.elements = {};
exports.elements.InfoQuery = require('./elements/infoquery');
exports.elements.Identity = require('./elements/identity');
exports.elements.Feature = require('./elements/feature');
exports.elements.ItemsQuery = require('./elements/itemsquery');
exports.elements.Item = require('./elements/item');

exports.middleware = {};
exports.middleware.infoQueryResponseParser = require('./middleware/infoQueryResponseParser');

exports.filters = {};
exports.filters.infoQuery = require('./filters/infoQuery');
