function Route(query, node, fn, options) {
  if ('function' == typeof node) {
    options = fn;
    fn = node;
    node = null;
  }
  
  options = options || {};
  this.query = query;
  this.node = node;
  this.callback = fn;
  this.middleware = options.middleware;
}

Route.prototype.match = function(node) {
  // TODO: Implement regex-style matching.
  return this.node == node;
};


module.exports = Route;
