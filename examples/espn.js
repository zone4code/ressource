window.onload = load;

function load() {
	var li = document.getElementById("nba");
	var options = [
		"NBA Front Page", "http://sports.espn.go.com/nba/index",
		"Scoreboard", "http://scores.espn.go.com/nba/scoreboard",
		"Daily Dime", "http://sports.espn.go.com/nba/dailydime?page=dailydime",
		"2007 NBA Playoffs", "http://sports.espn.go.com/nba/playoffs2007/"];
	makeMenu(li, options);
}

