const promise = require("promise");
const request = require("request");


// var location = '22.769,88.371';
var fetchDarkSkyRealTimeWeatherData = function(currentLocation){
   var weatherPromise = new promise(function(resolve, reject){
       var weatherApiURL = 'https://api.darksky.net/forecast/93e9df5d304b8ae70a0b2b9091bd41f7/'+currentLocation+'?exclude=hourly,minutely,flags';
       request(weatherApiURL, { json: true }, (err, res, body) => {
       if (err) {
        return console.log(err);
       }else{
          // console.log("====== below are the dark sky weather api response ====== \n")
          // console.log("body : ", body);
          resolve(body);
       }
       });
   });
   return weatherPromise;
}

var templateContentData = "";

function convertFarenhiteToCelcius(farenhite){
    let celcius = parseInt(((farenhite - 32) * 5/9));
    return celcius;
}

function calculateDailyDataTemplate(dayData){
  let template = '';
  var hScrollElementBody = '';
  template += 'Min : '+convertFarenhiteToCelcius(dayData.temperatureMin)+'<br>';
  template += 'Max : '+convertFarenhiteToCelcius(dayData.temperatureMax)+'<br>';
  template += 'Humidity : '+(dayData.humidity * 100 )+'%<br>';
  template += '<span>'+(dayData.summary)+'</span><br>';

  hScrollElementBody += `
    <a href="#" style="color: black; font-size: 13px; color: black; background-color: silver; margin-right: -1px; margin-top: 1px; border-radius: 4%; text-align: left;">
        <div class"" style="width: 175px; text-overflow: ellipsis; overflow: hidden; -webkit-line-clamp: 2;">
          `+template+`
        </div>
    </a>
  `;
  return hScrollElementBody;
}

function fetchHScrollBarBodyContentTemplate(dailyData){
    let finalTemplate = '<div id="hScrollBarBody" class="scrollmenu" style="background-color: white; color: black;">';

    for (var i = 0; i < dailyData.length; i++) {
          let dayData = dailyData[i];
          finalTemplate += calculateDailyDataTemplate(dayData);
    }
    finalTemplate += '</div>';
    return finalTemplate;
}


function generalHScrollHeaderTemplate(argList){
    console.log("= after send : arglist : ", argList);
    let headerTemplate = '<div id="hScrollBarHeader" class="" style="background-color: teal; color: white; padding: 15px;">';
    let newTemplate = ``;
    for (var i = 0; i < argList.length; i++) {
        if(argList[i].type === "degree"){
            newTemplate += `
              <div style="text-align: center;">
                  <span class="cloud-info-block" style="font-size: 25px;">`+argList[i].value+`</span>
                  <span style="margin-top: -2px; position: absolute; padding-left: 3px;">o</span>
              </div>
            `;
        }else if (argList[i].type === "general"){
            newTemplate += `
              <div style="text-align: center;">
                  <span class="cloud-info-block">`+argList[i].value+`</span>
              </div>
            `;
        }

    }
    headerTemplate += newTemplate;
    headerTemplate += '</div>';

    return headerTemplate;

}

function fetchHScrollBarHeaderContentTemplate(timeZone, currentlyData, dailySummary){
  let template = '';
  timeZone = timeZone.split('/');
  let wedPlace = timeZone[1];
  let wedSummary = currentlyData.summary;
  let degreeCel = parseInt(((currentlyData.temperature - 32) * 5/9));
  var argList = [];
  argList.push({type : "degree", order: 1, value : degreeCel});
  argList.push({type: "general", order: 2, value : wedPlace});
  argList.push({type: "general", order: 3, value : wedSummary});
  argList.push({type: "general", order: 4, value : dailySummary});

  console.log("= before send : arglist : ", argList);
  // return generalHScrollHeaderTemplate(degreeCel, wedPlace, currentlyData.summary, dailySummary, argList);
  return generalHScrollHeaderTemplate(argList);

}

function center_aligned_title_element(eleValue){
    let template = `
        <div style="padding:10px; text-align: center; ">
            <h3>`+eleValue+`</h3>
        </div>
    `;

    return template;
}

function createHScrollBarTemplate(currentLocation, dummySocket, accessFrom){
    fetchDarkSkyRealTimeWeatherData(currentLocation).then(function(response){
        let finalTemplate = '';
        let headerTemplate = fetchHScrollBarHeaderContentTemplate(response.timezone, response.currently, response.daily.summary);
        let bodyTemplate = fetchHScrollBarBodyContentTemplate(response.daily.data);
        finalTemplate += center_aligned_title_element("Todays Weather");
        finalTemplate += '<div id="hScroll" class="hScroll" style="margin-top: 10px;">';
        if(headerTemplate !== ''){
            finalTemplate += headerTemplate;
        }
        if(bodyTemplate !== ''){
            finalTemplate += bodyTemplate;
        }
        finalTemplate += '</div>';
        console.log(" @@@ final template :: \n\n", finalTemplate);
        dummySocket.emit("query-response", {returnMsg : finalTemplate});
        if(accessFrom === "application"){
           dummySocket.emit("query-response", {returnMsg : finalTemplate});
        }else if(accessFrom === "API"){
           //apiResponseObj.json({data : {AI_RESPONSE_JSON: resObj, AI_RESPONSE_HTML: returnMsg, yeahoo_weather_response: data}});
        }
    })


    // return finalTemplate;
}






module.exports.createHScrollBarTemplate = createHScrollBarTemplate;
