require('./ancestry.js');


var ancestry = JSON.parse(ANCESTRY_FILE);







function filter(arr, test) {
	var passed = [];

	// Why not forEach? --# EFFICIENCY is the problem
	arr.forEach(function(i) {
		if (test(i))
			passed.push(i);
	});
	return passed;
}

function map (arr, transform) {
	var mapped = [];
	arr.forEach(function(i) {
		mapped.push(transform(i));
	});
	return mapped;
}

function reduce (arr, combine, start) {
	var current = start;
	arr.forEach(function(i) {
		current = combine(current, i);
	});
	return current;
}

function average(arr) {
	function plus(a, b) { return a + b; }
	return arr.reduce(plus) / arr.length;
}

// Iterates through a family tree
function reduceAncestors(person, f, defaultValue) {
	function valueFor(person) {
		if (person == null) return defaultValue;
		else
			return f(person, valueFor(byName[person.mother]),
							 valueFor(byName[person.father]));
	}
	return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
	if (person.name == "Pauwels van Haverbeke") return 1;
	else return (fromMother + fromFather) / 2;
}

function countAncestors(person, test) {
	function combine(current, fromMother, fromFather) {
		var thisOneCounts = current != person && test(current);
		return fromMother + fromFather + (thisOneCounts ? 1 : 0);
	}
	return reduceAncestors(person, combine, 0);
}
function longLivingPercentage(person, _age) {
	if (isNaN(_age)) _age = 70;
	var all = countAncestors(person, function(person) {
		return true;
	});
	var longLiving = countAncestors(person, function(person) {
		return (person.died - person.born) >= _age;
		// return age(person) >= _age;
	});
	return longLiving / all;
}

function age(p) { return p.died - p.born; }
function male(p) { return p.sex == "m"; }
function female(p) { return p.sex == "f"; } 

var theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];
function isInSet(set, person) {
	return set.indexOf(person.name) > -1;
}


console.log("Average male age:", Math.round(average(ancestry.filter(male).map(age))));
console.log("Average female age:", Math.round(average(ancestry.filter(female).map(age))));

console.log(filter(ancestry, function(person) {
	return person.born > 1900 && person.born < 1925;
}));

var overNinety = ancestry.filter(function(person) {
	return person.died - person.born > 90;
});
console.log(map(overNinety, function(person) {
	return person.name;
}));

console.log(ancestry.reduce(function(min, cur) {
	if (cur.born < min.born) return cur;
	else return min;
}));

var byName = {};
ancestry.forEach(function(person) {
	byName[person.name] = person;
});
console.log(byName["Philibert Haverbeke"]);

var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);

console.log(longLivingPercentage(byName["Emile Haverbeke"]));


// The two calls below are equivalent
console.log(ancestry.filter(function(person) {
	return isInSet(theSet, person);
}));
console.log(ancestry.filter(isInSet.bind(null, theSet)));