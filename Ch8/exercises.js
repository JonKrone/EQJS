/*function MultiplicatorUnitFailure() {}

function primitiveMultiply(a, b) {
	if (Math.random() < 0.5) return a * b;
	else throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
	try {
		var res = primitiveMultiply(a, b);
		console.log(a, "*", b, "=", res);
		return res;
	} catch (e) {
		console.log("caught error, retrying");
		if (e instanceof MultiplicatorUnitFailure)
			reliableMultiply(a, b);
	}
}

console.log(reliableMultiply(8, 8));
console.log(reliableMultiply(4, 4));
console.log(reliableMultiply(88, 88));*/

var box = {
	locked: true,
	unlock: function() { this.locked = false; },
	lock: function() { this.locked = true; },
	_content: [],
	get content() {
		if (this.locked) throw new Error("Locked!");
		return this._content;
	}
};

function withBoxUnlocked(body) {
  var state = box.locked;
  try {
  	if (state) box.unlock();
  	body();
  } finally {
  	if (state) box.lock();
  }
}

withBoxUnlocked(function() {
	box.content.push("gold piece");
	console.log(box.content);
});

try {
	withBoxUnlocked(function() {
		throw new Error("Pirates on the Horizon! Abort!");
	});
} catch (e) {
	console.log("Error raised:", e);
}
console.log(box.locked);