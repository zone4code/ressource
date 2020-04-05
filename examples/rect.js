// Javascript code for colored rectangles example




// Returns a string representing a randomly chosen color,
// such as "#3F8".
function randomColor() {
	return "#" + (Math.floor(Math.random() * 16)).toString(16) +
	             (Math.floor(Math.random() * 16)).toString(16) +
	             (Math.floor(Math.random() * 16)).toString(16);
}

// Handles incompatibilities between the event models of
// various web browsers.
// Accepts an event as a parameter and returns the updated event.
function standardizeEvent(event) {
    var e = event || window.event;
    e.srcElement = e.srcElement || e.target;
    return e;
}

