const promise = require("promise");
const request = require("request");
// const IPINFO_SERVICE = require('../ipInfo/ipInfo.js');

var wikiAPIUrl = "https://ipinfo.io";
var getIpInfo = function(){
  // console.log("========= calling wiki search function ==========");
  var wikiSearchPromise = new promise(function(resolve, reject){
    var wikiSearchOption = {
              uri: wikiAPIUrl,
              method: 'GET'
    };
    request(wikiSearchOption,  function(error, response, body){
      if(error || (response.statusCode != 200)){
        console.log("wiki search  error: ", error);
      }else{
        // console.log("------------- sucessfull wiki search result --------------");
        body = JSON.parse(body);
        resolve(body);
      }
    });
  });
  return wikiSearchPromise;
}

var fetchRealTimeWeatherData = function(city){
   var weatherPromise = new promise(function(resolve, reject){
       var weatherApiURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+city+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
       request(weatherApiURL, { json: true }, (err, res, body) => {
       if (err) {
        return console.log(err);
       }else{
          console.log("====== below are the weather api response ====== \n")
          resolve(body);
       }

       });
   });

   return weatherPromise;
}


var customYeahooWeatherProcessing = function(weatherResponse) {
	var res = '';
    var forecast = weatherResponse.query.results.channel.item.forecast;
    res += 	weatherResponse.query.results.channel.title;
    res += '<br> Date: '+weatherResponse.query.results.channel.lastBuildDate;
    res += '<br> Current Condition:  '+weatherResponse.query.results.channel.item.condition.text;
    res += '<br>Humidity: '+weatherResponse.query.results.channel.atmosphere.humidity;
    res += '<br>Temperature: '+weatherResponse.query.results.channel.item.condition.temp+'&#x2109;'
    res += '<br>Wind: '+weatherResponse.query.results.channel.wind.speed+' mph';
    res += '<br> Sunrise: '+weatherResponse.query.results.channel.astronomy.sunrise;
    res += '<br> Sunset: '+weatherResponse.query.results.channel.astronomy.sunset;
    //res += '<br> --------------------------';
    res += '<br><br> WEATHER FORECAST COMMING WEEK';

    for(var i=1; i<forecast.length; i++){
    	res += '<hr>'+forecast[i].day+', '+forecast[i].date;
        res += '<br>Max: '+forecast[i].high+'&#x2109;';
        res += '<br>Min: '+forecast[i].low+'&#x2109;';
        res += '<br> Weather condition: '+forecast[i].text;
        // res += '<hr>';
    }
    // document.getElementById("demo").innerHTML = res;

    return res;
}


var staticDescYeahooWeatherProcessing = function(data){
  let desc = data.query.results.channel.item.description;
  let end = desc.length-188;
  desc = desc.substring(9, end);
  let title = data.query.results.channel.title;
  //console.log("description :: \n", desc)
  let returnMsg = title+'<br><br>';
  returnMsg += desc;

  return returnMsg;
}


var processWeather = function(resObj, dummySocket){
    var returnMsg = '';

    var entities = resObj.entities;
    if(entities.length > 0){
       let entity  = entities[0].entity;
       let value = entities[0].value;
       let confidence = entities[0].confidence;

       if(entity === 'cityInfo'){
            if(value){
              var x = '';
                 fetchRealTimeWeatherData(value).then(function(data){
                      //console.log("=== sucessfully fetched weather data \n\n", data);
                      // console.log("weather data :: \n\n", JSON.stringify(data));
                       let returnMsg = '';
                       returnMsg += '<div style="text-align: center;"> <img src="http://l.yimg.com/a/i/us/we/52/30.gif"/></div><br>';
                       // returnMsg = staticDescYeahooWeatherProcessing(data);  // SHOW STATIC HTML DESCRIPTION PROVIDED BY YEAHOO WEATHER API
                       returnMsg += customYeahooWeatherProcessing(data);   // SHOW CUSTOM HTML USING YEAHOO WEATHER API
                       // console.log("weather response : \n\n", returnMsg);
                      dummySocket.emit("query-response", {returnMsg : returnMsg});

                 });


            }
       }else if(entity === 'weatherInfo' && value === "current weather"){
         getIpInfo().then(function(ipInfo){
               console.log("=== in weatherAPI.js the ipinfo is ===", ipInfo);
               let currentCity = ipInfo.city;
               fetchRealTimeWeatherData(currentCity).then(function(data){
                     let returnMsg = '';
                      // returnMsg = staticDescYeahooWeatherProcessing(data);  // SHOW STATIC HTML DESCRIPTION PROVIDED BY YEAHOO WEATHER API
                      returnMsg += '<div style="text-align: center;"> <img src="http://l.yimg.com/a/i/us/we/52/30.gif"/></div><br>';
                      returnMsg += customYeahooWeatherProcessing(data);   // SHOW CUSTOM HTML USING YEAHOO WEATHER API
                     // console.log("weather response : \n\n", returnMsg);
                    dummySocket.emit("query-response", {returnMsg : returnMsg});
               });

         });
       }
    }else {
      returnMsg = `
                  Hehe is the <i><strong>WEATHER</strong></i> information below: <br>
                  Light sunshine <br>
                  cloudy <br>
                  Max temp : 25 <br>
                  Min temp : 11 <br>
                  For more info <a href="#" style="color: blue;">click here </a>
               `;
    }

       return returnMsg;

}





module.exports.processWeather = processWeather;
