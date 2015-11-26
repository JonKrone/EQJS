var garble = require("./garble");

var arg = process.argv[2];
console.log(garble(arg));

var fs = require("fs");
fs.readFile("../Ch18/life.html", "utf8", function(err, text) {
	if (err) throw err;
	console.log("file contains: ", text);
});
fs.writeFile("present.txt", "Node was here", function(err) {
	if (err) console.log("failed to write:", err);
	else console.log("file.written");
});
// fs.stat for statistics on a file
// fs.rename to rename
// fs.readDir to output filenames in a directory
// fs.unlink removes a file


var http = require("http");
var server = http.createServer(function(req, resp) {
	resp.writeHead(200, { "Content-Type": "text/html"});
	resp.write("<h1>Hello!</h1><p>You asked for <code>" + req.url + "</code></p>");
	resp.end();
}).listen(8000);

var request = http.request({
	hostname: "eloquentjavascript.net",
	path: "/20_node.html",
	method: "GET",
	headers: {Accept: "text/html"}
}, function(response) {
	// console.log(response);
	console.log("Serve responded with status code:", response.statusCode);
});
request.end();

http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	request.on("data", function(chunk) {
		response.write(chunk.toString().toUpperCase());
	});
	request.on("end", function() {
		response.end();
	});
}).listen(8001);

var req = http.request({
	hostname: "localhost",
	port: 8001,
	method: "POST"
}, function(resp) {
	resp.on("data", function(chunk) {
		process.stdout.write(chunk.toString());
	});
});
req.end("Hello server");