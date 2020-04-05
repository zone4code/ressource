/* Useful Javascript functions for AJAX requests. */

var oldstyle = '';

function fetch(url, id) {
	fetch2(url, id, true);
}

function fetch2(url, id, async) {
	var element = document.getElementById(id);
	if (!element) {
		alert("Error: no element with id " + id);
		return;
	}
	
	var req = false;
	
	// branch for non-crappy browsers (native XMLHttpRequest object)
	if (window.XMLHttpRequest) {
		try {
			req = new XMLHttpRequest();
		} catch(e) {
			req = false;
		}
	}
	
	// branch for IE/Windows ActiveX version
	if (!req && window.ActiveXObject) {
		try {
			req = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				req = false;
			}
		}
	}
	
	if (req) {
		req.onreadystatechange = function() {
			// only if req shows "loaded"
			// (0 = uninitialized, 1 = open, 2 = sent, 3 = receiving, 4 = loaded or complete)
			if (req.readyState == 4) {
				// only if "OK"
				if (req.status == 200) {
					// successful fetch; put text into text box
					element.innerHTML = req.responseText;
				} else if (req.status == 0) {
					alert("Error: Cannot fetch page data locally.");
				} else {
					alert("Error " + req.status + " while retrieving page:\n"
					      + url);
				}
			}
		};
		
		req.open("GET", url, async);
		req.send(null);
	}
}
