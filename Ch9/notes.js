// var re1 = new RegExp("abs");
// var re2 = /abs/;

// console.log(/rum/.test("why is all the rum gone?"));

// console.log(/[0-9]/.test("whipped d00 dah"));
// console.log(/d/.test("whipped d00 dah"));
// console.log(/D/.test("13374425085"));

// console.log("Hopper, Grace\nMcCarth, John\nRichie, Dennis"
// 	.replace(/([\w ]+), ([\w ]+)/g, "$2 $1"));

// var s = "the cia and fbi";
// console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
// 	return str.toUpperCase();
// }));

// // Adding a question mark after (+, *, ?, {}) tells it to match in a nongreedy fashion
// function stripComments(code) {
//   return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
// }
// console.log(stripComments("1 /* a */+/* b */ 1"));

// var name = "ronald";
// var text = "Ronald McDonald loves me";
// var regexp = new RegExp("\\b(" + name + ")\\b", "gi");
// console.log(text.replace(regexp, "_$1_"));

// function parseINI(file) {
// 	// Start with an object to hold top-level fields
// 	var currentSection = { name: "top", fields: [] };
//   var categories = [currentSection];

//   file.split(/\r?\n/).forEach(function(line) {
//     var match;
//     if (/^\s*(;.*)?$/.test(line)) {
//       return;
//     } else if (match = line.match(/^\[(.*)\]$/)) {
//       currentSection = {name: match[1], fields: []};
//       categories.push(currentSection);
//     } else if (match = line.match(/^(\w+)=(.*)$/)) {
//       currentSection.fields.push({name: match[1], value: match[2]});
//     } else {
//       throw new Error("Line '" + line + "' is invalid.");
//     }
//   });

//   return categories;
// }

// var engine = "searchengine=http://www.google.com/search?q=$1\n" +
// "spitefulness=9.7\n" +
// "\n" +
// "; comments are preceded by a semicolon...\n" +
// "; each section concerns an individual enemy\n" +
// "[larry]\n" +
// "fullname=Larry Doe\n" +
// "type=kindergarten bully\n" +
// "website=http://www.geocities.com/CapeCanaveral/11451\n" +
// "\n" +
// "[gargamel]\n" +
// "fullname=Gargamel\n" +
// "type=evil sorcerer\n" +
// "outputdir=/home/marijn/enemies/gargamel\n";

// console.log(parseINI(engine));

/*
/abc/ A sequence of characters
/[abc]/ Any character from a set of characters
/[^abc]/  Any character not in a set of characters
/[0-9]/ Any character in a range of characters
/x+/  One or more occurrences of the pattern x
/x+?/ One or more occurrences, nongreedy
/x*/ /*  Zero or more occurrences
/x?/  Zero or one occurrence
/x{2,4}/  Between two and four occurrences
/(abc)/ A group
/a|b|c/ Any one of several patterns
/\d/  Any digit character
/\w/  An alphanumeric character (“word character”)
/\s/  Any whitespace character
/./ Any character except newlines
/\b/  A word boundary
/^/ Start of input
/$/ End of input

regexp.test(string)
regexp.exec() returns array of all matched groups, with index
string.match(regexp)
string.search(regexp) returns index of first occurance of regexp
string.replace(regexp, newString)

*/

// EQJS, chapter 9 exercise 1
function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");
  });
}
verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);
verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop"]);
verify(/ferr(et|y|ari)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);
verify(/ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);
verify(/\s[.,:;]/,
       ["bad punctuation ."],
       ["escape the dot"]);
verify(/\w{7,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);
verify(/\b[a-df-z]+\b/i,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);

// EQJS chapter 9 exercise 2
var text = "'I'm the cook,' he said, 'it's my job.'";
console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'))

// EQJS chapter 9 exercise 3
// /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)$/; Why doesn't this also work?
var number = /^(\+|-|)(\d+(\.\d*)?|\.\d+)([eE](\+|-|)\d+)?$/;

["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4",
 "1e+12"].forEach(function(s) {
  if (!number.test(s))
    console.log("Failed to match '" + s + "'");
  else console.log("Matched '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5",
 "."].forEach(function(s) {
  if (number.test(s))
    console.log("Incorrectly accepted '" + s + "'");
});