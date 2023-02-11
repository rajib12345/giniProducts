const promise = require("promise");
const request = require("request");





var cricApiProcessing = function(uri){
  try {
    var crciApiPromise = new promise(function(resolve, reject){
      var inputOption = {
                uri: uri,
                method: 'GET'
      };
      request(inputOption,  function(error, response, body){
        if(error || (response.statusCode != 200)){
          console.log("cric api  error: ", error);
        }else{
          console.log("------------- sucessfull cric api result --------------");
          body = JSON.parse(body);
          resolve(body);
        }
      });
    });
    return crciApiPromise;
  } catch (e) {
      console.log("ERROR: when fetching cric api : ", e);
  } finally {

  }
}


var upCommingCricketMatchesResponse = function(response) {
  var data = response.data;
  var matches = [];
  var returnMsg = '<div style="text-align:center; "><strong> UP COMMING CRICKET CALENDAR </strong> </div><br> ';
     for (var i = 0; i < 10; i++) {
        matches.push(data[i]);
     }
    for(var i=0; i<matches.length; i++){
      returnMsg += '<hr>';
      returnMsg += '<strong> Date : </strong> '+matches[i].date;
      returnMsg += '<br><strong> Match : </strong>'+matches[i].name;
    }
    // console.log("@ uocomming cricket matches : \n", returnMsg);
    return returnMsg;
}

var create_cricket_matches_history_template = function(data){
    // console.log("call cricket history result ");
    var matches = [];

    var returnMsg = '<div> <p style="text-align: center;"><strong> CRICKET MATCHES HISTROY </strong> <p>';
       for (var i = 0; i < 10; i++) {
          matches.push(data.matches[i]);
       }
      for(var i=0; i<matches.length; i++){
        returnMsg += '<div style="border-bottom: 1px solid #e9ebee; padding-bottom:10px; padding-top: 10px; ">'
        returnMsg += '<strong> Date : </strong>'+matches[i].date;
        returnMsg += '<br><strong> Match : </strong>'+matches[i].team-1+' vs '+matches[i].team-2;
        returnMsg += '<br><strong> Match type : </strong>'+matches[i].type;
        if(matches[i].toss_winner_team){
          returnMsg += '<br><strong> Toss winner team : </strong> '+matches[i].toss_winner_team;
        }
        if(matches[i].winner_team){
          returnMsg += '<br><strong> Winner team : </strong>'+matches[i].winner_team;
        }else if(matches[i].matchStarted){
            returnMsg += `
                          <br> <strong> Status :</strong>
                          <span> Match is live now.</span>
                          <div style="height: 12px;width: 12px;background-color: green;border-radius: 40px; margin-left: 0px; margin-top: -16px; position:absolute; left: 190px;"></div>
                        `;
        }
        returnMsg += '</div>';
      }

      returnMsg += '</div>';
      return returnMsg;
}

var FB_BOT_upCommingCricketMatchesResponse = function(response) {
  // console.log("res :", response.cache);
  var data = response.data;
  var matches = [];
  var returnMsg = 'UP COMMING CRICKET CALENDAR \n';
     for (var i = 0; i < 10; i++) {
        matches.push(data[i]);
     }
    for(var i=0; i<matches.length; i++){
      returnMsg += '--------------------------------';
      returnMsg += 'Date : '+matches[i].date;
      returnMsg += '\n Match : '+matches[i].name;
    }

    return returnMsg;
}





module.exports.cricApiProcessing = cricApiProcessing;
module.exports.upCommingCricketMatchesResponse = upCommingCricketMatchesResponse;
module.exports.FB_BOT_upCommingCricketMatchesResponse = FB_BOT_upCommingCricketMatchesResponse;
module.exports.create_cricket_matches_history_template = create_cricket_matches_history_template;
