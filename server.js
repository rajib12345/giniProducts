
'use strict';
const express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
const http = require("http").Server(app);
const io = require('socket.io')(http);
const promise = require("promise");
const request = require('request');
var bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require("uuid");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(http, {
    debug: true,
});

var querystring = require('querystring');

// var ConversationV1 = require('watson-developer-cloud/conversation/v1');
const AIEngine = require('./server-side-services-container/AIEngine/AIEngine.js');
const AI_ENGINE_PROCESSING_SERVICE = require('./server-side-services-container/AIEngine/AIEngineProcessing.js');

var AIPreviewJsonData = require('./server-side-services-container/AIData/AITrainingData.js');
const FB_BOT_ENGINE = require('./server-side-services-container/facebook/facebookBotEngine.js');
const RANDOM_JOKE_SERVICE = require('./server-side-services-container/randomJoke.js');
const CRIC_API_SERVICE = require('./server-side-services-container/cricket/cricAPIProcessing.js');
const WIKI_SEARCH_SERVICE = require('./server-side-services-container/wikipedia/wikiSearch.js');
const GOOGLE_SERVICE = require('./server-side-services-container/google/googleMap.js');
const WEATHER_SERVICE = require('./server-side-services-container/weather/weatherAPI.js');
const DARKSKY_WEATHER_SERVICE = require('./server-side-services-container/weather/darkSkyWeatherAPI.js');

// const IPINFO_SERVICE = require('./server-side-services-container/ipInfo/ipInfo.js')
const HTTP_SERVICE = require('./server-side-services-container/http/http.js');
const WORDS_API_SERVICE = require('./server-side-services-container/rapidApi/wordsApi/wordsApi.js');
const SENDGRID_API_SERVICE = require('./server-side-services-container/rapidApi/sendGrid/sendGridApi.js');
// const NEWS_SERVICE = require('./server-side-services-container/news/newsAPISearch.js');
const POS_SERVICE = require('./server-side-services-container/POS/partsOfSpeech.js');
// const JIMP_SERVICE = require('./server-side-services-container/jimp/jimp.js');
const EMAIL_SERVICE = require('./server-side-services-container/nodemailer/nodemailer.js');
const BADWORD_API_SERVICE = require('./server-side-services-container/badWords/badWords.js');
// const PLACES_SERVICE =  require('./services/places/nearByPlaces');
const DB = require('./database/neDb/neDb.js');

const DUMMY_NEWS_DATA = require('./DummyDataCenter/DummyNewsData/dummyNewsData.js');
const DUMMY_ZOMATO_DATA = require('./DummyDataCenter/DummyZomatoData/dummyZomatoData.js');
const DUMMY_OMDB_DATA = require('./DummyDataCenter/DummyOmdbData/dummyOmdbData.js');
const DUMMY_QUIZ_DATA = require('./DummyDataCenter/DummyQuizData/dummyQuizData.js');
// const DUMMY_PLACES_CATEGORY_DATA = require('./DummyDataCenter/DummyHereMapData/dummyHereMapData.js');

const GENERIC_TEMPLATE_GENERATOR = require('./GenericTemplateCenter/basicGenericTemplateGenerator.js');
const HERE_MAP_API_SERVICE = require('./server-side-services-container/here/hereMapApi.js');
const TWILIO_SERVICE = require('./server-side-services-container/twilo/twiloApi.js');


const CANNABIS_SERVICE = require('./server-side-services-container/CANNABIS/cannabisApi.js');
const NASA_SERVICE = require('./server-side-services-container/NASA/nasaApi.js');
const OPEN_SOURCE_SERVICE = require('./server-side-services-container/OPEN-SOURCE/openSourceApis.js');
const GITHUB_WHO_COVID19_API_SERVICE = require('./server-side-services-container/COVID19-CORONA/covid19Api.js');
const CUSTOM_PORTFOLIO_SERVICE = require('./server-side-services-container/PORTFOLIO/portfolio.js');
const VIDEO_CONF_SERVICES = require('./server-side-services-container/webRTC/videoConfApis.js');


const VIMEO_SERVICE = require('./server-side-services-container/video/vimeo/vimeoController.js');
const SPOTIFY_SERVICE = require('./server-side-services-container/spotify/spotify.controller.js');


VIMEO_SERVICE.getVimeoVideo();







// console.log("GENERIC_TEMPLATE_GENERATOR: ", GENERIC_TEMPLATE_GENERATOR);
var CURRENT_LOCATION = '';
var CURRENT_LOCATION_OBJ = {lat : null, lon: null};






// EMAIL_SERVICE.sendEmail().then(function(response){
//     console.log("email response :: ", response);
// })


// JIMP_SERVICE.blurImage('image1.jpg', 'newCropImage.jpg');

// remind me imageMagic.com
// POS_SERVICE.getPos("define today");


// SENDGRID_API_SERVICE.sendEmail();

// WORDS_API_SERVICE.getWordDetails("today").then(function(response){
//     console.log("wordsapi result :: ", JSON.stringify(response));
// })


var dummySocket = '';
var chatContainerData = [];
var activeUsers = [];
var userCurrentLocationObj = null;

var category = "cinema";
// var location = "22.767427,88.388344";
const newsApiKey = "59c716c17f4e4f4fa4b260a1fe7ce8ba";
const newsApiQuery = "https://newsapi.org/v2/everything?q=top%20indian%20cricket%20news%20&from=2019-05-26&sortBy=publishedAt&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba";
const topHeadline = "https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba";
var savedFileIdCount = 0;
var savedFilesContent = [];
var bookShelf = [];

// var dummySocket;

// const showSavedCodedFilesIo = io.of('');

//================================ *************************** =================================
// app.use(express.static('public'));

app.set("view engine", "html");
app.set('views', path.join(__dirname, 'client'));
app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.use(bodyParser.json());
app.use('/static', express.static(__dirname+'/public'));

app.use('/star', function(req, res) {
    res.sendfile('./client/starRating.html');
});

app.use('/login', function(req, res) {

  console.log("******************** call login spotify *************************");
  // var state = generateRandomString(16);
  // res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email streaming';
  let client_id = '1596b5e97be6409cb04670618b53a62d';
  let client_secret = 'd22590a9254e4d51a5c2ea923e11f150';
  let redirect_uri = 'http://localhost:3000/spotify';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    }));
});

app.use('/spotify', function(req, res) {
    console.log("************************** call spotify redirect url ===================");
    let client_id = '1596b5e97be6409cb04670618b53a62d';
    let client_secret = 'd22590a9254e4d51a5c2ea923e11f150'
    var code = req.query.code || null;

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: 'http://localhost:3000/spotify',
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    var access_token = body.access_token,
        refresh_token = body.refresh_token;
        console.log("@@@@@@ access_token :: ",access_token);
        console.log("@@@@@@ refresh_token :: ",refresh_token);
        SPOTIFY_SERVICE.current_state.access_token = access_token;
        SPOTIFY_SERVICE.current_state.refresh_token = refresh_token;

    res.send('succesfull...');

    SPOTIFY_SERVICE.getSpotifyData();


  };
});

});




app.use('/init', function(req, res) {
    res.sendfile('./client/INIT-APP/pages/initApp.index.html');
});

app.use('/camera', function(req, res) {
    res.sendfile('./client/camera.html');
});

app.use('/dualcamera', function(req, res) {
    res.sendfile('./client/dualCamera.html');
});

app.use('/books', function(req, res) {
    res.sendfile('./client/books.html');
});

app.use('/score', function(req, res) {
    res.sendfile('./client/scoreBatVideo.html');
});

app.use('/webshare', function(req, res) {
    res.sendfile('./client/webShare.html');
});

app.use('/news', function(req, res) {
    res.sendfile('./client/newsApi.html');
});

app.use('/newstest', function(req, res) {
    res.sendfile('./client/newstest.html');
});
app.use('/widgets', function(req, res) {
    res.sendfile('./client/soccerWidgets.html');
});

app.use('/collapse', function(req, res) {
    res.sendfile('./client/meralco.html');
});

app.use('/newsapp', function(req, res) {
    res.sendfile('./client/newsapp.html');
});

app.use('/baba', function(req, res) {
    res.sendfile('./client/cannabis.html');
});

app.use('/nasa', function(req, res) {
    res.sendfile('./client/nasaApi.html');
});

app.use('/opensource', function(req, res) {
    res.sendfile('./client/openSourceApis.html');
});

app.use('/open-source', function(req, res) {
    res.sendfile('./client/open-source-app.html');
});

app.use('/web-scrapper', function(req, res) {
    res.sendfile('./client/cheerioWebScrapper.html');
});

// app.use('/video-conf', function(req, res) {
//     res.sendfile('./client/webRTC/videoConfApp.html');
// });

// app.use('/meet', function(req, res) {
//     res.sendfile('./client/webRTC/testWebRTC.html');
// });

// app.use('/peer', function(req, res) {
//     res.sendfile('./client/webRTC/videoConfPeerJsApp.html');
// });

// app.use("/peerjs", peerServer);
//
// app.get("/:room", (req, res) => {
//     res.render("room", { roomId: req.param.room });
// });
//
// app.get("/", (req, res) => {
//     let uid = uuidv4();
//     res.redirect(`/${uid}`);
//     dummySocket.emit("get-room-id", {roomId: uid});
// });

app.use('/covid', function(req, res) {
    res.sendfile('./client/COVID19/pages/newCovid19App.html');
});

app.use('/explorer', function(req, res) {
    res.sendfile('./client/apiExplorer.html');
});

app.use('/moumita', function(req, res) {
    res.sendfile('./client/moumita.html');
});

app.use('/portfolio_moumita', function(req, res) {
    res.sendfile('./client/PORT_FOLIO/portFolio_moumita.html');
});

app.use('/portfolio_rajib', function(req, res) {
    res.sendfile('./client/PORT_FOLIO/generic_portfolio.html');
});

app.use('/soundcloud', function(req, res) {
    res.sendfile('./client/soundCloudApi.html');
});

app.use('/wpa', function(req, res) {
    res.sendfile('./client/WPA_TEST/wpa_test1.html');
});

app.use('/gpwa', function(req, res) {
    res.sendfile('./pwa.html');
});

// app.use('/wpa', function(req, res) {
//     res.sendfile('./index.html');
// });

app.use('/audiodb', function(req, res) {
    res.sendfile('./client/audioDbApi.html');
});

app.use('/music', function(req, res) {
    res.sendfile('./client/musicApp.html');
});

app.use('/movie', function(req, res) {
    res.sendfile('./client/movie.html');
});

app.use('/quiz', function(req, res) {
    res.sendfile('./client/quizApi.html');
});

app.use('/zomato', function(req, res) {
    res.sendfile('./client/zomatoApi.html');
});

app.use('/heremap', function(req, res) {
    res.sendfile('./client/heremapApi.html');
});

app.use('/omdb', function(req, res) {
    res.sendfile('./client/omdbApi.html');
});

app.use('/test1', function(req, res) {
    res.sendfile('./client/test.html');
});

app.use('/test', function(req, res) {
    res.sendfile('./client/office/billSummaryMailTemplate.html');
});

// app.use('/wiki', function(req, res) {
//     res.sendfile('./client/wikipedia/wikiResponse.html');
// });

// app.use('/AI', function(req, res){
//   res.sendfile('./client/AIPreview.html');
// });

app.use('/ai', function(req, res){
  console.log("!!!!!");
  res.sendfile('./client/AI/pages/newAiEngine.html');
});

app.use('/gini', function(req, res){
    // console.log("req.query ::", req.query.query);
    var AIREsponse = AIEngine.processQuery(req.query.query);
    var HTML_response = API_processResponse(AIREsponse, AIREsponse.intents, res);
    var gineResponse = {
        JSONResponse : AIREsponse,
        HTMLResponse : HTML_response
    }
    console.log("gineResponse :: ", JSON.stringify(gineResponse));
    res.json({data: gineResponse});
});

app.use('/api', function(req, res){
    // console.log("req.query ::", req.query.query);
    var AIREsponse = AIEngine.processQuery(req.query.query);
    console.log("AIREsponse :: ", AIREsponse);
    API_processResponse(AIREsponse, AIREsponse.intents, res);
});


app.use('/screenshare', function(req, res) {
    console.log("------------+++++++++++++++++++++=============");
    res.sendfile('./client/MDM/mdmScreenShare/updatedScreenShareApp.html');
});

app.use('/sshare', function(req, res) {
    console.log("------------+++++++++++++++++++++=============");
    res.sendfile('./client/MDM/mdmScreenShare/newMdmScreenShareApp.html');
});

// app.use("/peerjs", peerServer);

// app.get("/:room", (req, res) => {
//     res.render("room", { roomId: req.param.room });
// });

// app.get("/", (req, res) => {
//     let uid = uuidv4();
//     res.redirect(`/${uid}`);
//     dummySocket.emit("get-room-id", {roomId: uid});
// });

// app.get('/', function (req, res) {
//   console.log("=== calling the root ===");
//   // PLACES_SERVICE.searchByLocation(location,category).then(function(response){
//   //     console.log("response :: ", response);
//   //
//   //     // let template = PLACES_SERVICE.searchByLocationTemplate(response);
//       res.sendfile("./client/nearByPlaces.html");
//   });

app.get('/fetch', function(req, res){
      // console.log("jsfilecontent : ",savedFilesContent[0].id);
      // let str = savedFilesContent[0].content.replace(/(?:\r\n|\r|\n)/g, '<br>');
      // let data = {};
      // data.id = savedFilesContent[0].id;
      // data.template = str;
      // res.send({data : str});
      //console.log("dummySocket:: ", dummySocket);
      // showSavedCodedFilesIo.on('connection', function(socket){
      //     dummySocket.emit("show-saved-coded-files", {files : savedFilesContent});
      // });
      // console.log("#### dummySocket :: \n", dummySocket);

      res.sendfile("./client/fetchFiles.html");

});

app.get('/share', function(req, res){
    res.sendfile("./client/shareFile.html");
});

app.post('/webhook', function (req, res) {
 try {
   var data = req.body;
   console.log("@@@@@ fired post webhooks from fb....");
   console.log("\n\n@@@@@@@ after hit webhook the data :  ", JSON.stringify(data));
   console.log("\n\n");
   if (data.object == 'page') {
     if(data.entry[0].changes){
       console.log("#####################################");
       FB_BOT_ENGINE.sendTextMessage(data.entry[0].id, "oops messeging is not defined...")
        return;
     }
     var msg = data.entry[0].messaging[0];
     // if(msg.text === undefined){
     //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
     //   FB_BOT_ENGINE.sendTextMessage(data.entry[0].messaging[0].recipient.id, "oops messeging is not defined...");
     //    // return;
     // }
     // -- get user FB id
     var user_FB_id = msg.sender.id;
     // -- create/get session id
     var session = FB_BOT_ENGINE.get_session(user_FB_id);
     // -- iterate over each entry, there may be multiple if batched
     data.entry.forEach(function (pageEntry) {
       var pageID = pageEntry.id;
       var timeOfEvent = pageEntry.time;
       // -- iterate over each messaging event
       pageEntry.messaging.forEach(function (messagingEvent) {
         if (messagingEvent.message) {
           // console.log("messagingEvent.message :: ", messagingEvent.message);
            console.log("+++++ message event:: ", JSON.stringify(messagingEvent));
            FB_BOT_ENGINE.FB_Bot_queryProcessing(session, messagingEvent.message.text);
               // if(messagingEvent.message.text === "hi" || messagingEvent.message.text === "hello"){
               //     FB_BOT_ENGINE.sendTextMessage(session.id, "welcome to GINI, your personal assistant...\n How can I help you sir?");
               // }
         }
       });
     });
     // -- must send back a 200, within 20 seconds,
     // -- otherwise, FB will timeout the request.
     res.sendStatus(200);
   }
 } catch (e) {
       console.log("error occured when hit the webhook :: \n\n", e);
       FB_BOT_ENGINE.sendTextMessage(session.id, "oops something went wrong when hit the webhook.")
 } finally {

 }

});

app.use('/webhook', function(req, res){
      // res.sendfile('./client/fbbot.html');
      console.log("===== webhook url is hitting =====");
      // console.log("req.query :: ", req.query);
      if (req.query['hub.mode'] === 'subscribe' &&
          req.query['hub.verify_token'] === "myNameIsGini") {
        // console.log("=============  Validating webhook  ===============");
        res.status(200).send(req.query['hub.challenge']);
        // res.send("sucessfull...");
      } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
      }
})


// app.use('/', function(req, res){
//   // console.log("req.query : ", req.query.name);
//   if(req.query && req.query.name !== undefined){
//     let userInfo = {
//         name : req.query.name
//     }

//     activeUsers.push(userInfo);
//     // console.log("active users list :: ", activeUsers);
//   }
//
//   res.sendfile('./client/gini.html');
// });


//====================================================================
var AI_RESPONSE = {
    AI_RESPONSE_JSON : null,
    AI_RESPONSE_HTML : null
}

var AI_send_response = function(aiResponseJson, aiResponseHtml, resObject){
    AI_RESPONSE.AI_RESPONSE_JSON = aiResponseJson;
    AI_RESPONSE.AI_RESPONSE_HTML = aiResponseHtml;
    resObject.json({data : AI_RESPONSE});
}

var API_processMatchedIntents = function(resObj, finalIntent, res, AIREsponseJson){
   var returnMsg = '';

      if(finalIntent === 'greetings'){
         console.log("===========================");
         console.log("\n\n intent :: greetings ");
         //return 'welcome to ibm watson chat bot. How can I help you.';
         returnMsg = 'welcome to GINI AI chat bot. How can I help you.';
         AI_send_response(AIREsponseJson, returnMsg, res);
         // res.json({data: returnMsg})
      }else if(finalIntent === 'about-company'){
          returnMsg = processAboutCompany(resObj);
          AI_send_response(AIREsponseJson, returnMsg, res);
          // res.json({data: returnMsg})

      }else if(finalIntent === 'weather'){
          returnMsg = WEATHER_SERVICE.processWeather(resObj, dummySocket, res, "API");
      }else if(finalIntent === 'aboutAdcdev'){
          returnMsg = processAboutAdcdev(resObj);
          AI_send_response(AIREsponseJson, returnMsg, res);
          // res.json({data: returnMsg})

      }else if(finalIntent === 'change-request'){
          returnMsg = processChangeRequest(resObj);
          AI_send_response(AIREsponseJson, returnMsg, res);

          // res.json({data: returnMsg})

          console.log("change request response \n", returnMsg)
      }else if(finalIntent === 'fetchJiveInfo'){
         console.log("===  intent fetchJiveInfo  ===")
         returnMsg = processShowJiveInfo();
         AI_send_response(AIREsponseJson, returnMsg, res);

         // res.json({data: returnMsg})

      }else if(finalIntent === 'current-location'){
          processMyCurrentLocation();
          AI_send_response(AIREsponseJson, returnMsg, res);

          // res.json({data: returnMsg})

      }else if(finalIntent === 'near-by-places'){
          processNearByPlacesUsingMap(resObj).then(function(data){
                if(data.error_message){
                  console.log("data.error_msg: ", data.error_message);
                  showErrorMsg();
                }else{
                  returnMsg = createNearByPlacesTemplate(data);
                  AI_send_response(AIREsponseJson, returnMsg, res);
                }
          });
      }else if(finalIntent === 'share-if-you-care'){
        returnMsg += `
          We have started </strong> SHARE IF YOU CARE </strong> casually since few years back. <br>
          The creator of this is our master mind SUBHOJIT GHOSH. <br>
          MEMBERS : <br>
            . SUBHOJIT GHOSH <br>
            . AMIT HALDER <br>
            . RABI <br>
            . CHIRON <br>
            . LOKNATH <br>
            . TAPA <br>
            . ARUP GHOSH <br>
            . RAJIB KARMAKAR <br>
        `;
        AI_send_response(AIREsponseJson, returnMsg, res);

        // res.json({data: returnMsg})

      }else if(finalIntent === 'random-joke'){
        RANDOM_JOKE_SERVICE.randonJoke().then((data)=>{
          // console.log("random joke response :: ", data);
          AI_send_response(AIREsponseJson, data, res);

          // res.json({data: data})

        });
      }else if(finalIntent === 'cricket-upcomming-match'){
        var url = 'https://cricapi.com/api/matchCalendar?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82';
        CRIC_API_SERVICE.cricApiProcessing(url).then(function(response){
              var cricResult = CRIC_API_SERVICE.upCommingCricketMatchesResponse(response);
              // console.log("cricResult:: ", cricResult);
              AI_send_response(AIREsponseJson, cricResult, res);
        });
      }else if(finalIntent === "search-news-article"){
          // console.log("news response object :: ", resObj);
          let query = resObj.input.text;
          let newsArticleApiUrl = "https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey=5ce2bcb4107d4f2ab38ac0264c5805b3&q="+query;
          HTTP_SERVICE.get(newsArticleApiUrl).then(function(newsResponse){
              let template = NEWS_SERVICE.create_news_article_template(newsResponse);
              // console.log("template :: ", template);
              AI_send_response(AIREsponseJson, template, res);

          });
      }else if(finalIntent === "define-word"){
          let query = resObj.input.text;
          let query_noun = '';
          POS_SERVICE.getPos(query).then(function(response){
              if(response.nouns.length === 1){
                  query_noun = response.nouns[0];
              }else{
                  query_noun = response.nouns[response.nouns.length - 1];
              }
              WORDS_API_SERVICE.getWordDetails(query_noun).then(function(response){
                  let template = WORDS_API_SERVICE.create_word_details_template(response);
                  AI_send_response(AIREsponseJson, template, res);
              })
          })

      }

      return returnMsg;
}

var API_processResponse = function(AIREsponseJson, intents, res){
    console.log("==calling the process intents function ===");

    var finalIntent = null;
    var returnMsg = '';
    // console.log("intent length :: ", intents.length);
    if(intents.length === 0){
      //==== PROCESS  NO  MATCHED INTENTS  ====
      processDefaultMsg(resObj.input.text);
      return '';
    }

    if(intents.length > 0){
      // ==== PROCESS  MATCHED INTENTS AND CHECK THE CONFIDENCE > 50 ====
      var maxConfidence = 0;
      for(var i=0; i<intents.length; i++){
         // maxConfidence = intents[i].confidence;
         if(intents[i].confidence > 50 && (intents[i].confidence > maxConfidence )){
           finalIntent = intents[i].intent;
         }
      }

      console.log("final intent :: ", finalIntent);
      if(finalIntent !== null){
        returnMsg = API_processMatchedIntents(AIREsponseJson, finalIntent, res, AIREsponseJson);
        // console.log("intent response :: ", returnMsg);
      }else{
        WIKI_SEARCH_SERVICE.wikiSearch(AIREsponseJson.input.text).then(function(wikiResult){
            // console.log("wikiResult :: ", JSON.stringify(wikiResult));
            if(wikiResult.query.search.length > 0){
              let wikiTemplate = WIKI_SEARCH_SERVICE.createWikihResponseTemplate(wikiResult);
              AI_send_response(AIREsponseJson, wikiResult, res);
            }else{
              let defaultMsg = "I didn't get you properly. As I am groing day by day. Hopefully I can answer you very soon.";
              AI_send_response(AIREsponseJson, defaultMsg, res);
            }

        })
      }

    }

    return returnMsg;

}

// DB.insert();
//====================================================================


//====================  Ibm watson integration ========================
//--------------------------------------------------------------
var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22kolkata%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
// var wikiAPIUrl = "https://ipinfo.io";
// var getIpInfo = function(){
//   console.log("========= calling ipinfo search function ==========");
//   var wikiSearchPromise = new promise(function(resolve, reject){
//     var wikiSearchOption = {
//               uri: wikiAPIUrl,
//               method: 'GET'
//     };
//     request(wikiSearchOption,  function(error, response, body){
//       if(error || (response.statusCode != 200)){
//         console.log("wiki search  error: ", error);
//       }else{
//         // console.log("------------- sucessfull wiki search result --------------");
//         body = JSON.parse(body);
//         resolve(body);
//       }
//     });
//   });
//   return wikiSearchPromise;
// }
// getIpInfo().then(function(data){
//     console.log("ipinfo response :: ", data);
// })
//--------------------------------------------------------------
var processDefaultMsg = function(query){
  console.log("calling the process default msg with query :: ", query);
    bingSearch(query).then(function(response){
    //console.log("default query response :: ", JSON.stringify(response.webPages.value));
    var result = '';
    var name = '';
    var shortDescription = '';
    var description = null;
    var searchTags = '';
    var desc = '';
    var returnMsg = `
      Here are the information that I have found below <br><br>
    `;

    // fetch result value
    if(response.webPages.value[0] != undefined || response.webPages.value[0] != null){
       result = response.webPages.value[0];
    }
    //console.log("\n\nresponse :: ", result);

    //console.log("\n========================================================================\n")
    //console.log("\n\n about :: ", result.about)
    // fetch result name
    if(result.about != undefined){
      if(result.about[0].name != undefined || result.about[0].name != null){
       name = result.about[0].name;
       returnMsg += 'name : '+name+'<br><br>';
      }
      console.log("\n\nname :: ", name);
    }

    //fetch the thumbnail url to show the images
    if(response.images !== undefined){

       if(response.images.value != undefined){
          var imgUrl = response.images.value[0].thumbnailUrl;
          var imgTag = '<img src="'+imgUrl+'"  width="150" height="100" style="float:right;">';
          returnMsg += imgTag;
       }
    }


    //console.log("result.snippet :: ", result.snippet);
    // fetch result shortdescription
    if(result.snippet != undefined || result.snippet != null){

       //shortDescription = result.snippet;
       returnMsg += "snippet :"+result.snippet+'<br><br>';
       console.log("\n\nshortDescription :: ", result.snippet)
    }


    // fetch result description
    if(result.deepLinks != undefined || result.deepLinks != null){
       description = result.deepLinks;
        //if(description !=  null){
       for(var i=0; i<2; i++){
       desc += `
            Category : `+description[i].name+`<br>
            Description : `+description[i].snippet+`<br>
       `;
      }
      returnMsg += desc;
    //}
       console.log("\n\ndescription :: ", desc)
    }

    console.log("\n\n\nbing search result :: ", returnMsg);
    dummySocket.emit("query-response", {returnMsg : returnMsg});
})

}

var processAboutCompany = function(resObj){
    console.log("process about company...");
    var returnMsg = '';

    var entities = resObj.entities;
    if(entities.length > 0){
       let entity  = entities[0].entity;
       let value = entities[0].value;
       let confidence = entities[0].confidence;
       if(entity === 'basicInfo'){
            if(value === 'location'){
               returnMsg = 'here is the current location of <strong> PWC </strong> below: <br><br>';
               returnMsg += 'saltlake sector five <br> near college more.';
            }else if(value === 'salary structure'){
               returnMsg = 'salary will be as per the industry standard.';
            }
       }
    }

    return returnMsg;
}

var processAboutAdcdev = function(resObj){
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
                 returnMsg = 'Here are the list of the <i><strong> DEVELOPER </strong></i> in SDP team below: <br><br>';
                 returnMsg += 'Debayan   <br> Avisekh <br> Tanmoy Chatterjee <br> Sourajit <br>Tamal Adhikery <br> Sohela <br> Moumita <br> Siddharth <br> Rumani <br> Priyodarshini <br> Usha <br> Avishikta <br> Biplab <br> Dhananjoy<br> Shoham';
               }else if(project === 'adc'){
                 returnMsg = 'Here are the list of the <i><strong> DEVELOPER </strong></i> below: <br><br>';
                 returnMsg += 'Gourav <br> Sumanth <br> Avilash <br> Projita <br> Hasi <br> Amit <br> Utsav <br> Tirtha';
               }else if(project === 'dms'){
                 returnMsg = 'Here are the list of the <i><strong> DEVELOPER </strong></i> in DMS below: <br><br>';
                 returnMsg += 'Anuradha <br> Ronit <br> Ajijul <br> Niladri';
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

var processMyCurrentLocation = function(){
    dummySocket.emit('current-location',{});
}

var processNearByPlacesUsingMap = function(resObj){
     // console.log("watson map response :: ", resObj);
    var entities = resObj.entities;
    var entity  = entities[0].entity;
    var value = entities[0].value;
    // var location = '22.573341,88.4363451';
    var location = GOOGLE_SERVICE.getUser
    CurrentLocation();
    console.log("@@@@ user current location :: ", location);
    var radius = 1500;
    var type = value;
    var apikey = 'AIzaSyCxrBt-YSMgsL6uf55wgHddMIUeWZ81yjI';
    try{
      var nearBySearchPromise = new promise(function(resolve, reject){
          var URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+location+'&radius=1500&type='+type+'&key='+apikey;
          console.log("URL : ", URL);
          var options = {
            method: 'GET',
            url: URL,
          };

      request(options, function (error, response, body) {
         if (error) throw new Error(error);
           body = JSON.parse(body);
           resolve(body);
      });
    })

      return nearBySearchPromise;
    }catch(e){
        console.log("occured error when fetching bing result ::", e);
    }
}

// processNearByPlacesUsingMap().then(function(data){
//     console.log("near by places response \n", data);
// })

var showErrorMsg = function(){
    var returnMsg = `
      <div>
        Something went wrong. <br>
        We are facing some network issue.<br>
        Please try again later.
      </div>
    `;
    dummySocket.emit("query-response", {returnMsg : returnMsg});
}

var createNearByPlacesTemplate = function(data){
  // console.log("data :: ", data);
  var returnMsg = '';
  for (var i = 0; i < data.results.length; i++) {
      console.log("@ : ", data.results[i].name);
      if(data.results[i].name){
        let name = data.results[i].name;
        let icon = data.results[i].icon;
        let address = data.results[i].vicinity;
        let rating = data.results[i].rating;
        // let photoReference = data.results[i].reference;
        // let photoURL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+photoReference+'&key=AIzaSyCxrBt-YSMgsL6uf55wgHddMIUeWZ81yjI'

        returnMsg += `
                    <div class="row" style="border-bottom: 1px solid #e9ebee; padding-bottom:5px; font-family: -apple-system, BlinkMacSystemFont, Roboto, Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 100;">
                        <div class="col-md-3 col-sm-3 col-lg-3 col-xs-3" style="padding-left:8px;">
                            <img src="`+icon+`" alt="" style="height: 50px; width: 50px; text-align: center; margin-top: 15px; margin-left: 5px;">
                        </div>
                        <div class="col-md-9 col-sm-9 col-lg-9 col-xs-9" style="padding-top: 5px;">

                            <div style=""><strong><i>`+name+`</i></strong></div>
                            <div style="">`+address+`</div>
                            <div style="">Rating : <span style="color: orange !important;">`+rating+`</span></div>
                        </div>
                    </div>
        `;
      }

  }
  return returnMsg;
  // dummySocket.emit("query-response", {returnMsg : returnMsg});
}

var getNearByPhoto = function(){
  console.log("====================================================================");
  var photoArr = [];
  try{
    var nearBySearchPromise = new promise(function(resolve, reject){
        var URL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRbAAAAZ79WU1N9YfjUJIQqe2ifSDlAhxVN3yxV11C4kL_dxi8cauFJq5JPp_bDaRtp5JuDwo7h8IUb2LWTLvHbpQmsLzuCWvuKojXIIR1ZODUXxTLZW93ty7cqYBJHYUmYYFajEhAr4Rd0OrIusUCemYGZu3s7GhTLk4muT4wCm072vePZYcZcTefBRA&key=AIzaSyCxrBt-YSMgsL6uf55wgHddMIUeWZ81yjI';
        //var URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+location+'&radius=1500&type='+type+'&key='+apikey;
        // console.log("URL : ", URL);
        var options = {
          method: 'GET',
          url: URL,
        };

    request(options, function (error, response, body) {
       if (error) throw new Error(error);
         console.log("&&&&7");
         // body = JSON.parse(body);
         console.log("photo url :: \n\n", body);
         resolve(body);
    });
  })

    return nearBySearchPromise;
  }catch(e){
      console.log("occured error when fetching bing result ::", e);
  }

}
// getNearByPhoto().then(function(res){
//     console.log("response :: \n\n", res);
// })

// var fetchCurrentLocation = function(){
//   socket.emit("fetch-current-location-request");
// }

var processMatchedIntents = function(resObj, finalIntent){
   var returnMsg = '';
      console.log("final intent : ", finalIntent);
      if(finalIntent === 'greetings'){

         returnMsg = 'welcome to GINI AI chat bot. How can I help you.';
      }else if(finalIntent === 'about-company'){
          returnMsg = processAboutCompany(resObj);
      }else if(finalIntent === 'weather'){
          // WEATHER_SERVICE.processWeather(resObj, dummySocket, resObj, "application");
          DARKSKY_WEATHER_SERVICE.createHScrollBarTemplate(CURRENT_LOCATION, dummySocket, resObj, "application");
          // .then(function(data){
          //       console.log("@@@@@ dark sky weather response :: \n\n", data);
          // })
      }else if(finalIntent === 'aboutAdcdev'){
          returnMsg = processAboutAdcdev(resObj);
      }else if(finalIntent === 'change-request'){
          returnMsg = processChangeRequest(resObj);
          console.log("change request response \n", returnMsg)
      }else if(finalIntent === 'fetchJiveInfo'){
         console.log("===  intent fetchJiveInfo  ===")
         returnMsg = processShowJiveInfo();
      }else if(finalIntent === 'current-location'){
          processMyCurrentLocation();
      }else if(finalIntent === 'near-by-places' || finalIntent === "near-by-popular-places"){
          // ====================== GOOGLE MAP IMPLEMENTATION  =========================
          // processNearByPlacesUsingMap(resObj).then(function(data){
          //       if(data.error_message){
          //         console.log("data.error_msg: ", data.error_message);
          //         showErrorMsg();
          //       }else{
          //         returnMsg = createNearByPlacesTemplate(data);
          //         dummySocket.emit("query-response", {returnMsg : returnMsg});
          //       }
          // });

          //========================= HERE MAP IMPLEMENTATION =================================
          console.log("CURRENT_LOCATION : ", CURRENT_LOCATION);
          // let cat = 'restaurant';
          // let cat = 'taxi-stand';
          let cat = 'restaurant';
          let template = '';
          let hereMapApiUrl = '';
          if(finalIntent === 'near-by-places'){
              hereMapApiUrl = 'https://places.demo.api.here.com/places/v1/discover/explore?in='+CURRENT_LOCATION+'%3Br%3D1000&cat='+cat+'&drilldown=true&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw';

          }else{
              hereMapApiUrl = 'https://places.demo.api.here.com/places/v1/discover/explore?at='+CURRENT_LOCATION+'&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg';
          }


          console.log("hereMapApiUrl: ", hereMapApiUrl);
          // console.log("================ CALLING HERE MAP API REQUEST ================");
          HERE_MAP_API_SERVICE.hereMapApiProcessing(hereMapApiUrl).then(function(data){
              // console.log("here map api response : ", JSON.stringify(data));
              let argList = [
                  // {key : "category", subkey: [{key : "title", type : "block", prefixValue: 'Category', postFixValue: '', ellipse : 'one line', style: "color: grey; font-size: 16px; text-align: left;"}]},
                  {key : "title", subkey: null, type: "block", api : "here map", sharedObj : 'title', prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
                  {key : "distance", subkey: null, type: "block", prefixValue: 'Distance : ', postFixValue: '', ellipse : 'one line', style:''},
                  {key : "vicinity", subkey: null, type: "block", sharedObj : 'text', prefixValue: 'Vicinity : ', postFixValue: '', ellipse : 'one line', style:''},
                  {key : "icon", subkey: null, type: "image", prefixValue: '', postFixValue: '', style:'width: 300px; height: 200px; margin-left: 24px; margin-top: 10px; margin-bottom: 16px;'},
                  {key : "href", subkey: null, type: "openModalWithContent", sharedObj : 'url', shareBtn: {title: '', text: '', url: ''}, appendKey: null, api: 'hereMapApi', btnName : 'More Details', style:'background-color: black; color: white;'},
              ];

              let payload = {
                  data : data.results.items,
                  argList : argList,
                  style : {
                    imgPos : 'top',
                    textAlign : 'left',
                    hScroll: "hScroll",
                    backgroundColor : null,
                    height : null,
                    width : null,
                    padding: null,
                    fontSize: null,
                    defaults : {
                        backgroundColor : 'white',
                        textAlign : 'center',
                        height: 'auto',
                        width : '300px',
                        color: 'grey',
                        fontSize : '13px',
                        padding: '',
                        margin : '5px 2px',
                        devider : '0px solid grey',
                        coverPadding : '5px',
                        border: "",
                        descriptionTemplateStyle : 'background-color: whitesmoke;',
                        borderRadius: "10px"
                    }
                  },
                  emptySlide : 'no'
              };
              if(data.results.items.length){
                 template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
                 dummySocket.emit("query-response", { returnMsg : template, displayType: 'horizontalSlide'});
              }else{
                 template = 'Oops, something went wrong. <br> I did not find out any near by <strong>'+cat+'</strong>';
                 dummySocket.emit("query-response", { returnMsg : template});
              }

              // console.log("@@@@  near by serach results are here \n\n", template);
              // socket.emit("here-map-api-response", { template : template });
          })
            // console.log("@@@@  near by serach results are here \n\n", template);
        // })

      }else if(finalIntent === 'zomato-near-by-restaurant'){
        let lat = userCurrentLocationObj.lat;
        let lon = userCurrentLocationObj.lon;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // let lat = "12.9352";
        // let lon = "77.6165346";
        const zomatoApiUrl = 'https://developers.zomato.com/api/v2.1/geocode?lat='+lat+'&lon='+lon+'&apikey=a5535212cb24d4243a3a8e835819d958';
        // console.log("================ CALLING zomato API REQUEST ================");
        console.log("zomatoApiUrl : ", zomatoApiUrl);
        console.log("userCurrentLocationObj : ", userCurrentLocationObj);
        HERE_MAP_API_SERVICE.hereMapApiProcessing(zomatoApiUrl).then(function(data){
          // console.log("zomato response : ", data);
          let argList = [
              {key : "restaurant", subkey: [
                  {key : 'name', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 16px; text-align: center; color: brown;'},
                  {key : 'cuisines', subkey: null, type: 'block', prefixValue: 'cuisines : ', postFixValue: '', ellipse : 'one line', style: ''},
                  {key : "featured_image", subkey: null, type: "image", prefixValue: '', postFixValue: '', style:'height: 250px;'},
                  // {key : "url", subkey: null, type: "newWindow",  text: 'Open In Zomato Site ', btnName : 'More Details', style:'margin-top: 10px;'},
                  {key : "location", subkey : [
                    {key : 'address', subkey: null, type: 'block', prefixValue: 'Address : ', postFixValue: '', ellipse : 'one line', style: ''},
                    {key : 'locality', subkey: null, type: 'block', prefixVPlue: 'Locality : ', postFixValue: '', ellipse : 'one line', style: ''},
                    {key : 'city', subkey: null, type: 'block', prefixValue: 'City : ', postFixValue: '', ellipse : 'one line', style: ''},
                    {key : 'locality_verbose', subkey: null, type: 'block', prefixValue: 'Locality verbose : ', postFixValue: '', ellipse : 'one line', style: ''},
                    // {key : 'latitude', subkey: null, type: 'block', prefixValue: 'Latitude : ', postFixValue: '', ellipse : 'one line', style: ''},
                    // {key : 'longitude', subkey: null, type: 'block', prefixValue: 'Longitude : ', postFixValue: '', ellipse : 'one line', style: ''},
                  ]},
                  {key : 'photos_url', subkey: null, type: 'newWindow', text: 'Visit Photos In Zomato', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 13px; color : brown; background-color: whiteSmoke; outline: white; text-align: left; padding: 0px 0px; '},
                  {key : 'menu_url', subkey: null, type: 'newWindow', text: 'Visit Menu In Zomato', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 13px; color : brown; background-color: whiteSmoke; outline: white; text-align: left; padding: 0px 0px; '},
                  // {key : 'order_url', subkey: null, type: 'newWindow', text: 'Place Order In Zomato', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 13px; color : #5cb85c; background-color: white; outline: white; text-align: left; padding: 0px 0px; '},
                  {key : 'events_url', subkey: null, type: 'newWindow', text: 'Visit Events In Zomato', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 13px; color : brown; background-color: whiteSmoke; outline: white; text-align: left; padding: 0px 0px; '},
                  {key : "url", subkey: null, type: "newWindow",  text: 'Visit In Zomato', btnName : 'More Details', style:'margin-top: 10px; background-color: brown; '},
              ]},

          ];


          let payload = {
              data : data.nearby_restaurants,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '300px',
                    ellipseWidth: '270px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("@@@@  near by serach results are here \n\n", template);
          dummySocket.emit("query-response", { returnMsg : template, displayType : 'horizontalSlide'});
        })
      }else if(finalIntent === 'movie-reviews'){
        console.log("========= calling intent moview review ==========");
        console.log("resObj : ", resObj);
        // const omdbApiUrl = 'http://www.omdbapi.com/?s=Batman&page=2&apiKey=c0022528';
        let inputText = resObj.input.text;
        inputText = inputText.split(" ");
        inputText = inputText[inputText.length - 1];
        const omdbApiUrl = 'http://www.omdbapi.com/?apiKey=c0022528&s='+inputText;


        HERE_MAP_API_SERVICE.hereMapApiProcessing(omdbApiUrl).then((data) => {
          console.log('odb response :: ', data);
          let argList = [
              {key : "Title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: "color: orange; font-size: 16px; text-align: center;"},
              {key : "Year", subkey: null, type: "block", prefixValue: 'Year : ', postFixValue: '', ellipse : 'one line', style:''},
              {key : "Type", subkey: null, type: "block", prefixValue: 'Type : ', postFixValue: '', ellipse : 'one line', style:''},
              {key : "Poster", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:'height: 300px;'},
              {key : "imdbID", subkey: null, type: "openModalWithContent", appendKey: 'http://www.omdbapi.com/?apiKey=c0022528&i=', api: 'omdbApi', btnName : 'More Details', style:''},

          ];

          let payload = {
              data : data.Search,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '300px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("@@@@  near by serach results are here \n\n", template);
          dummySocket.emit("query-response", { returnMsg : template, displayType : 'horizontalSlide'});
        })
      }else if(finalIntent === 'share-if-you-care'){
        returnMsg += `
          We have started </strong> SHARE IF YOU CARE </strong> casually since few years back. <br>
          The creator of this is our master mind SUBHOJIT GHOSH. <br>
          MEMBERS : <br>
            . SUBHOJIT GHOSH <br>
            . AMIT HALDER <br>
            . RABI <br>
            . CHIRON <br>
            . LOKNATH <br>
            . TAPA <br>
            . ARUP GHOSH <br>
            . RAJIB KARMAKAR <br>
        `;
      }else if(finalIntent === 'random-joke'){
        RANDOM_JOKE_SERVICE.randonJoke().then((data)=>{
          console.log("random joke response :: ", data);
          dummySocket.emit("query-response", {returnMsg : data});
        });
      }else if(finalIntent === 'cricket-upcomming-match'){
        var url = 'https://cricapi.com/api/matchCalendar?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82';
        CRIC_API_SERVICE.cricApiProcessing(url).then(function(response){
              var cricResult = CRIC_API_SERVICE.upCommingCricketMatchesResponse(response);
              console.log("cricResult:: ", cricResult);
              dummySocket.emit("query-response", {returnMsg : cricResult});
        });
      }else if(finalIntent === "cricket-matches-history"){
          let url = "https://cricapi.com/api/matches?apikey=xSyhW9hNmPNmLFtXdKtJRrjSwb82";
          CRIC_API_SERVICE.cricApiProcessing(url).then(function(response){
                var cricResult = CRIC_API_SERVICE.create_cricket_matches_history_template(response);
                // console.log("cricket history result:: ", cricResult);
                dummySocket.emit("query-response", {returnMsg : cricResult});
          });
      }else if(finalIntent === "search-news-article"){
          let query = resObj.input.text;
          let newsArticleApiUrl = "https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey=5ce2bcb4107d4f2ab38ac0264c5805b3&q="+query;
          HTTP_SERVICE.get(newsArticleApiUrl).then(function(newsResponse){
              if(newsResponse.articles.length === 0){
                let defaultMsg = "I didn't get you properly. As I am groing day by day. Hopefully I can answer you very soon."
                dummySocket.emit("query-response", {returnMsg : defaultMsg});
              }else{
                let template = NEWS_SERVICE.create_news_article_template(newsResponse);
                dummySocket.emit("query-response", {returnMsg : template});
              }
          });
      }else if(finalIntent === "define-word"){
          let query = resObj.input.text;
          let query_noun = '';
          POS_SERVICE.getPos(query).then(function(response){
              console.log("response :: ", response);
              let query_noun = response.nouns[0];
              if(response.nouns.length === 1){
                  query_noun = response.nouns[0];
              }else if(response.nouns.length > 1){
                  query_noun = response.nouns[response.nouns.length - 1];
              }
              console.log("query_noun :: ", query_noun);

              WORDS_API_SERVICE.getWordDetails(query_noun).then(function(response){
                  let template = WORDS_API_SERVICE.create_word_details_template(response);
                  dummySocket.emit("query-response", {returnMsg : template});
              })
          })

      }else if(finalIntent === "network-info"){
          dummySocket.emit("query-response", {returnMsg : "show-network-info", });
      }else if(finalIntent === "send-email"){
        let emailTemplate = EMAIL_SERVICE.create_email_template();
        dummySocket.emit("query-response", {returnMsg : emailTemplate, email: true});

      }else if( finalIntent === "zomato-collection"){
        console.log("================ CALLING ZOMATO COLLECTION API REQUEST ================");
        const zomatoCollectionApiUrl = 'https://developers.zomato.com/api/v2.1/collections?city_id=1&lat='+CURRENT_LOCATION+'&apikey=a5535212cb24d4243a3a8e835819d958';
        HERE_MAP_API_SERVICE.hereMapApiProcessing(zomatoCollectionApiUrl).then(function(data){
        // console.log("zomato collection response : ", JSON.stringify(data));
          let argList = [
              {key : "collection", subkey: [
                {key : "title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: "color: brown; font-size: 16px; text-align: center;"},
                {key : "description", subkey: null, type: "block", prefixValue: 'Description : ', postFixValue: '', ellipse : 'one line', style:''},
                {key : "image_url", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:'height: 300px;'},
                {key : "url", subkey: null, type: "newWindow",text: 'Visit Zomato Collection', prefixValue: '', postFixValue: '', style:'background-color: brown;'},
              ]},
          ];

          let payload = {
              data : data.collections,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '300px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("zomato collection template : \n", template);
          // console.log("@@@@  near by serach results are here \n\n", template);
          dummySocket.emit("query-response", { returnMsg : template, displayType : 'horizontalSlide'});
        })

      }

      return returnMsg;
}

var processIntents = function(resObj, intents){
    console.log("==calling the process intents function ===");

    var finalIntent = null;
    var returnMsg = '';
    // console.log("intent length :: ", intents.length);
    if(intents.length === 0){
      //==== PROCESS  NO  MATCHED INTENTS  ====
      processDefaultMsg(resObj.input.text);
      return '';
    }

    if(intents.length > 0){
      // ==== PROCESS  MATCHED INTENTS AND CHECK THE CONFIDENCE > 50 ====
      var maxConfidence = 0;
      for(var i=0; i<intents.length; i++){
         // maxConfidence = intents[i].confidence;
         if(intents[i].confidence > 50 && (intents[i].confidence > maxConfidence )){
           finalIntent = intents[i].intent;
         }
      }

      console.log("final intent :: ", finalIntent);
      if(finalIntent !== null){
        returnMsg = processMatchedIntents(resObj, finalIntent);
        console.log("intent response :: ", returnMsg);
      }else{
        WIKI_SEARCH_SERVICE.wikiSearch(resObj.input.text).then(function(wikiResult){
            console.log("wikiResult :: ", JSON.stringify(wikiResult));
            if(wikiResult.query.search.length > 0){
              let wikiTemplate = WIKI_SEARCH_SERVICE.createWikihResponseTemplate(wikiResult);
              dummySocket.emit("query-response", {returnMsg : wikiTemplate});
            }else{
              let defaultMsg = "I didn't get you properly. As I am groing day by day. Hopefully I can answer you very soon."
              dummySocket.emit("query-response", {returnMsg : defaultMsg});
            }

        })
      }

    }

    return returnMsg;

}
//======================================================================

//========================= [start]  maintaining the chat application flow ===========================

var changeResponse = {};
let activeUserList = [];
io.on('connection', function(socket){
  console.log('A user connected..........');
  dummySocket = socket;

  // console.log("### dummySocket :: \n\n", dummySocket);
  //=======================================================================



  // socket.on("sync-chat-container", function(data){
  //     //socket.emit("update-chat-container", {chatContainer : chatContainerData});
  //     socket.broadcast.emit("update-chat-container", {chatContainer : chatContainerData});
  // });

  // socket.on("show-welcome-msg", function(data){
  //     socket.emit("chat-container-status", {chatContainer : chatContainerData})
  // })

  // socket.on("send-updated-chat-container", function(data){
  //   chatContainerData = data.chatContainer;
  //   socket.broadcast.emit("update-chat-container", {chatContainer : chatContainerData});
  // });


  //============================  VIDEO CHAT USING PEERJS AND WEBRTC APIS ===========================================

  socket.on("join-room", (roomId, userId) => {
    console.log("============================ joined room with roomid : ", roomId);
    console.log("============================ joined room with userId : ", userId);

    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", {userId: userId});
  });

  //========================================================================


  socket.on("query-request", function(data){
     var returnMsg = '';
     console.log("in server the query msg is  :: ", data.query);
     if(data.locationObj !== null && data.locationObj !== undefined){
        userCurrentLocationObj = data.locationObj;
     }
     let filterBadWord = BADWORD_API_SERVICE.filterBadWord(data.query);
     if(!filterBadWord){
       var AIREsponse = AIEngine.processQuery(data.query);
       returnMsg = processIntents(AIREsponse, AIREsponse.intents);
       // console.log("process intents result :: ", returnMsg);
       socket.emit("query-response", {returnMsg : returnMsg});
     }else{
        console.log("===== filtering the bad words =====");
        socket.emit("query-response", {returnMsg : filterBadWord, isBadWord: true});
     }
  });

  socket.on("change-email-request", function(data){
       changeResponse = data.changeResponse;

  });

  socket.on('fetch-active-users', function(data){
      console.log("send active users :: ", activeUsers);
      socket.emit('fetch-active-users-response', {activeUsers : activeUsers})
  })

  socket.on('fetched-current-location', function(data){
      // console.log("latitude : ", data.latitude);
      // console.log("longitude : ", data.longitude);
      let location = {
          latitude : data.latitude,
          longitude: data.longitude
      }
      CURRENT_LOCATION_OBJ.lat = data.location;
      CURRENT_LOCATION_OBJ.lon = data.longitude;
      CURRENT_LOCATION = data.latitude+','+data.longitude;
      console.log("current.location : ", location);
      GOOGLE_SERVICE.setUserCurrentLocation(location);
  })

  socket.on("send-gini-email", function(data){
      // console.log("mail object :: ", data.mailObject);
      EMAIL_SERVICE.sendEmail(data.mailObject).then(function(data){
          let emailSuccessResponse = '<div>You have successfully send the email.</div>'
          if(data){
            dummySocket.emit("query-response", {returnMsg : emailSuccessResponse, email: true});
          }
      });

  })


  // socket.on('fetched-current-location', function(data){
  //     console.log("latitude : ", data.latitude);
  //     console.log("longitude : ", data.longitude);
  //     let latlong = 'latitude : '+' '+data.latitude+'<br>'+'laongitude : '+data.longitude;
  //
  //     var latlon = data.latitude + "," + data.longitude;
  //     var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
  //     +latlon+"&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
  //     // var mapImg = "<img src='"+img_url+"' style='height'>";
  //     console.log("imgurl : ", img_url);
  //     // var mapImg = `
  //     //     <div style="background-color: white; padding: 5px; ">
  //     //       <p style="color: grey;">This is your current location.</p>
  //     //       <a href=`+img_url+` target="_blank">
  //     //         <img src=`+img_url+` style="width: 265px; height: 200px;">
  //     //       </a>
  //     //     </div>
  //     // `;
  //     var mapImg = `
  //         <div style="background-color: white; padding: 5px; ">
  //             <img src=`+img_url+` style="width: 265px; height: 200px;">
  //         </div>
  //     `;
  //     console.log("mapimg : ", mapImg);
  //
  //     socket.emit("query-response", {returnMsg : mapImg});
  // })

  var sucessfullEmailChangeResponse = function(data){
    var returnMsg = `
            you have changed your email id sucessfully.<br>
            with this below information <br>
      `;
      for(var i=0; i<data.emailChangeOptions.length; i++){
          returnMsg += data.emailChangeOptions[i].name+'  :  '+data.emailChangeOptions[i].value+' <br> ';
      }

      returnMsg += `
          <br>
          your changed email id is : somedomain@gmail.company
          <br';ber-'      `;
      return returnMsg;
  }

  var startDateUpdateResponse = function(email, startDate){
    var returnMsg =  updatedStartDateResponse(email, startDate);
    dummySocket.emit('email-change-request-response', {returnMsg : returnMsg});
  }

  var updatedStartDateResponse = function(email, startDate){
  returnMsg = `
      <h6 style="color: white;">YOU HAVE SUCESSFULLY UPDATE THE START DATE</h6><br><br>
      <h6>Here are the updated information</h6><br>
      NAME : Rajib karmakar<br>
      EMAIL : `+email+` <br>
      TYPE : Contract Employee<br>
      START DATE: `+startDate+`
  `;
   return returnMsg;
}

  var createJiveInfo = function(data){

    var returnMsg = '';
    var startDate = '';
    for(var i=0; i<data.jive.profile.length; i++){
       if(data.jive.profile[i].jive_label === "StartDate"){
          startDate = data.jive.profile[i].value;
       }
    }
    returnMsg = `
        <h6>HERE ARE THE INFORMATION THAT I HAVE FOUND</h6>
        NAME : `+data.displayName+`<br>
        EMAIL : `+data.emails[0].value+`<br>
        TYPE : `+data.emails[0].type+`<br>
        START DATE: `+startDate+`
    `;
     return returnMsg;
  }

  socket.on("email-change-request-data", function(data){
      console.log("email change request data : ", data.emailChangeOptions);
      console.log("change request : ", data.changeRequest);

      var returnMsg = '';
      if(data.changeRequest.requestTopic === 'email'){
           returnMsg = sucessfullEmailChangeResponse(data);
      }else if(data.changeRequest.requestTopic === 'start date'){
           var email = data.emailChangeOptions[0].value;
           var startDate = data.emailChangeOptions[1].value;
           startDateUpdateResponse(email, startDate);
      }else if(data.changeRequest.requestTopic === 'show jive info'){
           console.log("========== show jive info =======")
           var email = data.emailChangeOptions[0].value;
           pwcApiDataByEmail(email).then(function(data){
            var returnMsg = null;
            data = JSON.parse(data);
               console.log("jive response by email  :: ", data);
               if(data.error){
                  console.log("error: ", data.error.message);
                  returnMsg = '<h6>HERE ARE THE INFORMATION THAT I HAVE FOUND</h6><br>';
                  returnMsg += data.error.message;
               }else{
                  returnMsg = createJiveInfo(data);
               }

               console.log("====jive info returnMsg : ", returnMsg);
               socket.emit('email-change-request-response', {returnMsg : returnMsg});
           });
      }

      data.changeRequest.requestTopic = null;
      changeRequest = data.changeRequest;
      socket.emit('email-change-request-response', {returnMsg : returnMsg});

  })

  //************************* new AI section **********************************


  socket.on("gini-request-ai-data", function(data){
      socket.emit("gini-response-ai-data", {data : AIPreviewJsonData})
  })

  socket.on('gini-request-ai-engine-processing', (request) => {
      if(request.category === "delete_intent" || request.category === "delete_entity"){
          let updated_AI_data = AI_ENGINE_PROCESSING_SERVICE.aiEngineProcessing(request);
          let type = request.category.split("_")[1];
          socket.emit("gini-response-ai-data", {data : updated_AI_data, type: type})
      }else{
        AI_ENGINE_PROCESSING_SERVICE.aiEngineProcessing(request);
      }

  });



  //*************************   AI PREVIEW PROCESSING SECTION   ********************************

  socket.on("fetch-ai-preview-init-data", function(data){
      socket.emit("ai-preview-init-data-response", {data : AIPreviewJsonData})
  })



  socket.on("save-edited-intent", function(data){
      console.log("updated ai intent :: ", data);
      AIEngine.updateAIIntent(data);
  })

  socket.on("save-edited-entity", function(data){
      AIEngine.updateAIEntity(data);
  })

  socket.on("save-new-intent", function(data){
    AIEngine.addNewAIIntentExp(data);
  })

  socket.on("delete-intent-exp", function(data){
    AIEngine.deleteIntentExp(data);
  })

  socket.on("add-new-intent", function(data){
    AIEngine.addNewAIIntent(data);
  })

  socket.on("add-new-synonym", function(data){
    AIEngine.addNewAISynonym(data);
  })

  socket.on("delete-entity-synonym", function(data){
      AIEngine.deleteAIEntitySynonym(data);
  })
  //********************************************************************************************
  // console.log("path : ", path.resolve());
      const saveImagePath = path.resolve()+'/public/images/camera';
  // console.log("saveImagePath :: ", saveImagePath);

      socket.on("send-image-data", function(data){
      console.log("=================== send-image-data successfully =================");
      var d = new Date();
      // const timestamp = d.getDay()+":"+d.getMonth()+":"+d.getFullYear()+":"+d.getHours()+":"+d.getMinutes();
      var timestamp = Math.round(+new Date()/1000);

      var data = data.imgData.replace(/^data:image\/\w+;base64,/, "");
      var buf = new Buffer(data, 'base64');
      const imgPathName = saveImagePath+'/'+timestamp+'@camera.jpeg';
      console.log("imgPathName :: ", imgPathName);
      fs.writeFile(imgPathName, buf, function(err){
          if(err){
              console.log("=== error occured when saving the image to camera folder ===");
              throw err;
          }else{
              console.log("=== camera image saved successfully ===");
          }

      });

  })


// ===================== START : SAVING AND FETCHING DATA FROM NEDB DATABSE  =======================
      socket.on("init-fetch-files", function(data){
      dummySocket.emit("fetch-files", {files : savedFilesContent});
      // DB.userFiles.find({}, )
      DB.userFiles.find({ }, function (err, result) {
      // docs is an array containing documents Mars, Earth, Jupiter
      // If no document is found, docs is equal to []
      console.log("==== calling : function : socket : init-fetch-files : server.js ====");
      // console.log("result files : ", result);
      dummySocket.emit("fetch-files", {files : result});
      });
      // DB.fetch();
  });

      socket.on('save-js-file', function(data){
      let tempFileContent = {};
      savedFileIdCount += 1;
      tempFileContent.id = savedFileIdCount;
      // console.log("\n\ntype of js file :: ", typeof(data.file));
      let fileContent = data.file.content.replace("\n", '');
      // let str = data.file.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
      // console.log("\n\nafter replace \n\n", str);
      tempFileContent.name = data.file.name;
      tempFileContent.content = fileContent;
      tempFileContent.desc = data.file.desc;
      savedFilesContent.push(tempFileContent);

      // insert the data into nedb database
      // store data in nedb
      DB.insert(tempFileContent)


  })

  // ===================== END:  SAVING AND FETCHING DATA FROM NEDB DATABSE  =======================



  // ===================== START : NEWS API  IMPLEMENTATION  =======================

      socket.on("sound-cloud-api-request", (response) => {
        console.log("======== call sound cloud api request ==========");
        let soundCloudApiUrl = "https://api.mixcloud.com/popular/";
        let template = '';
        HERE_MAP_API_SERVICE.hereMapApiProcessing(soundCloudApiUrl).then(function(data){
            // console.log("sound cloud  api response : ", JSON.stringify(data));

            data.data.forEach((item) => {
                // console.log("item : ", item);
                if(item.user.pictures.extra_large !== undefined || item.user.pictures.extra_large !== null){
                    item.user.imgUrl = item.user.pictures.extra_large;
                }
                // console.log("@@@sound cloud updated data : ", item);
            })
            let argList = [
                {key : "user", subkey: [
                    {key : 'username', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 16px; text-align: center; color: brown;'},
                    {key : 'name', subkey: null, type: 'block', prefixValue: 'cuisines : ', postFixValue: '', ellipse : 'one line', style: ''},
                    {key : "url", subkey: null, type: "newWindow",  text: 'Open In Sound Cloud', btnName : 'More Details', style:'margin-top: 10px; background-color: black;'},
                    {key : "imgUrl", subkey: null, type: "image", prefixValue: '', postFixValue: '', style:'height: 250px; width: 290px;'},
                ]},

            ];
            // console.log("data.data[0].user.username : ", data.data[0].user.username);
            let payload = {
                data : data.data,
                argList : argList,
                style : {
                  imgPos : 'top',
                  textAlign : 'left',
                  hScroll: "hScroll",
                  backgroundColor : null,
                  height : null,
                  width : null,
                  padding: null,
                  fontSize: null,
                  defaults : {
                      backgroundColor : 'white',
                      textAlign : 'center',
                      height: 'auto',
                      width : '300px',
                      color: 'grey',
                      fontSize : '13px',
                      padding: '5px 5px',
                      margin : '5px 2px',
                      devider : '0px solid grey',
                      coverPadding : '5px',
                      border: " 1px solid whitesmoke",
                      descriptionTemplateStyle : 'background-color: whitesmoke;'

                  }
                },
                emptySlide : 'no'
            };
            // let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
            if(data.data.length && response.from === "Api"){
              console.log("6666666666666666666666666666666666666666666666666");
               template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
               // console.log("\n\n@@@@ sound cloud api template : \n", template);
               socket.emit("sound-cloud-api-response", { returnMsg : template});
            }else if(data.data.length && response.from === "Gini"){
               console.log("777777777777777777777777777777777777777777");
               template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
               socket.emit("query-response", { returnMsg : template, displayType : 'horizontalSlide'});

            }else{

            }
        })

      })


      // =====================================================================================================================

      var newsPodcasts = {};

      socket.on("request-one-minute-news-podcasts", function(response){

          console.log("==== callig one minute news podcasts category : ", response.category);
          let podcastData = newsPodcasts[response.category];
          console.log("podcastData : ", podcastData);
          socket.emit("response-one-minute-news-podcasts", { podcastData : podcastData })

      });

      socket.on("news-api-request", function(response){
          // console.log("DUMMY_NEWS_DATA.newsApiResponse : \n", DUMMY_NEWS_DATA.newsApiResponse);
          // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

          console.log("================ CALLING NEWS API REQUEST ================");
          let currentsDefaultNewsTemplateArgList = [
            {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line',  style: "color: black; font-weight: 700; font-size: 16px; text-align: center;"},
            {key : "description", subkey: null, type: "block", prefixValue: 'Description : ', sharedObj : 'text', postFixValue: '', ellipse : 'one line', style:''},
            {key : "image", subkey: null, type: "image", api: 'CURRETSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['CURRETSAPI:newsByCategory'] }, style:'width: 350px; height: 250px; border: none;'},
            {key : "published", subkey: null, type: "block", prefixValue: 'Published At : ', postFixValue: '', ellipse : 'one line', style:''},
            {key : '', subkey: null, type: 'customThreeDots', style: 'display: inline-block; color: red; transform: rotate(90deg); font-size: 20px; float: right; color: black; position: relative; top: 16px; right: -10px;'},
            {key : 'author', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: grey; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
            {key : 'author', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : '',  onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] }, style: 'font-size: 16px; color: brown; display: inline-block; margin-left: 12px; width: 65%; word-break: break-all;'},
            {key : 'title', subkey: null, type: 'textToSpeech', charCutOff: 2, charCutOffDirection: 'start',  style: 'float: right; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},

          ];
          let defaultNewsTemplateArgList = [
              {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line',  style: "color: black; font-weight: 700; font-size: 16px; text-align: center;"},
              {key : "description", subkey: null, type: "block", prefixValue: 'Description : ', sharedObj : 'text', postFixValue: '', ellipse : 'one line', style:''},
              // {key : "content", subkey: null, type: "block", prefixValue: 'content : ', postFixValue: '', ellipse : 'one line', style:''},
              {key : "publishedAt", subkey: null, type: "block", prefixValue: 'Published At : ', postFixValue: '', ellipse : 'one line', style:''},
              // {key : "urlToImage", subkey: null, type: "image", style:'width: 350px; height: 200px;'},

              // {key : "urlToImage", subkey: null, type: "image", api: 'NEWSAPI:newsByCategory', onclick: {methodName: 'getBooksPreview', params: ['ia'], defaults: ['NEWSAPI:newsByCategory'] },  style:'width: 350px; height: 200px; border: none;'},
              {key : "urlToImage", subkey: null, type: "image", api: 'NEWSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['NEWSAPI:newsByCategory'] }, style:'width: 350px; height: 250px; border: none;'},

              // {key : "", subkey: null, type: "button", btnName: 'Add to shelf', onclick: {methodName: 'onClickButtonAction', params: ['url'], defaults: ['NEWS', 'new_window'] },  style: 'background-color: black; color: white; inline-block; width: 50%;'},
              {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', style: "color: black; font-weight: 700; font-size: 16px; text-align: center; "},
              {key : "source", subkey: [
                // onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] },
                  {key : 'name', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: grey; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
                  {key : 'name', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : '',  onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] }, style: 'font-size: 16px; color: brown; display: inline-block; margin-left: 12px;'},
              ]},
              {key : '', subkey: null, type: 'customThreeDots', style: 'display: inline-block; color: red; transform: rotate(90deg); font-size: 20px; float: right; color: black; position: relative; top: 16px; right: -10px;'},
              {key : 'title', subkey: null, type: 'textToSpeech', charCutOff: 2, charCutOffDirection: 'start',  style: 'float: right; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},

          ];
          let defaultNewsSourcesTemplateArgList = [
              {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', api: 'NEWSAPI:newsBySource', onclick : undefined, style: "color: black; font-weight: 700; font-size: 18px; text-align: center;"},
              {key : "description", subkey: null, type: "block", prefixValue: 'Description : ', sharedObj : 'text', postFixValue: '', ellipse : 'one line', style:''},
              {key : "category", subkey: null, type: "block", prefixValue: 'Category : ', postFixValue: '', ellipse : 'one line', style:''},
              {key : "language", subkey: null, type: "block", prefixValue: 'Language : ', postFixValue: '', ellipse : 'one line', style:''},
              {key : "country", subkey: null, type: "block", prefixValue: 'Country : ', postFixValue: '', ellipse : 'one line', style:''},
              {key : 'name', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: grey; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
              {key : 'name', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : '',  onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] }, style: 'font-size: 16px; color: brown; display: inline-block; margin-left: 12px; width: 65%; word-break: break-all;'},
              // {key : 'title', subkey: null, type: 'textToSpeech', charCutOff: 2, charCutOffDirection: 'start',  style: 'float: right; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},

          ];

          let defaultWikipediaSearchTemplateArgList = [
              {key : "urlToImage", subkey: null, type: "image", api: 'wikipedia_search', onclick: {methodName: 'getNewsByCustomFilter', params: ['title'], defaults: ['wikipedia_search'] }, style:'width: 100%; height: 250px; border: none;'},
              {key : "title", subkey: null, type: "block", api: 'wikipedia_search', prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', api: 'NEWSAPI:newsBySource',  style: "color: black; font-weight: 700; font-size: 18px; text-align: center;"},
              {key : "snippet", subkey: null, type: "block", api: 'wikipedia_search', prefixValue: 'Description: ', sharedObj : 'text', postFixValue: '', ellipse : 'none', style:''},
              {key : "timestamp", subkey: null, type: "block", api: 'wikipedia_search', prefixValue: 'Time: ', sharedObj : 'text', postFixValue: '', ellipse : 'one line', style:''},
              {key : 'wiki', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: grey; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
              {key : 'wiki', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : '', onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] }, style: 'font-size: 16px; color: brown; display: inline-block; margin-left: 12px;'},
              {key : '', subkey: null, type: 'customThreeDots', style: 'display: inline-block; color: red; transform: rotate(90deg); font-size: 20px; float: right; color: black; position: relative; top: 16px; right: -10px;'},
              {key : 'title', subkey: null, type: 'textToSpeech', charCutOff: 2, charCutOffDirection: 'start',  style: 'float: right; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},

          ];

          let countryTemplateArgList = [
              {key : "imgUrl", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', onclick: {methodName: 'getNewsByCustomFilter', params: ['countryCode'], defaults: ['NEWSAPI:country'] }, style:'width: 200px; height: 125px; display: inline-block;'},
              {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 700; font-size: 14px; text-align: center; position: relative; top: -24px;"},

          ];
          let languageTemplateArgList = [
              {key : "imgUrl", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', onclick: {methodName: 'getNewsByCustomFilter', params: ['name'], defaults: ['NEWSAPI:language'] }, style:'width: 200px; height: 125px;'},
              {key : "language", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line',  style: "color: grey; font-weight: 700; font-size: 14px; text-align: center; position: relative; top: -24px;"},

          ];

          let currentsNewsCategoryTemplateArgList = [
              {key : "urlToImage", subkey: null, type: "image", api: 'NEWSAPI:newsByCategory', onclick: {methodName: 'getNewsByCustomFilter', params: ['category'], defaults: ['NEWSAPI:newsByCategory'] }, style:'width: 175px; height: 65px; border: none;'},

              // {key : "imgUrl", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:'width: 200px; height: 125px;'},
              {key : "category", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 700; font-size: 14px; text-align: center; display: inline-block; position: relative; top: -2px; text-transform: uppercase;"},

          ];

          let argList = null;
          let newsApiURL = '';
          let finalData = null;
          if(response.category === 'sources'){
            newsApiURL = 'https://newsapi.org/v2/sources?apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
            argList = defaultNewsSourcesTemplateArgList;
          }else if(response.category === 'englisg news sources'){
            newsApiURL = 'https://newsapi.org/v2/sources?language=en&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
            argList = defaultNewsSourcesTemplateArgList;
          }else if(response.category === 'Indian englisg news sources'){
            newsApiURL = 'https://newsapi.org/v2/sources?language=en&country=in&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
            argList = defaultNewsSourcesTemplateArgList;
          }else if(response.category === 'all news'){
            newsApiURL = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
            argList = defaultNewsTemplateArgList;
          }else if(response.category === 'journal'){
            newsApiURL = 'http://newsapi.org/v2/everything?domains='+response.journalName+'&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
            argList = defaultNewsTemplateArgList;
          }else if(response.category === 'country'){
            newsApiURL = null;
            argList = countryTemplateArgList;
          }else if(response.category === 'news language'){
            newsApiURL = null;
            argList = languageTemplateArgList;
          }else if(response.category === 'currents api news category'){
            newsApiURL = null;
            argList = currentsNewsCategoryTemplateArgList;
          }else if(response.category === 'customSearch'){
            newsApiURL = 'https://newsapi.org/v2/everything?q='+response.searchQuery+'&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
            argList = defaultNewsTemplateArgList;
          }else if(response.category === 'news_by_filter'){
            if(response.filterBy === "NEWSAPI:country"){
                console.log("@@@@@@ response.searchQuery: ", response.searchQuery);
                newsApiURL = 'http://newsapi.org/v2/top-headlines?country='+response.searchQuery+'&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
                argList = defaultNewsTemplateArgList;
            }else if(response.filterBy === "NEWSAPI:language"){
                console.log("@@@@@@ response.searchQuery: ", response.searchQuery);
                newsApiURL = 'http://newsapi.org/v2/top-headlines?language='+response.searchQuery+'&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
                argList = defaultNewsTemplateArgList;
            }else if(response.filterBy === "NEWSAPI:newsByCategory"){
                newsApiURL = 'https://newsapi.org/v2/top-headlines?category='+response.searchQuery+'&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
                argList = defaultNewsTemplateArgList;
            }else if(response.filterBy === "NEWSAPI:newsBySource"){
                newsApiURL = 'https://newsapi.org/v2/top-headlines?sources='+response.searchQuery+'&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
                argList = defaultNewsTemplateArgList;
            }else if(response.filterBy ===  "wikipedia_search"){
                console.log("=== wikipedisa search server side ===");
                // console.log("%%% response.searchQuery : ", response.searchQuery);
                newsApiURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch='+response.searchQuery;
                argList = defaultWikipediaSearchTemplateArgList;

            }

          }else if(response.category === 'currents-latest-news'){
            newsApiURL = 'https://api.currentsapi.services/v1/latest-news?&regions=IN&language=en&apiKey=2FbMfIxy7UHyAOTt3KlqY38VC7aUSS5XbsZvUWWxMZnjRnJf';
            argList = currentsDefaultNewsTemplateArgList;
          }else if(response.category === 'programming'){
            newsApiURL = 'https://api.currentsapi.services/v1/search?category=programming&regions=IN&language=en&apiKey=2FbMfIxy7UHyAOTt3KlqY38VC7aUSS5XbsZvUWWxMZnjRnJf';
            argList = currentsDefaultNewsTemplateArgList;
          }else if(response.apiRef !== null && response.apiRef !== undefined && response.apiRef === 'currents-api'){
              newsApiURL = 'https://api.currentsapi.services/v1/search?category='+response.category+'&regions=IN&language=en&apiKey=2FbMfIxy7UHyAOTt3KlqY38VC7aUSS5XbsZvUWWxMZnjRnJf';
              argList = currentsDefaultNewsTemplateArgList;
          }
          // else if(response.category === 'travel' || response.category === 'auto' || response.category === 'music' || response.category === 'Politics' ||  response.category === 'environment' || response.category === 'mobile' || response.category === 'gadgets' || response.category === 'television' || response.category === 'movie' || response.category === 'entrepreneur' || response.category === 'education'){
          //   newsApiURL = 'https://api.currentsapi.services/v1/search?category='+response.category+'&regions=IN&language=en&apiKey=2FbMfIxy7UHyAOTt3KlqY38VC7aUSS5XbsZvUWWxMZnjRnJf';
          //   argList = currentsDefaultNewsTemplateArgList;
          // }
          else{
            newsApiURL = 'https://newsapi.org/v2/top-headlines?country='+response.country+'&category='+response.category+'&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
            argList = defaultNewsTemplateArgList;
          }

          HERE_MAP_API_SERVICE.hereMapApiProcessing(newsApiURL).then(function(data){
              // console.log("news api response \n: ", data);

              if(response.category === 'sources' || response.category === 'englisg news sources' || response.category === 'Indian englisg news sources'){

                finalData = data.sources;
              }else if(data === "SERVER_SIDE_DATA" && response.category === 'country'){
                finalData = DUMMY_QUIZ_DATA.GLOBAL_COUNTRY_LIST;
              }else if(data === "SERVER_SIDE_DATA" && response.category === 'news language'){
                finalData = DUMMY_QUIZ_DATA.NEWS_SOURCE_LANGUAGE_LIST;
              }else if(data === "SERVER_SIDE_DATA" && response.category === 'currents api news category'){
                finalData = DUMMY_QUIZ_DATA.CURRENTS_API_NEWS_CATEGORIES_LIST;
              }else if(response.apiRef !== null && response.apiRef !== undefined && response.apiRef === 'currents-api'){
                  finalData = data.news;
              }else{
                finalData = data.articles;
              }


              if(response.filterBy === "wikipedia_search"){
                  finalData = data.query.search;
                  // console.log("%%% final data :", finalData );
              }

              // console.log("@@@ final data: ", finalData);



              if(finalData !== null && finalData !== undefined && response.category !== 'country'){
                  let podcastTitleArr = [];
                  finalData.forEach((item) => {
                        if(item.urlToImage === null || item.urlToImage === undefined){
                              if(response.filterBy === 'wikipedia_search'){
                                // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                                item.urlToImage = 'static/images/wikipedia.jpg';
                                item.wiki = "Wikipedia";
                                // item.url = "https://en.wikipedia.org/wiki/Main_Page";
                                item.url = "www.wikipedia.com";
                              }else{
                                item.urlToImage = 'static/images/news.jpg';
                              }
                        }
                        if(item.title !== null && item.title !== undefined){
                            podcastTitleArr.push(item.title);
                        }
                        item.customType = "newWindow";
                  })
                  // newsPodcasts[response.category] = podcast;
                  newsPodcasts[response.category] = podcastTitleArr;

              }



              if(finalData !== null && finalData !== undefined && (response.apiRef === 'currents-api')){
                // response.category === 'currents-latest-news' || response.category === 'auto' || response.category === 'programming' || response.category === 'Politics' || response.category === 'environment' || response.category === 'travel' || response.category === 'music' || response.category === 'mobile' || response.category === 'gadgets' || response.category === 'television' || response.category === 'movie' || response.category === 'entrepreneur' || response.category === 'education'
                  let podcastTitleArr = [];

                  finalData.forEach((item) => {
                        if(item.image === null || item.image === "None" || item.image === undefined || item.image === "undefined"){
                              item.image = 'static/images/news.jpg';
                        }
                        if(item.title !== null && item.title !== undefined){
                            podcastTitleArr.push(item.title);

                        }
                        item.customType = "newWindow";
                  })
                  // newsPodcasts[response.category] = podcast;
                  newsPodcasts[response.category] = podcastTitleArr;


              }

              // console.log("$$$ final data: ", finalData);

              // console.log("$$$$$$$$$$$$$$$$$ newsPodcasts : ", newsPodcasts);
              var payload = {
                  data : finalData,
                  argList : argList,
                  style : {
                    imgPos : 'top',
                    textAlign : 'left',
                    hScroll: "hScroll",
                    backgroundColor : null,
                    height : null,
                    width : null,
                    padding: null,
                    fontSize: null,
                    defaults : {
                        backgroundColor : 'white',
                        textAlign : 'center',
                        height: 'auto',
                        width : '350px',
                        color: 'grey',
                        fontSize : '13px',
                        padding: '',
                        margin : '5px 3px',
                        devider : '0px solid grey',
                        coverPadding : '5px',
                        border: "",
                        descriptionTemplateStyle : 'border: none;'

                    }
                  },
                  emptySlide : 'no'
              };
              if(response.scroll !== null && response.scroll !== undefined && response.scroll === 'vertical' && response.category !== "currents-latest-news" && response.filterBy !== "wikipedia_search"){
                  // let modifiedImgObj = {key : "urlToImage", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:'height: 250px;'};

                  let modifiedImgObj = {};
                  let titleObj = {};
                  let descObj = {};
                  let contentObj = {};
                  if(response.category === "currents-latest-news" ){
                      modifiedImgObj = {key : "image", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : '', api: 'NEWSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['NEWSAPI:newsByCategory'] }, style:'height: 250px; width: 100%;'};

                  }else{
                      modifiedImgObj = {key : "urlToImage", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : '', api: 'CURRETSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['title', 'customType'], defaults: ['CURRETSAPI:newsByCategory'] }, style:'height: 250px;'};
                      titleObj = {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'none',  style: "color: black; font-weight: 700; font-size: 16px; text-align: center;"};
                      descObj = {key : "description", subkey: null, type: "block", prefixValue: 'Description : ', sharedObj : 'text', postFixValue: '', ellipse : 'none', style:'font-size: 15px; margin-top: 5px;'};
                      contentObj = {key : "content", subkey: null, type: "block", prefixValue: 'content : ', postFixValue: '', ellipse : 'none', style:'font-size: 15px; margin-top: 5px;'};

                  }

                  payload.style.defaults.width = '';
                  payload.style.defaults.margin = '12px 0px';
                  payload.style.defaults.marginBottom = '1rem';
                  payload.style.defaults.borderBottom = '8px solid #ccc';


                  if(response.category !== 'sources' || response.category !== 'englisg news sources' || response.category !== 'Indian englisg news sources' || response.category !== 'currents-latest-news'){
                      payload.argList[0] = titleObj;
                      payload.argList[1] = descObj;
                      payload.argList[2] = contentObj;
                      payload.argList[4] = modifiedImgObj;
                  }

              }
              if((response.apiRef === 'currents-api') && response.scroll === 'vertical'){
                // response.category === 'currents-latest-news' || response.category === 'Politics' || response.category === 'auto' || response.category === 'programming' || response.category === 'environment' || response.category === 'travel' || response.category === 'music' || response.category === 'mobile' || response.category === 'gadgets' || response.category === 'television' || response.category === 'movie' || response.category === 'entrepreneur' || response.category === 'education'
                  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                  payload.argList[0] = {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'none', style: "color: black; font-weight: 700; font-size: 18px; text-align: center;"},
                  payload.argList[1] = {key : "description", subkey: null, type: "block", prefixValue: 'Description : ', sharedObj : 'text', postFixValue: '', ellipse : 'none', style:''},
                  payload.argList[2] = {key : "image", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : '', api: 'NEWSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['NEWSAPI:newsByCategory'] }, style:'height: 250px; width: 100%;'};
                  payload.style.defaults.width = 'auto';
              }

              if(response.category === 'country' || response.category === "news language" || response.category === 'currents api news category'){
                  payload.style.defaults.width = '200px';
                  payload.style.defaults.margin = '2px 0px';
                  if(response.category === 'currents api news category'){
                    payload.style.defaults.borderRight = '1 px solid #ccc;';
                    payload.style.textAlign = 'center';
                    payload.style.defaults.width = "180px;"

                  }
              }

              if(response.filterBy !== null && response.filterBy !== undefined && response.filterBy === "wikipedia_search"){
                //  let modifiedImgObj = {key : "urlToImage", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : '', api: 'CURRETSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['title', 'customType'], defaults: ['CURRETSAPI:newsByCategory'] }, style:'height: 250px;'};
                //  let titleObj = {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'none',  style: "color: black; font-weight: 700; font-size: 16px; text-align: center;"};
                  payload.style.defaults.width = '';
                  payload.style.defaults.margin = '12px 0px';
                  payload.style.defaults.marginBottom = '1rem';
                  payload.style.defaults.borderBottom = '8px solid #ccc';
                  //payload.argList[0] = modifiedImgObj;
                  //payload.argList[1] = titleObj;
              }

              let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
              // console.log("geerated teplate \n: ", template);
              if(finalData.length && response.from === "Api"){
                // console.log("6666666666666666666666666666666666666666666666666");
                 // template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
                 // console.log("\n\n@@@@ sound cloud api template : \n", template);
                 socket.emit("news-api-response", { returnMsg : template, resposeTeplateId: response.resposeTeplateId, loaderId: response.loaderId});
              }else if(finalData.length && response.from === "Gini"){
                 // console.log("777777777777777777777777777777777777777777");
                 template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
                 socket.emit("query-response", { returnMsg : template, displayType : 'horizontalSlide'});

              }else{
                teplate = "OOps I am unable to fetch any thing from web. Try after some time";
                socket.emit("query-response", { returnMsg : template, displayType : 'horizontalSlide'});

              }
          })

      })

      // ===================== END : NEWS  API  IMPLEMENTATION  =======================

      // ===================== END : HERE MAP  API  IMPLEMENTATION  =======================

      // 8013115959

      socket.on("here-map-api-request", function(data){
          // console.log("DUMMY_NEWS_DATA.newsApiResponse : \n", DUMMY_NEWS_DATA.hereMapApiProcessing);
          console.log("================ CALLING HERE MAP API REQUEST ================");
          console.log("places cat : ", data.placesCategory);
          let placeCat = "restaurant";
          let template = '';
          if(data.placesCategory === undefined){

          }else{
              placeCat = data.placesCategory;
          }
          // let hereMapApiUrl = 'https://places.demo.api.here.com/places/v1/discover/explore?in='+CURRENT_LOCATION+'%3Br%3D1000&cat='+placeCat+'&drilldown=true&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw';
          let hereMapApiUrl = "https://places.demo.api.here.com/places/v1/discover/search?at="+CURRENT_LOCATION+"&q="+placeCat+"&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg";
          HERE_MAP_API_SERVICE.hereMapApiProcessing(hereMapApiUrl).then(function(data){
              // console.log("here map api response : ", JSON.stringify(data));
              let argList = [
                  // {key : "category", subkey: [{key : "title", type : "block", prefixValue: 'Category', postFixValue: '', ellipse : 'one line', style: "color: grey; font-size: 16px; text-align: left;"}]},
                  {key : "title", subkey: null, type: "block", sharedObj : 'title', prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
                  {key : "distance", subkey: null, type: "block", prefixValue: 'Distance : ', postFixValue: '', ellipse : 'one line', style:''},
                  {key : "vicinity", subkey: null, type: "block", sharedObj : 'text', prefixValue: 'Vicinity : ', postFixValue: '', ellipse : 'one line', style:''},
                  {key : "icon", subkey: null, type: "image", prefixValue: '', postFixValue: '', style:'height: 200px;'},
                  {key : "href", subkey: null, type: "openModalWithContent", sharedObj : 'url', shareBtn: {title: '', text: '', url: ''}, appendKey: null, api: 'hereMapApi', btnName : 'More Details', style:'background-color: black;'},
              ];

              let payload = {
                  data : data.results.items,
                  argList : argList,
                  style : {
                    imgPos : 'top',
                    textAlign : 'left',
                    hScroll: "hScroll",
                    backgroundColor : null,
                    height : null,
                    width : null,
                    padding: null,
                    fontSize: null,
                    defaults : {
                        backgroundColor : 'white',
                        textAlign : 'center',
                        height: 'auto',
                        width : '300px',
                        color: 'grey',
                        fontSize : '13px',
                        padding: '5px 5px',
                        margin : '5px 2px',
                        devider : '0px solid grey',
                        coverPadding : '5px',
                        border: "",
                        descriptionTemplateStyle : 'background-color: whitesmoke;'

                    }
                  },
                  emptySlide : 'no'
              };
              // let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
              if(data.results.items.length){
                 template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
                 socket.emit("query-response", { returnMsg : template, displayType : 'horizontalSlide'});
              }else{
                 template = 'Oops, something went wrong. <br> I did not find out any near by <strong>'+placeCat+'</strong>';
                 socket.emit("query-response", { returnMsg : template});

              }
          })


      })

      socket.on("open-modal-with-content-request", function(data){
          // console.log("open modal with content : ", data.url);
          // console.log("open modal with api  : ", data.api);
          console.log("======================================================================================================");
          if(data.api === 'hereMapApi'){
            HERE_MAP_API_SERVICE.hereMapApiProcessing(data.url).then(function(data){
            // console.log("!!! api response data :: ", data);
            // console.log("open modal with content response : ", JSON.stringify(data));
                let argList = [
                    {key : "name", subkey: null, type: "block", sharedObj: 'title', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'text-align:center; font-size: 16px; color: orange;'},
                    {key : "location", subkey: { key : "address", subkey : [
                        {key : 'text', subkey: null, type: 'block',  prefixValue: 'Text : ', postFixValue: '', ellipse : 'one line', style: ''},
                        {key : 'street', subkey: null, type: 'block', sharedObj: 'text', prefixValue: 'Street : ', postFixValue: '', ellipse : 'one line', style: ''},
                        {key : 'postalCode', subkey: null, type: 'block', prefixVPlue: 'Postal Code : ', postFixValue: '', ellipse : 'one line', style: ''},
                        {key : 'district', subkey: null, type: 'block', prefixValue: 'District : ', postFixValue: '', ellipse : 'one line', style: ''},
                        {key : 'city', subkey: null, type: 'block', prefixValue: 'City : ', postFixValue: '', ellipse : 'one line', style: ''},
                        {key : 'county', subkey: null, type: 'block', prefixValue: 'County : ', postFixValue: '', ellipse : 'one line', style: ''},
                        {key : 'state', subkey: null, type: 'block', prefixValue: 'State : ', postFixValue: '', ellipse : 'one line', style: ''},
                        {key : 'country', subkey: null, type: 'block', prefixValue: 'Country : ', postFixValue: '', ellipse : 'one line', style: ''},
                    ]
                      }
                    },
                    {key : 'contacts', subkey: {key : "phone", subkey : [
                    {key : 'value', subkey: null, type: 'block', prefixValue: 'phone : ', postFixValue: '', ellipse : 'one line', style: ''},
                    ]
                   }
                  },
                  {key : 'contacts', subkey: {key : "website", subkey : [
                    {key : 'value', subkey: null, type: 'link', sharedObj : 'url', text: 'Visit our official site', prefixValue: 'phone : ', postFixValue: '', ellipse : 'one line', style: ''},
                    ]
                   }
                  },
                  {key : "view", subkey: null, type: "newWindow",  text: 'Open In Map View',   shareBtn: {title: '', text: '', url: ''}, btnName : 'More Details', style:''},

                ];

                let payload = {
                    data : data,
                    argList : argList,
                    style : {
                      imgPos : 'none',
                      textAlign : 'left',
                      hScroll: null,
                      backgroundColor : null,
                      height : null,
                      width : null,
                      padding: null,
                      fontSize: null,
                      defaults : {
                          backgroundColor : 'white',
                          textAlign : 'center',
                          height: 'auto',
                          width : '300px',
                          color: 'grey',
                          fontSize : '13px',
                          padding: '5px 5px',
                          margin : '5px 2px',
                          devider : '0px solid grey',
                          coverPadding : '5px',
                          border: " 1px solid whitesmoke",
                          descriptionTemplateStyle : 'background-color: whitesmoke;'

                      }
                    },
                    emptySlide : 'no'
                };
                let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
                // console.log("open modal with content template : \n\n", template);
                socket.emit("open-modal-with-content-response", { template : template });

            });
          }else if(data.api === 'omdbApi'){
              console.log("omdb api url : ", data.url);
              HERE_MAP_API_SERVICE.hereMapApiProcessing(data.url).then(function(data){

                  let argList = [
                      {key : "Title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: "color: orange; font-size: 16px; text-align: center;"},
                      {key : "Released", subkey: null, type: "block", prefixValue: 'Released : ', postFixValue: '', ellipse : 'one line', style: ""},
                      {key : "BoxOffice", subkey: null, type: "block", prefixValue: 'BoxOffice : ', postFixValue: '', ellipse : 'one line', style: ""},
                      {key : "Director", subkey: null, type: "block", prefixValue: 'Director : ', postFixValue: '', ellipse : 'one line', style:''},
                      {key : "Actors", subkey: null, type: "block", prefixValue: 'Actors : ', postFixValue: '', ellipse : 'one line', style:''},
                      {key : "Awards", subkey: null, type: "block", prefixValue: 'Awards : ', postFixValue: '', ellipse : 'one line', style:''},
                      {key : "imdbRating", subkey: null, type: "block", prefixValue: 'imdbRating : ', postFixValue: '', ellipse : 'one line', style: ""},
                      {key : "Poster", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:'height: 300px;'},
                  ];

                  let payload = {
                      data : data,
                      argList : argList,
                      style : {
                        imgPos : 'top',
                        textAlign : 'left',
                        hScroll: "hScroll",
                        backgroundColor : null,
                        height : null,
                        width : null,
                        padding: null,
                        fontSize: null,
                        defaults : {
                            backgroundColor : 'white',
                            textAlign : 'center',
                            height: 'auto',
                            width : '300px',
                            color: 'grey',
                            fontSize : '13px',
                            padding: '5px 5px',
                            margin : '5px 2px',
                            devider : '0px solid grey',
                            coverPadding : '5px',
                            border: " 1px solid whitesmoke",
                            descriptionTemplateStyle : 'background-color: whitesmoke;'

                        }
                      },
                      emptySlide : 'no'
                  };
                  let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
                  // console.log("open modal with content template : \n\n", template);
                  socket.emit("open-modal-with-content-response", { template : template });

              });
          }

      })

      // ===================== END : HERE MAP  API  IMPLEMENTATION  =======================

      // ===================== END : ZOMATO  API  IMPLEMENTATION  =======================

      socket.on("zomato-api-request", function(data){
        // console.log("DUMMY_NEWS_DATA.newsApiResponse : \n", DUMMY_NEWS_DATA.newsApiResponse);
        // const zomatoApiUrl = 'https://developers.zomato.com/api/v2.1/collections?city_id=1&lat=22.767427&lon=88.388344&apikey=a5535212cb24d4243a3a8e835819d958';
        const zomatoApiUrl = 'https://developers.zomato.com/api/v2.1/geocode?lat=22.767427&lon=88.388344&apikey=a5535212cb24d4243a3a8e835819d958';
        console.log("================ CALLING zomato API REQUEST ================");
        HERE_MAP_API_SERVICE.hereMapApiProcessing(zomatoApiUrl).then(function(data){
          console.log("zomato response : ", data);
          let argList = [
              {key : "restaurant", subkey: [
                  {key : 'name', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 16px; text-align: center; color: tomato;'},
                  {key : 'cuisines', subkey: null, type: 'block', prefixValue: 'cuisines : ', postFixValue: '', ellipse : 'one line', style: ''},
                  {key : "thumb", subkey: null, type: "image", prefixValue: '', postFixValue: '', style:'height: 200px;'},
                  // {key : "url", subkey: null, type: "newWindow",  text: 'Open In Zomato Site ', btnName : 'More Details', style:'margin-top: 10px;'},
                  {key : "location", subkey : [
                    {key : 'address', subkey: null, type: 'block', prefixValue: 'Address : ', postFixValue: '', ellipse : 'one line', style: ''},
                    {key : 'locality', subkey: null, type: 'block', prefixVPlue: 'Locality : ', postFixValue: '', ellipse : 'one line', style: ''},
                    {key : 'city', subkey: null, type: 'block', prefixValue: 'City : ', postFixValue: '', ellipse : 'one line', style: ''},
                    // {key : 'locality_verbose', subkey: null, type: 'block', prefixValue: 'Locality verbose : ', postFixValue: '', ellipse : 'one line', style: ''},
                    // {key : 'latitude', subkey: null, type: 'block', prefixValue: 'Latitude : ', postFixValue: '', ellipse : 'one line', style: ''},
                    // {key : 'longitude', subkey: null, type: 'block', prefixValue: 'Longitude : ', postFixValue: '', ellipse : 'one line', style: ''},
                  ]},
                  {key : 'photos_url', subkey: null, type: 'newWindow', text: 'Visit Photos In Zomato', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 13px; color : #5cb85c; background-color: white; outline: white; text-align: left; padding: 0px 0px; '},
                  {key : 'menu_url', subkey: null, type: 'newWindow', text: 'Visit Menu In Zomato', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 13px; color : #5cb85c; background-color: white; outline: white; text-align: left; padding: 0px 0px; '},
                  {key : 'order_url', subkey: null, type: 'newWindow', text: 'Place Order In Zomato', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 13px; color : #5cb85c; background-color: white; outline: white; text-align: left; padding: 0px 0px; '},
                  {key : 'events_url', subkey: null, type: 'newWindow', text: 'Visit Events In Zomato', prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'font-size: 13px; color : #5cb85c; background-color: white; outline: white; text-align: left; padding: 0px 0px; '},
                  {key : "url", subkey: null, type: "newWindow",  text: 'Visit In Zomato', btnName : 'More Details', style:'margin-top: 10px;'},
              ]},

          ];


          let payload = {
              data : data.nearby_restaurants,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '300px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'
                }
              },
              emptySlide : 'no'
          };
          let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("@@@@  near by serach results are here \n\n", template);
          socket.emit("zomato-api-response", { template : template });
        })

      })

      socket.on("zomato-collection-api-request", function(data){
        // console.log("DUMMY_NEWS_DATA.newsApiResponse : \n", DUMMY_NEWS_DATA.newsApiResponse);
        console.log("================ CALLING ZOMATO COLLECTION API REQUEST ================");

        let argList = [
            {key : "collection", subkey: [
              {key : "title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: "color: orange; font-size: 16px; text-align: center;"},
              {key : "description", subkey: null, type: "block", prefixValue: 'Description : ', postFixValue: '', ellipse : 'one line', style:''},
              {key : "image_url", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:'height: 200px;'},
              {key : "url", subkey: null, type: "newWindow",text: 'Visit Zomato Collection', prefixValue: '', postFixValue: '', style:''},
            ]},
        ];

        let payload = {
            data : DUMMY_ZOMATO_DATA.zomatoCollectionApiResponse.collections,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '300px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'
              }
            },
            emptySlide : 'no'
        };
        let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("@@@@  near by serach results are here \n\n", template);
        socket.emit("zomato-collection-api-response", { template : template });
      })
      // ===================== END : ZOMATO  API  IMPLEMENTATION  =======================

      // ===================== START : OMDB  API  IMPLEMENTATION  =======================
      socket.on("omdb-api-request", function(data){
          // console.log("DUMMY_NEWS_DATA.newsApiResponse : \n", DUMMY_NEWS_DATA.newsApiResponse);
          console.log("================ CALLING NEWS API REQUEST ================");

          let argList = [
              {key : "Title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: "color: orange; font-size: 16px; text-align: center;"},
              {key : "Year", subkey: null, type: "block", prefixValue: 'Year : ', postFixValue: '', ellipse : 'one line', style:''},
              {key : "Type", subkey: null, type: "block", prefixValue: 'Type : ', postFixValue: '', ellipse : 'one line', style:''},
              {key : "Poster", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:'height: 300px;'},
              {key : "imdbID", subkey: null, type: "openModalWithContent", appendKey: 'http://www.omdbapi.com/?apiKey=c0022528&i=', api: 'omdbApi', btnName : 'More Details', style:''},

          ];

          let payload = {
              data : DUMMY_OMDB_DATA.omdbApiUrlResponse.Search,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '300px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'
                }
              },
              emptySlide : 'no'
          };
          let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("@@@@  near by serach results are here \n\n", template);
          socket.emit("omdb-api-response", { template : template });
      })

      // ===================== END : OMDB  API  IMPLEMENTATION  =======================
      socket.on("fetch-web-share-btn-request", (data) => {
          let template = '<center> <button type="button" id="shareBtn" onclick="webShare()"> share now </button> </center>';
          socket.emit("fetch-web-share-btn-response", {template : template})
      })


  // ===================== START : WEB SHARE API IMPLEMENTATION  ========================

  // ===================== START : QUIZ  API IMPLEMENTATION  ========================
  //================================ start quiz api ====================================

      function getQuizDataByCategory(categoryId){
          return quizResponse;
      }

      function getImageWithDescTemplate(imgCat, templateData, style){
        let defaultAlignMent = "center";
        let imgUrl ='static/images/'+imgCat+`.jpg`;

        // let finalAlignment = style.textAlign !== null ? style.textAlign : defaultAlignMent;
        let template = `
                <div class="row" style="width: 100%; background-color: white; text-align: center; padding-right: 5px; color: grey; font-size: 13px; border-right: 1px solid whitesmoke;">
                    <div>
                        <img src="`+imgUrl+`" alt="`+imgCat+`" style="width: 100%; height:  100px;">
                    </div>
                    <div class="" style="">
                        `+templateData+`
                    </div>
                </div>

        `;
        return template;
      }

      function getNoImageWithDescTemplate(templateData, style){
        let defaultAlignMent = "center";
        // let finalAlignment = style.textAlign !== null ? style.textAlign : defaultAlignMent;
        let template = `
                <div class="row" style="background-color: white; text-align: center; margin-right: 5px; color: grey; font-size: 13px; border-right: 1px solid whitesmoke;">
                    <div class="" style="">
                        `+templateData+`
                    </div>
                </div>

        `;
        return template;
      }

      function getBlockTemplate(blockData, payload, catIndex){
        // let blockIdCounter = 0;
        let template = '';
        let blockId = catIndex;
        if(typeof(blockData) === 'string' && blockData.includes("<br/>") && (blockData.length > 35)){
            blockData = blockData.replace("<br/>", " ");

            template = '<div id="'+blockId+'" class="one-line-ellipse-hscroll-bar" style="padding: 10px 20px;" onclick="onClickBlock(\'' + payload.value + '\', \'' + blockId + '\')">'+blockData+'</div>';
        }else{
          template = '<div id="'+blockId+'" class="" style="padding: 10px 20px; " onclick="onClickBlock(\'' + payload.value + '\', \'' + blockId + '\')">'+blockData+'</div>';
        }
        // blockIdCounter++;
        return template;
      }

      function hScrollBar(data){
          let template = '';
          template = '<a href="#" style=" border: 1px solid whitesmoke;">'+data+'</a>';
          return template;
      }

      function scrollmenuBlock(templateData, quizIdCounter){
          return '<div id="block-'+quizIdCounter+'" class="scrollmenu">'+templateData+'</div>';
      }

      function shuffleItems(arr){
          let ctr = arr.length, temp, index;
          while(ctr > 0){
              index = Math.floor(Math.random() * ctr);
              ctr--;
              temp = arr[ctr];
              arr[ctr] = arr[index];
              arr[index] = temp;
          }
          return arr;
      }

      socket.on("here-map-places-category-request", (request) => {
        let argList = [
            {key : "title", subkey: null, type: "block", api: "here map", prefixValue: '', postFixValue: '', ellipse : null, style: "color: orange; text-align: left; font-weight: 800; font-size: 16px; margin: auto;"},
            {key : "icon", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:'width: 50px; height: 50px;'},

        ];
        // console.log("DUMMY_PLACES_CATEGORY_DATA.hereMapNearByPlacesCategory.items :: ", DUMMY_PLACES_CATEGORY_DATA.hereMapNearByPlacesCategory.items);
        let payload = {
            data : DUMMY_QUIZ_DATA.hereMapNearByPlacesCategory.items,
            argList : argList,
            style : {
              imgPos : 'left',
              textAlign : 'left',
              hScroll: "yes",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '200px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '0px',
                  margin : '10px 10px',
                  borderRight : '2px solid #ccc'
              }
            },
            emptySlide : 'no'
        };

        let hereMapNearByPlacesCategoryTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("hereMapNearByPlacesCategoryTemplate :: ", hereMapNearByPlacesCategoryTemplate);
          if(request.from === 'gini'){
            socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate, displayType : 'horizontalSlide'});
          }
      })

      var quizIdCounter = 0;
      socket.on("fetch-quiz-api", (request) => {

          // generateQuizCat(dummyQuizCategory)
          let template = '';
          let tempTemplate = '';
          let finalTemplate = '';
          let finalQuizResponseTemplate = '';
          let quizCat = DUMMY_QUIZ_DATA.dummyQuizCategory;
          for (var i = 0; i < quizCat.length; i++) {
                // tempTemplate = '';
                template = '';
                template += getBlockTemplate(quizCat[i].name, quizCat[i], i);
                // tempTemplate = getNoImageWithDescTemplate(template, null);
                tempTemplate = getImageWithDescTemplate(quizCat[i].name, template, null);

                finalTemplate += hScrollBar(tempTemplate);
          }

              let addScrollmenuQuizCatTemplate = scrollmenuBlock(finalTemplate, quizIdCounter);

              if(request.from === 'gini'){
                socket.emit("query-response", { returnMsg : addScrollmenuQuizCatTemplate, displayType : 'horizontalSlide'});
              }else if(request.from === 'quiz api'){
                socket.emit("quiz-api-template", {template : addScrollmenuQuizCatTemplate});
              }

      })

      socket.on("fetch-quiz-quistions-by-category", (data) => {
        // console.log("@@@ DUMMY_QUIZ_DATA.dummyQuizCategory : ", DUMMY_QUIZ_DATA.dummyQuizCategory);
        console.log("@@@ data.categoryId : ", data.categoryId);
        let quizCategory = DUMMY_QUIZ_DATA.dummyQuizCategory[data.categoryId].value;
        // console.log("@@@ quizCategory : ", quizCategory);
        const quizApiUrl = "https://opentdb.com/api.php?amount=10&category="+quizCategory+"&type=multiple";
        // console.log("@@ quizApiUrl :", quizApiUrl);
        HERE_MAP_API_SERVICE.hereMapApiProcessing(quizApiUrl).then((response) => {
          // console.log(" response : ", response);
          let quizData = response.results;
          // console.log("quiz data :: ", quizData);


          // let quizResponseByCat = getQuizDataByCategory(data.data);

          let quizCorrectAnswers = [];
          let imgCat = DUMMY_QUIZ_DATA.dummyQuizCategory[data.categoryId].name;
          quizData.forEach((item)=>{
              quizCorrectAnswers.push(item.correct_answer);
              item.incorrect_answers.push(item.correct_answer);
              item.incorrect_answers = shuffleItems(item.incorrect_answers);
              item.imgUrl = 'static/images/'+imgCat+'.jpg';
          });
          let argList = [
              {key : "category", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : null, style: "color: orange; font-size: 16px; text-align: center;"},
              // {key : "type", subkey: null, type: "block", prefixValue: ' Type : ', postFixValue: '', style:''},
              // {key : "difficulty", subkey: null, type: "block", prefixValue: 'Difficulty : ', postFixValue: '', style:''},
              {key : "question", subkey: null, type: "block", prefixValue: 'Question : ', postFixValue: '', ellipse : 'none', style: 'font-weight: 900;'},
              // {key : "correct_answer", subkey: null, type: "radio", prefixValue: null, postFixValue: '', style:''},
              {key : "incorrect_answers", subkey: null, type: "radio", prefixValue: null, postFixValue: '', style:''},
              {key : "imgUrl", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:''},

          ];

          let payload = {
              data : quizData,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "yes",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '240px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '0px',
                    margin : '10px 10px',
                    borderRight : '1px solid whitesmoke',
                    descriptionTemplateStyle: 'background-color: white;'
                }
              },
              emptySlide : 'yes'
          };
          let quizResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          socket.emit("query-response", { returnMsg : quizResponseTemplate, quizCorrectAnswers : quizCorrectAnswers, displayType : 'horizontalSlide', api: "quiz api"});


        });


    })

      socket.on("fetch-quiz-data-by-category", (data) => {
          // console.log("@@@ DUMMY_QUIZ_DATA.dummyQuizCategory : ", DUMMY_QUIZ_DATA.dummyQuizCategory);
          console.log("@@@ data.categoryId : ", data.categoryId);
          let quizCategory = DUMMY_QUIZ_DATA.dummyQuizCategory[data.categoryId].value;
          console.log("@@@ quizCategory : ", quizCategory);
          const quizApiUrl = "https://opentdb.com/api.php?amount=10&category="+quizCategory+"&type=multiple";
          console.log("@@ quizApiUrl :", quizApiUrl);
          HERE_MAP_API_SERVICE.hereMapApiProcessing(quizApiUrl).then((response) => {
            console.log(" response : ", response);
            let quizData = response.results;
            // console.log("quiz data :: ", quizData);
            let argList = [
                {key : "category", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : null, style: "color: orange; font-size: 16px; text-align: center;"},
                {key : "type", subkey: null, type: "block", prefixValue: ' Type : ', postFixValue: '', style:''},
                {key : "difficulty", subkey: null, type: "block", prefixValue: 'Difficulty : ', postFixValue: '', style:''},
                {key : "question", subkey: null, type: "block", prefixValue: 'Question : ', postFixValue: '', ellipse : 'none', style: ''},
                {key : "correct_answer", subkey: null, type: "radio", prefixValue: null, postFixValue: ''},
                {key : "incorrect_answers", subkey: null, type: "radio", prefixValue: null, postFixValue: ''},
            ];


            // let quizResponseByCat = getQuizDataByCategory(data.data);

            let quizCorrectAnswers = [];
            quizData.forEach((item)=>{
                quizCorrectAnswers.push(item.correct_answer);

            });
            let payload = {
                data : quizData,
                argList : argList,
                style : {
                  imgPos : 'none',
                  textAlign : 'left',
                  hScroll: "yes",
                  backgroundColor : null,
                  height : null,
                  width : null,
                  padding: null,
                  fontSize: null,
                  defaults : {
                      backgroundColor : 'white',
                      textAlign : 'center',
                      height: 'auto',
                      width : '240px',
                      color: 'grey',
                      fontSize : '13px',
                      padding: '0px',
                      margin : '10px 10px',
                      borderRight : '1px solid whitesmoke'
                  }
                },
                emptySlide : 'yes'
            };
            let quizResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
            socket.emit("quiz-api-template", {template : quizResponseTemplate, quizCorrectAnswers : quizCorrectAnswers});
          });


      })

      socket.on("send-twilio-sms-template-request", ()=>{
          let smsTemplate = `
          <div>
              <div class="form-group">
                <label for="usr">Mobile Number</label>
                <input type="tel" id="twilioPhNo" name="phone" class="form-control" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required placeholder="Enter ph number...">
              </div>
              <div class="form-group">
                <label for="pwd">Message</label>
                <input type="text" id="twilioSms" name="phone" class="form-control" required placeholder="Enter msg...">
              </div>
              <div style="text-align: center;">
                <button type="button" class="btn btn-default" style="width: 100%; background-color: darkcyan; color: white;" onclick="sendTwilioSms()">Send Sms</button>
              </div>
          </div>
          `;
          socket.emit("query-response", { returnMsg : smsTemplate});

      })

      socket.on("send-twilio-sms", (data) => {
          console.log("==========================================");
          console.log("ph : ", data.ph);
          console.log("sms : ", data.sms);

          let ph = '+91'+data.ph;
          let sms = data.sms;
          TWILIO_SERVICE.sendTwilioSms(ph, sms);
      })

      socket.on("find-album-api-request", (data) => {
        console.log("=====================================");
        // console.log("album name : ", data.albumName);
        let musicDbApiFindAlbumUrl = "https://theaudiodb.com/api/v1/json/1/search.php?s="+data.albumName+"&apikey=195003";
        HERE_MAP_API_SERVICE.hereMapApiProcessing(musicDbApiFindAlbumUrl).then((response) => {
          // console.log(" response : ", response.artists[0].strArtist);
          let albumData = response.artists;
          console.log();
          let argList = [
            {key : "strArtist", subkey: null, type: "block", prefixValue: 'Name : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "strCountry", subkey: null, type: "block", prefixValue: 'Country : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
            // {key : "strArtistAlternate", subkey: null, type: "block", prefixValue: 'Name : ', postFixValue: '', ellipse : 'one line', style:''},
            {key : "intBornYear", subkey: null, type: "block",  prefixValue: 'Born : ', postFixValue: '', ellipse : 'one line', style:''},
            {key : "strArtistWideThumb", subkey: null, type: "image", prefixValue: '', postFixValue: '', style:'height: 200px; width: 358px'},
            {key : "strLastFMChart", subkey: null, type: "newWindow",  text: 'Listen To Music ', btnName : 'Listen To Music ', style:'margin-top: 10px; background-color: black;'},
          //  {key : "strWebsite", subkey: null, type: "newWindow",  text: 'Official Website', btnName : 'Official Website', style:'margin-top: 10px; background-color: black;'},
          //  {key : "strFacebook", subkey: null, type: "newWindow",  text: 'Open Facebook Page', btnName : 'Open Facebook Page', style:'margin-top: 10px; background-color: black;'},
          ];
          // console.log("data.data[0].user.username : ", data.data[0].user.username);
          let payload = {
              data : albumData,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '370px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
          if(albumData !== null && albumData.length > 0){
              if(data.from === 'Gini'){
                socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
              }else if(data.from === "Api"){
                socket.emit("find-album-api-response", {returnMsg : findAlbumResponseTemplate});
              }
          }else{
            let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
            socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
          }
        });

      })

      socket.on("music_top-50-most-loved-track-request", (data) => {
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        let audioDbTop50MostLovedTrackApiUrl = "https://theaudiodb.com/api/v1/json/1/mostloved.php?format=track&format=track";

        HERE_MAP_API_SERVICE.hereMapApiProcessing(audioDbTop50MostLovedTrackApiUrl).then((response) => {
          // console.log(" response : ", response.artists[0].strArtist);
          let albumData = response.loved;
          let filteredData = [];
          albumData.forEach((item) => {
              //let musicVidUrl = item.strMusicVid;
              // console.log("============== item ==================");
              if(item.strMusicVid !== null){
                  let embedIdIndex = item.strMusicVid.indexOf("v=");
                  let embedId = item.strMusicVid.substr(embedIdIndex+2);
                  let embedUrl = "https://www.youtube.com/embed/"+embedId;
                  item.embedUrl = embedUrl;
                  filteredData.push(item);
                  // console.log("item : ", item);
              }

          })

          let argList = [
            {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
            {key : "strArtist", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "strAlbum", subkey: null, type: "block", prefixValue: 'Album : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
          ];
          let payload = {
              data : filteredData,
              argList : argList,
              style : {
                imgPos : 'none',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '360px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
          if(albumData !== null && albumData.length > 0){
              if(data.from === 'Gini'){
                socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
              }else if(data.from === "Api"){
                socket.emit("music_top-50-most-loved-track-response", {returnMsg : findAlbumResponseTemplate});
              }
          }else{
            let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
            socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
          }
        });

      })

      socket.on("music_trending-album-request", (data) => {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        let audioDbTop50MostLovedTrackApiUrl = "https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles";

        HERE_MAP_API_SERVICE.hereMapApiProcessing(audioDbTop50MostLovedTrackApiUrl).then((response) => {
          // console.log(" response : ", response.artists[0].strArtist);
          let albumData = response.trending;
          let argList = [
            {key : "strTrackThumb", subkey: null, type: "image", api: 'AUDIODB:album', onclick: {methodName: 'getProductsById', params: ['idArtist'], defaults: ['AUDIODB:artist'] }, style:'width: 348px; height: 200px; border: none;'},
            {key : "strArtist", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "strAlbum", subkey: null, type: "block", prefixValue: 'Album : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "strTrack", subkey: null, type: "block", prefixValue: 'Track : ', postFixValue: '', ellipse : 'one line', style: ''},
          ];
          let payload = {
              data : albumData,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '360px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
          if(albumData !== null && albumData.length > 0){
              if(data.from === 'Gini'){
                socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
              }else if(data.from === "Api"){
                socket.emit("music_trending-album-response", {returnMsg : findAlbumResponseTemplate});
              }
          }else{
            let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
            socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
          }
        });

      })

      socket.on("find-products-by-id-request", (data) => {
          console.log("id : ", data.id);
          console.log("api : ", data.api);
          let api = data.api.split(':');
          let apiURL = '';
          if(data.api !== undefined){
              if(api[0] ===  'AUDIODB'){
                  if(api[1] === 'album'){
                      apiURL = 'https://theaudiodb.com/api/v1/json/1/album.php?apikey=195003&m='+data.id;
                  }else if(api[1] === 'artist'){
                      apiURL = 'https://theaudiodb.com/api/v1/json/1/mvid.php?apikey=195003&i='+data.id;
                  }
              }
          }
          console.log("### find products by id url : ", apiURL);
          HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
            console.log(" response : ", response);
            let albumData = response.mvids;
            let filteredData = [];
            albumData.forEach((item) => {
                //let musicVidUrl = item.strMusicVid;
                // console.log("============== item ==================");
                if(item.strMusicVid !== null){
                    let embedIdIndex = item.strMusicVid.indexOf("v=");
                    let embedId = item.strMusicVid.substr(embedIdIndex+2);
                    let embedUrl = "https://www.youtube.com/embed/"+embedId;
                    item.embedUrl = embedUrl;
                    filteredData.push(item);
                    // console.log("item : ", item);
                }

            })

            let argList = [
              {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
              {key : "strTrack", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
              //{key : "strAlbum", subkey: null, type: "block", prefixValue: 'Album : ', postFixValue: '', ellipse : 'one line', style: ''},
              //{key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
            ];
            let payload = {
                data : filteredData,
                argList : argList,
                style : {
                  imgPos : 'none',
                  textAlign : 'left',
                  hScroll: "hScroll",
                  backgroundColor : null,
                  height : null,
                  width : null,
                  padding: null,
                  fontSize: null,
                  defaults : {
                      backgroundColor : 'white',
                      textAlign : 'center',
                      height: 'auto',
                      width : '360px',
                      color: 'grey',
                      fontSize : '13px',
                      padding: '5px 5px',
                      margin : '5px 2px',
                      devider : '0px solid grey',
                      coverPadding : '5px',
                      border: " 1px solid whitesmoke",
                      descriptionTemplateStyle : 'background-color: whitesmoke;'

                  }
                },
                emptySlide : 'no'
            };
            let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
            // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
            if(albumData !== null && albumData.length > 0){
                if(data.from === 'Gini'){
                  socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
                }else if(data.from === "Api"){
                  socket.emit("find-products-by-id-response", {returnMsg : findAlbumResponseTemplate});
                }
            }else{
              let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
              socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
            }
          });
      })
          //================================ end quiz api ====================================


  // ===================== END : QUIZ  API IMPLEMENTATION  ========================

  // ===================== START : OPEN LIBRARY  API IMPLEMENTATION  ========================

      socket.on("request-open-library-book-category", (data) => {
      let bookCat = DUMMY_QUIZ_DATA.OPEN_LIBRARY_BOOK_CATEGORY;
      let argList = [
        {key : "name", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : 'one line', style: '    white-space: normal; margin-top: 3px; text-align: center; font-size: 20px; color: black; font-weight: 900;'},
      ];
      let payload = {
          data : bookCat,
          argList : argList,
          style : {
            imgPos : 'none',
            textAlign : 'left',
            hScroll: "hScroll",
            backgroundColor : null,
            height : null,
            width : null,
            padding: null,
            fontSize: null,
            defaults : {
                backgroundColor : 'white',
                textAlign : 'center',
                height: 'auto',
                width : '260px',
                color: 'grey',
                fontSize : '13px',
                padding: '5px 5px',
                margin : '5px 2px',
                devider : '0px solid grey',
                coverPadding : '5px',
                border: " 1px solid whitesmoke",
                descriptionTemplateStyle : 'background-color: whitesmoke;'

            }
          },
          emptySlide : 'no'
      };
      console.log("1111111111111111111111111111111111");
      let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        if(data.from === 'gini'){
          socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
        }else if(data.from === 'Api'){
          socket.emit("response-open-library-book-category", {returnMsg : findAlbumResponseTemplate});
        }

    })

      socket.on("request-books-by-subject", (data) =>{
        let open_library_api_by_subject_url = "https://openlibrary.org/subjects/maths.json";
        HERE_MAP_API_SERVICE.hereMapApiProcessing(open_library_api_by_subject_url).then((response) => {
          // console.log(" response : ", response);
          let booksData = response.works;
          let filteredData = [];
          booksData.forEach((book) => {
              //let musicVidUrl = item.strMusicVid;
              console.log("============== item ==================");
              if(book.cover_id !== null && book.cover_id !== undefined){
                  // let coverImgUrl = "http://covers.openlibrary.org/b/id/"+book.cover_id+"-M.jpg";
                  console.log("$$$$  cover_i : ", book.cover_id);
                  let coverImgUrl = "http://covers.openlibrary.org/b/id/"+book.cover_id+"-M.jpg";
                  book.coverImgUrl = coverImgUrl;
              }
              if(book.authors.length > 0){
                  book.authorName = book.authors[0].name;
              }
              filteredData.push(book);
          })
          // console.log("filtered data : ", filteredData);
          //
          let argList = [
            {key : "coverImgUrl", subkey: null, type: "image", api: 'OPENLIBRARY:subject', onclick: {methodName: 'getBooksPreview', params: ['ia'], defaults: ['OPENLIBRARY:subject'] },  style:'width: 248px; height: 250px; border: none; box-shadow: 7px 6px grey;'},
            {key : "title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "authorName", subkey: null, type: "block", prefixValue: 'Author Name : ', postFixValue: '', ellipse : 'one line', style: ''},
            // {key : "strTrack", subkey: null, type: "block", prefixValue: 'Track : ', postFixValue: '', ellipse : 'one line', style: ''},
          ];
          let payload = {
              data : filteredData,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '260px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          console.log("1111111111111111111111111111111111");
          let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
          if(booksData !== null && booksData.length > 0){
              if(data.from === 'Gini'){
                socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
              }else if(data.from === "Api"){
                console.log("2222222222222222222222222222222");
                socket.emit("response-books-by-subject", {returnMsg : findAlbumResponseTemplate});
              }
          }else{
            let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
            // socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
          }


        });


      });

      socket.on("request-google-books-by-name", (data) =>{
        console.log("@@@@@@@@@@  request-search-books-by-name  @@@@@@@@@@@");
        let open_library_api_by_subject_url = '';
        if(data.from === 'Gini'){
            console.log("bookName : ", data.bookName);
            open_library_api_by_subject_url = "https://www.googleapis.com/books/v1/volumes?q="+data.bookName;

        }else{
            open_library_api_by_subject_url = "https://www.googleapis.com/books/v1/volumes?q=angularjs";
        }
        HERE_MAP_API_SERVICE.hereMapApiProcessing(open_library_api_by_subject_url).then((response) => {
          // console.log(" response : ", response);
          console.log("=========== successfull response ==============");
          let booksData = response.items;
          let filteredData = [];
          booksData.forEach((book) => {
              //let musicVidUrl = item.strMusicVid;
              // console.log("============== item ==================");
              if(book.volumeInfo !== null && book.volumeInfo !== undefined){
                  // console.log("customTitle : ", book.customTitle);
                  if(book.volumeInfo.title !== null && book.volumeInfo.title !== undefined){
                    book.customTitle = book.volumeInfo.title;
                  }else{
                    book.customTitle = "";
                  }
                  // console.log("1111111111111111111111111111111111");
                  if(book.volumeInfo.authors !== null && book.volumeInfo.authors !== undefined && book.volumeInfo.authors.length > 0){
                    book.customAuthors = book.volumeInfo.authors[0];
                    // console.log("2222222222222");
                  }else{
                    book.customAuthors = "";
                  }


                  // book.customPublisher  = book.volumeInfo.publisher;
                  // console.log("333333333333333");
                  if(book.volumeInfo.publisher !== null && book.volumeInfo.publisher !== undefined){
                    book.customPublisher = book.volumeInfo.publisher;
                  }else{
                    book.customPublisher = "";
                  }

                  // book.customPublishDate  = book.volumeInfo.publishedDate;
                  // console.log("444444444444444");
                  if(book.volumeInfo.publishedDate !== null && book.volumeInfo.publishedDate !== undefined){
                    book.customPublishDate = book.volumeInfo.publishedDate;
                  }else{
                    book.customPublishDate = "";
                  }

                  if(book.volumeInfo.imageLinks !== null && book.volumeInfo.imageLinks !== undefined){
                      book.customImgUrl = book.volumeInfo.imageLinks.thumbnail;

                  }else{
                    let imgUrl ='static/images/books.jpg';
                    book.customImgUrl = imgUrl;

                  }
                  // console.log("55555555555555555");

                  if(book.volumeInfo.industryIdentifiers !== undefined && book.volumeInfo.industryIdentifiers !== null && book.volumeInfo.industryIdentifiers.length > 0){
                      for (let i = 0; i < book.volumeInfo.industryIdentifiers.length; i++) {
                          if(book.volumeInfo.industryIdentifiers[i].type === 'ISBN_10'){
                              console.log("book.volumeInfo.industryIdentifiers[i].identifier : ", book.volumeInfo.industryIdentifiers[i].identifier);
                              book.customIsbn = book.volumeInfo.industryIdentifiers[i].identifier;
                              // console.log("8888888888");

                          }
                      }
                  }else{
                      book.customIsbn = "";
                  }
              }

              filteredData.push(book);
          })
          // console.log("filtered data : ", filteredData);
          // console.log("999999999999999999999999");
          let argList = [
            {key : "customImgUrl", subkey: null, type: "image", api: 'GOOGLE:books', onclick: {methodName: 'getBooksPreview', params: ['customIsbn'], defaults: ['GOOGLE:books'] }, style:'width: 240px; height: 250px; border: none; box-shadow: 7px 6px grey;'},
            {key : "customTitle", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "customAuthors", subkey: null, type: "block", prefixValue: 'Author : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "customPublisher", subkey: null, type: "block", prefixValue: 'Publisher : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "customPublishDate", subkey: null, type: "block", prefixValue: 'Publisher Date : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "", subkey: null, type: "button", btnName: 'Add to shelf', onclick: {methodName: 'onClickButtonAction', params: ['customIsbn', 'customTitle', 'customImgUrl'], defaults: ['GOOGLE:books'] },  style: 'background-color: black; color: white;'},

          ];
          let payload = {
              data : booksData,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '260px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
          if(booksData !== null && booksData.length > 0){
              if(data.from === 'Gini'){
                socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
              }else if(data.from === "Api"){
                console.log("2222222222222222222222222222222");
                socket.emit("response-google-books-by-name", {returnMsg : findAlbumResponseTemplate});
              }
          }else{
            let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
            // socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
          }


        });


      });

      socket.on("add-book-to-shelf", (data) => {
          if(data.from === "Gini"){
              let book = {bookIsbn : data.bookIsbn, bookTitle: data.bookTitle, bookImg: data.bookImg, sorceApi: data.api};
              bookShelf.push(book);
              // console.log("bookShelf @ ", bookShelf);
          }
      })

      socket.on("request-book-shelf", (data) => {
        let argList = [
          {key : "bookImg", subkey: null, type: "image", api: 'GOOGLE:books', onclick: {methodName: 'getBooksPreview', params: ['bookIsbn'], defaults: ['GOOGLE:books'] }, style:'width: 240px; height: 250px; border: none; box-shadow: 7px 6px grey;'},
          {key : "bookTitle", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
        //  {key : "customAuthors", subkey: null, type: "block", prefixValue: 'Author : ', postFixValue: '', ellipse : 'one line', style: ''},
        //  {key : "customPublisher", subkey: null, type: "block", prefixValue: 'Publisher : ', postFixValue: '', ellipse : 'one line', style: ''},
        //  {key : "customPublishDate", subkey: null, type: "block", prefixValue: 'Publisher Date : ', postFixValue: '', ellipse : 'one line', style: ''},
        //  {key : "", subkey: null, type: "button", btnName: 'Add to shelf', onclick: {methodName: 'onClickButtonAction', params: ['customIsbn', 'customTitle', 'customImgUrl'], defaults: ['GOOGLE:books'] },  style: 'background-color: black; color: white;'},

        ];
        let payload = {
            data : bookShelf,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '260px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(bookShelf !== null && bookShelf.length > 0){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              console.log("2222222222222222222222222222222");
              socket.emit("response-google-books-by-name", {returnMsg : findAlbumResponseTemplate});
            }
        }else{
              let template = "Oops, sorry we didn't find any book in the Book Shelf.";
              socket.emit("query-response", { returnMsg : template});
        }

      })

      socket.on("request-advance-archive-search", (data) => {
        let advanceArchiveSearchUrl = "https://archive.org/advancedsearch.php?q="+data.query+"&fl%5B%5D=identifier,mediatype,title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=20&page=1&output=json";
        console.log("advanceArchiveSearchUrl :: ", advanceArchiveSearchUrl);
        HERE_MAP_API_SERVICE.hereMapApiProcessing(advanceArchiveSearchUrl).then((response) => {
          let results = response.response.docs;
          console.log("==== response : ", results);

          let argList = [
            {key : "", subkey: null, type: "archive_mediatype", api: 'GOOGLE:books', style:'width: 240px; height: 250px; border: none; box-shadow: 7px 6px grey;'},
            {key : "title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: 'color: black;'},
          //  {key : "customAuthors", subkey: null, type: "block", prefixValue: 'Author : ', postFixValue: '', ellipse : 'one line', style: ''},
          //  {key : "customPublisher", subkey: null, type: "block", prefixValue: 'Publisher : ', postFixValue: '', ellipse : 'one line', style: ''},
          //  {key : "customPublishDate", subkey: null, type: "block", prefixValue: 'Publisher Date : ', postFixValue: '', ellipse : 'one line', style: ''},
          //  {key : "", subkey: null, type: "button", btnName: 'Add to shelf', onclick: {methodName: 'onClickButtonAction', params: ['customIsbn', 'customTitle', 'customImgUrl'], defaults: ['GOOGLE:books'] },  style: 'background-color: black; color: white;'},

          ];
          let payload = {
              data : results,
              argList : argList,
              style : {
                imgPos : 'none',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '360px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
          if(results !== null && results .length > 0){
              if(data.from === 'Gini'){
                socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
              }else if(data.from === "Api"){
                socket.emit("response-advance-archive-search", {returnMsg : findAlbumResponseTemplate});
              }
          }else{
            let template = "Oops, sorry we didn't find any album of <i><strong>"+data.query+"</strong></i>";
            socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
          }


        });
      })

      socket.on("request-bill-gates", (data) =>{
        console.log("@@@@@@@@@@  request-search-books-by-name  @@@@@@@@@@@");
        let open_library_api_by_subject_url = "https://www.googleapis.com/books/v1/volumes?q=bill gates";
        HERE_MAP_API_SERVICE.hereMapApiProcessing(open_library_api_by_subject_url).then((response) => {
          // console.log(" response : ", response);
          let booksData = response.items;
          let filteredData = [];
          booksData.forEach((book) => {
              //let musicVidUrl = item.strMusicVid;
              // console.log("============== item ==================");
              if(book.volumeInfo !== null && book.volumeInfo !== undefined){
                  book.customTitle = book.volumeInfo.title;
                  book.customAuthors = book.volumeInfo.authors[0];
                  book.customPublisher  = book.volumeInfo.publisher;
                  book.customPublishDate  = book.volumeInfo.publishedDate;
                  book.customImgUrl = book.volumeInfo.imageLinks.thumbnail;
                  if(book.volumeInfo.industryIdentifiers.length > 0){
                      for (let i = 0; i < book.volumeInfo.industryIdentifiers.length; i++) {
                          if(book.volumeInfo.industryIdentifiers[i].type === 'ISBN_10'){
                              book.customIsbn = book.volumeInfo.industryIdentifiers[i].identifier;
                          }
                      }
                  }
              }

              filteredData.push(book);
          })
          // console.log("filtered data : ", filteredData);
          //
          let argList = [
            {key : "customImgUrl", subkey: null, type: "image", api: 'GOOGLE:books', onclick: {methodName: 'getBooksPreview', params: ['customIsbn'], defaults: ['GOOGLE:books'] }, style:'width: 240px; height: 250px; border: none; box-shadow: 7px 6px grey;'},
            {key : "customTitle", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "customAuthors", subkey: null, type: "block", prefixValue: 'Author : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "customPublisher", subkey: null, type: "block", prefixValue: 'Publisher : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "customPublishDate", subkey: null, type: "block", prefixValue: 'Publisher Date : ', postFixValue: '', ellipse : 'one line', style: ''},
          ];
          let payload = {
              data : booksData,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '260px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          console.log("1111111111111111111111111111111111");
          let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
          if(booksData !== null && booksData.length > 0){
              if(data.from === 'Gini'){
                socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
              }else if(data.from === "Api"){
                console.log("2222222222222222222222222222222");
                socket.emit("response-bill-gates", {returnMsg : findAlbumResponseTemplate});
              }
          }else{
            let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
            // socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
          }


        });


      });

      socket.on("request-search-books-by-name", (data) =>{
      let open_library_api_by_subject_url = "http://openlibrary.org/search.json?q=angularjs";
      HERE_MAP_API_SERVICE.hereMapApiProcessing(open_library_api_by_subject_url).then((response) => {
        // console.log("222222222222 response : ", response);
        // let booksData = response.works;
        let booksData = response.docs;
        let filteredData = [];
        let isbn;
        booksData.forEach((book) => {
            //let musicVidUrl = item.strMusicVid;
            // console.log("============== item ==================");
            if(book.cover_i !== null && book.cover_i !== undefined){
                // let coverImgUrl = "http://covers.openlibrary.org/b/id/"+book.cover_id+"-M.jpg";
                // console.log("$$$$  cover_i : ", book.cover_i);
                let coverImgUrl = "http://covers.openlibrary.org/b/id/"+book.cover_i+"-M.jpg";

                book.coverImgUrl = coverImgUrl;
            }
            // if(book.isbn !== null && book.isbn !== undefined && book.isbn.length > 0){
            //     book.selected_isbn_no = book.isbn[0];
            // }
            // if(book.authors.length > 0){
            //     book.authorName = book.authors[0].name;
            // }

            if(book.author_name.length > 0){
                book.authorName = book.author_name[0];
            }

            filteredData.push(book);
        })
        console.log("0000000000000000000000000000000000000000");
        // console.log("filtered data : ", filteredData);
        // box-shadow: 7px 6px grey;
        let argList = [
          {key : "coverImgUrl", subkey: null, type: "image", api: 'OPENLIBRARY:search', onclick: {methodName: 'getBooksPreview', params: ['isbn'], defaults: ['OPENLIBRARY:subject'] },  style:'width: 248px; height: 300px; border: none; box-shadow: 7px 6px grey;'},
          {key : "title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "authorName", subkey: null, type: "block", prefixValue: 'Author Name : ', postFixValue: '', ellipse : 'one line', style: ''},
          // {key : "strTrack", subkey: null, type: "block", prefixValue: 'Track : ', postFixValue: '', ellipse : 'one line', style: ''},
        ];
        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '260px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        console.log("1111111111111111111111111111111111");
        let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);

        if(booksData !== null && booksData.length > 0){

            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              console.log("2222222222222222222222222222222");
              socket.emit("response-search-books-by-name", {returnMsg : findAlbumResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          // socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }


      });


    });

  // ===================== END : OPEN LIBRARY  API IMPLEMENTATION  ========================



  // ===================== START : SCORE BAT  API IMPLEMENTATION  ========================

      socket.on("request-score-highlight-video", (data) =>{
        let football_score_highlight_video = "https://www.scorebat.com/video-api/v1/";
        HERE_MAP_API_SERVICE.hereMapApiProcessing(football_score_highlight_video).then((response) => {
        // console.log("222222222222 response : ", response);
        // let booksData = response.works;
        let scoreData = response;
        let filteredData = [];
        let isbn;
        scoreData.forEach((score) => {
            if(score.embed !== null && score.embed !== undefined){
                let embededIframeSrc = score.embed.split("'");
                // console.log(" embededIframeSrc : ", embededIframeSrc[1]);
                let y = embededIframeSrc[1].indexOf("g");
                let id = embededIframeSrc[1].substr(y+2, 6);
                // let url = 'https://www.scorebat.com//embed//g//'+id+'//?s=2';
                let url = 'https://www.scorebat.com/embed/g/'+id+'/?s=2';

                score.embededIframeSrcUrl = url;
            }
        });
        // console.log("score data : ", scoreData);
        console.log("0000000000000000000000000000000000000000");
        // console.log("filtered data : ", filteredData);
        // box-shadow: 7px 6px grey;
        let argList = [
          {key : "title", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'white-space: normal; margin-top: 3px; color: brown; margin-bottom: 10px; text-align: center; font-size: 16px;'},
          {key : "embededIframeSrcUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 465px; border: none;'},


          // {key : "thumbnail", subkey: null, type: "image", api: 'SCORE_BAT:hhighlight-video',  onclick: {methodName: 'getScoreBatPreview', params: ['embededIframeSrcUrl'], defaults: ['SCORE_BAT:hhighlight-video'] }, style:'width: 300px; height: 200px; border: none; '},
          // {key : "embed", subkey: null, type: "embededHTML", style:'width: 350px; height: 250px; border: none;'},
        ];
        let payload = {
            data : scoreData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '400px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        console.log("1111111111111111111111111111111111");
        let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);

        if(scoreData !== null && scoreData.length > 0){

            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              console.log("2222222222222222222222222222222");
              socket.emit("response-score-highlight-video", {returnMsg : findAlbumResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          // socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }


  });


});



  // ===================== END : SCORE NAPSTER  API IMPLEMENTATION  ========================



      socket.on("request-napster-music-playlist-api", (data) =>{
        let football_score_highlight_video = "https://api.napster.com/v2.0/playlists?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm";
        HERE_MAP_API_SERVICE.hereMapApiProcessing(football_score_highlight_video).then((response) => {
        // console.log("222222222222 response : ", response);
        // let booksData = response.works;
        let scoreData = response.playlists;
        let filteredData = [];

        scoreData.forEach((item) => {
          if(item.images[0].url !== null && item.images[0].url !== undefined){
            item.coverImgUrl = item.images[0].url;
            console.log("image: ",item.coverImgUrl);
          }
        });
        // console.log("score data : ", scoreData);
        console.log("0000000000000000000000000000000000000000");
        // console.log("filtered data : ", filteredData);
        // box-shadow: 7px 6px grey;
        let argList = [
          {key : "name", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'white-space: normal; margin-top: 3px; color: brown; margin-bottom: 10px; text-align: center; font-size: 16px;'},
          {key : "description", subkey: null, type: "block", prefixValue: 'Description : ', postFixValue: '', ellipse : 'one line', style: 'margin-top: 3px; margin-bottom: 10px;'},
          {key : "coverImgUrl", subkey: null, type: "image", api: 'NAPSTER:playlist', onclick: {methodName: 'getProductsById', params: ['id'], defaults: ['NAPSTER:playlist'] }, style:'width: 325px; height: 250px; border: none;'},

          // {key : "thumbnail", subkey: null, type: "image", api: 'SCORE_BAT:hhighlight-video',  onclick: {methodName: 'getScoreBatPreview', params: ['embededIframeSrcUrl'], defaults: ['SCORE_BAT:hhighlight-video'] }, style:'width: 300px; height: 200px; border: none; '},
          // {key : "embed", subkey: null, type: "embededHTML", style:'width: 350px; height: 250px; border: none;'},
        ];
        let payload = {
            data : scoreData,
            argList : argList,
            style : {ellipse : 'one line',
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '325px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        console.log("1111111111111111111111111111111111");
        let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);

        if(scoreData !== null && scoreData.length > 0){

            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              console.log("2222222222222222222222222222222");
              socket.emit("response-napster-music-playlist-api", {returnMsg : findAlbumResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          // socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }


  });


});

      socket.on("request-napster-music-by-playlistId", (data) =>{
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        let football_score_highlight_video = "https://api.napster.com/v2.0/playlists/"+data.id+"/tracks?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm&limit=200";
        HERE_MAP_API_SERVICE.hereMapApiProcessing(football_score_highlight_video).then((response) => {
        // console.log("222222222222 response : ", response);
        // let booksData = response.works;
        let scoreData = response.tracks;
        let filteredData = [];

        scoreData.forEach((item) => {
          if(item.albumId !== null && item.albumId !== undefined){
            let imgUrl = "http://direct.rhapsody.com/imageserver/v2/albums/"+item.albumId+"/images/300x300.jpg";
            item.coverImgUrl = imgUrl;
            console.log("image: ",imgUrl);
          }

          if(item.previewURL !== null && item.previewURL !== undefined){
              item.customPreviewURL = item.previewURL;
          }
        });
        // console.log("score data : ", scoreData);
        console.log("0000000000000000000000000000000000000000");
        // console.log("filtered data : ", filteredData);
        // box-shadow: 7px 6px grey;
        let argList = [
          {key : "name", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : 'one line', style: 'white-space: normal; margin-top: 3px; color: brown; margin-bottom: 10px; text-align: center; font-size: 16px;'},
          {key : "customPreviewURL", subkey: null, type: "audio", api: 'NAPSTER:playlist', style:'width: 325px; height: 250px; border: none;'},
          {key : "coverImgUrl", subkey: null, type: "image", api: 'NAPSTER:playlist', style:'width: 325px; height: 250px; border: none;'},

          // {key : "thumbnail", subkey: null, type: "image", api: 'SCORE_BAT:hhighlight-video',  onclick: {methodName: 'getScoreBatPreview', params: ['embededIframeSrcUrl'], defaults: ['SCORE_BAT:hhighlight-video'] }, style:'width: 300px; height: 200px; border: none; '},
          // {key : "embed", subkey: null, type: "embededHTML", style:'width: 350px; height: 250px; border: none;'},
        ];
        let payload = {
            data : scoreData,
            argList : argList,
            style : {ellipse : 'one line',
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '325px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        console.log("1111111111111111111111111111111111");
        let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);

        if(scoreData !== null && scoreData.length > 0){

            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              console.log("2222222222222222222222222222222");
              socket.emit("response-napster-music-by-playlistId", {returnMsg : findAlbumResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          // socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }


      });


      });

      function getDataByURL(URL){
        // let response = await request.get(url);
        //   if (response.err) { console.log('error'); return "error"}
        //   else {
        //     console.log('fetched response');
        //     console.log("11111111111111111111\n respose : ", response);
        //     return response;
        //   }

          try{
            var promise = new Promise(function(resolve, reject){
                // console.log("URL : ", URL);
                var options = {
                  method: 'GET',
                  url: URL,
                };

              request(options, function (error, response, body) {
                 if (error) throw new Error(error);
                   body = JSON.parse(body);
                   // console.log("@@@@@@@@@@ body : ", body);
                   resolve(body);
              });
            })

            return promise;
          }catch(e){
              console.log("occured error when fetching bing result ::", e);
          }
      }

      socket.on("request-hacker-news-api", (Request) =>{
        // console.log("@@@@@@@@@@  request-hacker-news-api  @@@@@@@@@@@", Request);
        let apiURL = ' https://hacker-news.firebaseio.com/v0/'+Request.hackerNewsCatgory+'.json?print=pretty';
        // console.log("apiURL : ", apiURL);
        // if(data.from === 'Gini'){
        //     console.log("bookName : ", data.bookName);
        //     open_library_api_by_subject_url = "https://www.googleapis.com/books/v1/volumes?q="+data.bookName;
        // }else{
        //     open_library_api_by_subject_url = "https://www.googleapis.com/books/v1/volumes?q=angularjs";
        // }
        HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
          // console.log(" response : ", response);
          console.log("=========== successfull response ==============");
          let LIMIT = 25;
          let unFilteredDataCount = 0;
          let filteredData = [];
          let resposeData = response;

          if(resposeData.length > LIMIT){
                resposeData = resposeData.slice(1, LIMIT);
          }else{
                LIMIT = resposeData.length;
          }
          // console.log("resposeData data : ", resposeData);


          resposeData.forEach((item) => {

              let customURL = "https://hacker-news.firebaseio.com/v0/item/"+item+".json?print=pretty";
              // let getDataByURLResponse = getDataByURL(customURL);
              getDataByURL(customURL).then((data) => {
                    // console.log("2222222222222222 \n last data : ", data);
                    if(data.url !== null && data.url !== undefined){
                        data.customUrl = data.url;
                        data.customType = "newWindow";
                        data.customImgUrl = 'static/images/hackerNews.jpg';
                        unFilteredDataCount ++;
                        filteredData.push(data);

                    }

                    // let staticHackerNewsImgUrl = ;


                    // console.log("filteredData : ", filteredData);
                    // console.log("88888888888888888888888888888");
                    if(filteredData.length === (LIMIT - (1 + unFilteredDataCount))){
                      // console.log("999999999999999999999999");
                      let argList = [
                        {key : "customImgUrl", subkey: null, type: "image", api: 'HACKER-NEWS:topstories', onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] }, style:'width: 350px; height: 250px; border: none;'},
                        {key : "title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'none', style: 'color: black; font-weight: 500; font-size: 14px;'},
                        {key : "by", subkey: null, type: "block", prefixValue: 'Source : ', postFixValue: '', ellipse : 'one line', style: ''},
                        {key : 'by', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: grey; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
                        {key : 'by', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : '',  onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] }, style: 'font-size: 16px; color: brown; display: inline-block; margin-left: 12px;'},
                        {key : '', subkey: null, type: 'customThreeDots', style: 'display: inline-block; color: red; transform: rotate(90deg); font-size: 20px; float: right; color: black; position: relative; top: 16px; right: -10px;'},

                        // {key : "", subkey: null, type: "button", btnName: 'Read more', onclick: {methodName: 'onOpenModal', params: ['customURL'], defaults: ['HACKER-NEWS:topstories'] },  style: 'background-color: black; color: white;'},

                        // {key : "customPublisher", subkey: null, type: "block", prefixValue: 'Publisher : ', postFixValue: '', ellipse : 'one line', style: ''},
                        // {key : "customPublishDate", subkey: null, type: "block", prefixValue: 'Publisher Date : ', postFixValue: '', ellipse : 'one line', style: ''},
                        // {key : "", subkey: null, type: "button", btnName: 'Add to shelf', onclick: {methodName: 'onClickButtonAction', params: ['customIsbn', 'customTitle', 'customImgUrl'], defaults: ['GOOGLE:books'] },  style: 'background-color: black; color: white;'},
                      ];
                      var payload = {
                          data : filteredData,
                          argList : argList,
                          style : {
                            imgPos : 'top',
                            textAlign : 'left',
                            hScroll: "hScroll",
                            backgroundColor : null,
                            height : null,
                            width : null,
                            padding: null,
                            fontSize: null,
                            defaults : {
                                backgroundColor : 'white',
                                textAlign : 'center',
                                height: 'auto',
                                width : '350px',
                                color: 'grey',
                                fontSize : '13px',
                                padding: '5px 5px',
                                margin : '5px 2px',
                                devider : '0px solid grey',
                                coverPadding : '5px',
                                border: " none",
                                descriptionTemplateStyle : 'background-color: white;'

                            }
                          },
                          emptySlide : 'no'
                      };
                      if(Request.from.split(':')[0] === "NewsApp"){
                        console.log("========= NewsApp =================================");
                          let modifiedImgObj = {key : "customImgUrl", subkey: null, type: "image", api: 'HACKER-NEWS:topstories', onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] }, style:'width: 350px; height: 250px; border: none;'};
                          payload.style.defaults.width = '350px';
                          payload.style.defaults.marginBottom = '1rem';
                          if(Request.from.split(':')[1] === 'sideMenu'){
                            console.log("=========== from sideMenue ===============");
                            payload.style.defaults.margin = '12px 0px';

                          }else if(Request.from.split(':')[1] === 'home'){
                            console.log("=========== from home ===============");

                            payload.style.defaults.margin = '12px 3px';

                          }
                          payload.style.defaults.padding = '0px 0px;';


                          payload.argList[0] = modifiedImgObj;

                      }
                      let findAlbumResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
                      // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
                      if(filteredData !== null && filteredData.length > 0){
                          if(Request.from === 'Gini'){
                            socket.emit("query-response", { returnMsg : findAlbumResponseTemplate, displayType : 'horizontalSlide'});
                          }else if(Request.from === "Api"){
                            // console.log("2222222222222222222222222222222");
                            //yet to be impleented
                            // socket.emit("request-hacker-news-api", {returnMsg : findAlbumResponseTemplate});
                          }else if(Request.from === "NewsApp:home" || Request.from === "NewsApp:sideMenu"){
                            console.log("=========== NewsApp ============");
                            socket.emit("news-api-response", { returnMsg : findAlbumResponseTemplate, resposeTeplateId : Request.resposeTeplateId, loaderId : Request.loaderId, displayType : 'horizontalSlide'});

                          }
                      }else{
                        let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
                        // socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
                      }
                    }
              })

              // msg(customURL).then((data) => {
              //   console.log("333333333333333 last data : ", data);
              // });

          })





        });


      });

      // ============================     START : CANNABIS API FUNCTIONALITY    ==================================

      socket.on("request-portfolio-data", (request) => {
        CUSTOM_PORTFOLIO_SERVICE.PORTFOLIO_API_PROCESSING(request, socket);
      });

      socket.on("open-source-api-request", (request) => {
        OPEN_SOURCE_SERVICE.OPEN_SOURCE_API_PROCCESSING(request, socket);
      });

      socket.on("request-video-conf-call", (request) => {
        VIDEO_CONF_SERVICES.VIDEO_CONF_API_PROCCESSING(request, socket);
      });

      socket.on("github-who-covid19-api-request", (request) => {
        GITHUB_WHO_COVID19_API_SERVICE.GITHUB_WHO_COVID19_API_PROCCESSING(request, socket);
      });

      socket.on("nasa-api-request", (request) => {
        NASA_SERVICE.NASA_API_PROCCESSING(request, socket);
      });

      socket.on("cannabis-api-request", (request) => {
        CANNABIS_SERVICE.CANNABIS_API_PROCCESSING(request, socket);
      });

      socket.on("cannabis-api-request", (request) => {

      let newTemplate = CANNABIS_SERVICE.CANNABIS_API_PROCCESSING(request, socket);
      console.log("==========================================\n\n");
      // console.log("new template : ", newTemplate);

      console.log("==========================================\n\n");

      var defaultCannabisTemplateArgList = [
          // {key : "imgUrl", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', onclick: {methodName: 'getNewsByCustomFilter', params: ['url'], defaults: ['NEWSAPI:country'] }, style:'width: 200px; height: 125px; display: inline-block;'},
          {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; text-align: center; position: relative; "},
          {key : "image", subkey: null, type: "image", api: 'NEWSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['NEWSAPI:newsByCategory'] }, style:'width: 275px; height: 150px; border: none;'},

      ];
      var defaultCannabisConditionsTemplateArgList = [
          {key : "image", subkey: null, type: "image", api: 'API:cannabis', onclick: {methodName: 'onOpenModal', params: ['slug', 'customType'], defaults: ['API:cannabis'] }, style:'width: 275px; height: 150px; border: none;'},
          {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; text-align: center; position: relative; "},
          {key : "description", subkey: null, type: "block", prefixValue: 'Description: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 700; font-size: 14px; text-align: center; position: relative; "},

      ];
      var defaultCannabisStudyTemplateArgList = [
          // {key : "imgUrl", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', onclick: {methodName: 'getNewsByCustomFilter', params: ['url'], defaults: ['NEWSAPI:country'] }, style:'width: 200px; height: 125px; display: inline-block;'},
          {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; text-align: center; position: relative; font-style: normal; font-family: serif; font-size: larger;"},
          {key : "image", subkey: null, type: "image", api: 'NEWSAPI:newsByCategory', style:'width: 350px; height: 250px; border: none;'},
          {key : "slug", subkey: null, type: "block", prefixValue: 'Description: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
          {key : "keyFindings", subkey: null, type: "block", prefixValue: 'Key Findings: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
          {key : "year", subkey: null, type: "block", prefixValue: 'Year: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
          {key : 'name', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: grey; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
          {key : 'name', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : '',  style: 'font-size: 16px; color: brown; display: inline-block; margin-left: 12px; width: 65%; word-break: break-all;'},
      ];

      var defaultCannabisProductsTemplateArgList = [
          // {key : "imgUrl", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', onclick: {methodName: 'getNewsByCustomFilter', params: ['url'], defaults: ['NEWSAPI:country'] }, style:'width: 200px; height: 125px; display: inline-block;'},
          {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; text-align: center; position: relative; font-style: normal; font-family: serif; font-size: larger;"},
          {key : "image", subkey: null, type: "image", api: 'NEWSAPI:newsByCategory', style:'width: 350px; height: 250px; border: none;'},
          {key : "description", subkey: null, type: "block", prefixValue: 'Description: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
          {key : "type", subkey: null, type: "block", prefixValue: 'Type: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
          {key : "thc", subkey: null, type: "block", prefixValue: 'THC: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
          {key : "cbd", subkey: null, type: "block", prefixValue: 'CBD: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
          {key : "year", subkey: null, type: "block", prefixValue: 'Year: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},

          {key : 'name', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: grey; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
          {key : 'name', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : '',  style: 'font-size: 16px; color: grey; display: inline-block; margin-left: 12px; width: 65%; word-break: break-all;'},
      ];

      let payload = {
          data : null,
          argList : null,
          style : {
            imgPos : 'top',
            textAlign : 'left',
            hScroll: "hScroll",
            backgroundColor : null,
            height : null,
            width : null,
            padding: null,
            fontSize: null,
            defaults : {
                backgroundColor : 'white',
                textAlign : 'center',
                height: 'auto',
                width : '350px',
                color: 'grey',
                fontSize : '13px',
                padding: '0px 0px',
                margin : '0px 3px',
                devider : '0px solid grey',
                coverPadding : '5px',
                border: "none",
                // borderBottom: 'none',
                descriptionTemplateStyle : 'background-color: white;'

            }
          },
          emptySlide : 'no'
      };
      var apiURL = null;
      var argList = null;
      if(request.category === "product_by_strains"){
          apiURL = "https://api.otreeba.com/v1/strains?count=15&sort=-createdAt";
          argList = defaultCannabisTemplateArgList;
          payload.style.defaults.width = '277px';
          payload.style.defaults.border = '1px solid whitesmoke';

          // payload.style.defaults.width = '175px';

      }else if(request.category === "product_by_brands"){
          apiURL = "https://api.otreeba.com/v1/brands?count=15&sort=-createdAt";
          argList = defaultCannabisTemplateArgList;
          payload.style.defaults.width = '277px';
          payload.style.defaults.border = '1px solid whitesmoke';
      }else if(request.category === "recent_cannabis_study"){
          apiURL = "https://api.otreeba.com/v1/studies?count=10&sort=-createdAt";
          argList = defaultCannabisStudyTemplateArgList;
      }else if(request.category === "extracts_by_cannabis"){
          apiURL = "https://api.otreeba.com/v1/extracts?count=10&sort=-createdAt";
          argList = defaultCannabisProductsTemplateArgList;
      }else if(request.category === "flowers_by_cannabis"){
          apiURL = "https://api.otreeba.com/v1/flowers?count=10&sort=-createdAt";
          argList = defaultCannabisProductsTemplateArgList;
      }else if(request.category === "edibles_by_cannabis"){
          apiURL = "https://api.otreeba.com/v1/edibles?count=10&sort=-createdAt";
          argList = defaultCannabisProductsTemplateArgList;
      }else if(request.category === "recent_cannabis_conditions"){
          //let defaultCondition = "acne";
          apiURL = "https://api.otreeba.com/v1/studies/conditions?sort=name";
          argList = defaultCannabisConditionsTemplateArgList;
          console.log("api url: ", apiURL);
          payload.style.defaults.width = '175px';

      }else if(request.category === "cannabis_study_by_condition"){
          let defaultCondition = "acne";
          apiURL = "https://api.otreeba.com/v1/studies/conditions/"+request.filterBy+"?count=10&sort=-year";
          argList = defaultCannabisStudyTemplateArgList;
      }else if(request.category === "products_by_cannabis"){
          apiURL = "https://api.otreeba.com/v1/products?count=10&sort=-createdAt";
          argList = defaultCannabisProductsTemplateArgList;
          // console.log("api url: ", apiURL);

      }else{

      }



      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let finalData = response.data;
        let filteredData = [];

        finalData.forEach((item) => {
              item.customType = "newWindow";

              if(item.image === null || item.image === undefined || (item.image.indexOf("no_image") !== -1)){
                  item.image = 'static/images/cannabis_study.jpg';
              }else if(request.category === "product_by_brands" && (item.image === "https://www.cannabisreports.com")){
                  console.log("===============");
                  // console.log("item.image : ", item.image);
                  item.image = 'static/images/cannabis.png';

              }
              if(request.category === "recent_cannabis_conditions"){
                  item.customType = "cannabis_study_by_condition";
                  // console.log("finalData :" , finalData);
              }

        })

        payload.data = finalData;
        payload.argList = argList;


        let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);

        // console.log(" final template : ", template);
        if(finalData !== null && finalData.length > 0){
            if(request.from === 'Gini'){
              socket.emit("cannabis-api-response", { returnMsg : template, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});
            }else if(request.from === "Api"){
              // socket.emit("response-openwhyd-playlist-by-genre", {returnMsg : findResponseTemplate});
            }
        }else{
          let template = "<i>We are finding some problem. <br> Please try again later.<strong></strong></i>";
          socket.emit("query-response", { returnMsg : template});
        }
      });

    })

      // ============================     START : CANNABIS API FUNCTIONALITY    ==================================


      // ============================     START : OPENWHYD MUSIC API    ==================================

      socket.on("request-openwhyd-playlist-category", (data) => {
      let bookCat = DUMMY_QUIZ_DATA.OPENWHYD_MUSIC_GENERE_CATEGORY;
      let argList = [
        {key : "name", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : 'one line', style: '    white-space: normal; margin-top: 3px; text-align: center; font-size: 20px; color: black; font-weight: 900;'},
        {key : "imgUrl", subkey: null, type: "image", api: 'OPENWHYD:genre-category', onclick: {methodName: 'getProductsById', params: ['value',], defaults: ['OPENWHYD:genre-category'] }, style:'width: 325px; height: 200px; border: none;'},

      ];
      let payload = {
          data : bookCat,
          argList : argList,
          style : {
            imgPos : 'top',
            textAlign : 'left',
            hScroll: "hScroll",
            backgroundColor : null,
            height : null,
            width : null,
            padding: null,
            fontSize: null,
            defaults : {
                backgroundColor : 'white',
                textAlign : 'center',
                height: 'auto',
                width : '338px',
                color: 'grey',
                fontSize : '13px',
                padding: '5px 5px',
                margin : '5px 2px',
                devider : '0px solid grey',
                coverPadding : '5px',
                border: " 1px solid whitesmoke",
                descriptionTemplateStyle : 'background-color: whitesmoke;'

            }
          },
          emptySlide : 'no'
      };
      console.log("1111111111111111111111111111111111");
      let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        if(data.from === 'gini'){
          socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
        }else if(data.from === 'Api'){
          socket.emit("response-openwhyd-playlist-category", {returnMsg : findResponseTemplate});
        }

    })

      socket.on("request-openwhyd-playlist-by-genre", (data) => {
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // console.log("@@@@@ data :: ", data);
      let LIIMIT = 100;
      let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let albumData = response;
        let filteredData = [];
        albumData.forEach((item) => {
            if(item.eId !== null && item.eId !== undefined){
                let eId = item.eId.split("/");
                // console.log("eid :: ", eId);
                if(eId[1] === 'yt'){
                  item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                  filteredData.push(item);
                }
            }
        })

        let argList = [
          // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
          // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
          {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
          {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
        ];
        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '400px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(albumData !== null && albumData.length > 0){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-openwhyd-playlist-by-genre", {returnMsg : findResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }
      });

    })

      //===============================  START :: SHOWING OPENWHYD PLALISTS ============================
      //1
      socket.on("request-openwhyd-playlist-by-genre-one", (data) => {
      // console.log("@@@@@ data :: ", data);
      let LIIMIT = 100;
      let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let albumData = response;
        let filteredData = [];
        if(albumData.length > 20){
              albumData = albumData.slice(1, 20);
        }
        albumData.forEach((item) => {
            if(item.eId !== null && item.eId !== undefined){
                let eId = item.eId.split("/");
                // console.log("eid :: ", eId);
                if(eId[1] === 'yt'){
                  item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                  filteredData.push(item);
                }
            }
        })
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        let argList = [
          // {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 318px; height: 250px; border: none;'},
          // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
          // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
          {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
          {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
        ];
        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '400px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(albumData !== null && albumData.length > 0){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-openwhyd-playlist-by-genre-one", {returnMsg : findResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }
      });

    })

      //2

      socket.on("request-openwhyd-playlist-by-genre-two", (data) => {
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // console.log("@@@@@ data :: ", data);
        let LIIMIT = 100;
        let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

        HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
          // console.log(" response : ", response);
          let albumData = response;
          let filteredData = [];
          if(albumData.length > 20){
                albumData = albumData.slice(1, 20);
          }
          albumData.forEach((item) => {
              if(item.eId !== null && item.eId !== undefined){
                  let eId = item.eId.split("/");
                  // console.log("eid :: ", eId);
                  if(eId[1] === 'yt'){
                    item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                    filteredData.push(item);
                  }
              }
          })

          let argList = [
            // {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
            // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
            // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
            {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
            {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
          ];
          let payload = {
              data : filteredData,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '400px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
          if(albumData !== null && albumData.length > 0){
              if(data.from === 'Gini'){
                socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
              }else if(data.from === "Api"){
                socket.emit("response-openwhyd-playlist-by-genre-two", {returnMsg : findResponseTemplate});
              }
          }else{
            let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
            socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
          }
        });

      })

      //3

      socket.on("request-openwhyd-playlist-by-genre-three", (data) => {
          // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
          // console.log("@@@@@ data :: ", data);
          let LIIMIT = 100;
          let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

          HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
            // console.log(" response : ", response);
            let albumData = response;
            let filteredData = [];
            if(albumData.length > 20){
                  albumData = albumData.slice(1, 20);
            }
            albumData.forEach((item) => {
                if(item.eId !== null && item.eId !== undefined){
                    let eId = item.eId.split("/");
                    // console.log("eid :: ", eId);
                    if(eId[1] === 'yt'){
                      item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                      filteredData.push(item);
                    }
                }
            })


            let argList = [
              // {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
              // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
              // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
              {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
              {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
              {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
              {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
            ];
            let payload = {
                data : filteredData,
                argList : argList,
                style : {
                  imgPos : 'top',
                  textAlign : 'left',
                  hScroll: "hScroll",
                  backgroundColor : null,
                  height : null,
                  width : null,
                  padding: null,
                  fontSize: null,
                  defaults : {
                      backgroundColor : 'white',
                      textAlign : 'center',
                      height: 'auto',
                      width : '400px',
                      color: 'grey',
                      fontSize : '13px',
                      padding: '5px 5px',
                      margin : '5px 2px',
                      devider : '0px solid grey',
                      coverPadding : '5px',
                      border: " 1px solid whitesmoke",
                      descriptionTemplateStyle : 'background-color: whitesmoke;'

                  }
                },
                emptySlide : 'no'
            };
            let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
            // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
            if(albumData !== null && albumData.length > 0){
                if(data.from === 'Gini'){
                  socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
                }else if(data.from === "Api"){
                  socket.emit("response-openwhyd-playlist-by-genre-three", {returnMsg : findResponseTemplate});
                }
            }else{
              let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
              socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
            }
          });

        })

      //4
      socket.on("request-openwhyd-playlist-by-genre-four", (data) => {
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // console.log("@@@@@ data :: ", data);
      let LIIMIT = 100;
      let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let albumData = response;
        let filteredData = [];
        if(albumData.length > 20){
              albumData = albumData.slice(1, 20);
        }
        albumData.forEach((item) => {
            if(item.eId !== null && item.eId !== undefined){
                let eId = item.eId.split("/");
                // console.log("eid :: ", eId);
                if(eId[1] === 'yt'){
                  item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                  filteredData.push(item);
                }
            }
        })

        let argList = [
          // {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
          // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
          // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
          {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
          {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
        ];
        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '400px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(albumData !== null && albumData.length > 0){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-openwhyd-playlist-by-genre-four", {returnMsg : findResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }
      });

      })

      //5
      socket.on("request-openwhyd-playlist-by-genre-five", (data) => {
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // console.log("@@@@@ data :: ", data);
      let LIIMIT = 100;
      let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";
      console.log("@@@@ apiURL : ", apiURL);
      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let albumData = response;
        let filteredData = [];
        if(albumData.length > 20){
              albumData = albumData.slice(1, 20);
        }
        albumData.forEach((item) => {
            if(item.eId !== null && item.eId !== undefined){
                let eId = item.eId.split("/");
                // console.log("eid :: ", eId);
                if(eId[1] === 'yt'){
                  item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                  filteredData.push(item);
                }
            }
        })

        let argList = [
          // {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
          // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
          // {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 318px; height: 250px; border: none;'},
          // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
          {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
          {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
        ];
        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '400px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(albumData !== null && albumData.length > 0){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-openwhyd-playlist-by-genre-five", {returnMsg : findResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }
      });

      })
      //===============================  START :: SHOWING OPENWHYD PLALISTS ============================


      // ============================     END : OPENWHYD MUSIC API    ==================================

      //===============================  START :: TMDB MOVIE  ============================
      let popularPersonsKnownForMovies = [];
      socket.on("request-tmdb-movies", (data) => {
      // console.log("@@@@@ data :: ", data);
      let LIIMIT = 100;
      let apiURL = '';
      let argList = [];
      let tempApi = data.api;
      let moviesStatusKeyword = false;
      if(tempApi.split("_").length > 1){
          // console.log("$$$$ requested for similar movies from type :: ", data.api.split("_")[0]);
          if(data.api === 'TMDB:popular-person_popular-movies_similiar-movies' || data.api === 'TMDB:popular-person_popular-movies_recommedations'){
              moviesStatusKeyword = tempApi.split("_")[2];
              data.api = tempApi.split("_")[0] +'_'+ tempApi.split("_")[2];

          }else{
              moviesStatusKeyword = tempApi.split("_")[1];
              data.api = tempApi.split("_")[0] +'_'+ tempApi.split("_")[1];

          }
          // console.log("moviesStatusKeyword : ", moviesStatusKeyword);
      }

      console.log("======= data.api : ", data.api);
      console.log("======= moviesStatusKeyword : ", moviesStatusKeyword);

      let defaultMovieTemplateArgList = [
        {key : "customTmdbImgURL", subkey: null, type: "image", api: 'TMDB:popular',  style:'width: 350px; height: 220px; border: none;'},
        {key : "title", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: 'color: black; font-size: 16px; font-weight: 700;'},
        {key : "overview", subkey: null, type: "block", prefixValue: 'Overview : ', postFixValue: '', ellipse : 'one line', style: ''},
        {key : "vote_average", subkey: null, type: "block", prefixValue: 'Rating : ', postFixValue: '', ellipse : 'one line', style: ''},
        {key : "release_date", subkey: null, type: "block", prefixValue: 'Release Date : ', postFixValue: '', ellipse : 'one line', style: ''},
        {key : "", subkey: null, type: "button", btnName: 'WATCH TRAILER', onclick: {methodName: 'onClickButtonAction', params: ['id'], defaults: [data.api+'-trailer-by-movie-id'] },  style: 'background-color: black; color: white; border-radius: 0px; width: 50%; font-size: 10px; padding-top: 10px; padding-bottom: 8px;'},
        {key : "", subkey: null, type: "button", btnName: 'SIMILAR MOVIES', onclick: {methodName: 'onClickButtonAction', params: ['id'], defaults: [data.api+"_similiar-movies"] },  style: 'background-color: black; color: white; border-radius: 0px; width: 50%; margin-left: -4px; font-size: 10px; padding-top: 10px; padding-bottom: 8px;'},
        {key : "", subkey: null, type: "button", btnName: 'RECOMMENDATIONS', onclick: {methodName: 'onClickButtonAction', params: ['id'], defaults: [data.api+"_recommedations"] },  style: 'background-color: black; color: white; border-radius: 0px; display: block; font-size: 10px; padding-top: 10px; padding-bottom: 8px; margin-top: -1px;'},

      ];

      let defaultPeopleTemplateArgList = [
        {key : "customTmdbImgURL", subkey: null, type: "image", api: 'TMDB:popular',  style:'width: 350px; height: 220px; border: none;'},
        {key : "name", subkey: null, type: "block", prefixValue: 'Name : ', postFixValue: '', ellipse : 'one line', style: 'color: black; font-size: 16px; font-weight: 700;'},
        {key : "known_for_department", subkey: null, type: "block", prefixValue: 'Department : ', postFixValue: '', ellipse : 'one line', style: ''},
        {key : "popularity", subkey: null, type: "block", prefixValue: 'Popularity : ', postFixValue: '', ellipse : 'one line', style: ''},
        {key : "", subkey: null, type: "button", btnName: 'POPULAR MOVIES', onclick: {methodName: 'onClickButtonAction', params: ['CustomIndex'], defaults: [data.api+'_popular-movies'] },  style: 'background-color: black; color: white; border-radius: 0px; width: 100%; font-size: 10px; padding-top: 10px; padding-bottom: 8px;'},

      ];

      let defaultTvTemplateArgList = [
        {key : "customTmdbImgURL", subkey: null, type: "image", api: 'TMDB:popular',  style:'width: 350px; height: 220px; border: none;'},
        {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: 'color: black; font-size: 16px; font-weight: 700;'},
        {key : "overview", subkey: null, type: "block", prefixValue: 'Overview : ', postFixValue: '', ellipse : 'one line', style: ''},
        {key : "vote_average", subkey: null, type: "block", prefixValue: 'Rating : ', postFixValue: '', ellipse : 'one line', style: ''},
        {key : "first_air_date", subkey: null, type: "block", prefixValue: 'First Air Date : ', postFixValue: '', ellipse : 'one line', style: ''},
        {key : "", subkey: null, type: "button", btnName: 'WATCH TRAILER', onclick: {methodName: 'onClickButtonAction', params: ['id'], defaults: [data.api+'-trailer-by-tv-show-id'] },  style: 'background-color: black; color: white; border-radius: 0px; width: 50%; font-size: 10px; padding-top: 10px; padding-bottom: 8px;'},
        {key : "", subkey: null, type: "button", btnName: 'SIMILAR TV SHOWS', onclick: {methodName: 'onClickButtonAction', params: ['id'], defaults: [data.api+"_similiar-tv-shows"] },  style: 'background-color: black; color: white; border-radius: 0px; width: 50%; margin-left: -4px; font-size: 10px; padding-top: 10px; padding-bottom: 8px;'},
        {key : "", subkey: null, type: "button", btnName: 'RECOMMENDATIONS', onclick: {methodName: 'onClickButtonAction', params: ['id'], defaults: [data.api+"_recommedations"] },  style: 'background-color: black; color: white; border-radius: 0px; display: block; font-size: 10px; padding-top: 10px; padding-bottom: 8px; margin-top: -1px;'},

      ];

      let movieTrailerTemplateArgList = [
        {key : "movieTrailerURL", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
        {key : "name", subkey: null, type: "block", prefixValue: 'Name: ', postFixValue: '', ellipse : 'one line', style: 'color: black; font-size: 16px; font-weight: 700;'},
        {key : "type", subkey: null, type: "block", prefixValue: 'Type : ', postFixValue: '', ellipse : 'one line', style: ''},
      ];

      // console.log("@@@ data.api :: ", data.api);

      if(data.api === "TMDB:topRated-movies"){
        apiURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1";
        argList = defaultMovieTemplateArgList;
      }else if(data.api === "TMDB:popular-movies"){
        apiURL = "https://api.themoviedb.org/3/movie/popular?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1";
        argList = defaultMovieTemplateArgList;
      }else if(data.api === 'TMDB:Upcomming-movies'){
        apiURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
        argList = defaultMovieTemplateArgList;
      }else if(data.api === 'TMDB:now-playing-movies'){
        apiURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
        argList = defaultMovieTemplateArgList;
      }else if(data.api === 'TMDB:trending-movies'){
        apiURL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=0d03584fe653668a0b45e9fa69b46bd2';
        argList = defaultMovieTemplateArgList;
      }else if(data.api === 'TMDB:poplar-tv-shows'){
        apiURL = 'https://api.themoviedb.org/3/tv/popular?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
        argList = defaultTvTemplateArgList;
      }else if(data.api === 'TMDB:latest-tv-shows'){
        apiURL = 'https://api.themoviedb.org/3/tv/latest?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = defaultTvTemplateArgList;
      }else if(data.api === 'TMDB:airiving-today-tv-shows'){
        apiURL = 'https://api.themoviedb.org/3/tv/airing_today?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
        argList = defaultTvTemplateArgList;
      }else if(data.api === 'TMDB:top-rated-tv-shows'){
        apiURL = 'https://api.themoviedb.org/3/tv/top_rated?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
        argList = defaultTvTemplateArgList;
      }else if(data.api === 'TMDB:topRated-movies-trailer-by-movie-id'){
        apiURL = 'https://api.themoviedb.org/3/movie/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:popular-movies-trailer-by-movie-id'){
        apiURL = 'https://api.themoviedb.org/3/movie/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:upcomming-movies-trailer-by-movie-id'){
        apiURL = 'https://api.themoviedb.org/3/movie/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:now-playing-movies-trailer-by-movie-id'){
        apiURL = 'https://api.themoviedb.org/3/movie/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:trending-movies-trailer-by-movie-id'){
        apiURL = 'https://api.themoviedb.org/3/movie/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:poplar-tv-shows-trailer-by-tv-show-id'){
        apiURL = 'https://api.themoviedb.org/3/tv/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:airiving-today-tv-shows-trailer-by-tv-show-id'){
        apiURL = 'https://api.themoviedb.org/3/tv/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:top-rated-tv-shows-trailer-by-tv-show-id'){
        apiURL = 'https://api.themoviedb.org/3/tv/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:similiar-movies'){
        apiURL = 'https://api.themoviedb.org/3/movie/'+data.movieId+'/similar?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
        argList = defaultMovieTemplateArgList;
      }else if(data.api === 'TMDB:popular-person'){
        apiURL = 'https://api.themoviedb.org/3/person/popular?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
        argList = defaultPeopleTemplateArgList;
      }else if(data.api === 'TMDB:popular-person_popular-movies'){
        apiURL = null;
        argList = defaultMovieTemplateArgList;
      }else if(data.api === 'TMDB:popular-movies_similiar-movies-trailer-by-movie-id' ||
              data.api === 'TMDB:popular-movies_recommedations-trailer-by-movie-id' ||
              data.api === 'TMDB:topRated-movies_similiar-movies-trailer-by-movie-id' ||
              data.api === 'TMDB:topRated-movies_recommedations-trailer-by-movie-id' ||
              data.api === 'TMDB:upcomming-movies_similiar-movies-trailer-by-movie-id' ||
              data.api === 'TMDB:upcomming-movies_recommedations-trailer-by-movie-id' ||
              data.api === 'TMDB:now-playing-movies_similiar-movies-trailer-by-movie-id' ||
              data.api === 'TMDB:now-playing-movies_recommedations-trailer-by-movie-id' ||
              data.api === 'TMDB:trending-movies_similiar-movies-trailer-by-movie-id' ||
              data.api === 'TMDB:trending-movies_recommedations-trailer-by-movie-id' ||
              data.api === 'TMDB:popular-person_similiar-movies-trailer-by-movie-id' ||
              data.api === 'TMDB:popular-person_popular-movies-trailer-by-movie-id' ||
              data.api === 'TMDB:popular-person_recommedations-trailer-by-movie-id' ||
              data.api === 'TMDB:popular-person_popular-movies-trailer-by-movie-id-trailer-by-movie-id'
            ){
        console.log("################################################################");
        apiURL = 'https://api.themoviedb.org/3/movie/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:poplar-tv-shows_recommedations-trailer-by-tv-show-id' ||
              data.api === 'TMDB:poplar-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
              data.api === 'TMDB:latest-tv-shows_recommedations-trailer-by-tv-show-id' ||
              data.api === 'TMDB:latest-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
              data.api === 'TMDB:airiving-today-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
              data.api === 'TMDB:airiving-today-tv-shows_recommedations-trailer-by-tv-show-id' ||
              data.api === 'TMDB:top-rated-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
              data.api === 'TMDB:top-rated-tv-shows_recommedations-trailer-by-tv-show-id'
            ){
        console.log("################################################################");
        apiURL = 'https://api.themoviedb.org/3/tv/'+data.movieId+'/videos?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US';
        argList = movieTrailerTemplateArgList;
      }else if(data.api === 'TMDB:poplar-tv-shows_similiar-tv-shows' ||
              data.api === 'TMDB:top-rated-tv-shows_similiar-tv-shows' ||
              data.api === 'TMDB:latest-tv-shows_similiar-tv-shows' ||
              data.api === 'TMDB:airiving-today-tv-shows_similiar-tv-shows' ||
              data.api === 'TMDB:top-rated-tv-shows_recommedations' ||
              data.api === 'TMDB:latest-tv-shows_recommedations' ||
              data.api === 'TMDB:poplar-tv-shows_recommedations' ||
              data.api === 'TMDB:airiving-today-tv-shows_recommedations'
            ){
        console.log("################################################################");
        apiURL = 'https://api.themoviedb.org/3/tv/'+data.movieId+'/similar?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
        argList = defaultTvTemplateArgList;
      }else if(data.api === 'TMDB:poplar-tv-shows_recommedations' ||
              data.api === 'TMDB:poplar-tv-shows_similiar-tv-shows' ||
              data.api === 'TMDB:poplar-tv-shows_similiar-tv-shows'
            ){
        console.log("################################################################");
        apiURL = 'https://api.themoviedb.org/3/tv/'+data.movieId+'/recommendations?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
        argList = defaultTvTemplateArgList;
      }else if(moviesStatusKeyword){
        if(moviesStatusKeyword === 'similiar-movies'){
          // console.log("##########################################################");
          apiURL = 'https://api.themoviedb.org/3/movie/'+data.movieId+'/similar?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
          argList = defaultMovieTemplateArgList;
        }else if(moviesStatusKeyword === 'recommedations'){
          // console.log("********************************************************************");
          apiURL = 'https://api.themoviedb.org/3/movie/'+data.movieId+'/recommendations?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1';
          argList = defaultMovieTemplateArgList;
          // console.log("***** apiURL : ", apiURL);
        }
      }else {
        apiURL = "https://api.themoviedb.org/3/movie/popular?api_key=0d03584fe653668a0b45e9fa69b46bd2&language=en-US&page=1";
        argList = defaultMovieTemplateArgList;
      }



      // console.log("apiURL: ", apiURL);
      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let albumData;
        let filteredData = [];
        let responseType = '';

        if((response.results !== null && response.results !== undefined && response.results.length > 0) || response === "SERVER_SIDE_DATA"){
            if(response === "SERVER_SIDE_DATA"){
                if(data.api === 'TMDB:popular-person_popular-movies'){
                  console.log("=========== popular person known for movies ============");
                  albumData = popularPersonsKnownForMovies[data.movieId];
                }
            }else{
              albumData = response.results;
            }
            responseType = 'ARRAY';
            albumData.forEach((item, index) => {
                if(item.poster_path !== null && item.poster_path !== undefined){
                      item.customTmdbImgURL = "http://image.tmdb.org/t/p/w185/"+item.poster_path+"";
                }

                if(data.api === 'TMDB:topRated-movies-trailer-by-movie-id'){
                    item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
                }else if(data.api === 'TMDB:popular-movies-trailer-by-movie-id'){
                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
                }else if(data.api === 'TMDB:trending-movies-trailer-by-movie-id'){
                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;

                }else if(data.api === 'TMDB:now-playing-movies-trailer-by-movie-id'){
                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;

                }else if(data.api === 'TMDB:upcomming-movies-trailer-by-movie-id'){
                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;

                }else if(data.api === "TMDB:poplar-tv-shows-trailer-by-tv-show-id"){
                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
                }else if(data.api === "TMDB:latest-tv-shows-trailer-by-tv-show-id"){
                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
                }else if(data.api === "TMDB:airiving-today-tv-shows-trailer-by-tv-show-id"){
                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
                }else if(data.api === "TMDB:top-rated-tv-shows-trailer-by-tv-show-id"){
                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
                }else if(data.api === 'TMDB:popular-movies_similiar-movies-trailer-by-movie-id' ||
                        data.api === 'TMDB:popular-movies_recommedations-trailer-by-movie-id' ||
                        data.api === 'TMDB:topRated-movies_similiar-movies-trailer-by-movie-id' ||
                        data.api === 'TMDB:topRated-movies_recommedations-trailer-by-movie-id' ||
                        data.api === 'TMDB:upcomming-movies_similiar-movies-trailer-by-movie-id' ||
                        data.api === 'TMDB:upcomming-movies_recommedations-trailer-by-movie-id' ||
                        data.api === 'TMDB:now-playing-movies_similiar-movies-trailer-by-movie-id' ||
                        data.api === 'TMDB:now-playing-movies_recommedations-trailer-by-movie-id' ||
                        data.api === 'TMDB:trending-movies_similiar-movies-trailer-by-movie-id' ||
                        data.api === 'TMDB:trending-movies_recommedations-trailer-by-movie-id' ||
                        data.api === 'TMDB:popular-person_similiar-movies-trailer-by-movie-id' ||
                        data.api === 'TMDB:popular-person_popular-movies-trailer-by-movie-id' ||
                        data.api === 'TMDB:popular-person_recommedations-trailer-by-movie-id' ||
                        data.api === 'TMDB:popular-person_popular-movies-trailer-by-movie-id-trailer-by-movie-id'
                      ){
                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
                }else if(data.api === 'TMDB:poplar-tv-shows_recommedations-trailer-by-tv-show-id' ||
                        data.api === 'TMDB:poplar-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
                        data.api === 'TMDB:latest-tv-shows_recommedations-trailer-by-tv-show-id' ||
                        data.api === 'TMDB:latest-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
                        data.api === 'TMDB:airiving-today-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
                        data.api === 'TMDB:airiving-today-tv-shows_recommedations-trailer-by-tv-show-id' ||
                        data.api === 'TMDB:top-rated-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
                        data.api === 'TMDB:top-rated-tv-shows_recommedations-trailer-by-tv-show-id'
                      ){

                  item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
                  console.log("################################################################");
                }else if(data.api === 'TMDB:popular-person'){
                      if(item.profile_path !== null && item.profile_path !== undefined){
                            item.customTmdbImgURL = "http://image.tmdb.org/t/p/w185/"+item.profile_path+"";
                      }
                      item.CustomIndex = index;
                      let knownForMoviesObj = {};
                      popularPersonsKnownForMovies.push(item.known_for);

                }


                filteredData.push(item);

            })
        }else{
          // albumData = response;
          albumData = response;
          let item = response;
          responseType = 'OBJECT';

          // console.log("!!!!!!!!! respose : ", response);
          // console.log("!!!!!!!!! backdrop_path: ", item.backdrop_path);
          console.log("!!!!!!!!! poster_path: ", item.poster_path);


          if(item.poster_path !== null && item.poster_path !== undefined){
                item.customTmdbImgURL = "http://image.tmdb.org/t/p/w185/"+item.poster_path+"";
          }else{
              item.customTmdbImgURL = 'static/images/tvShows.jpg';
          }

          if(data.api === 'TMDB:topRated-movies-trailer-by-movie-id'){
              item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
          }else if(data.api === 'TMDB:popular-movies-trailer-by-movie-id'){

            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;

          }else if(data.api === 'TMDB:trending-movies-trailer-by-movie-id'){
            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;

          }else if(data.api === 'TMDB:now-playing-movies-trailer-by-movie-id'){
            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;

          }else if(data.api === 'TMDB:upcomming-movies-trailer-by-movie-id'){
            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;

          }else if(data.api === "TMDB:poplar-tv-shows-trailer-by-tv-show-id"){
            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
          }else if(data.api === "TMDB:latest-tv-shows-trailer-by-tv-show-id"){
            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
          }else if(data.api === "TMDB:airiving-today-tv-shows-trailer-by-tv-show-id"){
            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
          }else if(data.api === "TMDB:top-rated-tv-shows-trailer-by-tv-show-id"){
            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
          }else if(data.api === 'TMDB:popular-movies_similiar-movies-trailer-by-movie-id' ||
                  data.api === 'TMDB:topRated-movies_similiar-movies-trailer-by-movie-id' ||
                  data.api === 'TMDB:Upcomming-movies_similiar-movies-trailer-by-movie-id' ||
                  data.api === 'TMDB:now-playing-movies_similiar-movies-trailer-by-movie-id' ||
                  data.api === 'TMDB:trending-movies_similiar-movies-trailer-by-movie-id' ||
                  data.api === 'TMDB:popular-movies_recommedations-trailer-by-movie-id' ||
                  data.api === 'TMDB:trending-movies_recommedations-trailer-by-movie-id' ||
                  data.api === 'TMDB:trending-movies_recommedations-trailer-by-movie-id' ||
                  data.api === 'TMDB:trending-movies_recommedations-trailer-by-movie-id' ||
                  data.api === 'TMDB:trending-movies_recommedations-trailer-by-movie-id'
                ){
            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
            let dupApi = data.api;
            let customMovieApi = dupApi.split('_')[0]+'-trailer-by-movie-id';
            data.api = customMovieApi;
          }else if(data.api === 'TMDB:poplar-tv-shows_recommedations-trailer-by-tv-show-id' ||
                  data.api === 'TMDB:poplar-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
                  data.api === 'TMDB:latest-tv-shows_recommedations-trailer-by-tv-show-id' ||
                  data.api === 'TMDB:latest-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
                  data.api === 'TMDB:airiving-today-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
                  data.api === 'TMDB:airiving-today-tv-shows_recommedations-trailer-by-tv-show-id' ||
                  data.api === 'TMDB:top-rated-tv-shows_similiar-tv-shows-trailer-by-tv-show-id' ||
                  data.api === 'TMDB:top-rated-tv-shows_recommedations-trailer-by-tv-show-id'
                ){

            item.movieTrailerURL = "https://www.youtube.com/embed/"+item.key;
            console.log("################################################################");
          }

          filteredData.push(item);
        }

        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '350px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '0px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: "",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        if(data.api === 'TMDB:latest-tv-shows'){
            // console.log("findResponseTemplate : ", findResponseTemplate);
        }
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(albumData !== null && albumData.length > 0 && responseType === 'ARRAY'){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-tmdb-movies", {returnMsg : findResponseTemplate, api: data.api});
            }
        }else if(responseType === 'OBJECT' && albumData !== null && albumData !== undefined){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-tmdb-movies", {returnMsg : findResponseTemplate, api: data.api});
            }
        }else{
          // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            let template = '';
            let style = "text-align: center; width: 355px; height: 100px; background-color: brown; color: white; vertical-align: middle; padding-top: 40px;"
            if(moviesStatusKeyword && moviesStatusKeyword === 'similiar-movies'){
              template = `<div style="`+style+`text-align:center;">Oops, sorry we didn't find any <strong><i> SIMILAR MOVIES </i></strong>.</div>`;
            }else if(moviesStatusstyleKeyword && moviesStatusKeyword === 'recommedations'){
                template = `<div style="`+style+`text-align:center;">Oops, sorry we didn't find any <strong><i> RECOMMENDATIONS </i></strong>.</div>`;
              }else{
              template = `<div style="`+style+`text-align:center;">Oops, sorry we didn't find anything.</div>`;
            }
            socket.emit("response-tmdb-movies", { returnMsg : template, api : data.api, moviesStatusKeyword : "ERROR"});
        }
      });

    })

      //===============================  END :: TMDB MOVIE ============================

      socket.on("request-moumita-creation", function(response){
          // console.log("DUMMY_NEWS_DATA.newsApiResponse : \n", DUMMY_NEWS_DATA.newsApiResponse);
          // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
          console.log("================ CALLING NEWS API REQUEST ================");
              let mouitasCreation = [
                {name: 'LOGO ONE', logoImgUrl: 'static/images/moumita1.jpg'},
                {name: 'OME OSTEO MEDICAL ENTERPRISE', logoImgUrl: 'static/images/momita2.jpg'},
                {name: 'ZONEWIND', logoImgUrl: 'static/images/momita3.jpg'},
                {name: 'ILLMATIC WATCHES', logoImgUrl: 'static/images/moumita4.jpg'},
                {name: 'SUGAR BEES', logoImgUrl: 'static/images/moumita5.jpg'},
                {name: 'AALS UK WORKSHOP 2019', logoImgUrl: 'static/images/moumita6.jpg'},
                {name: 'ALFAZEMA', logoImgUrl: 'static/images/moumita7.jpg'},
                {name: 'SOCIAL WORKERS FOR CLIMATE ACTION', logoImgUrl: 'static/images/moumita8.jpg'},
                {name: 'MIXED LOGOS', logoImgUrl: 'static/images/moumita9.jpg'},
                {name: 'MIXED LOGOS', logoImgUrl: 'static/images/moumita10.jpg'},
                {name: 'JOBS 4 PRETEENS', logoImgUrl: 'static/images/moumita11.jpg'},
                {name: 'ORIENTAL EXPRESSIONS', logoImgUrl: 'static/images/moumita12.jpg'}
              ];
              let argList = [
                  {key : "name", subkey: null, type: "block", prefixValue: 'NAME : ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; fot-weight: 700; font-size: 16px; text-align: center;"},
                  {key : "logoImgUrl", subkey: null, type: "image", prefixValue: '', postFixValue: '', ellipse : 'one line', style:'width: 350px; height: 200px;'},
              ];

              let scrollType = null;
              if(response.scrollType === 'horizontal'){
                    scrollType = 'horizontal';
              }else{
                    scrollType = null;
              }

              let payload = {
                  data : mouitasCreation,
                  argList : argList,
                  style : {
                    imgPos : 'top',
                    textAlign : 'left',
                    hScroll: scrollType,
                    backgroundColor : null,
                    height : null,
                    width : null,
                    padding: null,
                    fontSize: null,
                    defaults : {
                        backgroundColor : 'white',
                        textAlign : 'center',
                        height: 'auto',
                        width : '350px',
                        color: 'grey',
                        fontSize : '13px',
                        padding: '',
                        margin : '5px 2px',
                        devider : '0px solid grey',
                        coverPadding : '5px',
                        border: "",
                        descriptionTemplateStyle : 'background-color: whitesmoke;'

                    }
                  },
                  emptySlide : 'no'
              };
              let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
              // console.log("geerated teplate \n: ", template);
              if(mouitasCreation.length && response.from === "Api"){
                // console.log("6666666666666666666666666666666666666666666666666");
                 // template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
                 // console.log("\n\n@@@@ sound cloud api template : \n", template);
                 socket.emit("response-moumita-creation", { returnMsg : template, loaderId: response.loaderId, resposeTeplateId: response.resposeTeplateId});
              }else if(data.articles.length && response.from === "Gini"){
                 // console.log("777777777777777777777777777777777777777777");
                 template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
                 socket.emit("query-response", { returnMsg : template, displayType : 'horizontalSlide'});

              }else{
                teplate = "OOps I am unable to fetch any thing from web. Try after some time";
                socket.emit("query-response", { returnMsg : template, displayType : 'horizontalSlide'});

              }

      })


});
//========================= [end]  maintaining the chat application flow ===========================


// var myImage = "./1108.png";

// var myImage = "./1108.png";
var myImage = "./ocrTest1.png";



// var okrabyte = require("okrabyte");
// okrabyte.decodeFile(myImage, function(error, data){
//   console.log("=== process ocrbyte ocr in progress ===");
//   console.log("-----------------------------------------------");
//   console.log(data); // Hello World!
// });

// var tesseract = require('node-tesseract');
//
// tesseract.process(myImage, (err, text) => {
//     if(err){
//         return console.log("An error occured: ", err);
//     }
//
//     console.log("Recognized text:");
//     // the text variable contains the recognized text
//     console.log(text);
// });

// var okrabyte = require("okrabyte");
// var buffer = fs.readFileSync(myImage);
// okrabyte.decodeBuffer(buffer, function(error, data){
//   console.log("========================================");
//   console.log(data); // Hello World!
// });



// var okrabyte = require("okrabyte");
// okrabyte.decodeFile(myImage, function(error, data){
//   console.log("\n====== processing okrabyte ocr processing =====\n\n");
//   console.log(data); // Hello World!
// });

// const { createWorker } = require('tesseract.js');

// const worker = createWorker({
//   logger: m => console.log(m), // Add logger here
// });
//
// (async () => {
//   await worker.load();
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
//   const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
//   console.log(text);
//   await worker.terminate();
// })();

// const path = require('path');
// const fs = require('fs');
const { createWorker } = require('tesseract.js');

const image = myImage;

// console.log(`Recognizing ${image}`);
//
// (async () => {
//   const worker = createWorker();
//   await worker.load();
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
//   const { data: { text } } = await worker.recognize(myImage);
//   console.log(text);
//   const { data } = await worker.getPDF('Tesseract OCR Result');
//   fs.writeFileSync('tesseract-ocr-result1.pdf', Buffer.from(data));
//   console.log('Generate PDF: tesseract-ocr-result1.pdf');
//   await worker.terminate();
// })();

// const { createWorker } = require('tesseract.js');
//
// const worker = createWorker();
//
// (async () => {
//   await worker.load();
//   await worker.loadLanguage('ben');
//   await worker.initialize('ben');
//   const { data: { text } } = await worker.recognize(myImage);
//   console.log(text);
//   await worker.terminate();
// })();
//
// (async () => {
//   await worker.load();
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
//   // const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
//   const { data: { text } } = await worker.recognize(myImage);
//
//   console.log(text);
//   await worker.terminate();
// })();

//================================= introducing the vimeo video api calls ====================================
// const RadioBrowser = require('radio-browser')
//
// let filter = {
//     limit: 400,          // list max 5 items
//     by: 'name',         // search in tag
//     searchterm: 'Chillout', // term in tag
// }
// RadioBrowser.getStations(filter)
//     .then(data => {
//       console.log(JSON.stringify(data))
//       // console.log(data)
//
//     })
//     .catch(error => console.error(error))

//=============================================================================================
// const axios = require("axios");
// const options3 = {
//   method: 'GET',
//   url: 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/2/verses/',
//   headers: {
//     'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
//     'X-RapidAPI-Key': 'Mb58JCJic7mshPthY310k0p4z9NRp116Jmpjsnom0Wl6sAYBXa'
//   }
// };
//
// axios.request(options3).then(function (response) {
// 	console.log(JSON.stringify(response.data));
// }).catch(function (error) {
// 	console.error(error);
// });

//=============================================================================================


var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log("nodejs running on port :  "+port);

});

// const Lautfm = require('lautfm')

// const laut = new Lautfm();

// laut.getGenres()
//     .then(data => console.log(JSON.stringify(data)))
//     .catch(err => console.error(err))

// let filter = {
//   by: 'live', // filter by letter
//   // term: 'Folk'
// }
// laut.getStations(filter)
//   .then(data => console.log(JSON.stringify(data)))
//   .catch(err => console.error(err))
