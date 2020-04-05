if (window.addEventListener) {
	window.addEventListener("load", initializeGoogleStuff, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", initializeGoogleStuff);
}

function initializeGoogleStuff() {
	var button = document.getElementById("googletest");
	button.onclick = googleExample;
	loadGoogleControls();
}

function googleExample() {
	var search = new GwebSearch();
	search.setSearchCompleteCallback(window, function() {
		for (var i = 0; i < search.results.length; i++) {
			alert(search.results[i].url);
		}
	});
	search.execute("miserable failure");
}

function loadGoogleControls() {
	// Create a search control
	var searchControl = new GSearchControl();

	// Add in a full set of searchers
	var localSearch = new GlocalSearch();
	searchControl.addSearcher(localSearch);
	searchControl.addSearcher(new GwebSearch());
	searchControl.addSearcher(new GvideoSearch());
	searchControl.addSearcher(new GblogSearch());

	// Set the Local Search center point
	localSearch.setCenterPoint("Seattle, WA");

	// Tell the searcher to draw itself and tell it where to attach
	searchControl.draw(document.getElementById("searchcontrol"));

	// Execute an inital search
	searchControl.execute("hamburger");
}
