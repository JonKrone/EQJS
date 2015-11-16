console.log("Jose is here");
// var time = prompt("WHAT TIME IS IT?!");

function talksAbout(node, str) {
	if (node.nodeType == document.ELEMENT_NODE) {
		for (var i = 0; i < node.childNodes.length; i++) {
			if (talksAbout(node.childNodes[i], str))
				return true;
		}
		return false;
	} else if (node.nodeType == document.TEXT_NODE) {
		return node.nodeValue.indexOf(str) > -1;
	}
}
console.log(talksAbout(document.body, "Marijn"));

function highlightCode(node, keywords) {
	var text = node.textContent;
	node.textContent = "";

	var match, pos = 0;
	while (match = keywords.exec(text)) {
		var before = text.slice(pos, match.index);
		node.appendChild(document.createTextNode(before));
		var strong = document.createElement("strong");
		strong.appendChild(document.createTextNode(match[0]));
		node.appendChild(strong);
		pos = keywords.lastIndex;
	}

	var after = text.slice(pos);
	node.appendChild(document.createTextNode(after));
}

var languages = {
	javascript: /\b(function|return|var|in|;|!=|if|while|for)\b/g
};


function HAC() {
	var pres = document.body.getElementsByTagName("pre");
	for (var i = 0; i < pres.length; i++) {
		var pre = pres[i];
		var lang = pre.getAttribute("data-language");
		if(languages.hasOwnProperty(lang))
			highlightCode(pre, languages[lang]);
	}
}
HAC();

// var first_a = document.body.getElementsByTagName("a")[0];
// console.log(first_a.href);

var arrayish = {0: "once", 1: "upon", 2: "a kitten", length: 3};
var real = Array.prototype.slice.call(arrayish, 0);
console.log(arrayish);
console.log(real);