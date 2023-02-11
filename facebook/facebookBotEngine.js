
const promise = require("promise");
const request = require("request");
var AIEngine = require('../stringCompare');





var user_sessions   = [];
const FB_PAGE_ACCESS_TOKEN = "EAAhAB8fJSiABAHO7ndahsa0FHHQXdKjnRlZBgqLv4cXFera2RzaZB75dbmprGnZCN49NsdrfC4NYlmvBIDlTgZCCgupurZCPvqwee4QZCqwnc6FS7hZBfO9MK0B8Oyz93Q8oYJdIuUWXIfLuJBOSt4QBQ3ieFgeMsvsJilosne1AAZDZD";

var create_send_text_format = function(recepientId, msg){
    var textFormat = {
    "recipient":{
      "id": recepientId
      },
      "message":{
      "text": msg
    }
  }
  return textFormat;
}

var FB_SendTextMessage = function(data){
    try {
      console.log("====  calling facebook send text message  ====");
      var textFormat = {
        "recipient":{
          "id": data.recepientId
          },
          "message":{
          "text": "Hi. welcome to GINI, a messenger bot. How can i help you ?"
        }
      }
      console.log("=== before call send api the text msg format : \n", textFormat);
      var fb_sendAPIPromise = new promise(function(resolve, reject){
        request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          method: 'POST',
          qs: {access_token: FB_PAGE_ACCESS_TOKEN},
          json: textFormat
        }, function(err, res, body) {
          if (err) {
            console.error(err);
          } else {
            console.log(body);
            resolve(body);
          }
        });
      })

      return fb_sendAPIPromise;

    } catch (e) {
        console.log("== error in send text msg api : ", e);
    } finally {

    }

}

var FB_Bot_queryProcessing = function(session, queryMsg){
    console.log("====  calling facebook bot language processing  ====");
    var AIREsponse = AIEngine.processQuery(queryMsg);
    FB_BOT_processIntents(session, AIREsponse, AIREsponse.intents);
}

var FB_BOT_processMatchedIntents = function(intent){

}


var FB_BOT_processIntents = function(session, resObj, intents){
    console.log("==calling the process intents function ===");
    var finalIntent = '';
    var returnMsg = '';
    console.log("intent length :: ", intents.length);
    if(intents.length === 0){
      //==== PROCESS  NO  MATCHED INTENTS  ====
      console.log("query msg is :: ", resObj.input.text);
      // FB_BOT_processDefaultMsg(resObj.input.text);
      sendTextMessage(session.id, "Uppps, I didn't get you properly, As I am in beta condition and will grow by experience. \n Try with some other keywords.");

    }else{
      // ==== PROCESS  MATCHED INTENTS  ====
      // for(var i=0; i<intents.length; i++){
      //    if(intents[i].confidence > 70){
      //      finalIntent = intents[i].intent;
      //    }
      // }

      finalIntent = intents[0].intent;
      console.log("final intent :: ", finalIntent);
      returnMsg = FB_BOT_processMatchedIntents(session, resObj, finalIntent);
      console.log("intent response :: ", returnMsg);
      if(returnMsg !== ''){
        sendTextMessage(session.id, returnMsg);
      }else{
        sendTextMessage(session.id, "Comming soon.");
      }

    }

}

var FB_BOT_processMatchedIntents = function(session, resObj, finalIntent){
   var returnMsg = '';

      if(finalIntent === 'greetings'){
         console.log("===========================");
         console.log("\n\n intent :: greetings ");
         //return 'welcome to ibm watson chat bot. How can I help you.';
         returnMsg = 'Welcome to GINI AI chat bot. How can I help you.';

      }else if(finalIntent === 'about-company'){
          // returnMsg = processAboutCompany(resObj);
      }else if(finalIntent === 'weather'){
          // returnMsg = processWeather(resObj);
      }else if(finalIntent === 'aboutAdcdev'){
          returnMsg = FB_BOT_processAboutAdcdev(resObj);
      }else if(finalIntent === 'change-request'){
          // returnMsg = processChangeRequest(resObj);
          // console.log("change request response \n", returnMsg)
      }else if(finalIntent === 'fetchJiveInfo'){
         console.log("===  intent fetchJiveInfo  ===")
         // returnMsg = processShowJiveInfo();
      }else if(finalIntent === 'current-location'){
          // processMyCurrentLocation();
      }else if(finalIntent === 'nearByPlaces'){
          // processNearByPlacesUsingMap(resObj).then(function(data){
          //       if(data.error_message){
          //         showErrorMsg();
          //       }else{
          //         createNearByPlacesResponse(data);
          //       }
          // });
      }else if(finalIntent === 'share-if-you-care'){
          returnMsg += `
          We have started SHARE IF YOU CARE casually since few years back. \n\n The creator of this is our master mind SUBHOJIT GHOSH. \n\n MEMBERS : \n . SUBHOJIT GHOSH \n. AMIT HALDER \n. RABI \n. CHIRON \n. LOKNATH \n. TAPA \n. ARUP GHOSH \n. RAJIB KARMAKAR
          `;
      }

      return returnMsg;

}

var FB_BOT_yeahooWeatherProcessing = function(weatherResponse) {
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
    res += '<br><br>     WEATHER FORECAST<br>';

    for(var i=1; i<forecast.length; i++){
    	res += '<br>'+forecast[i].day+', '+forecast[i].date;
        res += '<br>Max: '+forecast[i].high+'&#x2109;';
        res += '<br>Min: '+forecast[i].low+'&#x2109;';
        res += '<br> Weather condition: '+forecast[i].text;
        res += '<br>';
    }
    // document.getElementById("demo").innerHTML = res;

    return res;
}

var FB_BOT_processAboutAdcdev = function(resObj){
    console.log("process about adc dev...");
    var returnMsg = '';

    var entities = resObj.entities;
    if(entities.length > 0){
      let entity  = entities[0].entity;
      let value = entities[0].value;
      let confidence = entities[0].confidence;
      var project = null;
          if(entities.length === 2){
              console.log("*********");
              if(entities[1].entity === 'projects'){
                  project = entities[1].value;
               }
          }

       if(entity === 'devTeam'){
            if(value === 'developer'){
                console.log("======= project :: ", project)
               if(project === 'sdp'){
                 returnMsg = 'Here are the list of the DEVELOPER in SDP team below: \n\n';
                 returnMsg += '- Debayan\n- Avisekh \n- Tanmoy Chatterjee \n- Sourajit \n- Tamal Adhikery \n- Sohela \n- Moumita \n- Siddharth \n- Rumani \n- Priyodarshini \n- Usha \n- Avishikta \n- Biplab \n- Dhananjoy \n- Shoham';
               }else if(project === 'adc'){
                 returnMsg = 'Here are the list of the DEVELOPER below:\n\n';
                 returnMsg += '- Gourav \n- Sumanth \n- Avilash \n- Projita \n- Hasi \n- Amit \n- Utsav \n- Tirtha';
               }else if(project === 'dms'){
                 returnMsg = 'Here are the list of the DEVELOPER in DMS below: \n\n';
                 returnMsg += '-Anuradha\n- Ronit\n- Ajijul\n- Niladri';
               }

            }else if(value === 'duration'){
               returnMsg = 'The duration of this project is 2 years.';
            }
       }
    }else{
        returnMsg = 'The name of the current project is adcdev.';
    }

    return returnMsg;
}


function sendTextMessage(recipientId, messageText) {
 /* -- Sends a text message using FB Send API. -- */
 var messageData = {
   recipient: {
     id: recipientId
   },
   message: {
     text: messageText,
     metadata: "DEVELOPER_DEFINED_METADATA"
   }
 };


 return callSendAPI(messageData);
}

function get_session(user_FB_id) {
 var ret_session;
 try {
   // -- try locating the passed FB id in sessions array
   if (user_sessions.length > 0) {
     for (var i = 0; i < user_sessions.length; i++) {
       if (user_sessions[i].id == user_FB_id) {
         ret_session = user_sessions[i];
         break;
       }
     }
   }


   // -- not found, create new session
   if (!ret_session) {
     ret_session = {
       id: user_FB_id
     }
     user_sessions.push(ret_session);
   }
 } catch (err) {
   // write_error_log("in get_session()=>" + err);
 }
 return ret_session;
}

function callSendAPI(messageData) {
 try {
   return new Promise(function (resolve, reject) {
     request({
       uri: 'https://graph.facebook.com/v2.6/me/messages',
       qs: { access_token: FB_PAGE_ACCESS_TOKEN },
       method: 'POST',
       json: messageData
     }, function (error, response, body) {
       try {
         if (!error && response.statusCode == 200) {
           var recipientId = body.recipient_id.toString();
           if(body.message_id !== undefined){
             var messageId = body.message_id.toString();
           }
           console.log("==================================================================");
           console.log("recipientId :: ", recipientId);
           console.log("messageId :: ", messageId);
           console.log("==================================================================");


             if (messageId) {
               // write_log("successfully sent message with id " + messageId + " to recipient " + recipientId + ".");
             } else {
               // write_log("Successfully called Send API for recipient " + recipientId);
             }


           resolve();
         } else {
           console.log("\n\n\nbody.error :: ", body.error);
           // sendTextMessage(session.id, "oops something went wrong when send api is calling.")
          // write_log("Failed calling Send API: ststus=>[" + response.statusCode + "] message=>[" + response.statusMessage + "] error=>[" + body.error + "].");
           reject(error);
         }
       } catch (e) {
           console.log("error occured :: ", e);
           //sendTextMessage(session.id, "oops something went wrong when send api is calling.")
       }
     });
   });
 } catch (e) {
     console.log("error occoured when calling send api...");
 } finally {
 }
}

// module.exports.FB_Bot_languageProcessing = FB_Bot_languageProcessing;
module.exports.sendTextMessage = sendTextMessage;
module.exports.get_session = get_session;
module.exports.FB_Bot_queryProcessing = FB_Bot_queryProcessing;
