module.exports = function(str) {
	return str.split("").map(function(ch) {
		return String.fromCharCode(ch.charCodeAt(0) + 5);
	}).join("");
};