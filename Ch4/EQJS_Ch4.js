var day1 = {
	squirrel: false,
	events: ["work", "touched tree", "pizza", "running", "tv"],
	"feeling weird": false
};
day1.events.push("squeek");
day1.fullMoon = true;


console.log(day1);
delete day1.fullMoon;
console.log("feeling weird" in day1);

var journal = [];
addLog(day1);
addLog({events: ["work", "touched tree", "pizza", "running", "television"],
   		squirrel: false});
addLog({events: ["work", "ice cream", "cauliflower",
	"lasagna", "touched tree", "brushed teeth"],
    squirrel: false});
addLog({events: ["weekend", "cycling", "break", "peanuts", "beer"],
   	squirrel: true});
console.log(journal);

var object1 = {value: 10};
var object2 = object1;
var object3 = {value: 10};
console.log(object1 == object3);
console.log(object1 === object3);

function remove(array, index) {
	return array.slice(0, index).concat(array.slice(index + 1));
}




