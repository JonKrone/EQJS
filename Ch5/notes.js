function forEach(arr, action) {
	for (var i = 0; i < arr.length; i++) {
		action(arr[i]);
	}
}

var whoSays = ["Ar", "Oink", "long sentence without the R", "Scurvy", "Shiver me timbers"];
forEach(whoSays, function(whoSays) {
	console.log(whoSays.indexOf("r") != -1);
});

function noisy(f) {
	return function(arg) {
		console.log("Calling with", arg);
		var val = f(arg);
		console.log("Called with", arg, "- got", val);
		return val;
	};
}

function unless(test, then) {
	if (!test) then();
}

function repeat(times, body) {
	for (var i = 0; i < times; i++) body(i);
}

repeat(18, function(n) {
	unless(!(n % 3 == 0 && n % 5 == 0), function() {
		console.log(n, 'fizzbuzz');
	});
});