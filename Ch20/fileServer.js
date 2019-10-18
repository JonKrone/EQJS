var http = require("http"), fs = require("fs");

var methods = Object.create(null);

http.createServer(function(request, response) {
	function respond(code, body, type) {
		if (!type) type = "text/plain";

		response.writeHead(code, { "Content-Type": type});
		if (body && body.pipe)
			body.pipe(response);
		else
			response.end(body);
	}
	if (request.method in methods)
		methods[request.method](urlToPath(request.url), respond, request);
	else
		response(405, "Method " + request.method + " not allowed.");
}).listen(8000);

var Promise = require("promise");
var readFile = Promise.denodeify(fs.readFile);
readFile("file.txt", "utf8").then(function(content) {
	console.log("The file contained: " + content);
}, function (err) {
	console.log("Failed to read file: " + err);
});

methods.GET = function(path, respond) {
	fs.stat(path, function(err, stats) {
		if (err && err.code == "ENOENT")
			respond(404, "File not found.");
		else if (err)
			respond(500, err.toString());
		else if (stats.isDirectory()) {
			fs.readdir(path, function(err, files) {
				if (err)
					respond(500, err.toString());
				else
					respond(200, files.join("\n"));
			});
		}
		else
			respond(200, fs.createReadStream(path), require("mime").lookup(path));
	});
};
methods.DELETE = function(path, respond) {
	fs.stat(path, function(err, stats) {
		if (err && err.code == "ENOENT")
			respond(204);
		else if (err)
			respond(500, err.toString());
		else if (stats.isDirectory())
			fs.rmdir(path, respondErrorOrNothing(respond));
		else
			fs.unlink(path, respondErrorOrNothing(respond));
	});
};
methods.PUT = function(path, respond, request) {
	var outStream = fs.createWriteStream(path);
	outStream.on("error", function(err) {
		respond(500, err.toString());
	});
	outStream.on("finish", function() {
		respond(204);
	});
	request.pipe(outStream);
}


function respondErrorOrNothing(respond) {
	return function(error) {
		if (error)
			respond(500, error.toString());
		else
			respond(204);
	};
}

function urlToPath(url) {
	var path = require("url").parse(url).pathname;
	return "." + decodeURIComponent(path).replace(/(\/|\\)\.\.(\/|\\|$)/g, "/");
}
