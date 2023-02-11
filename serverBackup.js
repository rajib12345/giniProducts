const express = require("express");
var app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const promise = require("promise");
var ConversationV1 = require('watson-developer-cloud/conversation/v1');




// app.use(express.static('public'));
app.use('/static', express.static(__dirname+'/public'));



app.use('/', function(req, res){

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
           name : 'start date',
           value : null,
           isVisited : 'inactive',
           msg : 'Enter your start date'
        }
        
     ];

var dummySocket = '';


//workspace credentials created by utsav raut
// {
//   "url": "https://gateway.watsonplatform.net/conversation/api",
//   "username": "e0c023d0-e24c-4012-a26d-d519e8e75b17",
//   "password": "CfQIQj0qgHJ6"
// }
var conversation = new ConversationV1({
  username: 'e0c023d0-e24c-4012-a26d-d519e8e75b17',
  password: 'CfQIQj0qgHJ6',
  // version_date: ConversationV1.VERSION_DATE_2017_12_30
  version_date: '2017-12-30'

});

//--------------------------------------------------------------
const request = require('request');
var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22kolkata%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

//--------------------------------------------------------------

var fetchRealTimeWeatherData = function(city){
   var weatherPromise = new promise(function(resolve, reject){
       var weatherApiURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+city+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
       request(weatherApiURL, { json: true }, (err, res, body) => {
       if (err) { 
        return console.log(err); 
       }else{
          console.log("====== below are the weather api response ====== \n")
          console.log(body.query.lang);
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

var processWeather = function(resObj){
    console.log("process about company...");
    var returnMsg = '';
    
    var entities = resObj.entities;
    if(entities.length > 0){
       let entity  = entities[0].entity;
       let value = entities[0].value;
       let confidence = entities[0].confidence;
       if(entity === 'weatherInfo'){
            if(value === 'current weather'){
               returnMsg = `
                  Hehe is the <i><strong>WEATHER</strong></i> information below: <br>
                  Light sunshine <br>
                  cloudy <br>
                  Max temp : 25 <br>
                  Min temp : 11 <br>
                  For more info <a href="#" style="color: blue;">click here </a>
               `;
               
            }
       }else if(entity === 'cityInfo'){
            if(value){
              var x = '';
                 fetchRealTimeWeatherData(value).then(function(data){
                      //console.log("=== sucessfully fetched weather data \n\n", data);
                      //console.log("weather data :: \n\n", JSON.stringify(data));
                      let desc = data.query.results.channel.item.description;
                      let end = desc.length-188;
                      desc = desc.substring(9, end);
                      let title = data.query.results.channel.title;
                      //console.log("description :: \n", desc)
                      let returnMsg = title+'<br>';
                      returnMsg += desc;
                      //returnValueFromPromise(returnMsg);
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
    console.log("process change request...");
    var returnMsg = '';
    
    var entities = resObj.entities;
    if(entities.length > 0){
       let entity  = entities[0].entity;
       let value = entities[0].value;
       let confidence = entities[0].confidence;
       if(entity === 'updateInfo'){
            if(value === 'email'){
               changeRequest.flag = true;
               changeRequest.requestTopic = 'email';

               returnMsg = `
                I have got the change request for your email id <br>
                Please provide the below information.<br>
                Enter your name
               `;
                dummySocket.emit("change-request", {changeRequest : changeRequest, emailChangeOptions : emailChangeOptions});
               
            }else if(value === 'start date'){
                returnMsg = `
                I have got the change request for your start date<br>
                Please provide the below information.<br>
                Enter your email id
               `;
                dummySocket.emit("change-request", {changeRequest : changeRequest, ChangeOptions : emailChangeOptions});

            }
       }
    }
    return returnMsg; 
}

var processAboutCompany = function(resObj){
    console.log("process weather...");
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
    console.log("process weather...");
    var returnMsg = '';
    
    var entities = resObj.entities;
    if(entities.length > 0){
       let entity  = entities[0].entity;
       let value = entities[0].value;
       let confidence = entities[0].confidence;
       if(entity === 'devTeam'){
            if(value === 'developer'){
               returnMsg = 'Here are the list of the <i><strong> DEVELOPER </strong></i> below: <br><br>';
               returnMsg += 'Gourav <br> Sumanth <br> Avilash <br> Projita <br> Hasi <br> Amit <br> Utsav <br> Tirtha';
            }else if(value === 'duration'){
               returnMsg = 'The duration of this project is 2 years.'; 
            }
       }
    }else{
        returnMsg = 'The name of the current project is adcdev.'; 
    }
    
    return returnMsg;
}

var processMatchedIntents = function(resObj, finalIntent){
   var returnMsg = '';

      if(finalIntent === 'greetings'){
         console.log("\n\n intent :: greetings ");
         //return 'welcome to ibm watson chat bot. How can I help you.';
         returnMsg = 'welcome to ibm watson chat bot. How can I help you.';
      }else if(finalIntent === 'about-company'){
          returnMsg = processAboutCompany(resObj);
      }else if(finalIntent === 'weather'){
          returnMsg = processWeather(resObj);
      }else if(finalIntent === 'aboutAdcdev'){
          returnMsg = processAboutAdcdev(resObj);
      }else if(finalIntent === 'changeRequest'){
          returnMsg = processChangeRequest(resObj);
          console.log("change request response \n", returnMsg)
      }

      return returnMsg;
}
 

var processIntents = function(resObj, intents){
    console.log("==calling the process intents function ===");
    var finalIntent = '';
    var returnMsg = '';
    console.log("intent length :: ", intents.length);
    if(intents.length === 0){
      //==== PROCESS  NO  MATCHED INTENTS  ====
      return "Upps sorry !! <br> I didn't get you properly. <br> Try again.";

    }else{
      //==== PROCESS  MATCHED INTENTS  ====
      for(var i=0; i<intents.length; i++){
         if(intents[i].confidence > .5){
           finalIntent = intents[i].intent;
         }
      }
      returnMsg = processMatchedIntents(resObj, finalIntent);      
    }

    return returnMsg;

}
//======================================================================


//========================= [start]  maintaining the chat application flow ===========================

var fetch_watson_response = function(query){
   var queryPromise = new promise(function(resolve, reject){
   conversation.message(
  {
    input: { text: query },
    workspace_id: '1f5b855c-74c5-4b9a-af74-ef05c49eaf35' 
    // utsav raut work space 
    // ibmid  : utsav.w.raut@pwc.com
    // pass   : Utsav_2018
   },
  function(err, response) {
    if (err) {
      console.error(err);
    } else {
      //console.log(JSON.stringify(response, null, 2));
      var res = JSON.stringify(response);
      var resObj = JSON.parse(res);
      console.log("\n\nwatson response \n", res);
      console.log("\n\nintents :: ", resObj.intents);
      var returnMsg = processIntents(resObj, resObj.intents);
      console.log("\n\nwatson response \n", returnMsg);
      resolve(returnMsg);
    }
  }
);

   });

   return queryPromise;


}


var changeResponse = {}; 

io.on('connection', function(socket){
  console.log('a user connected');
  dummySocket = socket;

  socket.on("query-request", function(data){
     var returnMsg = '';
     console.log("in server the query msg is  :: ", data.query);
     fetch_watson_response(data.query).then(function(data){
      console.log("watson res :: ", data)
      socket.emit("query-response", {returnMsg : data});
     });
     
  });

  socket.on("change-email-request", function(data){
       changeResponse = data.changeResponse;

  });

  socket.on("email-change-request-data", function(data){
      console.log("email change request data : ", data.emailChangeOptions);
      console.log("change request : ", data.changeRequest);
      changeRequest = data.changeRequest;
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
          <br>
      `;
      socket.emit('email-change-request-response', {returnMsg : returnMsg});

  })

});
//========================= [end]  maintaining the chat application flow ===========================


http.listen(9000, function(){
console.log("nodejs running on port :  9000");
});


//utsav_2018


// http://localhost:8089/#/maintenance