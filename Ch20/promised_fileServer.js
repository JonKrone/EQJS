var http = require("http"), fs = require("fs");
var Promise = require("promise");

var methods = Object.create(null);

http.createServer(function(request, response) {
  respondTo(request).then(function(data) {
    response.writeHead(data.code, {"Content-Type": data.type || "text/plain"});
    if (data.body && data.body.pipe)
      data.body.pipe(response);
    else
      response.end(data.body);
  }, function(err) {
    response.writeHead(500);
    response.end(err.toString());
    console.log("Response failed: ", err.stack);
  });
}).listen(8000);

function respondTo(request) {
  if (request.method in methods)
    return methods[request.method](urlToPath(request.url), request);
  else
    return Promise.resolve({code: 405,
                            body: "Method " + request.method + " not allowed."});
}

function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  var decoded = decodeURIComponent(path);
  return "." + decoded.replace(/(\/|\\)\.\.(\/|\\|$)/g, "/");
}

var fsp = {};
["stat", "readdir", "rmdir", "unlink", "mkdir"].forEach(function(method) {
  fsp[method] = Promise.denodeify(fs[method]);
});

function inspectPath(path) {
  return fsp.stat(path).then(null, function(err) {
    if (err.code == "ENOENT") return null;
    else throw error;
  });
}

var noContent = {code: 204};
function returnNoContent() { return noContent; }

methods.GET = function(path) {
  return inspectPath(path).then(function(stats) {
    if (!stats)
      return {code: 404, body: "File not found"};
    else if (stats.isDirectory())
      return fsp.readdir(path).then(function(files) {
        return { code: 200, body: files.join("\n")};
      });
    else
      return {code: 200,
              type: require("mime").lookup(path),
              body: fs.createReadStream(path)};
  });
};
methods.DELETE = function(path) {
  return inspectPath(path).then(function(stats) {
    if (!stats)
      return noContent;
    else if (stats.isDirectory())
      return fsp.rmdir(path).then(returnNoContent);
    else
      return fsp.unline(path).then(returnNoContent);
  });
};
methods.PUT = function(path, request) {
  return new Promise(function(success, failure) {
    var outStream = fs.createWriteStream(path);
    outStream.on("error", failure);
    outStream.on("finish", success.bind(null, noContent));
    request.pipe(outStream);
  });
};
methods.MKCOL = function(path, request) {
  return inspectPath(path).then(function(stats) {
    if (!stats)
      return fsp.mkdir(path).then(returnNoContent);
    if (stats.isDirectory())
      return noContent;
    else
      return {code: 400, body: "File exists"};
  });
};

function contentRequest(type) {
  http.request({
    hostname: "eloquentjavascript.net",
    path: "/author",
    headers: {Accept: type},
    method: "GET"
  }, function(response) {
    response.on("data", function(chunk) {
      console.log("new response.");
      process.stdout.write(chunk.toString());
    });
  }).end("request of type: " + type + "end");
}

var contentTypes = ["text/plain", "text/html", "application/json", "application/rainbows+unicorns"];
for (type in contentTypes) {
  if (contentTypes.hasOwnProperty(type)) {
    console.log("Making request of type:", contentTypes[type]);
    contentRequest(contentTypes[type]);
  }
}