// Sum of a range
function range(start, end, step) {
	var range = [];
	if (isNaN(step)) {
		if (start > end) step = -1;
		else { step = 1; }
	}

	if (step < 0) {
		for (var i = start; i >= end; i += step)
			range.push(i);
	} else {
		for (var i = start; i <= end; i += step)
			range.push(i);
	}
	
	return range;
}
function sum(range) {
	var sum = 0;
	for (var i = 0; i < range.length; i++) {
		sum += range[i];
	}
	return sum;
}
console.log(range(1, 10));
console.log(sum(range(1, 10)));
console.log(range(1, 10, 2));
console.log(range(5, 2, -1));

function reverseArray (arr) {
	var reversed = [];
	for (var i = arr.length - 1; i >= 0; i--) {
		reversed.push(arr[i]);
	}
	return reversed;
}
console.log("Not in-place", reverseArray(["Cats", "Pigs", "Lions", "Elephants"]));


function reverseArrayInPlace(arr) {
	var tmp, len = arr.length;

	for (var i = 0; i < Math.floor(len / 2); i++) {
		tmp = arr[i];
		arr[i] = arr[len - 1 - i];
		arr[len - 1 - i] = tmp;
	}
	return arr;
}
console.log("In-place reverse", reverseArrayInPlace(["Cats", "Pigs", "Lions", "Elephants"]));

console.log("\nPrepend:", prepend(10, prepend(20, null)));
console.log("Array to list:", arrayToList([10, 20, 30]));
console.log("List to Array:", listToArray(arrayToList([10, 20, 30, 99])));


// Converts an array into a tiered list.
function arrayToList (arr) {
	var list = null;
	for (var i = arr.length - 1; i >= 0 ; i--) {
		list = prepend(arr[i], list);
	}
	return list;
}

// translates a list into an array.
function listToArray (list) {
	var i = 0, arr = [];

	while( nth(list, i) ) {
		arr.push(nth(list, i));
		i++;
	}
	// Great implementation below.
	// for (var node = list; node; node = node.rest)
	return arr;
}

// Takes an element, e, and appends it to the front of the list.
function prepend (e, list) {
	if (list == null)
		return {	value: e,
					rest: null };

	return { value: e, rest: list };
}

// Takes a list and a number, n, and returns the element at the given position, n
function nth (list, n) {
	if (n == 0) return list.value;
	if (list.rest == null) return undefined;

	return nth(list.rest, n-1);
}



function deepEqual(val1, val2) {
	if (val1 === val2) return true;

	if (val1 == null || typeof val1 != "object" ||
		val2 == null || typeof val2 != "object")
		return false;

	var propsInVal1 = 0, propsInVal2 = 0;

	// Counting all properties of val1
	for (var prop in val1)
		propsInVal1++;

	for (var prop in val2) {
		propsInVal2++;
		// Compare properties, digging deeper to all properties of the objects
		// and their children.
		if (!(prop in val1) || !deepEqual(val1[prop], val2[prop]))
			return false;
	}

	// Maybe we had the same properties but val1 had a couple extra.
	return propsInVal1 == propsInVal2;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));