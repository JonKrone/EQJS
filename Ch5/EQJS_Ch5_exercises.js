require('./ancestry.js');
var ancestry = JSON.parse(ANCESTRY_FILE);

var byName = {};
ancestry.forEach(function(person) {
	byName[person.name] = person;
});

function average(arr) {
	function plus(a, b) { return a + b; }
	return arr.reduce(plus) / arr.length;
}

function age(p) { return p.died - p.born; }

// // EQJS excerise 1
// var arrays = [[1, 2, 3], [4, 5], [6]]
// function flatt(arr) {
// 	return arr.reduce(function(tier, curr) {
// 		return tier.concat(curr);
// 	}, []);
// }
// // console.log(flatt(arrays));


// function ageDiff (self, other) {
// 	return Math.abs(self.born - other.born);
// }

// // Well, this balooned quickly. Exercise 2
// function mapAncestors(root, f) {
// 	var map = [];
// 	console.log("Root patron:", root);
// 	function valueFor(root) {
// 		if (typeof byName[root.mother] == 'undefined') {
// 			console.log(root.mother, "is undefined, pushing null");
// 			map.push(null);
// 		}
// 		else {
// 			var AD = ageDiff(root, byName[root.mother]);
// 			console.log("age difference between child:", root.name,"and mother: ", root.mother, "is", AD);
// 			map.push(AD);
// 			console.log("\nadvancing to:", byName[root.mother]);
// 			f(root.mother, valueFor(byName[root.mother]));
// 			valueFor(byName[root.father]);
// 		}

// 	}
// 	valueFor(root);
// 	return map;
// }
// var ageDiffs = mapAncestors(byName["Philibert Haverbeke"], function(child, mother) {
// 	if (typeof mother == 'undefined') return null;
// 	return child.born - mother.born;
// });
// console.log(ageDiffs);
// console.log(average(ageDiffs.filter(function(item){ return item != null; })));

// // His solution to exercise 2:
// var differences = ancestry.filter(function(person) {
// 	return byName[person.mother] != null;
// }).map(function(person) {
// 	return person.born - byName[person.mother].born;
// });
// console.log(average(differences));
// // Okay, so he just removes all candidates that don't have a recorded mother, then iterates through
// // the table, mapping their age difference with their mother.

// // EQJS exercise 3
// function groupBy(arr, groupingFunction) {
// 	var groups = {};

// 	for (var i = 0; i < arr.length; i++) {
// 		var group = groupingFunction(arr[i]);
// 		if (group in groups)
// 			groups[group].push(arr[i]);
// 		else
// 			groups[group] = [arr[i]];
// 	}
// 	return groups;
// }
// var centuries = groupBy(ancestry, function(person) {
// 	return Math.ceil(person.died / 100);
// });

// for (var century in centuries) {
// 	var ages = centuries[century].map(age);
// 	console.log(century + ": " + average(ages));
// }


// EQJS EVERY, exercise 4
function every(arr, test) {
	for (var i = 0; i < arr.length; i++) {
		if (!test(arr[i]))
			return false;
	}

	return true;

	// You cannot exit out of a forEach with a return/break.
	// 
 	// 	var toRet = true;
	// arr.forEach(function(e) {
	// 	console.log("Testing", e, " result:", tester(e));
	// 	if (!tester(e)) {
	// 		toRet = false;
	// 	}
	// });
	// return toRet;
}
console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, 2], isNaN));

// EQJS SOME, exercise 4
function some(arr, test) {
	for (var i = 0; i < arr.length; i++) {
		if (test(arr[i])) return true;
	}
	return false;
}
console.log(some([NaN, 2, 4], isNaN));
console.log(some([1, 23, 4], isNaN));



