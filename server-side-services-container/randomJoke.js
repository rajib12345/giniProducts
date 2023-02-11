const promise = require("promise");
const request = require("request");





var randonJoke = function(){
  var randomJokePromise = new promise(function(resolve, reject){
    var braipshopInputOption = {
              uri: "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke",
              method: 'GET'
    };
    request(braipshopInputOption,  function(error, response, body){
      if(error || (response.statusCode != 200)){
        console.log("random joke  error: ", error);
      }else{
        console.log("------------- sucessfull random joke result --------------");
        body = JSON.parse(body);
        let res = '';
        res += 'Type: '+body.type;
        res += '<br> Santa: '+body.setup;
        res += '<br> Banta: '+body.punchline;
        resolve(res);
      }
    });
  });
  return randomJokePromise;
}





module.exports.randonJoke = randonJoke;
