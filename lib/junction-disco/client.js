/**
 * Module dependencies.
 */
var junction = require('junction')
  , util = require('util')
  , Router = require('./router');


/**
 * Initialize a new `Client`.
 *
 * @param {Object} options
 * @api public
 */
function Client(options) {
  junction.Client.call(this, options);
  this.init();
}

/**
 * Inherit from `junction.Client`.
 */
util.inherits(Client, junction.Client);

/**
 * Initialize the client.
 *
 * @api private
 */
Client.prototype.init = function() {
  var self = this;
  
  this._router = new Router();
  this.__defineGetter__('router', function() {
    this._usedRouter = true;
    return self._router.middleware;
  });
}


/**
 * Delegate `.QUERY(...)` calls to `._route(QUERY, ...)`.
 */
var queries = require('./queries');

queries.forEach(function(query) {
  var method = query;
  Client.prototype[method] = function(node) {
    var args = [query].concat(Array.prototype.slice.call(arguments));
    // Delay use of the router, causing it to be low on the stack, thus not
    // consuming stanzas before they have a chance to be logged, etc.
    if (!this._usedRouter) {
      this.use(require('./middleware/infoQueryParser')());
      this.use(require('./middleware/itemsQueryParser')());
      this.use(this.router);
    }
    return this._router._route.apply(this._router, args);
  }
});


/**
 * Expose `Client`.
 */
module.exports = Client;
