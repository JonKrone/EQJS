console.log("HELLOOOO THUNAR");

var x = "island";
console.log(x, "pen", x, x);

var numbered = Number("52");
console.log(Math.max(x, numbered));
console.log(Math.max(51, numbered));


var parkedepiel = Number(function (){
	if (19278346817346 % 3 == 0) {
		return function() { return 0; };
	} else {
		return return -1;
	}
	// Single-command blocks do not need brackets. JS presumes this is so w/o brackets
	// if (19278346817346 % 3 == 0)
	// 	return 0;  else; return -1;
});
// console.log(parkedepiel);

if (!isNaN(parkedepiel))
	console.log("We figured out how to use the result of the anon function in a variable!");
else
	console.log("still sloggin'");

/*  Commented because of processing time.

var sleep = require('sleep');
var countdown = 6663;
while (countdown <= 12000) {
	if (countdown <= 9000) {
		process.stdout.write("   H.. His powerlevel... " + countdown + "!\033[0G'");
	} else {
		process.stdout.write("   IT'S OVER 9000! and counting... " + countdown +"\033[0G'");
	}
	countdown = countdown + 3;
	sleep.usleep(10000);
}*/

// Translated above while loop to for structure
// for (var cd = 6663; cd <= 12000; cd = cd + 3) {
// 	if (cd <= 9000) {
// 		process.stdout.write("   H.. His powerlevel... " + cd + "!\033[0G'");
// 	} else {
// 		process.stdout.write("   IT'S OVER 9000! and counting... " + cd +"\033[0G'");
// 	}
// 	sleep.usleep(10000);
// }

/* for loop with missing parameters. */
var tentwentyfour = 1;
for (var count = 0; ; count = count + 1) {
	if (count == 10) break;
	tentwentyfour = tentwentyfour * 2;
}
console.log(tentwentyfour);

// Eloquent Javascript Chapter 2, Ex 1
for (var c = '#'; c.length < 8; c += '#') {
	console.log(c);
}

// Eloquent JS, Ch2 Ex2
for (var c = 1; c <= 100; c++) {
	var toPrint = c;
	if (c % 3 == 0) toPrint = "Fizz";
	if (c % 5 == 0) toPrint = "Buzz";
	if (c % 5 == 0 && c % 3 == 0) toPrint = "FizzBuzz";
	console.log(toPrint);
}

// Eloquent JS, Ch2 Ex3
var size =20;
for (var cby = 0; cby <= size; cby ++) {
	var toPrint = "";
	for (var cbx = 0; cbx <= size; cbx++) {
		if ((cbx + cby) % 2 == 0) toPrint += " ";
		else {
			toPrint += "#";
		} 
	}
	console.log(toPrint);
}