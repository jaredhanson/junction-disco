var Client = require('./client');

exports.createConnection = function (options) {
  // @todo: Implement support for component connections.
  return new Client(options);
};


exports.elements = {};
exports.elements.Query = require('./elements/query');
exports.elements.Identity = require('./elements/identity');
exports.elements.Feature = require('./elements/feature');
exports.elements.QueryItems = require('./elements/queryitems');
exports.elements.Item = require('./elements/item');

exports.filters = {};
exports.filters.infoQuery = require('./filters/infoQuery');
