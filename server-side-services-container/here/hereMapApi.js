const promise = require("promise");
const request = require("request");


var hereMapApiProcessing = function(uri){
  // var y = 'https://places.demo.api.here.com/places/v1/places/356tunc6-dd2bb98930f74ea89f835805936177ff;context=Zmxvdy1pZD1lOTdiZTYwYS1hNzQxLTU0OGEtOTA2OC1jODk4MGZlOTkzM2NfMTU2NTk0MzY2NDI0OF8wXzc0MDMmcmFuaz01?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw';
  // var x = 'https://places.cit.api.here.com/places/v1/places/lookup?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw&id=356jx7ps-6f2cf687fc300f9df20dda6b8632bfd6';
  // uri = "https://places.demo.api.here.com/places/v1/discover/explore?in=22.769%2C88.371%3Br%3D1000&cat=restaurant&drilldown=true&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw";
  try {
    var hereMapApiPromise = new promise(function(resolve, reject){
      var inputOption = {
                uri: uri,
                method: 'GET'
      };
      if(uri === null){
          resolve("SERVER_SIDE_DATA");
      }else{
        request(inputOption,  function(error, response, body){
          if(error || (response.statusCode != 200)){
            console.log("cric api  error: ", error);
          }else{
            console.log("------------- sucessfull here map api result --------------");
            if(body !== undefined || body !== null || body !== ''){
              body = JSON.parse(body);
              resolve(body);
            }else{
              // body = JSON.parse(body);
              body = null;
              resolve(body);
            }

          }
        });
      }

    });
    return hereMapApiPromise;
  } catch (e) {
      console.log("ERROR: when fetching cric api : ", e);
  } finally {

  }
};


module.exports.hereMapApiProcessing = hereMapApiProcessing;
