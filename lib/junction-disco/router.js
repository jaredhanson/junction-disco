/**
 * Module dependencies.
 */
var Route = require('./route');


/**
 * Initialize a new `Router`.
 *
 * @api private
 */
function Router() {
  var self = this;
  this._routes = {};

  this.middleware = function(req, res, next) {
    self._dispatch(req, res, next);
  };
}

Router.prototype._dispatch = function(req, res, next) {
  var self = this;
  
  (function pass(i, err) {
    var route = self._match(req, i);
    if (!route) { return next(err); }
    
    function nextRoute(err) {
      pass(i + 1, err);
    }
    
    var idx = 0;
    function callbacks(err) {
      var fn = route.callbacks[idx++];
      try {
        if ('route' == err) {
          nextRoute();
        } else if (err && fn) {
          if (fn.length < 4) { return callbacks(err); }
          fn(err, req, res, callbacks);
        } else if (fn) {
          fn(req, res, callbacks);
        } else {
          nextRoute(err);
        }
      } catch (err) {
        callbacks(err);
      }
    }
    
    callbacks();
  })(0);
}

Router.prototype._match = function(req, i) {
  var query = req.query;
  var node = req.node;
  var routes;
  var route;
  
  if (routes = this._routes[query]) {
    for (var len = routes.length; i < len; i++) {
      route = routes[i];
      if (route.match(node)) {
        return route;
      }
    }
  }
  return null;
}

Router.prototype._route = function(query, node, callbacks) {
  function flatten(array, ret) {
    var ret = ret || []
      , len = array.length;
    for (var i = 0; i < len; ++i) {
      if (Array.isArray(array[i])) {
        flatten(array[i], ret);
      } else {
        ret.push(array[i]);
      }
    }
    return ret;
  };
  
  
  if (node && 'string' !== typeof node) {
    callbacks = node;
    node = null;
  }
  
  callbacks = flatten(Array.prototype.slice.call(arguments, 2));
  
  var route = new Route(query, node, callbacks);
  (this._routes[query] = this._routes[query] || [])
    .push(route);
  return this;
};


module.exports = Router;
