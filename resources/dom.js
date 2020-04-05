// global variables
var maxZ = 0;

if (window.addEventListener) {
	window.addEventListener("load", initializeBody, false);
} else if (document.attachEvent) {
	// f*** IE6
	window.attachEvent("onload", initializeBody);
}

// called when the page loads
// div id rectanglearea .onload = initializeBody;
function initializeBody() {
	var rectDiv = document.getElementById("rectanglearea");
	rectDiv.onmousedown = rectMouseDown;
	
	for (var i = 0; i < 20; i++) {
		createRandomRect();
	}
}

// called when the mouse button is first pressed down
function rectMouseDown(event) {
	event = standardizeEvent(event);
	if (event.srcElement.className == "rect") {
		if (event.shiftKey) {
			event.srcElement.parentNode.removeChild(event.srcElement);
		} else {
			event.srcElement.style.zIndex = maxZ++;
		}
	}
}

function createRandomRect() {
	var rectDiv = document.getElementById("rectanglearea");
	var randomRect = document.createElement("div");
	rectDiv.appendChild(randomRect);
	randomRect.className = "rect";
	randomRect.style.left = Math.floor(Math.random() * (rectDiv.clientWidth - 80)) + "px";
	randomRect.style.top = Math.floor(Math.random() * (rectDiv.clientHeight - 80)) + "px";
	randomRect.style.backgroundColor = "#" + randomColor();
	randomRect.style.zIndex = maxZ;
	maxZ++;
}

function randomColor() {
	return (Math.floor(Math.random() * 16)).toString(16) +
	       (Math.floor(Math.random() * 16)).toString(16) +
	       (Math.floor(Math.random() * 16)).toString(16);
}

function standardizeEvent(event) {
	var e = event || window.event;
	e.srcElement = e.srcElement || e.target;
	return e;
}
