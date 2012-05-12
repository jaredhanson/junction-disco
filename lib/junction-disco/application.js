/**
 * Module dependencies.
 */
var Router = require('./router')
  , debug = require('debug')('junction-disco');


/**
 * Application prototype.
 */
var app = exports = module.exports = {};

/**
 * Initialize application.
 *
 * @api private
 */
app.init = function() {
  this._router = new Router();
  this.__defineGetter__('router', function() {
    this._usedRouter = true;
    return this._router.middleware;
  });
  
  this.use(require('./middleware/infoQueryParser')());
  this.use(require('./middleware/itemsQueryParser')());
};


/**
 * Delegate `.QUERY(...)` calls to `.route(QUERY, ...)`.
 */
var queries = require('./queries');

queries.forEach(function(query) {
  var method = query;
  app[method] = function(node) {
    var args = [query].concat(Array.prototype.slice.call(arguments));
    if (!this._usedRouter) { this.use(this.router); }
    return this._router.route.apply(this._router, args);
  }
});
