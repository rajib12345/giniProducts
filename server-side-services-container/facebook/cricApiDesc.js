


const cricAPIKey = 'xSyhW9hNmPNmLFtXdKtJRrjSwb82';

//==================================== CRIC API API DETAILS ===========================================
  const newMatchesApi = "https://cricapi.com/api/matches?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82";
  const oldMatchesApi = 'https://cricapi.com/api/cricket?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82';
  const upCommingCricketMatchCalendarApi = "https://cricapi.com/api/matchCalendar?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82";
  const playerStatisticApi = "https://cricapi.com/api/playerStats?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82&pid=35320"; // here pid = player id
  const playerFindApi = "https://cricapi.com/api/playerFinder?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82&name=sachin"
  const playerStat = "https://cricapi.com/api/playerStats?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82&pid=35320";

//=====================================================================================================


var upCommingCricketMatches = function(response) {
	console.log("res :", response.cache);
  var data = response.data;
	var matches = response.data;
    var res = '';
	   for (var i = 0; i < 10; i++) {
        matches.push(data[i]);
     }
    console.log("matches : ", matches);
    for(var i=0; i<matches.length; i++){
    	res += '<hr>';
    	res += 'Date : '+matches[i].date;
        res += '<br>Match : '+matches[i].name;
    }

    return res;
}
