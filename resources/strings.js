/* Javascript functions for dealing with text strings. */

function ltrim(str) { 
	for (var k = 0; k < str.length && str.charAt(k) <= " "; k++);
	return str.substring(k, str.length);
}

function rtrim(str) {
	for (var j = str.length - 1; j >= 0 && str.charAt(j) <= " "; j--);
	return str.substring(0, j+1);
}

function trim(str) {
	return ltrim(rtrim(str));
}

function padL(text, length) {
	while (text.length < length) {
		text = " " + text;
	}
	return text;
}

function htmlEncode(text) {
	text = text.replace(/</g, "&lt;");
	text = text.replace(/>/g, "&gt;");
	text = text.replace(/ /g, "&nbsp;");
	return text;
}
