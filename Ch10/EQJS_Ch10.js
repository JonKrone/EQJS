var weekDay = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
}();

(function(exports) {
	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	exports.name = function(number) {
		return names[number + 1];
	};
	exports.number = function(name) {
		return names.indexOf(name);
	};
})(this.weekDay = {}); // We are passing an interface object
console.log(weekDay.name(weekDay.number("Friday")));

(function() {
	function pow(x, n) {
		if (isNaN(n)) n = 2;
		return Math.pow(x, n)
	}
	var hundred = 100;

	console.log(pow(100));
})();

var plusOne = new Function("r", "return r % 17;");
console.log(plusOne(15234));


function require(fle) {
	if (name in require.cache) return require.cache[file];

	var code = new Function("exports, module", readFile(file));
	var exports = {}
	var module = {exports: exports};
	code(exports, module);

	require.cache[name] = module.exports;
	return module.exports;
}

var defineCache = Object.create(null);
var currentMod = null;
function getModule(name) {
	if (name in defineCache) return defineCache[name];

	var module = {exports: null, loaded: false, onload: []};
	defineCache[name] = module;
	backgroundReadFile(name, function(code) {
		currentMod = module;
		new Function("", code)();
	});
	return module;
}

function define(depNames, moduleFunction) {
	var myMod = currentMod;
	var deps = depNames.map(getModule);

	deps.forEach(function(mod) {
		if (!mod.loaded)
			mod.onLoad.push(whenDepsLoaded);
	});

	function whenDepsLoaded() {
		if (!deps.every(function(m) { return m.loaded; }))
			return;

		var args = deps.map(function(m) {return m.exports; }));
		var exports = moduleFunction.apply(null, args);
		if (myMod) {
			myMod.exports = exports;
			myMod.loaded = true;
			myMod.onLoad.forEach(function(f) { f(); });
		}
	}
	whenDepsLoaded();
}