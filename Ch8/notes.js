function whereWeGoin(time) {
	var res = Math.random() * 3;
	if (res > 1) return "L";
	throw new Error("Unlucky!");
}

try {
	console.log(whereWeGoin(2.0));
	console.log(whereWeGoin(2.0));
	console.log(whereWeGoin(2.0));
	console.log(whereWeGoin(2.0));
} catch (error) {
	console.log(error);
}

function InputError(msg) {
	this.message = msg;
	this.stack = (new Error()).stack;
}
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";

function AssertionFailed(message) {
	this.message = mesaage;
}
AssertionFailed.prototype = Object.create(Error.prototype);

function assert(test, message) {
	if (!test)
		throw new AssertionFailed(message);
}

function lastElement(array) {
	assert(array.length > 0, "empty array in lastElement");
	return array[array.length - 1];
}

