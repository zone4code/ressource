<?php
	// proxy.php
	// A script to proxy HTTP requests to given URL.
	// Marty Stepp and Morgan Doocy
	// For CSE 190M
	
	// List of domains whose URLs this proxy will allow through
	$allowed_sites = array(
		"webster.cs.washington.edu" => TRUE,
		"students.washington.edu"   => TRUE
	);

	
	// Note: 'url' parameter MUST adhere to RFC 1378. Its query string, if
	// present, must be encoded (e.g., with urlencode()), meaning any encoded
	// characters in a query value will be double-encoded.
	
	if (!isset($_REQUEST['url'])) {
		die_header(400, "Error 400: URL (query parameter 'url') was not specified.");
	}
	
	// parse url
	$count = preg_match("/(([^:]*):\/\/)?([^\/:]*)(:[0-9]+)?(.*)/", $_REQUEST['url'], $matches);
	if (!$count) {
		die_header(500, "Error 500: Malformed URL: {$_REQUEST['url']}");
	}
	$protocol = $matches[2] ? $matches[2] : "http";
	$host = $matches[3];
	$port = str_replace(":", "", $matches[4]);
	$path = $matches[5];
	
	if (isset($allowed_sites) && !isset($allowed_sites[$host])) {
		die_header(400, "Error 400: Site not allowed to be proxied: $host");
	}
	
	switch ($protocol) {
		case 'http':
			$protocol = 'tcp';
			$port = $port ? $port : 80;
			break;
			
		case 'https':
			$protocol = 'ssl';
			$port = $port ? $port : 443;
			break;
			
		default:
			die_header(405, "Error 400: Protocol not allowed: $protocol");
	}
	
	// open socket and send request
	$sock = @fsockopen("{$protocol}://{$host}", $port, $errno, $errstr);
	if (!$sock) {
		die_header(500, "Error 500: Connection to {$protocol}://{$host}:{$port} failed: [$errno] $errstr");
	}
	fwrite($sock, "GET $path HTTP/1.1\r\n");
	fwrite($sock, "Host: $host\r\n");
	fwrite($sock, "Connection: Close\r\n");
	fwrite($sock, "Accept: {$_SERVER['HTTP_ACCEPT']}\r\n");
	fwrite($sock, "User-Agent: {$_SERVER['HTTP_USER_AGENT']}\r\n");
	# fwrite($sock, "Referer: {$_SERVER['HTTP_REFERER']}\r\n");
	fwrite($sock, "\r\n");
	
	// handle response
	$headers = array();
	while (!feof($sock)) {
		$line = fgets($sock);
		if ($line == "\r\n") {
			// reached end of headers; forward them on using header()
			foreach ($headers as $header) {
				header($header);
			}
			// now forward content
			while (!feof($sock)) {
				echo fgets($sock);
			}
		} else {
			array_push($headers, trim($line));
		}
	}
	fclose($sock);
	
	// die gracefully sending the given HTTP error code and message
	function die_header($code, $msg) {
		switch ($code) {
			case 500:
				header("HTTP/1.1 500 Internal Server Error");
				break;
				
			case 405:
				header("HTTP/1.1 405 Method Not Allowed");
				break;

			case 404:
				header("HTTP/1.1 404 Not Found");
				break;
				
			case 400:
				header("HTTP/1.1 400 Bad Request");
				break;
		}
		header("Content-Type: text/plain");
		echo $msg;
		
		// clean up and exit
		global $sock;
		if ($sock) {
			fclose($sock);
		}
		exit();
	}
?>