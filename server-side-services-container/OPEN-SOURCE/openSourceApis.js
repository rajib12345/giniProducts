const promise = require("promise");
const request = require("request");
const ROOT_DIR = require("path").resolve();
const GENERIC_TEMPLATE_GENERATOR = require(ROOT_DIR+'/GenericTemplateCenter/basicGenericTemplateGenerator.js');
var LIBRARIES_PLATFORMS_DATA = require('./store/openSourceLibraries_platforms.js');
var LIBRARIES_PLATFORMS_REPOSITORY_DATA = require('./store/openSourceLibraries_repository.js');
var LIBRARIES_PLATFORMS_DEPANDANTS_DATA = require('./store/openSourcePlatforms_depandants.js');
var OPEN_SOURCE_NPM_LIBRARIES_DATA = require('./store/openSource_libraries.js');
var POPULAR_GOOGLE_LIBRARIES = require('./store/popularGoogle_libraries.js');
var POPULAR_FACEBOOK_LIBRARIES = require('./store/popularFacebook_libraries.js');
var POPULAR_MICROSOFT_LIBRARIES = require('./store/popularMicrosoft_libraries.js');
var POPULAR_TWITTER_LIBRARIES = require('./store/popularTwitter_libraries.js');


// I09@koulp


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

function OPEN_SOURCE_API_PROCCESSING(request, socket){
console.log("=== CALLING OPEN SOURCE LIBRARIES PROCESSING ===");
  var default_open_source_npm_project_depandants_template_arglist = [
      {key : "image", subkey: null, type: "image", api: 'OPEN-SOURCE:platforms', onclick: {methodName: 'onOpenModal', params: ['homepage', 'customType'], defaults: ['OPEN-SOURCE:platforms'] }, style:'width: 350px; height: 200px; border: none;'},
      {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 25px; padding-bottom: 10px; text-align: center; position: relative; font-style: normal; font-family: serif; font-size: 25px; padding-bottom: 10px;"},
      {key : "language", subkey: null, type: "block", prefixValue: 'Language: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      {key : "description", subkey: null, type: "block", prefixValue: 'Description: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      {key : "platform", subkey: null, type: "block", prefixValue: 'Platform: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      {key : "rank", subkey: null, type: "block", prefixValue: 'Rank: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      {key : "licenses", subkey: null, type: "block", prefixValue: 'Licenses: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
  ];

  var default_open_source_platforms_template_arglist = [
      {key : "image", subkey: null, type: "image", api: 'OPEN-SOURCE:platforms', onclick: {methodName: 'onOpenModal', params: ['homepage', 'customType'], defaults: ['OPEN-SOURCE:platforms'] }, style:'width: 275px; height: 200px; border: none;'},
      {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 25px; padding-bottom: 10px; text-align: center; position: relative; "},
      {key : "project_count", subkey: null, type: "block", prefixValue: 'Project count: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; color: grey; position: relative; "},
      {key : "default_language", subkey: null, type: "block", prefixValue: 'Default language: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; color: grey; position: relative; "},

  ];

  // var github_covid19_press_release_template_arglist = [
  //     {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['GITHUB:covid19_api'] }, style:'width: 348px; height: 200px; border: none;'},
  //     {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'none', style: "color: black; font-weight: 700; font-size: 14px;  position: relative; "},
  //     {key : "author", subkey: null, type: "block", prefixValue: 'Author: ', sharedObj : 'title',  postFixValue: '', ellipse : 'none', style: "color: grey; font-weight: 700; font-size: 14px; position: relative; "},
  //     {key : "publication", subkey: null, type: "block", prefixValue: 'Publication: ', sharedObj : 'title',  postFixValue: '', ellipse : 'none', style: "color: grey; font-weight: 700; font-size: 14px;  position: relative; "},
  //     {key : "publishDate", subkey: null, type: "block", prefixValue: 'Date: ', sharedObj : 'title',  postFixValue: '', ellipse : 'none', style: "color: grey; font-weight: 700; font-size: 14px; position: relative; "},
  //
  // ];

  // var who_covid19_question_and_answer_template_arglist = [
  //     {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'width: 348px; height: 200px; border: none;'},
  //     {key : "question", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'none', style: "color: black; font-weight: 700; font-size: 14px;  position: relative; "},
  //     {key : "answer", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'none', style: "color: grey; font-weight: 700; font-size: 14px; position: relative; "},
  // ];

  var default_open_source_depandants_repository_template_arglist = [
      {key : "image", subkey: null, type: "image", api: 'OPEN-SOURCE:repository', onclick: {methodName: 'onOpenModal', params: ['homepage', 'customType'], defaults: ['OPEN-SOURCE:repository'] }, style:'width: 350px; height: 200px; border: none;'},
      {key : "full_name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 25px; padding-bottom: 10px; text-align: center; position: relative; "},
      {key : "description", subkey: null, type: "block", prefixValue: 'Description: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; color: grey; position: relative; "},
      {key : "language", subkey: null, type: "block", prefixValue: 'Language: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; color: grey; position: relative; "},
      {key : "license", subkey: null, type: "block", prefixValue: 'Licenses: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      {key : "rank", subkey: null, type: "block", prefixValue: 'Rank: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},

  ];

  var default_open_source_npm_libraries_template_arglist = [
      {key : "image", subkey: null, type: "image", api: 'OPEN-SOURCE:libraries', onclick: {methodName: 'onOpenModal', params: ['homepage', 'customType'], defaults: ['OPEN-SOURCE:libraries'] }, style:'width: 350px; height: 200px; border: none;'},
      {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 25px; padding-bottom: 10px; text-align: center; position: relative; "},
      {key : "description", subkey: null, type: "block", prefixValue: 'Description: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; color: grey; position: relative; "},
      {key : "language", subkey: null, type: "block", prefixValue: 'Language: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; color: grey; position: relative; "},
      {key : "license", subkey: null, type: "block", prefixValue: 'Licenses: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      {key : "author", subkey: null, type: "block", prefixValue: 'Author: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},

  ];

  var open_source_popular_brand_libraries_template_arglist = [
      // {key : "image", subkey: null, type: "image", api: 'OPEN-SOURCE:libraries', onclick: {methodName: 'onOpenModal', params: ['homepage', 'customType'], defaults: ['OPEN-SOURCE:libraries'] }, style:'width: 350px; height: 200px; border: none;'},
      {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 25px; padding-bottom: 10px; text-align: center; position: relative; "},
      {key : "description", subkey: null, type: "block", prefixValue: 'Description: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; color: grey; position: relative; "},
      {key : "language", subkey: null, type: "block", prefixValue: 'Language: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: black; font-weight: 700; font-size: 14px; color: grey; position: relative; "},
      {key : "license", subkey: null, type: "block", prefixValue: 'Licenses: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},
      {key : "author", subkey: null, type: "block", prefixValue: 'Author: ', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', style: "color: grey; font-weight: 400; font-size: 14px;  position: relative; font-style: normal; font-family: serif; font-size: larger;"},

  ];

  let defaultWikipediaSearchTemplateArgList = [
      {key : "image", subkey: null, type: "image", api: 'wikipedia_search', onclick: {methodName: 'getNewsByCustomFilter', params: ['title'], defaults: ['wikipedia_search'] }, style:'width: 100%; height: 250px; border: none;'},
      {key : "title", subkey: null, type: "block", api: 'wikipedia_search', prefixValue: '', sharedObj : 'title',  postFixValue: '', ellipse : 'one line', api: 'NEWSAPI:newsBySource',  style: "color: black; font-weight: 700; font-size: 18px; text-align: center;"},
      {key : "snippet", subkey: null, type: "block", api: 'wikipedia_search', prefixValue: 'Description: ', sharedObj : 'text', postFixValue: '', ellipse : 'none', style:''},
      {key : "timestamp", subkey: null, type: "block", api: 'wikipedia_search', prefixValue: 'Time: ', sharedObj : 'text', postFixValue: '', ellipse : 'one line', style:''},
      {key : 'wiki', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: grey; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
      {key : 'wiki', subkey: null, type: 'block', prefixValue: '', postFixValue: '', ellipse : '', onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] }, style: 'font-size: 16px; color: brown; display: inline-block; margin-left: 12px;'},
      {key : '', subkey: null, type: 'customThreeDots', style: 'display: inline-block; color: red; transform: rotate(90deg); font-size: 20px; float: right; color: black; position: relative; top: 16px; right: -10px;'},
      {key : 'title', subkey: null, type: 'textToSpeech', charCutOff: 2, charCutOffDirection: 'start',  style: 'float: right; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},

  ];



  var payload = {
      data : null,
      argList : null,
      isViewAllBtnSlide: {
          btnName : 'View All',
          btnStyle: '',
          btnAction: ''
      },
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
            width : '277px',
            color: 'grey',
            fontSize : '13px',
            padding: '0px 0px',
            margin : '0px 3px',
            devider : '0px solid grey',
            coverPadding : '5px',
            border: "0px solid whiteSmoke",
            marginBottom: "10px",
            // borderBottom: 'none',
            descriptionTemplateStyle : 'background-color: white;'

        }
      },
      emptySlide : 'no'
  };
  var apiURL = null;
  var argList = null;
  if(request.category === "open_source_npm_platforms"){
    console.log("==== calling nasa api ====");
    // apiURL = "https://libraries.io/api/platforms";
    apiURL = null;
    argList = default_open_source_platforms_template_arglist;
    // payload.style.defaults.width = "auto";
  }else if(request.category === "open_source_project_depandants"){
    // apiURL = "https://libraries.io/api/NPM/base62/dependents";
    apiURL = null;
    argList = default_open_source_npm_project_depandants_template_arglist;
    payload.style.defaults.width = "350px";
    payload.style.defaults.border = "none";
  }else if(request.category === "open_source_depandants_repository"){
    // apiURL = "https://libraries.io/api/NPM/base62/dependent_repositories";
    argList = default_open_source_depandants_repository_template_arglist;
    apiURL = null;
    payload.style.defaults.width = "350px";
    payload.style.defaults.border = "none";
  }else if(request.category === "open_source_npm_libraries"){
    argList = default_open_source_npm_libraries_template_arglist;
    apiURL = null;
    payload.style.defaults.width = "350px";
    payload.style.defaults.border = "none";
  }else if(request.category === "popular_brand_libraries"){
    argList = open_source_popular_brand_libraries_template_arglist;
    apiURL = null;
    payload.style.defaults.width = "350px";
    payload.style.defaults.border = "none";
  }else if(request.category === "github_covid19_press_release"){
    apiURL = "https://covidtracking.com/api/press";
    argList = github_covid19_press_release_template_arglist;
    payload.style.defaults.width = "350px";
    payload.style.defaults.border = "none";
  }else if(request.category === "who_covid19_question_and_answer"){
    argList = who_covid19_question_and_answer_template_arglist;
    apiURL = null;
    payload.style.defaults.width = "350px";
    payload.style.defaults.border = "none";
  }else if(request.category === "customSearch"){
    console.log("request.currentCustomSearchSource : ", request.currentCustomSearchSource);
    if(request.currentCustomSearchSource === "Libraries"){
      apiURL = "https://api.cdnjs.com/libraries?search="+request.searchQuery+"&fields=version,description,homepage,license,author,repository,rank";
      argList = default_open_source_npm_project_depandants_template_arglist;
    }else if(request.currentCustomSearchSource === "NPM"){
      apiURL = "https://libraries.io/api/search?q="+request.searchQuery;
      argList = default_open_source_npm_project_depandants_template_arglist;
    }else if(request.currentCustomSearchSource === "Wikipedia"){
       // = "https://api.cdnjs.com/libraries?search="+request.searchQuery+"&fields=version,description,homepage,license,author,repository,rank";
      apiURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch='+request.searchQuery;
      argList = defaultWikipediaSearchTemplateArgList;
    }
    console.log("API URL : ", apiURL);
  }

  function callFilteredItemBYNameSearch(finalData, repository, searchQuery){
    let filteredArr = [];
    finalData.forEach((item, index) => {
        if(repository === 'repository'){
            if(item.full_name.indexOf(request.searchQuery) !== -1){
                filteredArr.push(item)
            }
        }else{
            if(item.name.indexOf(request.searchQuery) !== -1){
                filteredArr.push(item)
            }
        }
    });
    return filteredArr;
  }

  function sortByRank(finalData){
      console.log("============= call sort by rank ==============");
      finalData.sort((a,b) => a.updated_at - b.updated_at);
      finalData.sort((a,b) => {
        if(a.rank !== undefined && b.rank !== undefined){
            return a.rank - b.rank
        }
      });
      return finalData;
  }

  function popularLibrariesByBrand(finalData, brand){
      console.log("============= call popularLibrariesByBrand ==============");
      let filteredArr = [];
      finalData.forEach((item, index) => {
          // console.log("item.author : ", item.author);
          // console.log("item.repository.url : ", item.repository.url);
          // console.log("brand : ", brand);
          // brand.toLowerCase()
          if(item.repository.url !== null && item.repository.url !== undefined){
              if(item.repository.url.toLowerCase().indexOf(brand.toLowerCase()) !== -1){
                  filteredArr.push(item);
              }
          }else if(item.author !== null && item.author !== undefined){
              if(item.author.toLowerCase().indexOf(brand.toLowerCase()) !== -1){
                  filteredArr.push(item);
              }
          }
      })
      console.log("!!!!!!!!! filteredArr : \n", JSON.stringify(filteredArr));
      return filteredArr;
  }

  http_request(apiURL).then((response) => {
    // console.log(" response : ", response);
    let finalData = null;
    let filteredData = [];
    let defaultItemToShow = 15;

    if(response !== "SERVER_SIDE_DATA" && Array.isArray(response) === false){
        let arr = [];
        arr.push(response);
        finalData = arr;
    }else if(response === "SERVER_SIDE_DATA"){
        if(request.category === "open_source_npm_platforms"){
            finalData = LIBRARIES_PLATFORMS_DATA.OPEN_SOURCE_LIBRARIES_PLATFORMS;
            payload.isViewAllBtnSlide.btnAction = 'platforms';

        }else if(request.category === "open_source_project_depandants"){
            finalData = LIBRARIES_PLATFORMS_DEPANDANTS_DATA.OPEN_SOURCE_LIBRARIES_PLATFORMS_DEPANDANTS;
            payload.isViewAllBtnSlide.btnAction = 'projectDepandants';

        }else if(request.category === "open_source_depandants_repository"){
            finalData = LIBRARIES_PLATFORMS_REPOSITORY_DATA.OPEN_SOURCE_LIBRARIES_PLATFORMS_REPOSITORY;
            payload.isViewAllBtnSlide.btnAction = 'repository';

        }else if(request.category === "open_source_npm_libraries"){
            finalData = OPEN_SOURCE_NPM_LIBRARIES_DATA.OPEN_SOURCE_LIBRARIES.results;
            payload.isViewAllBtnSlide.btnAction = 'npmLibraries';

        }else if(request.category === "popular_brand_libraries"){
          if(request.brand === 'Google'){
              finalData = POPULAR_GOOGLE_LIBRARIES.POPULAR_GOOGLE_LIBRARIES;
              payload.isViewAllBtnSlide.btnAction = 'popularGoogleLibraries';
          }else if(request.brand === 'Facebook'){
              finalData = POPULAR_FACEBOOK_LIBRARIES.POPULAR_FACEBOOK_LIBRARIES;
              payload.isViewAllBtnSlide.btnAction = 'popularFacebookLibraries';
          }else if(request.brand === 'Microsoft'){
              finalData = POPULAR_MICROSOFT_LIBRARIES.POPULAR_MICROSOFT_LIBRARIES;
              payload.isViewAllBtnSlide.btnAction = 'popularMicrosoftLibraries';
          }else if(request.brand === 'Twitter'){
              finalData = POPULAR_TWITTER_LIBRARIES.POPULAR_TWITTER_LIBRARIES;
              payload.isViewAllBtnSlide.btnAction = 'popularTwitterLibraries';
          }
          // finalData = popularLibrariesByBrand(finalData, request.brand);
          // console.log("2222 popular google libraries finalData : ", finalData);
        }else if(request.category === "who_covid19_question_and_answer"){
          finalData = WHO_COVID19_QUESTION_AND_ANSWER_DATA.WHO_COVID19_QUESTION_AND_ANSWER_DATA;
        }
    }else{
        finalData = response;
    }
    if(request.category === "customSearch"){
        if(request.currentCustomSearchSource === "Libraries"){
            finalData = response.results;
        }else if(request.currentCustomSearchSource === "Wikipedia"){
            finalData = response.query.search;
            // console.log("final data : ", finalData);
        }else{
          finalData = response;
        }
    }

    if(finalData && finalData.length >= defaultItemToShow && request.scrollType !== "vertical"){
        finalData = finalData.slice(0, defaultItemToShow-1);
        payload.isViewAllBtnSlide.btnName = 'View All';
        payload.isViewAllBtnSlide.btnStyle = 'border-radius: 50px; padding: 10px; position: relative; margin-top: 50%; margin-left: 35%; border: none; ';

    }else if(finalData && finalData.length >= defaultItemToShow && request.scrollType === "vertical" && request.searchQuery !== null ){
        console.log("2222 scroll type :: ", request.scrollType);
        console.log("2222 search query  :: ", request.searchQuery);
        console.log("2222 payload.isViewAllBtnSlide.btnAction : ", payload.isViewAllBtnSlide.btnAction);
        let filteredArr = [];
        finalData.forEach((item, index) => {
            if(payload.isViewAllBtnSlide.btnAction === 'repository'){
                if(item.full_name.indexOf(request.searchQuery) !== -1){
                    filteredArr.push(item)
                }
            }else{
                if(item.name.indexOf(request.searchQuery) !== -1){
                    filteredArr.push(item)
                }
            }
        });
        finalData = filteredArr;

    }else{
        payload.isViewAllBtnSlide = false;
    }
    finalData = sortByRank(finalData);
    // console.log("====== return by sort : ", x);
    finalData.forEach((item) => {
          item.customType = "newWindow";

          if(request.category === "open_source_project_depandants" || request.category === "customSearch" || request.category === "open_source_npm_libraries" || request.category === "popular_brand_libraries"){
              if(item.homepage === null || item.homepage === undefined || item.homepage === ''){
                  item.homepage = "https://gini-assistant.herokuapp.com";
              }
              if(item.language === null || item.language === undefined || item.language === ''){
                  item.language = "JavaScript";
              }
              if(item.licenses === null || item.licenses === undefined || item.licenses === ''){
                  item.licenses = "Unknown";
              }

              if(item.image === null || item.image === undefined){
                  // console.log("===========================");
                  item.image = 'static/images/npmrepository.jpg';
              }
              if(request.category === "customSearch" && (request.currentCustomSearchSources !== null || request.currentCustomSearchSource !== undefined) && request.currentCustomSearchSource === "Wikipedia"){
                  item.image = 'static/images/wikipedia.jpg';
                  item.wiki = "Wikipedia";
                  // item.url = "https://en.wikipedia.org/wiki/Main_Page";
                  item.url = "www.wikipedia.com";

              }

              filteredData.push(item);

          }else if(request.category === "open_source_depandants_repository"){
              if(item.homepage === null || item.homepage === undefined || item.homepage === ''){
                  item.homepage = "https://gini-assistant.herokuapp.com";
              }
              if(item.image === null || item.image === undefined){
                item.image = 'static/images/npm-repo.jpg';
              }

          }else if(request.category === "github_covid19_press_release"){

              if(item.image === null || item.image === undefined){
                // item.image = 'static/images/logo-who.jpg';
                item.image = 'static/images/press-release.jpg';

              }
          }else if(request.category === "who_covid19_question_and_answer"){

              if(item.image === null || item.image === undefined){
                item.image = 'static/images/logo-who.jpg';
                // item.image = 'static/images/press-release.jpg';

              }
          }else{
              if(item.image === null || item.image === undefined){
                item.image = 'static/images/languages.jpg';
              }
          }

    })


    // if(request.scrollType !== null && request.scrollType !== undefined && request.scrollType === "vertical"){
    //     if(request.category === "github_covid19_press_release"){
    //       argList[0].style += 'width: 100%; height: 250px;';
    //       argList[1].ellipse = 'none';
    //       payload.style.defaults.width = "100%";
    //     }else if(request.category === "who_covid19_question_and_answer"){
    //         argList[1].ellipse = 'none';
    //         payload.style.defaults.width = "100%";
    //     }else{
    //       argList[0].style += 'width: 100%; height: 250px;';
    //       argList[2].ellipse = 'none';
    //       payload.style.defaults.width = "100%";
    //     }
    // }

    if(request.scrollType !== null && request.scrollType !== undefined && request.scrollType === "vertical"){
          argList[0].style += 'width: 100%; height: 250px;';
          argList[2].ellipse = 'none';
          payload.style.defaults.width = "100%";
    }

    // I09@koulp
    if(filteredData.length > 0){
      payload.data = filteredData;
    }else{
      payload.data = finalData;

    }
    payload.argList = argList;
    // console.log("final data : ", finalData);

    // let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);

    // let template = '';
    // if(request.category === "popular_brand_libraries"){
    //     template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
    //     console.log("!!!!! brand template : ", template);
    // }else{
    //     template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
    // }

    let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
    if(finalData !== null && finalData.length > 0){
        // console.log("######################################################");
        if(request.from === 'Gini'){
          socket.emit("query-response", { returnMsg : template, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});
        }else if(request.from === "Api"){
          // socket.emit("response-openwhyd-playlist-by-genre", {returnMsg : findResponseTemplate});
          socket.emit("open-source-api-response", { returnMsg : template, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});
        }
    }else{
      let template = "<i>We are finding some problem. <br> Please try again later.<strong></strong></i>";
      socket.emit("query-response", { returnMsg : template});
    }
  });

}



module.exports.OPEN_SOURCE_API_PROCCESSING = OPEN_SOURCE_API_PROCCESSING;
