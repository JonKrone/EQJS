var Router = module.exports = function() {
	this.routes = [];
};

Router.prototype.add = function(method, url, handler) {
	this.routes.push({method: method,
										url: url,
										handler: handler});
};