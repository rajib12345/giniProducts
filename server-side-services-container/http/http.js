const promise = require("promise");
const request = require("request");

var get = function(url, param, apikey){
  console.log("=== call custom http get call ===");
  try {
    var requestPromise = new promise(function(resolve, reject){
      var requestOption = {
                uri: url,
                method: 'GET'
      };
      request(requestOption,  function(error, response, body){
        if(error || (response.statusCode != 200)){
          console.log("http get request error:: ", error);
        }else{
          // console.log("------------- sucessfull wiki search result --------------");
          body = JSON.parse(body);
          resolve(body);
        }
      });
    });
    return requestPromise;
  } catch (e) {
      console.log("error occured when calling the url"+url);
      console.log("error : ", e);
  } finally {

  }

}



module.exports.get = get;
