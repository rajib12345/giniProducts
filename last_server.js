'use strict';
const express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
const http = require("http").Server(app);
const io = require('socket.io')(http);
const promise = require("promise");
var bodyParser = require('body-parser');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var AIEngine = require('./stringCompare');
var AIPreviewJsonData = require('./AIPreviewData.js');
const FB_BOT_ENGINE = require('./facebook/facebookBotEngine.js');
const RANDOM_JOKE_SERVICE = require('./server-side-services-container/randomJoke.js');
const CRIC_API_SERVICE = require('./server-side-services-container/cricket/cricAPIProcessing.js');
const WIKI_SEARCH_SERVICE = require('./server-side-services-container/wikipedia/wikiSearch.js');


// WIKI_SEARCH_SERVICE.wikiSearch("tell me about deepika padukone").then(function(wikiResult){
//     wikiResult = JSON.stringify(wikiResult);
//     console.log("wikiresult :: \n", wikiResult);
// })

// console.log("random joke : ", RANDOM_JOKE_SERVICE.randonJoke().then((data)=>{
//   console.log("random joke response :: ", data);
// }))

//
// var AIREsponse = AIEngine.processQuery("tell me about durga puja in kolkata");
// console.log("ai response :: \n", AIREsponse);

var dummySocket = '';
var chatContainerData = [];
var activeUsers = [];


// app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname+'/public'));

// app.use('/dmslogin', function(req, res){
//
//   res.sendfile('./client/dmslogin.html');
// });
//
// app.use('/svg', function(req, res){
//
//   res.sendfile('./client/svg1.html');
// });
//
// app.use('/select', function(req, res){
//
//   res.sendfile('./client/mobileSelect.html');
// });
// app.use('/select1', function(req, res){
//
//   res.sendfile('./client/mobileSelect1.html');
// });
// app.use('/auth2v2', function(req, res){
//
//   res.sendfile('./client/auth2.access.v2.html');
// });
//
// app.use('/auth2', function(req, res){
//
//   res.sendfile('./client/oauth2access.html');
// });
//
// app.use('/file', function(req, res){
//     console.log("clicked...");
//     console.log("request :: ", req);
// });
//
// app.use('/gmailQuickstart', function(req, res){
//
//   res.sendfile('./client/gmailQuickstart.html');
// });
//
// app.use('/gmail', function(req, res){
//
//   res.sendfile('./client/myGmail.html');
// });
//
// app.use('/page', function(req, res){
//
//   res.sendfile('./client/staticPage.html');
// });
//
// app.use('/tree', function(req, res){
//
//   res.sendfile('./client/treeview.html');
// });
//
// app.use('/souvik', function(req, res){
//
//   res.sendfile('./client/souvikSarkar.html');
// });
//
// app.use('/dummy', function(req, res){
//   console.log("dummy chat bot is calling...")
//   res.sendfile('./client/dummyPage.html');
// });
//
// app.use('/test', function(req, res){
//   console.log("dummy chat bot is calling...")
//   res.sendfile('./client/dummyPage1.html');
// });
//
// app.use('/map', function(req, res){
//   res.sendfile('./client/nearByPlaces.html');
// });
app.use('/wiki', function(req, res) {
    res.sendfile('./client/wikipedia/wikiResponse.html');
});
app.use('/AI', function(req, res){

  res.sendfile('./client/AIPreview.html');
});


app.post('/webhook', function (req, res) {
 try {
   var data = req.body;
   console.log("@@@@@ fired post webhooks from fb....");
   console.log("\n\n@@@@@@@ after hit webhook the data :  ", JSON.stringify(data));
   console.log("\n\n");
   if (data.object == 'page') {
     var msg = data.entry[0].messaging[0];
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
       sendTextMessage(session.id, "oops something went wrong when hit the webhook.")
 } finally {

 }

});

app.use('/webhook', function(req, res){
      // res.sendfile('./client/fbbot.html');
      console.log("===== webhook url is hitting =====");
      console.log("req.query :: ", req.query);
      if (req.query['hub.mode'] === 'subscribe' &&
          req.query['hub.verify_token'] === "myNameIsGini") {
        console.log("=============  Validating webhook  ===============");
        res.status(200).send(req.query['hub.challenge']);
        // res.send("sucessfull...");
      } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
      }
})

app.use('/', function(req, res){
  console.log("req.query : ", req.query.name);
  if(req.query && req.query.name !== undefined){
    let userInfo = {
        name : req.query.name
    }
    activeUsers.push(userInfo);
    console.log("active users list :: ", activeUsers);
  }

  res.sendfile('./client/newChatBot.html');
});


//====================  Ibm watson integration ========================

var changeRequest = {
  flag : '',
  requestTopic : null
}
var emailChangeOptions = [
        {
           name : 'email id',
           value : null,
           isVisited : 'inactive',
           msg : 'Enter your email id'
        },
         {
           name  : 'emp id',
           value : null,
           isVisited : 'inactive',
           msg : 'Enter your emp id '
        },
         {
           name : 'project id',
           value : null,
           isVisited : 'inactive',
           msg : 'Enter your project id '
        },

     ];

var startDateChangeOptions = [
          {
           name : 'email',
           value : null,
           isVisited : 'inactive',
           msg : 'Enter your email id'
        },
        {
           name : 'start date',
           value : null,
           isVisited : 'inactive',
           msg : 'Enter your start date (ex: mm/dd/yyyy)'
        }

     ];

var showJiveInfo = [
       {
           name : 'email',
           value : null,
           isVisited : 'inactive',
           msg : 'Enter your email id'
        }
];

var conversation = new ConversationV1({
  username: '250eaad0-6dc1-405c-ae6c-8e4a2c4dfb04',
  password: 'U0L1vW6t67to',
  // version_date: ConversationV1.VERSION_DATE_2017_12_30
  version_date: '2017-12-30'
});

//--------------------------------------------------------------
const request = require('request');
var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22kolkata%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

//--------------------------------------------------------------
// function to access the brainshop api
var brainshopProcessing = function(queryMsg){

console.log("calling the brainshop api fun...");
  var brainshopPromise = new promise(function(resolve, reject){
    var accessInfo = {
                    bid: "385",
                    key: "TkCCdoXcXpHJ2Fg9",
                    msg: queryMsg
                  }

    var braipshopInputOption = {
              uri: "http://api.acobot.net/get",
              qs: accessInfo,
              method: 'GET'
    };
    request(braipshopInputOption,  function(error, response, body){
      if(error || (response.statusCode != 200)){
        console.log("brainshop error: ", error);
      }else{
        console.log("------------- sucessfull brainshop result --------------");
        resolve(body);
      }
    });
  });
  return brainshopPromise;

};

// var qmsg = "who is sachin tendulkar";
// brainshopProcessing(qmsg).then(function(res){
//     console.log("brainshop response :: ", res);

// });



var foursquareSearch = function(queryMsg){
  try {
    var foursquareSearchPromise = new promise(function(resolve, reject){
      request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
          client_id: 'NJPN2APLB2YRLTR53QRKHXMRBCASANTLKE0BBZNIR2R2XJQA',
          client_secret: '2V4VJNODSKARY53JFUVXXRKCPF0J21DLX4KDWLPLYIMDT4EI',
          ll: '40.7243,-74.0018',
          query: queryMsg,
          v: '20180323',
          limit: 1
        }
      }, function(err, res, body) {
        if (err) {
          console.error(err);
        } else {
          console.log(body);
          resolve(body);
        }
      });
    })

    return foursquareSearchPromise;
  } catch (e) {

  }
}
// foursquareSearch("restaurant");
var bingSearch = function(query){
  console.log("calling bing search apis...")
  try{
    var bingSearchPromise = new promise(function(resolve, reject){
        var URL = 'https://api.cognitive.microsoft.com/bing/v7.0/search';
        var options = {
          method: 'GET',
          url: URL,
          qs: { q: query },
          headers: {
            'postman-token': '7235a6cf-ee3f-7c9f-ac41-7618cb13f31c',
            'cache-control': 'no-cache',
            'ocp-apim-subscription-key': '68cc44d0d3564222bc6aa9596427632b'
          }
        };

    request(options, function (error, response, body) {
       if (error) throw new Error(error);

         console.log(body);
         body = JSON.parse(body);
         resolve(body);
    });
  })

    return bingSearchPromise;
  }catch(e){
      console.log("occured error when fetching bing result ::", e);
  }
}
// bingSearch("who is sachin tendulkar");

var cognitiveBingCustomSearch = function(query){
  var searchPromise = new Promise(function(resolve, reject){
          var URL = 'https://api.cognitive.microsoft.com/bingcustomsearch/v7.0';
          // var options = {
          //   method: 'GET',
          //   url: URL,
          //   qs: { q: query },
          //   headers: {
          //     'postman-token': '7235a6cf-ee3f-7c9f-ac41-7618cb13f31c',
          //     'cache-control': 'no-cache',
          //     'ocp-apim-subscription-key': '843d7767a8f34504b92059c89348bbf9'
          //   }
          // };
          // +
          // '&customconfig=' + customConfigId,
          var options = {
              url: 'https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?' +
                'q=' + query,
              headers: {
                  'Ocp-Apim-Subscription-Key' : '843d7767a8f34504b92059c89348bbf9'
              }
          }

      request(options, function (error, response, body) {
         if (error) throw new Error(error);

           console.log(body);
           body = JSON.parse(body);
           resolve(body);
      });
  });
  return searchPromise;
}

// cognitiveBingCustomSearch("who is sachin tendulkar").then(function(data){
//     console.log("==== successfully fetch custom search data ====");
// })
//var query = "random function";

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

var pwcApiDataByEmail = function(emailId){

  var apiDataPromise = new promise(function(resolve, reject){
    var options = {
       method: 'GET',
       url: 'https://pwc-preview.jiveon.com/api/core/v3/people/email/'+emailId,
       headers:
       { 'postman-token': '181fa2e5-75a8-8855-dc93-2d04cda31625',
         'cache-control': 'no-cache',
         authorization: 'Basic cmF5bW9ubWFpZHVsMUBnbWFpbC5jb206VHJhZmZvcmRAMjg='
       }
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  resolve(body);
});
  })
  return apiDataPromise;
}

var updateJiveStartDate = function(data, personId){
  var p = new promise(function(resolve, reject){


  var options = { method: 'PUT',
      url: 'https://pwc-preview.jiveon.com/api/core/v3/people/'+personId,
      headers:
         { 'postman-token': 'aee217d2-547d-5dec-3883-dcd5eb718f86',
           'cache-control': 'no-cache',
           'content-type': 'application/json',
            authorization: 'Basic cmF5bW9ubWFpZHVsMUBnbWFpbC5jb206VHJhZmZvcmRAMjg='
          },
      body: data,
      json: true
    };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);


    //console.log(body);
    //console.log("==== === == = response status :: ", );
    resolve(body);
   });

  })

  return p;
}

var fetchRealTimeWeatherData = function(city){
   var weatherPromise = new promise(function(resolve, reject){
       var weatherApiURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+city+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
       request(weatherApiURL, { json: true }, (err, res, body) => {
       if (err) {
        return console.log(err);
       }else{
          console.log("====== below are the weather api response ====== \n")
          // console.log(body.query.lang);
          resolve(body);
       }

       });
   });

   return weatherPromise;
}

var returnValueFromPromise = function(value){
     console.log("return value from promise is :: ", value);
     //return value;
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

var processWeather = function(resObj){
    console.log("process about company...");
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
                       //returnMsg = staticDescYeahooWeatherProcessing(data);  // SHOW STATIC HTML DESCRIPTION PROVIDED BY YEAHOO WEATHER API
                        returnMsg = customYeahooWeatherProcessing(data);   // SHOW CUSTOM HTML USING YEAHOO WEATHER API
                       console.log("weather response : \n\n", returnMsg);
                      dummySocket.emit("query-response", {returnMsg : returnMsg});

                 });


            }
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

var processChangeRequest = function(resObj){
    console.log("process change request...", resObj);
    var returnMsg = '';

    var entities = resObj.entities;
    if(entities.length > 0){
       let entity  = entities[0].entity;
       let value = entities[0].value;
       let confidence = entities[0].confidence;
       console.log("change request value :: ", value);
       console.log("change request entity :: ", entity);

       if(entity === 'changeTopicInfo'){
            if(value === 'email'){
               changeRequest.flag = true;
               changeRequest.requestTopic = 'email';

               returnMsg = `
                I have got the change request for your email id <br>
                Please provide the below information.<br>
                Enter your name
               `;
               console.log("");
                dummySocket.emit("change-request", {changeRequest : changeRequest, emailChangeOptions : emailChangeOptions});

            }else if(value === 'start date'){
                changeRequest.flag = true;
                changeRequest.requestTopic = 'start date';
                returnMsg = `
                I have got the change request for your start date<br>
                Please provide the below information.<br><br>
                <i><strong>Enter your name</strong></i>
               `;
                dummySocket.emit("change-request", {changeRequest : changeRequest, emailChangeOptions : startDateChangeOptions});

            }else if(value === 'show jive info'){

            }
       }
    }
    return returnMsg;
}

var processShowJiveInfo = function(){
  console.log("== calling fun show jive info ==");
  var returnMsg = '';
  changeRequest.flag = true;
  changeRequest.requestTopic = 'show jive info';
  returnMsg = `
                I will try to show your jive information<br>
                Please provide the below information.<br><br>
                <i><strong>Enter your name</strong></i>
               `;
  dummySocket.emit("change-request", {changeRequest : changeRequest, emailChangeOptions : showJiveInfo});
  return returnMsg;
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
     console.log("watson map response :: ", resObj);
    var entities = resObj.entities;
    var entity  = entities[0].entity;
    var value = entities[0].value;
    var location = '22.573341,88.4363451';
    var radius = 1500;
    var type = value;
    // var type = "bank";
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

var createNearByPlacesResponse = function(data){
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  console.log("data :: ", data);
  // <div class="panel-body" style="color: crimson;">`+name+`</div>
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
            <div>
            <div class="container-fluid">
                <div class="row" style=" box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s; margin-top: 8px; background-color: white; border-radius: 5px;">
                    <div class="col-md-3 col-sm-3 col-lg-3" style="padding: 5px;">
                        <img src="`+icon+`" alt="" style="margin-top:25px;">
                    </div>
                    <div class="col-md-9 col-sm-9 col-lg-9" style="padding-top: 5px;">
                        <p style="color: grey;">`+name+`</p>
                        <p style="color: grey;">`+address+`</p>
                        <p style="color: grey;">Rating : <span style="color: orange !important;">`+rating+`</span></p>
                    </div>

                </div>
            </div>
            </div>
        `;
      }

  }
  dummySocket.emit("query-response", {returnMsg : returnMsg});
}

// var getNearByPhoto = function(){
//   console.log("====================================================================");
//   var photoArr = [];
//   try{
//     var nearBySearchPromise = new promise(function(resolve, reject){
//         var URL = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRbAAAAZ79WU1N9YfjUJIQqe2ifSDlAhxVN3yxV11C4kL_dxi8cauFJq5JPp_bDaRtp5JuDwo7h8IUb2LWTLvHbpQmsLzuCWvuKojXIIR1ZODUXxTLZW93ty7cqYBJHYUmYYFajEhAr4Rd0OrIusUCemYGZu3s7GhTLk4muT4wCm072vePZYcZcTefBRA&key=AIzaSyCxrBt-YSMgsL6uf55wgHddMIUeWZ81yjI';
//         //var URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+location+'&radius=1500&type='+type+'&key='+apikey;
//         // console.log("URL : ", URL);
//         var options = {
//           method: 'GET',
//           url: URL,
//         };
//
//     request(options, function (error, response, body) {
//        if (error) throw new Error(error);
//          console.log("&&&&7");
//          // body = JSON.parse(body);
//          console.log("photo url :: \n\n", body);
//          resolve(body);
//     });
//   })
//
//     return nearBySearchPromise;
//   }catch(e){
//       console.log("occured error when fetching bing result ::", e);
//   }
//
// }
// getNearByPhoto().then(function(res){
//     console.log("response :: \n\n", res);
// })

var processMatchedIntents = function(resObj, finalIntent){
   var returnMsg = '';

      if(finalIntent === 'greetings'){
         console.log("===========================");
         console.log("\n\n intent :: greetings ");
         //return 'welcome to ibm watson chat bot. How can I help you.';
         returnMsg = 'welcome to GINI AI chat bot. How can I help you.';
      }else if(finalIntent === 'about-company'){
          returnMsg = processAboutCompany(resObj);
      }else if(finalIntent === 'weather'){
          returnMsg = processWeather(resObj);
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
      }else if(finalIntent === 'near-by-places'){
          processNearByPlacesUsingMap(resObj).then(function(data){
                if(data.error_message){
                  showErrorMsg();
                }else{
                  createNearByPlacesResponse(data);
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

// var fetch_watson_response = function(query){
//    var queryPromise = new promise(function(resolve, reject){
//    conversation.message(
//   {
//     input: { text: query },
//     workspace_id: '735264e6-cc72-47bb-bb89-a292062916a9'
//     // utsav raut work space
//     // ibmid  : utsav.w.raut@pwc.com
//     // pass   : Utsav_2018
//    },
//   function(err, response) {
//     if (err) {
//       console.error(err);
//     } else {
//       //console.log(JSON.stringify(response, null, 2));
//       var res = JSON.stringify(response);
//       var resObj = JSON.parse(res);
//       console.log("\n\nwatson response \n", res);
//       console.log("\n\nintents :: ", resObj.intents);
//       var returnMsg = processIntents(resObj, resObj.intents);
//       console.log("\n\nwatson response \n", returnMsg);
//       resolve(returnMsg);
//     }
//   }
// );
//
//    });
//    return queryPromise;
// }


var changeResponse = {};

io.on('connection', function(socket){
  console.log('a user connected');
  dummySocket = socket;

  //=======================================================================



  socket.on("sync-chat-container", function(data){
      //socket.emit("update-chat-container", {chatContainer : chatContainerData});
      socket.broadcast.emit("update-chat-container", {chatContainer : chatContainerData});
  });

  socket.on("show-welcome-msg", function(data){
      socket.emit("chat-container-status", {chatContainer : chatContainerData})
  })

  socket.on("send-updated-chat-container", function(data){
    chatContainerData = data.chatContainer;
    socket.broadcast.emit("update-chat-container", {chatContainer : chatContainerData});
  });


  //=======================================================================

  socket.on("query-request", function(data){
     var returnMsg = '';
     console.log("in server the query msg is  :: ", data.query);
     // fetch_watson_response(data.query).then(function(data){
     //  console.log("watson res :: ", data)
     //  socket.emit("query-response", {returnMsg : data});
     // });
     //
     // console.log("\n\nwatson response \n", res);
     // console.log("\n\nintents :: ", resObj.intents);
     // var returnMsg = processIntents(resObj, resObj.intents);
     // console.log("\n\nwatson response \n", returnMsg);



     console.log("AIEngine response:\n", AIEngine.processQuery(data.query));
     var AIREsponse = AIEngine.processQuery(data.query);
     returnMsg = processIntents(AIREsponse, AIREsponse.intents);
     console.log("process intents result :: ", returnMsg);
     socket.emit("query-response", {returnMsg : returnMsg});
  });

  socket.on("change-email-request", function(data){
       changeResponse = data.changeResponse;

  });

  socket.on('fetch-active-users', function(data){
      console.log("send active users :: ", activeUsers);
      socket.emit('fetch-active-users-response', {activeUsers : activeUsers})
  })

  socket.on('fetched-current-location', function(data){
      console.log("latitude : ", data.latitude);
      console.log("longitude : ", data.longitude);
      let latlong = 'latitude : '+' '+data.latitude+'<br>'+'laongitude : '+data.longitude;

      var latlon = data.latitude + "," + data.longitude;
      var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
      +latlon+"&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
      // var mapImg = "<img src='"+img_url+"' style='height'>";
      console.log("imgurl : ", img_url);
      // var mapImg = `
      //     <div style="background-color: white; padding: 5px; ">
      //       <p style="color: grey;">This is your current location.</p>
      //       <a href=`+img_url+` target="_blank">
      //         <img src=`+img_url+` style="width: 265px; height: 200px;">
      //       </a>
      //     </div>
      // `;
      var mapImg = `
          <div style="background-color: white; padding: 5px; ">
              <img src=`+img_url+` style="width: 265px; height: 200px;">
          </div>
      `;
      console.log("mapimg : ", mapImg);

      socket.emit("query-response", {returnMsg : mapImg});
  })

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


  // var startDateUpdateResponse = function(email, startDate){
  //     pwcApiDataByEmail(email).then(function(data){
  //          data = JSON.parse(data);
  //          console.log("data :: ", data);
  //          var personId = data.id;
  //
  //          if(data.error != undefined){
  //             // INVALID EMAIL CASE
  //
  //
  //          }else{
  //             // VALID EMAIL CASE
  //               for(var i=0; i< data.jive.profile.length; i++){
  //                  if(data.jive.profile[i].jive_label === "StartDate"){
  //                      data.jive.profile[i].value = startDate;
  //                   }
  //               }
  //             console.log("before send updated data :: ", data.jive.profile[2].value);
  //             updateJiveStartDate(data, personId).then(function(res){
  //                console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  //                //console.log("res :: ", res)
  //                var returnMsg =  updatedStartDateResponse(res);
  //                console.log("=================");
  //                console.log("res :: ", res);
  //                console.log("=================");
  //                //var returnMsg = 'YOU HAVE SUCESSFULLY UPDATE THE START DATE.';
  //                dummySocket.emit('email-change-request-response', {returnMsg : returnMsg});
  //             });
  //          }
  //
  //     })
  //
  // }

  var startDateUpdateResponse = function(email, startDate){
    var returnMsg =  updatedStartDateResponse(email, startDate);
    console.log("=================");
    // console.log("res :: ", res);
    console.log("=================");
    //var returnMsg = 'YOU HAVE SUCESSFULLY UPDATE THE START DATE.';
    dummySocket.emit('email-change-request-response', {returnMsg : returnMsg});
  }



  //   var updatedStartDateResponse = function(data){
  //   console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
  //
  //   data = JSON.parse(data);
  //   console.log("start date : ", data.jive.profile[2].value)
  //   var returnMsg = '';
  //   var startDate = '';
  //   for(var i=0; i<data.jive.profile.length; i++){
  //      if(data.jive.profile[i].jive_label === "StartDate"){
  //         startDate = data.jive.profile[i].value;
  //      }
  //   }
  //   returnMsg = `
  //       <h3 style="color: blue;">YOU HAVE SUCESSFULLY UPDATE THE START DATE</h3><br><br>
  //       <h6>Here are the updated information</h6><br>
  //       NAME : `+data.displayName+`<br>
  //       EMAIL : `+data.emails[0].value+`<br>
  //       TYPE : `+data.emails[0].type+`<br>
  //       START DATE: `+startDate+`
  //   `;
  //
  //    return returnMsg;
  // }

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

});


var port = process.env.PORT || 3000;
http.listen(port, function(){
console.log("nodejs running on port :  "+port);

});
