if (window.addEventListener) {
	window.addEventListener("load", initializeBody, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", initializeBody);
}

function initializeBody() {
	document.getElementById("whichpropertiesdiv").onmousedown = whichProperties;
	document.getElementById("whichpropertiesfield").onkeydown = whichProperties;

	// for map practice problem
	var map = document.getElementById("map");
	map.onmousedown = mapMouseDown;
	map.onmousemove = mapMouseMove;
	map.onmouseup = mapMouseUp;
}
	
function whichProperties(event) {
	var s = '';
	if (event) {
		s += 'Normal event is supported.\n\n';
	} else {
		event = window.event;
		s += 'Normal event failed; window.event used instead.\n\n';
	}
	
	for (var p in event) {
		if (p != p.toUpperCase() && typeof(event[p]) != 'function') {
			s += p + '=' + event[p] + '\n';
		}
	}

	alert(s);
}

var dragging = false;
var dragX = -1;
var dragY = -1;
var bgX = 0;
var bgY = 0;

function mapMouseDown(event) {
	event = standardizeEvent(event);
	dragging = true;
	dragX = event.screenX;
	dragY = event.screenY;
}

function mapMouseUp(event) {
	event = standardizeEvent(event);
	dragging = false;
}

function mapMouseMove(event) {
	event = standardizeEvent(event);
	if (dragging) {
		bgX += event.screenX - dragX;
		bgY += event.screenY - dragY;
		this.style.backgroundPosition = bgX + "px " + bgY + "px";
		dragX = event.screenX;
		dragY = event.screenY;
	}
}

function standardizeEvent(event) {
    var e = event || window.event;
    e.srcElement = e.srcElement || e.target;
    return e;
}
