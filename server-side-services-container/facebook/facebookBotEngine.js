
const promise = require("promise");
const request = require("request");
const ROOT_DIR = require("path").resolve();
var AIEngine = require(ROOT_DIR+'/server-side-services-container/AIEngine/AIEngine.js');
const CRIC_API_SERVICE = require(ROOT_DIR+'/server-side-services-container/cricket/cricAPIProcessing.js');
const NEWS_SERVICE = require(ROOT_DIR+'/server-side-services-container/news/newsAPISearch.js');
const HTTP_SERVICE = require(ROOT_DIR+'/server-side-services-container/http/http.js');
const RANDOM_JOKE_SERVICE = require(ROOT_DIR+'/server-side-services-container/randomJoke.js');


// const AITest = require(ROOT_DIR+'/server-side-services-container/AIEngine/AIEngine.js');
// console.log("path var : ", AITest.test);





var user_sessions   = [];
const FB_PAGE_ACCESS_TOKEN = "EAAhAB8fJSiABANj8raJYu7sRKjBBEMfTFujIUp10jwEhZBQVr0TPTtdUraF1y3HmE26JOm61quEEOreO8iIFdoQTd7ROWJ5HFl5LJVczRv8Q4ZAlGauYl6s2z6IWwBcDvIdAE4GxNzvJLUJRma38Kz9rZAsGkknnC27ATH3hguW9AxHG5ap";
// const FB_PAGE_ACCESS_TOKEN = "EAAELWKIYXu8BAKgrdd8MXTn5eQdZBVZAzZBBZCYLpdgf3ZBTRJQXCD3rc17ohADmPPekb2Wji2d5aY3hYFOqjbmqh74LX3tMt1WzrpWT4jqZCdRKVEKjmJMf68VBMQuNdZBJTTxWzJsgxAx2z0kisyMyCUUVYGPvEmnj5x82kHapQZDZD";


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
       FB_BOT_processMatchedIntents(session, resObj, finalIntent);
      // console.log("intent response :: ", returnMsg);
      // if(returnMsg !== ''){
      //   sendTextMessage(session.id, returnMsg);
      // }else{
      //   sendTextMessage(session.id, "Comming soon.");
      // }

    }

}

var FB_BOT_processMatchedIntents = function(session, resObj, finalIntent){
   var returnMsg = 'Comming Soon...';

      if(finalIntent === 'greetings'){
         console.log("===========================");
         console.log("\n\n intent :: greetings ");
         //return 'welcome to ibm watson chat bot. How can I help you.';
         returnMsg = 'Welcome to GINI AI chat bot. How can I help you.';
         sendTextMessage(session.id, returnMsg);


      }else if(finalIntent === 'about-company'){
          // returnMsg = processAboutCompany(resObj);
      }else if(finalIntent === 'weather'){
          // returnMsg = processWeather(resObj);
      }else if(finalIntent === 'aboutAdcdev'){
           returnMsg = FB_BOT_processAboutAdcdev(resObj);
           sendTextMessage(session.id, returnMsg);

      }else if(finalIntent === 'change-request'){
          // returnMsg = processChangeRequest(resObj);
          // console.log("change request response \n", returnMsg)
          sendTextMessage(session.id, returnMsg);
      }else if(finalIntent === 'fetchJiveInfo'){
         console.log("===  intent fetchJiveInfo  ===")
         sendTextMessage(session.id, returnMsg);
      }else if(finalIntent === 'current-location'){
        sendTextMessage(session.id, returnMsg);

          // processMyCurrentLocation();
      }else if(finalIntent === 'nearByPlaces'){
        sendTextMessage(session.id, returnMsg);

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
          sendTextMessage(session.id, returnMsg);
      }else if(finalIntent === 'cricket-upcomming-match'){
        var url = 'https://cricapi.com/api/matchCalendar?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82';
          CRIC_API_SERVICE.cricApiProcessing(url).then(function(response){
                // console.log("cric results :: ", JSON.stringify(response));
                let elements = create_cricket_results_list_Elements(response);
                generic_template_carossel(session.id,  elements);
                // generic_list_template(session.id,  elements);
          });
      }else if(finalIntent === "cricket-matches-history"){
          let url = "https://cricapi.com/api/matches?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82";
          CRIC_API_SERVICE.cricApiProcessing(url).then(function(response){
            // console.log("news response :: ", JSON.stringify(response));

                // var cricResult = CRIC_API_SERVICE.create_cricket_matches_history_template(response);
                let elements = create_cricket_matches_history_template(response);
                console.log("elements \n\n",elements );
                generic_template_carossel(session.id,  elements);
                // sendTextMessage(session.id, cricResult);

          });
      }else if(finalIntent === "search-news-article"){
          let query = resObj.input.text;
          let newsArticleApiUrl = "https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey=5ce2bcb4107d4f2ab38ac0264c5805b3&q="+query;
          HTTP_SERVICE.get(newsArticleApiUrl).then(function(newsResponse){
              // console.log("news response :: ", JSON.stringify(newsResponse));
              let elements = createNewsListElements(newsResponse);
              generic_template_carossel(session.id,  elements )
          });



      }else if(finalIntent === 'random-joke'){
        RANDOM_JOKE_SERVICE.randonJoke().then((data)=>{
          console.log("random joke response :: ", data);
          dummySocket.emit("query-response", {returnMsg : data});
        });
      }else{
        let default_msg = "I didn't get you properly. As I am groing day by day. Hopefully I can answer you very soon."
        sendTextMessage(session.id, default_msg);
      }
}

//=======================================================================================
var storedSessionId = null;
function receiptTemplate(sid, staticImgUrl){
  storedSessionId = sid;
  if (true) {
    var elementsArr = [];
    var shipObj = '';
    var rightLensDetails = '';
    var leftLensDetails = '';
    var order_number = "OCOR" + Math.floor(Math.random()*1000);
    var paymentMethod = 'xxxx';
        leftLensDetails = {
          title : "Left Lens",
          subtitle : "xxxxxxxxx",
          quantity : 100,
          price : 1000,
          currency : "USD",
          image_url : staticImgUrl
        }
        // leftLensDetails = JSON.stringify(leftLensDetails);
        elementsArr.push(leftLensDetails);
        rightLensDetails = {
          title : "Left Lens",
          subtitle : "bbbbbbbbbbbb",
          quantity : 100,
          price : 1000,
          currency : "USD",
          image_url : staticImgUrl
        }
        // rightLensDetails = JSON.stringify(rightLensDetails);
        elementsArr.push(rightLensDetails);
      shipObj = {
          street_1 : "aaaaaaa",
          street_2 : "aaaaaaaa",
          city : "aaaaaaaaaa",
          postal_code : "aaaaa",
          state : "sssssss",
          country : "sssssssss"
        }
      // shipObj = JSON.stringify(shipObj);
    var payloads = {
            template_type:"receipt",
            recipient_name: "first name",
            order_number: 10,
            currency: "USD",
            payment_method: "paymentMethod",
            order_url: "",
            timestamp: Math.floor(Date.now() / 1000).toString(),
            elements: elementsArr,
            address : shipObj,
            summary : {
              subtotal : 100,
              shipping_cost: 100,
              total_tax : 100,
              total_cost : 100
            },
            adjustments :[]
        }
        // payloads = JSON.stringify(payloads);
        var msg = 'What do you want to do next ?';
        var buttons = [
          {
          type: "postback",
          title: "btn1",
          payload: JSON.stringify({
            action: "single-user-order-confirmation-ok",
          })
        },
        {
          type: "postback",
          title: "btn2",
          payload: JSON.stringify({
            // action: "single-user-make-changes-to-order-ok"
             action: "makeChangesToOrder"


          })
        },
      ]
      // -- showing the last order details --
      sendReceiptMessage(sid, payloads);




    }
}

function generic_template_carossel(sessionId, elementsArr){
  storedSessionId = sessionId;
    var payloads = {
      "template_type": "generic",
      "sharable" : true,
      "elements": elementsArr,
    }
    sendTemplateMessage(sessionId, payloads);
}

function generic_list_template(sessionId, elementsArr){
  storedSessionId = sessionId;
    var payloads = {
      "template_type": "list",
      "elements": elementsArr,
    }
    sendTemplateMessage(sessionId, payloads);
}

function sendTemplateMessage(recipientId, elementsArr) {
 var receipt_msg = {
   recipient: {
     id: recipientId
   },
   message: {
     attachment: {
       type: "template",
       payload: elementsArr
     }
   }
 };


 return callSendAPI(receipt_msg);
}

//=======================================================================================

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

function create_cricket_matches_history_template(cricResponse){
    var elements = [];
    var matches = [];
    matches = cricResults.matches;
    var sortedResults = [];
    if(matches.length >=10){
      for (var i = 0; i < 10; i++) {
          sortedResults.push(matches[i]);
      }
    }else{
      sortedResults = matches;
    }
    for(let i=0; i<sortedResults.length; i++){
        let element = {};
        element.title = sortedResults[i].teatm-1+' vs '+sortedResults[i].teatm-2;
        element.subtitle = sortedResults[i].winner_team;
        element.image_url = "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/12/02/Pictures/fbl-ita-seriea-fiorentina-juventus_52746708-f5e4-11e8-8694-11c39b8de84b.jpg";

        elements.push(element);
    }
    return elements;

}

function create_cricket_results_list_Elements(cricResults){
  var elements = [];
  var matches = [];
  matches = cricResults.data;
  var sortedResults = [];
  if(matches.length >=10){
    for (var i = 0; i < 10; i++) {
        sortedResults.push(matches[i]);
    }
  }else{
    sortedResults = matches;
  }

  for(let i=0; i<sortedResults.length; i++){
      let element = {};
      element.title = sortedResults[i].name;
      element.subtitle = sortedResults[i].date;
      element.image_url = "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/12/02/Pictures/fbl-ita-seriea-fiorentina-juventus_52746708-f5e4-11e8-8694-11c39b8de84b.jpg";

      elements.push(element);
  }
  return elements;
}

var createNewsListElements = function(data){
    var elements = [];
    var articles = [];
    articles = data.articles;
    var sortedNewsArticles = [];
    if(articles.length >=10){
      for (var i = 0; i < 10; i++) {
          sortedNewsArticles.push(articles[i]);
      }
    }else{
      sortedNewsArticles = articles;
    }


    for(let i=0; i<sortedNewsArticles.length; i++){
        let element = {};
        let default_action = {
              type: "web_url",
              url: sortedNewsArticles[i].url,
              webview_height_ratio: "TALL",
        }
        element.title = sortedNewsArticles[i].title;
        element.subtitle = sortedNewsArticles[i].description;
        element.image_url = sortedNewsArticles[i].urlToImage;
        element.default_action = default_action;
        elements.push(element);
    }

    // console.log("======================================= \n elements ::", elements);
    return elements;
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
           console.log("\n\n\nbody.error :: ", error);
           console.log("\n\n\nbody  :: ", body);
           // console.log("\n\n\nbody.response :: ", response);

           sendTextMessage(storedSessionId, "oops something went wrong when calling processing send api body..")
          // write_log("Failed calling Send API: ststus=>[" + response.statusCode + "] message=>[" + response.statusMessage + "] error=>[" + body.error + "].");
           // reject(error);
         }
       } catch (e) {
           console.log("error occured :: ", e);
           sendTextMessage(storedSessionId, "oops something went wrong when calling send api.")
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
