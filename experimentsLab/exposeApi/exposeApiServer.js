const express = require('express');const Promise = require('promise');
const cricLive = require('cric-live');
const request = require('request');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var Datastore = require('nedb');
var music = require('musicmatch')({apikey: "11b6b110c3ee9257ccf439f074ddb126"});


const PLACES_SERVICE =  require('./services/places/nearByPlaces');

const apiDetails = require('./apiDetails.js');
var category = "shopping";
var homeLocation = "22.767427,88.388344";
var workLocation = "19.175,72.981";
const quizResponse = apiDetails.quizResponse;
const nearByPlacesApiResponse = apiDetails.nearByPlacesApiResponse;
const newsApiResponse = apiDetails.newsApiResponse;

var db = {};
db.files = new Datastore();
const port = 3000;
db.files.loadDatabase();
// console.log("## db.files :: ", db.files);

db.files.find({ name: 'abc' }, function (err, docs) {
  // docs is an array containing documents Mars, Earth, Jupiter
  // If no document is found, docs is equal to []
  // console.log("restored files data :: ", docs);
});


const newsApiKey = "59c716c17f4e4f4fa4b260a1fe7ce8ba";
const newsApiQuery = "https://newsapi.org/v2/everything?q=top%20indian%20cricket%20news%20&from=2019-05-26&sortBy=publishedAt&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba";
const topHeadline = "https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba";
var savedFileIdCount = 0;
var savedFilesContent = [];
var dummySocket;

const showSavedCodedFilesIo = io.of('/code');

//================================= GLOBAL DECLARATION OF ROUTES ================================

app.get('/', function (req, res) {
  console.log("=== calling the root ===");
      res.sendfile("./client/nearByPlaces.html");
  });

app.get('/code', function(req, res){
      showSavedCodedFilesIo.on('connection', function(socket){
          socket.emit("show-saved-coded-files", {files : savedFilesContent});
      });
      res.sendfile("./client/showSavedCodedFile.html");
});

app.get('/copy', function(req, res){
    res.sendfile("./client/copyJsFile.html");
});

app.get('/pay', function(req, res){
    res.sendfile("./client/paymentRequest.html");
});

app.get('/expose', function(req, res){
    res.sendfile("./client/apiExpose.html");
});

// app.get('/expose', function(req, res){
//     res.sendfile("./client/apiExpose.html");
// });



//================================= END OF ROUTES ================================

const searchNedbURL = '/nedb';

function getApi(apiURL){
    console.log("== calling the get api fun in server ==");
    console.log("apiurl :: ", apiURL);
    let searchByLocationPromise = new Promise(function(resolve, reject){
      request.get(apiURL, function(err, res, body){
          if(err){
              console.log("***** error : ", err);
          }
          if(res){
              // console.log("near by location result :: \n\n", res);
              body = JSON.parse(body)
              resolve(body);
          }
      });
    });
    return searchByLocationPromise;
}

let URL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";
let url = 'https://newsapi.org/v2/everything?q=kolkata%20political%20news&sortBy=publishedAt&sortBy=popularity&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
// getApi(url).then(function(data){
//     console.log("== get api response : ", data);
// })

  //====================== SOCKET.IO INTEGRATION =======================
    io.on('connection', function(socket){
        console.log("a user successfully connected.");
        dummySocket = socket;
        // socket.on('test', function(data){
        //     console.log("== calling socket.on test ==");
        //     PLACES_SERVICE.searchByLocation(homeLocation, category).then(function(response){
        //         let argList = [
        //           {key : "icon", subkey: null, type: "image"},
        //           {key : "title", subkey: null, type: "block"},
        //           {key : "vicinity", subkey: null, type: "block"},
        //           {key : "category", subkey: [
        //               {key : "title", type : "block"},
        //               {key : "system", type : "block"}
        //             ],type: "block"}
        //
        //         ];
        //         let payload = {
        //             data : response.results.items,
        //             argList : argList,
        //             imgPos : "top"
        //         };
        //         let template = PLACES_SERVICE.image_desc_template(payload);
        //         console.log("@@@@  near by serach results are here \n\n");
        //         socket.emit("location-by-search-response", { template : template });
        //     })
        // });

        socket.on("exposed-api-url", function(data){
            console.log("exposed api url in server : ", data.apiUrl);
            getApi(data.apiUrl).then(function(apiResponse){
                // console.log("== get api response : ", apiResponse);
                socket.emit('exposed-api-response', {response : apiResponse.results})

                // let payload = {
                //     data : apiResponse.results,
                //     argList : argList,
                //     style : {
                //       imgPos : data.imgPos,
                //       textAlign : null,
                //       hScroll: "yes"
                //     }
                //
                // };
                // let template = PLACES_SERVICE.image_desc_template(payload);
                // socket.emit('exposed-api-response', {response : template});

            })
        })

        socket.on('test', function(data){
            console.log("== calling socket.on test ==");
            // console.log("nearByPlacesApiResponse.results.items : \n", nearByPlacesApiResponse.results.items);
            // PLACES_SERVICE.searchByLocation(homeLocation, category).then(function(response){
            // console.log("quizresponse :: ", quizResponse);
                // let argList = [
                //     {key : "category", subkey: null, type: "block"},
                //     {key : "type", subkey: null, type: "block"},
                //     {key : "difficulty", subkey: null, type: "block"},
                //     {key : "question", subkey: null, type: "block"},
                // ];
                // let argList = [
                //      {key : "icon", subkey: null, type: "image"},
                //      {key : "title", subkey: null, type: "block"},
                //      {key : "vicinity", subkey: null, type: "block"},
                //      {key : "category", subkey: [
                //          {key : "title", type : "block"},
                //          {key : "system", type : "block"}
                //        ],type: "block"}
                //
                //    ];



                let argList = [
                       {key : "urlToImage", subkey: null, type: "image"},
                       {key : "author", subkey: null, type: "block"},
                       {key : "title", subkey: null, type: "block"},
                       {key : "publishedAt", subkey: null, type: "block"},
                       // {key : "url", subkey: null, type: "link"},

                   ];


                let payload = {
                    data : newsApiResponse.articles,
                    argList : argList,
                    style : {
                      imgPos : data.imgPos,
                      textAlign : null,
                      hScroll: "yes"
                    }

                };
                let template = PLACES_SERVICE.image_desc_template(payload);
                // console.log("@@@@  near by serach results are here \n\n", template);
                socket.emit("location-by-search-response", { template : template });
            // })
        });

        socket.on("generate-template", function(data){
          let payload = {
              data : data.response,
              argList : data.argList,
              style : {
                imgPos : "none",
                textAlign : null,
                hScroll: "yes"
              }

          };
          let template = PLACES_SERVICE.image_desc_template(payload);
          // console.log("@@@@  near by serach results are here \n\n", template);
          socket.emit("location-by-search-response", { template : template });
        })

        socket.on('save-js-file', function(data){
            let tempFileContent = {};
            savedFileIdCount += 1;
            tempFileContent.id = savedFileIdCount;
            console.log("\n\ntype of js file :: ", typeof(data.file));
            let fileContent = data.file.content.replace("\n", '');
            // let str = data.file.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
            // console.log("\n\nafter replace \n\n", str);
            tempFileContent.name = data.file.name;
            tempFileContent.content = fileContent;
            tempFileContent.desc = data.file.desc;
            savedFilesContent.push(tempFileContent);
            // store data in nedb

            db.files.insert(tempFileContent, function (err, newDoc) {   // Callback is optional
                console.log("=== successfully store tha data in the nedb server ===");
                console.log("== inserted data :: ", newDoc);
            });
            console.log("db.files :: ", db.files);
        })

        socket.on('api-expose', function(data){
            // socket.emit('exposed-api-response', {response : quizResponse})
            socket.emit('exposed-api-response', {response : newsApiResponse})

            // socket.emit('exposed-api-response', {response : nearByPlacesApiResponse.results.items})
        })
    })

  //====================================================================


http.listen(port, ()=>{
    console.log("server is running on port : "+port);
})
