function Route(query, node, fn, options) {
  options = options || {};
  this.query = query;
  this.node = node;
  this.callback = fn;
  this.middleware = options.middleware;
}

Route.prototype.match = function(node) {
  // TODO: Implement regex-style matching.
  // TODO: Ensure that null nodes are matched when implementing test cases.
  return this.node == node;
};


module.exports = Route;
