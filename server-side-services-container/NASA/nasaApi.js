// const GENERIC_TEMPLATE_GENERATOR = require('./GenericTemplateCenter/basicGenericTemplateGenerator.js');

// const HERE_MAP_API_SERVICE = require('./server-side-services-container/here/hereMapApi.js');
const promise = require("promise");
const request = require("request");

const ROOT_DIR = require("path").resolve();
// const CRIC_API_SERVICE = require(ROOT_DIR+'/GenericTemplateCenter/basicGenericTemplateGenerator.js');
const GENERIC_TEMPLATE_GENERATOR = require(ROOT_DIR+'/GenericTemplateCenter/basicGenericTemplateGenerator.js');


console.log("root dir: ", ROOT_DIR);
// console.log("CRIC_API_SERVICE : ", GENERIC_TEMPLATE_GENERATOR);

// async function f() {
// console.log("=== calling async await fun ===");
//   try {
//     let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
//     // let user = await response.json();
//     console.log("=== user : ", response.json());
//
//   } catch(err) {
//     // catches errors both in fetch and response.json
//     console.log("@@ err: ", err);
//     // alert(err);
//   }
// }
//
// f();


function http_request(uri){
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

function NASA_API_PROCCESSING(request, socket){

  var default_nasa_astronomy_pic_template_argList = [
      {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; text-align: center; position: relative; font-style: normal; font-family: serif; font-size: 18px;"},
      {key : "url", subkey: null, type: "image", api: 'NEWSAPI:newsByCategory', style:'width: 100%; height: 250px; border: none;'},
      {key : "copyright", subkey: null, type: "block", prefixValue: 'Copyright: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      {key : "explanation", subkey: null, type: "block", prefixValue: 'Description: ', sharedObj : 'title',  postFixValue: '', ellipse : 'none', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      {key : "date", subkey: null, type: "block", prefixValue: 'Year: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      // {key : 'name', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: grey; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
      // {key : 'name', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : '',  style: 'font-size: 16px; color: brown; display: inline-block; margin-left: 12px; width: 65%; word-break: break-all;'},
  ];


  var payload = {
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
  if(request.category === "astronomy_picture_of_the_day"){
    console.log("==== calling nasa api ====");
    apiURL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
    argList = default_nasa_astronomy_pic_template_argList;
    payload.style.defaults.width = "auto";
  }else if(request.category === "product_by_brands"){

  }else if(request.category === "recent_cannabis_study"){

  }else{

  }

  http_request(apiURL).then((response) => {
    // console.log(" response : ", response);
    let finalData = null;
    let filteredData = [];

    if(Array.isArray(response) === false){
        let arr = [];
        arr.push(response);
        finalData = arr;
    }else{
        finalData = response;
    }


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


    // let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
    let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);

    // console.log(" final template : ", template);
    if(finalData !== null && finalData.length > 0){
        // console.log("######################################################");
        if(request.from === 'Gini'){
          socket.emit("query-response", { returnMsg : template, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});
        }else if(request.from === "Api"){
          // socket.emit("response-openwhyd-playlist-by-genre", {returnMsg : findResponseTemplate});
          socket.emit("nasa-api-response", { returnMsg : template, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});

        }
    }else{
      let template = "<i>We are finding some problem. <br> Please try again later.<strong></strong></i>";
      socket.emit("query-response", { returnMsg : template});
    }
    // return template;

  });

}



module.exports.NASA_API_PROCCESSING = NASA_API_PROCCESSING;
