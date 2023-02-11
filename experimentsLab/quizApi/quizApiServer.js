const express = require('express');const Promise = require('promise');
const cricLive = require('cric-live');
const request = require('request');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// const axios = require('axios');

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
const dummyQuizCategory = apiDetails.dummyQuizCategory;

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
const gSearch = "https://www.google.com/search?q=lenevo+laptop+under+50000&safe=active";
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

app.get('/react', function(req, res){
    res.sendfile("./client/reactPractice.html");
});

app.get('/quiz', function(req, res){
    res.sendfile("./client/quiz.html");
});

app.get('/web', function(req, res){
    res.sendfile("./client/cheerio.html");
});





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

function cheerioApi(URL){
  let cheerioPromise = new Promise(function(resolve, reject){
    request.get(URL, function(err, res, html){
        if(err){
            console.log("***** error : ", err);
        }
        if(res){
            // console.log("near by location result :: \n\n", res);
            // body = JSON.parse(html)
            resolve(html);
        }
    });
  })
  return cheerioPromise;

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

        socket.on("exposed-api-url", function(data){
            // console.log("exposed api url in server : ", data.apiData);
            if(data.type === "URL"){
                getApi(data.apiData).then(function(apiResponse){
                    // console.log("== get api response : ", apiResponse);
                    socket.emit('exposed-api-response', {response : apiResponse.results});

                })
            }else{
                    data.apiData = JSON.parse(data.apiData);
                    // console.log("== get api response : ", data.apiData);
                    // console.log("test value :: ", data.apiData[0].title);
                    socket.emit('exposed-api-response', {response : data.apiData});
            }
        })

        socket.on('test', function(data){
            console.log("== calling socket.on test ==");
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

        socket.on("near-by-place-data", function(data){
            // console.log("nearByPlacesApiResponse.results.items : \n", nearByPlacesApiResponse.results.items);
            let argList = [
                   {key : "icon", subkey: null, type: "image"},
                   {key : "title", subkey: null, type: "block"},
                   {key : "distance", subkey: null, type: "block"},
                   {key : "vicinity", subkey: null, type: "block"},
                   // {key : "url", subkey: null, type: "link"},

               ];


            let payload = {
                data : nearByPlacesApiResponse.results.items,
                argList : argList,
                style : {
                  imgPos : "top",
                  textAlign : null,
                  hScroll: "yes"
                }

            };
            let template = PLACES_SERVICE.image_desc_template(payload);
            // console.log("@@@@  near by serach results are here \n\n", template);
            socket.emit("location-by-search-response", { template : template });
        })

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



        //================================ start quiz api ====================================

        function getQuizDataByCategory(categoryId){
            return quizResponse;
        }

        function getNoImagewithDescTemplate(templateData, style){
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

        var blockIdCounter = 0;
        function getBlockTemplate(blockData, payload){
          let template = '';
          let blockId = 'block-'+blockIdCounter;
          if(typeof(blockData) === 'string' && blockData.includes("<br/>") && (blockData.length > 35)){
              blockData = blockData.replace("<br/>", " ");

              template = '<div id="'+blockId+'" class="one-line-ellipse-hscroll-bar" style="padding: 10px 20px;" onclick="onClickBlock(\'' + payload.value + '\', \'' + blockId + '\')">'+blockData+'</div>';
          }else{
            template = '<div id="'+blockId+'" class="" style="padding: 10px 20px; " onclick="onClickBlock(\'' + payload.value + '\', \'' + blockId + '\')">'+blockData+'</div>';
          }
          blockIdCounter++;
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
        var quizIdCounter = 0;
        socket.on("fetch-quiz-api", () => {
            // generateQuizCat(dummyQuizCategory)
            let template = '';
            let tempTemplate = '';
            let finalTemplate = '';
            let finalQuizResponseTemplate = '';
            for (var i = 0; i < dummyQuizCategory.length; i++) {
                  // tempTemplate = '';
                  template = '';
                  template += getBlockTemplate(dummyQuizCategory[i].name, dummyQuizCategory[i]);
                  tempTemplate = getNoImagewithDescTemplate(template, null);
                  finalTemplate += hScrollBar(tempTemplate);
            }

            let addScrollmenuQuizCatTemplate = scrollmenuBlock(finalTemplate, quizIdCounter);
            // console.log("final template :: ", addScrollmenuQuizCatTemplate);
                let argList = [
                    {key : "category", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : null, style: "color: orange; font-size: 16px; text-align: center;"},
                    {key : "type", subkey: null, type: "block", prefixValue: ' Type ', postFixValue: '', style:''},
                    {key : "difficulty", subkey: null, type: "block", prefixValue: 'Difficulty', postFixValue: '', style:''},
                    {key : "question", subkey: null, type: "block", prefixValue: 'Question ', postFixValue: '', style: 'font-size: 16px; color: blue;'},
                    {key : "correct_answer", subkey: null, type: "radio", prefixValue: null, postFixValue: ''},
                    {key : "incorrect_answers", subkey: null, type: "radio", prefixValue: null, postFixValue: ''},
                ];

                let payload = {
                    data : quizResponse,
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

                let quizResponseTemplate = PLACES_SERVICE.image_desc_template(payload);
                let quizCorrectAnswers = [];
                quizResponse.forEach((item)=>{
                    quizCorrectAnswers.push(item.correct_answer);
                });
                quizResponseTemplate = scrollmenuBlock(quizResponseTemplate, );
                finalQuizResponseTemplate += addScrollmenuQuizCatTemplate;
                finalQuizResponseTemplate += quizResponseTemplate;


            socket.emit("quiz-api-template", {template : finalQuizResponseTemplate, quizCorrectAnswers : quizCorrectAnswers});

            socket.on("fetch-quiz-data-by-category", (data) => {
                console.log("quiz category :: ", data.data);
                let argList = [
                    {key : "category", subkey: null, type: "block"},
                    {key : "type", subkey: null, type: "block"},
                    {key : "difficulty", subkey: null, type: "block"},
                    {key : "question", subkey: null, type: "block"},
                ];

                let payload = {
                    data : quizResponse,
                    argList : argList,
                    style : {
                      imgPos : 'none',
                      textAlign : 'left',
                      hScroll: "yes"
                    }

                };
                let quizResponseByCat = getQuizDataByCategory(data.data);
                let quizResponseTemplate = PLACES_SERVICE.image_desc_template(payload);
                socket.emit("quiz-api-template", {template : quizResponseTemplate});

            })
        })

        //================================ end quiz api ====================================

        //================================ cheerio.js ======================================

        socket.on("web-api-init", function(data){
            cheerioApi("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe").then(function(data){
                // console.log("cheerio api response :: ", data);
                socket.emit("cheerio-api-response", {cheerioHtml : data})
            })
        })
        //================================ end cheerio.js ==================================



    })

  //====================================================================


http.listen(port, ()=>{
    console.log("server is running on port : "+port);
})
