var square = function (x) {
	return x * x;
};

var raise = function (base, exponent) {
	if (exponent == undefined)
		exponent = 2;
	var result = 1;
	for (var count = 0; count < exponent; count++){
		result *= base;
	}
	return result;
};

var landscape = function(ranges) {
  	var result = "";
  	var flat = function(size) {
    	for (var count = 0; count < size; count++)
      	result += "_";
  	};
  	var mountain = function(size) {
    	result += "/";
    	for (var count = 0; count < size; count++)
    		result += "'";
    	result += "\\";
  	};

  	for (var range = 0; range < ranges; range++) {
	 	flat(randomInt(17));
	 	mountain(randomInt(13));
	 	flat(randomInt(21));
	 	mountain(randomInt(7));
	 	flat(randomInt(17));
	 	result += '\n';
	}
  	return result;
};
console.log(landscape(17));


function randomInt(max) {
	return Math.floor(Math.random() * (max + 1));
};

/*  Fun! returns a function which can then be completed.
	Something like a functional object. Hm. Emphasis on messages
	in Ruby plays out here, too. */
function multiplier(factor) {
	return function(times) {
		return times * factor;
	};
}

var fives = multiplier(5);
console.log(fives(3));
console.log(fives(18));


// Eloquent JS, ch3 ex 1
function min(x, y) {
	return x < y ? x : y;
}

// Eloquent JS, ch3 ex 2
function isEven(n) {
	if (n < 0) n = -n;
	if (n == 0) return true;
	if (n == 1) return false;
	return isEven(n - 2);
}

// Eloquent JS, ch3 ex 3
function countChar(str, char) {
	var count = 0;
	for (var ch = 0; ch < str.length; ch++) {
		if (str.charAt(ch) == char) count++;
	}
	return count
}

console.log(min(0, 10));
console.log(min(0, -10));

console.log("Is 5 even?", isEven(5));
console.log("Is 124 even?", isEven(124));
console.log("And -1?", isEven(-1));

console.log("How many K's in kakkerlak?", countChar("kakkerlak", "k"));