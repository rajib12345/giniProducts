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
const fs = require('fs');
const ROOT_DIR = require("path").resolve();
var GINI_HOME = require(ROOT_DIR+'/server/GINI/giniHomeProcessing.js');
var RESTAURANT_APP_SERVICES = require(ROOT_DIR+'/server/RESTAURANT/controllers/restaurantApp.controller.js');
var MUSIC_APP_SERVICES = require(ROOT_DIR+'/server/MUSIC/controllers/musicApp.controller.js');
const NEARBY_APP_SERVICES = require(ROOT_DIR+'/server/NEARBY/controllers/nearbyApp.controller.js');

var SHOPPING_APP_SERVICES = require(ROOT_DIR+'/server/SHOPPING/controllers/shoppingApp.controller.js');
var NEW_PROJECT_APP_SERVICES = require(ROOT_DIR+'/server/NEW_PROJECT/controllers/newProjectApp.controller.js');



var CUSTOM_PORTFOLIO_SERVICE = null;
var CUSTOM_GINI_HOME_SERVICE = null;
let LOCAL_STORAGE = {};

function createTestFileAsync(){
    try {
        let p = new Promise(function(resolve, reject){
          if (fs.existsSync('./server/PORTFOLIO/LOCAL_DB/test.json')) {
            //file exists
            console.log("+========================= FILE EXISTS +=======================");
            // CUSTOM_PORTFOLIO_SERVICE = require('./server/PORTFOLIO/portfolio.js');
            resolve();
          }else{
            let obj = require('./server/PORTFOLIO/store/generic_portfolio_data.js').portfolio_data;
            var writeStream = fs.createWriteStream("./server/PORTFOLIO/LOCAL_DB/test.json");
            writeStream.write(JSON.stringify(obj));
            writeStream.end();
            console.log("+======================= create file successfully +=========================");
            // CUSTOM_PORTFOLIO_SERVICE = require('./server/PORTFOLIO/portfolio.js');
            resolve();
          }
        });
        return p;
    } catch (e) {
        console.log("@@@@ catch :: ", e);
    } finally {

    }
}

createTestFileAsync().then(function(data){
    console.log("======= return from create file promise =======");
    console.log("77777777777777777777777777777777777777");
    CUSTOM_PORTFOLIO_SERVICE = require('./server/PORTFOLIO/portfolio.js');
    let file = {path: './server/PORTFOLIO/LOCAL_DB/test.json', type: "utf8"};
    console.log("+======================= ACCESS LOCAL DB PORTFOLIO FILE  +=========================");

    // CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.read_portfolio_file_data(file).then(function(data){
    //     console.log("8888888888888888888888888888888888888888888");
    // });
});

app.use(bodyParser.json());

app.use('/static', express.static(__dirname+'/assets'));

app.use('/edit', function(req, res) {
    res.sendfile('./client/portfolio_edit.html');
});

app.use('/shopping', function(req, res) {
    res.sendfile('./client/SHOPPING/shoppingApp.html');
});

app.use('/music', function(req, res) {
    res.sendfile('./client/MUSIC/musicApp.html');
});

app.use('/nearby', function(req, res) {
    res.sendfile('./client/NEARBY/giniNearByPlacesApp.html');
});

app.use('/qrcode-scan', function(req, res) {
    res.sendfile('./client/QRCODE_SCANNER/instascanQrcodeApp.html');
});

app.use('/qrcode-create', function(req, res) {
    res.sendfile('./client/QRCODE_SCANNER/QRCodeGeneratorApp.html');
});

app.use('/barcode', function(req, res) {
    res.sendfile('./client/QRCODE_SCANNER/MDMBarCodeDetector.html');
});

app.use('/gini-music', function(req, res) {
    res.sendfile('./client/MUSIC/giniMusicApp.html');
});

app.use('/public-apis', function(req, res) {
    res.sendfile('./client/publicApis/publicApisApp.html');
});

app.use('/musicv2', function(req, res) {
    res.sendfile('./client/giniMusicV2/giniMusicV2App.html');
});

app.use('/sportsv2', function(req, res) {
    res.sendfile('./client/giniSportsV2/giniSportsV2App.html');
});

app.use('/kontestsv2', function(req, res) {
    res.sendfile('./client/giniKontestsV2/giniKontestsV2App.html');
});

app.use('/gini-fm', function(req, res) {
    res.sendfile('./client/giniFmV2/giniFmV2App.html');
});

app.use('/restaurant', function(req, res) {
    res.sendfile('./client/RESTAURANT/restaurantApp.html');
});

app.use('/new', function(req, res) {
    res.sendfile('./client/NEW_PROJECT/newProjectApp.html');
});

app.use('/services', function(req, res) {
    res.sendfile('./client/GINI/gini_home_page.html');
});

app.use('/me', function(req, res) {
    res.sendfile('./client/final_portfolio.html');
});

app.use('/dell', function(req, res) {
    res.sendfile('./client/dell_test.html');
});

app.use('/', function(req, res) {
    res.sendfile('./client/portfolio_create.html');
});

function readFile(file){
    fs.readFile(file.path, file.type, (err, data) => {
        if(err){
            console.log("@@@ err occured when reading the file : ", err);
        }else{
            console.log("@@@ type of file data : ", typeof(data));
            console.log("@@@ data : ", data);
        }
    });
}

function loadPrimaryInitialComponents(initSectionsData, initAllSectionData, settingsSectionData, defaultStyle, socket, application, fileName){
  console.log("-------------------- load  primary initial  Components ----------------------");
  // console.log("----------------- filteredSections :: ", filteredInitialSections);
  let sections = {values: initSectionsData, sectionStyle: 'background: #F1F3F6;'}
  LOCAL_STORAGE.initialSections = sections;
  socket.emit("response-initial-sections-data", {allSectionsData : sections, defaultStyle: defaultStyle, application: application, fileName: fileName});
}

function loadInitialComponents(initAllSectionData, settingsSectionData, defaultStyle, socket, application, fileName){
  console.log("-------------------- loadInitialComponents ----------------------");
  let filteredInitialSections = [];
  let header = null;
  let settings = null;

  settingsSectionData.forEach((item, index) => {
      if(item.mapToSection !== undefined && item.mapToSection !== null && item.mapToSection !== '' && (item.isSectionToggle && item.isSectionToggle.state && item.isSectionToggle.state === true)){
          initAllSectionData.forEach((element, index) => {
              if(element.section.name === 'header' && header === null){
                  header = element;
              }
              if(element.section.name === 'settings' && settings === null){
                  settings = element;
              }
              if(item.mapToSection === element.section.name){
                  filteredInitialSections.push(element);
              }
          });
      }
  });

  filteredInitialSections.push(header);
  filteredInitialSections.push(settings);

  // console.log("----------------- filteredSections :: ", filteredInitialSections);
  let sections = {values: filteredInitialSections, sectionStyle: 'background: #F1F3F6;'}
  LOCAL_STORAGE.initialSections = sections;
  socket.emit("response-initial-sections-data", {allSectionsData : sections, defaultStyle: defaultStyle, application: application, fileName: fileName});
}


io.on('connection', function(socket){

    console.log('A user connected..........');
    // let initAllSectionData = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_data('all_sections').values;
    // let settingsSectionData = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_data('settings_section').block.sections[0].parts;
    // let defaultStyle = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_data('default_style');

    // socket.on("request-initial-sections-data", (data) =>{
    //     let filteredInitialSections = [];
    //     let header = null;
    //     let settings = null;
    //
    //     settingsSectionData.forEach((item, index) => {
    //         if(item.mapToSection !== undefined && item.mapToSection !== null && item.mapToSection !== ''){
    //             initAllSectionData.forEach((element, index) => {
    //                 if(element.section.name === 'header' && header === null){
    //                     header = element;
    //                 }
    //                 if(element.section.name === 'settings' && settings === null){
    //                     settings = element;
    //                 }
    //                 if(item.mapToSection === element.section.name){
    //                     filteredInitialSections.push(element);
    //                 }
    //             });
    //         }
    //     });
    //     filteredInitialSections.push(header);
    //     filteredInitialSections.push(settings);
    //
    //
    //     // console.log("!!!! filteredSections :: ", filteredInitialSections);
    //     let sections = {values: filteredInitialSections, sectionStyle: 'background: #F1F3F6;'}
    //     LOCAL_STORAGE.initialSections = sections;
    //     socket.emit("response-initial-sections-data", {allSectionsData : sections, defaultStyle: defaultStyle});
    // })

    // socket.emit("client-initial-setup", {allSectionsData : initAllSectionData});

    function onLoadServer(){
        console.log("=========================  initial application load ==========================");
        let filePath = './server/PORTFOLIO/store/generic_portfolio_data.js';
        console.log("====== filePath : ", filePath);
        let CURRENT_PORTFOLIO_DATA = require(filePath).portfolio_data;
        let initAllSectionData = CURRENT_PORTFOLIO_DATA['all_sections'].values;
        // let settingsSectionData = CURRENT_PORTFOLIO_DATA['settings_section'].block.sections[0].parts;
        // let defaultStyle = CURRENT_PORTFOLIO_DATA['default_style'];
        socket.emit("client-initial-setup", {allSectionsData : initAllSectionData});
        // loadInitialComponents(initAllSectionData, settingsSectionData, defaultStyle, socket, request.application, request.fileName);
    };
    onLoadServer();

    function getSectionDatabyApplication(application, sectionName){
        console.log("!!! sectionName : ", sectionName);
        let dataFilePath = './server/'+application+'/store/'+application+'Data.js';
        let DATA = require(dataFilePath).portfolio_data;
        return DATA[sectionName];
    }

    socket.on("request-final-portfolio-sections", () => {
          socket.emit("response-final-portfolio-sections", {initSections: LOCAL_STORAGE.initialSections, defaultStyle: defaultStyle});
    });

    socket.on("test-request", () => {
        socket.emit("test-response", {template : 'rajib karmakar'});
    })

    socket.on("request-generic-portfolio", (request) => {
      console.log("@@@@@@@@@@@@@@@ **************** generic request :: ", request);

      let sectionData = null;
      if(request.actionType === 'update_section_apis_url'){
          let sectionData = getSectionDatabyApplication(request.application, request.sectionName);
          if(sectionData.dataSource.type === 'API'){
              sectionData.dataSource.url = request.siteUrl;
              console.log("=== after update url : ", sectionData.dataSource.url);
            }
      }

      if(request.sectionName !== undefined && request.sectionName !== null && request.sectionName !== ''){
        sectionData = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.new_get_section_data(request);
      }

      // if(request.apiRef === "whydYoutubePopMusic_section"){
      //     console.log("^^^^^^^^^^^^^^^^^^^^^^^   sectionData :: ", sectionData);
      // }

      if(request.apiRef === "about_section" ||
          request.apiRef === 'facts_section' ||
          request.apiRef === 'skills_section' ||
          request.apiRef === 'education_section' ||
          request.apiRef === 'workexp_section' ||
          request.apiRef === 'services_section' ||
          request.apiRef === 'languages_section' ||
          request.apiRef === 'contacts_section' ||
          request.apiRef === 'projects_section' ||
          request.apiRef === 'activities_section' ||
          request.apiRef === 'settings_section' ||
          request.apiRef === 'products_section' ||
          request.apiRef === 'brand_section' ||
          request.apiRef === 'aboutRestaurant_section' ||
          request.apiRef === 'mobileSideNavBar_section'

        // request.apiRef === 'specialMenu_section'
      ){
          let template = '';
          if(request.edit){
            let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
            template = res.template;
            socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, edit: request.edit, templateData: res.templateData});
          }else{
            if(request.apiRef === 'mobileSideNavBar_section'){
              template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
              socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
              return;
            }
            template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
            socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
          }
      }else if(request.apiRef === 'headerNav_section'){
        let nav = null;
        if(request.application === 'gini_home'){
            nav = GINI_HOME.gini_home_processing.get_section_data("headerNav_section");
        }else if(request.application === 'restaurant_home'){
            nav = RESTAURANT_APP_SERVICES.restaurant_app_services.get_section_data("headerNav_section");
        }else if(request.application === 'music_home'){
            nav = MUSIC_APP_SERVICES.music_app_services.get_section_data("headerNav_section");
            console.log("@@@@@@@@@@@@@ music  nav val : ", nav);
        }else if(request.application === 'shopping_home'){
            nav = SHOPPING_APP_SERVICES.shopping_app_services.get_section_data("headerNav_section");
            console.log("@@@@@@@@@@@@@ shopping  nav val : ", nav);
        }else if(request.application === 'new_project'){
            nav = NEW_PROJECT_APP_SERVICES.app_services.get_section_data("headerNav_section");
            console.log("@@@@@@@@@@@@@ shopping  nav val : ", nav);
        }else if(request.application === 'GINIMUSIC'){
            let filePath = './server/GINIMUSIC/store/giniMusicApp.js';
            let GINI_MUSIC_DATA = require(filePath).portfolio_data;
            console.log("===== GINI_MUSIC_DATA : ", GINI_MUSIC_DATA);
            nav = GINI_MUSIC_DATA[request.sectionName];

            // nav = NEW_PROJECT_APP_SERVICES.app_services.get_section_data("headerNav_section");
            // console.log("@@@@@@@@@@@@@ shopping  nav val : ", nav);
        }else{
          let dataFileName = request.application;
          let dataFilePath = './server/'+request.application+'/store/'+request.application+'Data.js';
          // let x = './server/publicApis/store/publicApisApp.js';
          // console.log("dataFilePath : ", dataFilePath);
          let DATA = require(dataFilePath).portfolio_data;
          nav = DATA[request.sectionName];
          console.log("33333333333333333333333333333333333333333333333333333333333333333333");
          console.log("333333333333333  nav : ", nav);

          let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, nav, request.application, request);
          socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
          return
        }
        let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_header_navigation_template(nav, request.application);
        socket.emit("response-generic-portfolio", {template : template, blockId: null, templateId: 'header', loaderId: null, apiRef: request.apiRef});

      }else if(request.apiRef === 'latest_work_section'){
          let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.latest_work_section(request.apiRef);
          // console.log("@@@ template :: ", template);
          socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId });

      }else if(request.apiRef === 'work_section'){
          let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.work_section("work_section", request.logoCategory);
          // console.log("@@@ template :: ", template);
          socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef: request.apiRef});

      }else if(
                request.apiRef === 'menu_section'
                || request.apiRef === 'specialMenuContainer_section'
                || request.apiRef === 'newsByCategory_section'
                || request.apiRef === "entertainmentNewsByCategoryContainer_section"
                || request.apiRef === 'educationalNewsByCategoryContainer_section'
                || request.apiRef === "medicalNewsByCategoryContainer_section"
                || request.apiRef === "newsApiTopArticlesNewsByCategoryContainer_section"
                || request.apiRef === "newsApiTopJournalNewsByCategoryContainer_section"
                || request.apiRef === "hereMapPlacesByCategoryContainer_section"
                || request.apiRef === "hereMapPlacesByTransportPlacesCategoryContainer_section"
                || request.apiRef === "hereMapPlacesByTransportPlacesCategoryContainer_section"
                || request.apiRef === "hereMapPlacesByAccomodationPlacesCategoryContainer_section"
                || request.apiRef === "hereMapPlacesByEmmergencyServicePlacesCategoryContainer_section"
                || request.apiRef === "hereMapPlacesByShoppingCategoryContainer_section"

              ){
            let categoryData = null;
            if(sectionData !== undefined && sectionData !== null){
              console.log("11111111111111  :: ", request);
              categoryData = sectionData[request.category];
            }
            let url = '';
            if(
              categoryData !== undefined && categoryData !== null && categoryData !== '' &&
              categoryData.dataSource !== undefined &&
              categoryData.dataSource !== null &&
              categoryData.dataSource.type !== undefined &&
              categoryData.dataSource.type !== null &&
              categoryData.dataSource.type === "API"
            ){
              console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
              let requestOption;
              if(sectionData.defaults !== undefined){
                  let defaultsApiParams = '';
                  for(let key in sectionData.defaults){
                      defaultsApiParams += '&'+key+'='+sectionData.defaults[key];
                  }
                  url = categoryData.dataSource.url+defaultsApiParams;
              }else{
                url = categoryData.dataSource.url;
              }
              CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_api_data(url).then((data) => {
                  categoryData.dataSource.data = data;
                  let template = '';
                  if(request.edit){
                    let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, categoryData, request.application, request);
                    template = res.template;
                    socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, edit: request.edit, templateData: res.templateData});
                  }else{
                    template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, categoryData, request.application, request);
                    socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
                  }
              })
            }else if(
              categoryData !== undefined && categoryData !== null && categoryData !== '' &&
              categoryData.dataSource !== undefined &&
              categoryData.dataSource !== null &&
              categoryData.dataSource.type !== undefined &&
              categoryData.dataSource.type !== null &&
              categoryData.dataSource.type === "DATA-SERVER"
            ){
                // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                // console.log("@@@@ categoryData : ", categoryData);
                let filePath = './server'+categoryData.dataSource.dataFilePath;
                let rawData = require(filePath).rawData;
                console.log("++++++++++++++++++ file path : ", filePath);
                categoryData.dataSource.data = rawData;

                let template = '';
                if(request.edit){
                  let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, rawData, request.application, request);
                  template = res.template;
                  socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, edit: request.edit, templateData: res.templateData});
                }else{
                  template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, categoryData, request.application, request);
                  socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
                }
            }else{
              console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
              let categoryData = sectionData[request.category];
              if(categoryData !== undefined){
                let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, categoryData, request.application, request);
                socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
              }
            }
        }else if(request.apiRef === 'workcat_section'){
          let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.workcat_list_section(request.apiRef);
          // console.log("@@@ template :: ", template);
          socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef: request.apiRef});

      }else if(request.apiRef === 'header_section'){
          // let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.header_section(request.apiRef, request.dynamic_header_menus, request.edit);
          let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.header_section(request);

          // console.log("@@@ template :: ", template);
          socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef: request.apiRef});

      }else if(request.apiRef === 'typed_section'){
          let data = null;
          if(request.application === 'gini_home'){
            // data = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.typed_section(request.apiRef);
            data = GINI_HOME.gini_home_processing.get_section_data('typed_section');
          }else if(request.application === 'restaurant_home'){
            data = RESTAURANT_APP_SERVICES.restaurant_app_services.get_section_data('typed_section');
            // data = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.typed_section(request.apiRef);
          }else{
            data = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.typed_section(request.apiRef);
          }
          // console.log("@@@ template :: ", template);
          socket.emit("response-generic-portfolio", {data : data, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef: request.apiRef});

      }else if(request.apiRef === "update_section_data"){
          CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.update_section_data(request.sectionData);
      }else if(request.apiRef === "update_block_data"){
          console.log("!!!!!!!!!!!!!!! sectionData :: ", sectionData);
          CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.update_block_data(request, sectionData);
          if(request.actionType === "add_item_on_top" ||
          request.actionType === "add_item_on_below" ||
          request.actionType === "delete_section" ||
          request.actionType === "add_section_left" ||
          request.actionType === "add_section_right" ||
          request.actionType === "add_similar_item_on_below" ||
          request.actionType === "add_similar_item_on_top" ){
              let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.sectionName, true, sectionData, request.application, request);
              let template = res.template;
              console.log("@@@ section name :: ", request.elementId);
              let secName = request.sectionName.split("_")[0];
              // console.log("@@@ secName :: ", secName);
              socket.emit("response-generic-portfolio", {template : template, blockId: 'custom_'+secName+'_block', templateId: 'custom_'+secName+'_template', loaderId: 'custom_'+secName+'_loader', edit: true, templateData: res.templateData, elementId: request.elementId});
          }else if(request.actionType === "edit_item_style" || request.actionType === "edit_part_style"){
              let style = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.update_block_data(request, sectionData);
              socket.emit("response-action-edit-style", {style : style});
          }else if(request.actionType === "settings_drag_and_drop"){
              let secName = request.sectionName.split("_")[0];
              console.log("@@@ secName :: ", secName);
              console.log("@@@ sectionData :: ", sectionData);
              if(secName === 'settings'){
                  let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.sectionName, false, sectionData, request.application, request);;
                  socket.emit("response-generic-portfolio", {template : template, blockId: null, templateId: null, loaderId: null, apiRef: 'settings_section'});
              }else{
                  let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.sectionName, true, sectionData, request.application, request);
                  let template = res.template;
                  socket.emit("response-generic-portfolio", {template : template, blockId: 'custom_'+secName+'_block', templateId: 'custom_'+secName+'_template', loaderId: 'custom_'+secName+'_loader', edit: true, });
              }
          }
      }else if(request.apiRef === "update_initial_sections"){
          console.log("11111111111111111111 request \n", request);
          LOCAL_STORAGE.initialSections = request.updatedInitialSections;
          let response = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.update_initial_sections(request);
          socket.emit("response-generic-portfolio", {apiRef : request.apiRef});
      }else if(request.apiRef === "update_defaults_settings"){
        console.log("@@@ sectionData :: ", sectionData);
        let val = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.update_defaults_settings(request);
            if(request.sectionName === 'newsByCategory_section'){
                console.log("@@@ 6666  category : ", request.category);
                let categoryData = sectionData[request.category.toString()];
                let secName = request.sectionName.split("_")[0];
                  console.log("@@@ 77777 categoryData : ", categoryData);
                if(
                  categoryData !== undefined && categoryData !== null && categoryData !== '' &&
                  categoryData.dataSource !== undefined &&
                  categoryData.dataSource !== null &&
                  categoryData.dataSource.type !== undefined &&
                  categoryData.dataSource.type !== null &&
                  categoryData.dataSource.type === "API"
                ){
                  CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_api_data(categoryData.dataSource.url).then((data) => {
                      categoryData.dataSource.data = data;
                      let template = '';
                      if(request.edit){
                        let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, categoryData, request.application, request);
                        template = res.template;
                        socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, edit: request.edit, templateData: res.templateData});
                      }else{
                        console.log("@@@ secname : ", secName);
                        console.log("@@@@ template : ", 'custom_'+secName+'_template');
                        console.log("@@@@ block : ", 'custom_'+secName+'_block');

                        template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, categoryData, request.application, request);
                        // socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
                        socket.emit("response-generic-portfolio", {template : template, blockId: 'custom_'+secName+'_block', templateId: 'custom_'+secName+'_template', loaderId: 'custom_'+secName+'_loader', edit: false, apiRef : request.apiRef });

                      }
                })
              }
            }

      }else if(request.apiRef === "update_theme"){
          CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.update_theme(request);
      }else if(request.apiRef === "theme_section"){
          console.log("======= calling theme section template =========");
          let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
          // let data = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.typed_section(request.apiRef);
          // console.log("@@@ template :: ", template);
          socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef: request.apiRef});

      }else if(request.apiRef === "get_section_template"){
          if(request.actionType === 'section_template'){
              // CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.sectionName, request.edit);
              let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.sectionName, request.edit, sectionData, request.application, request);
              socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
          }
      }else if(request.apiRef === 'create_new_section'){
          let updatedAllSections = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.create_new_section(request);
          let defaultStyle = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_application_default_style(request);
          // /LOCAL_STORAGE.initialSections = sections;
          let sections = {values: updatedAllSections.allSectionsData, sectionStyle: 'background: #F1F3F6;'}
          socket.emit("response-initial-sections-data", {allSectionsData : sections, defaultStyle: defaultStyle, application: request.application, fileName: request.fileName});
      }else if(request.apiRef === 'create_new_profile'){
          CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.copy_file(request.fileName).then((data) => {
              console.log("======================== successfully create new file =============================");
              // console.log("^^^^^^^^ profiles template : ", data);
              socket.emit("response-generic-portfolio", {template : data, blockId: 'profilesBlock', apiRef: request.apiRef , templateId: '', loaderId: '' });
          });
      }else if(request.apiRef === 'change_my_profile'){
          console.log("^^^^^^^^^^^^^^^^^^^  action : change_my_profile : ^^^^^^^^^^^^^^^^^^^^^^");
          let profileName = request.profileName+'.js';
          let file = {path: './server/PORTFOLIO/store/'+profileName, type: "utf8"};
          CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.read_portfolio_file_data(file).then(function(data){
              console.log("8888888888888888888888888888888888888888888");
              console.log("88888888 profiles data : ", data);
          });

      }else if(request.apiRef === 'sync_portfolio_file'){
          let filePath = './server/PORTFOLIO/LOCAL_DB/test.json';
          CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.update_portfolio_file(filePath).then((data) => {
              console.log("successfully written to the file ");
          });

      }else if(request.apiRef === "custom_search"){
          // console.log("=========== section data : ", sectionData);
          console.log("=========== search query : ", request.searchQuery);
          console.log("=========== search property : ", request.searchProperty);
          // console.log("=========== search sectionData  : ", JSON.stringify(sectionData));


          let filteredSearchItem = [];
          let data = null;
          let dummyData = sectionData.dataSource.data;
          let localSectionData = JSON.parse(JSON.stringify(sectionData));
          if(request.application === 'publicApis'){
              data = localSectionData.dataSource.data.entries;
          }else if(request.application === 'giniKontestsV2'){
              data = localSectionData.dataSource.data;
          }
            if(request.searchQuery.length >= 3){
              // console.log("======= custom search data : ", data);
                  data.forEach((item, i) => {
                      // if((item[request.searchProperty].toLowerCase().indexOf(request.searchQuery.toLowerCase()) !== -1) || (item.Description.toLowerCase().indexOf(request.searchQuery.toLowerCase()) !== -1)){

                      if((item[request.searchProperty].toLowerCase().indexOf(request.searchQuery.toLowerCase()) !== -1)){
                          filteredSearchItem.push(item);
                      }
                  });
                  console.log("======= custom search data filteredSearchItem : ", filteredSearchItem);
                  // localSectionData.dataSource.data.entries = filteredSearchItem;
                  if(request.application === 'publicApis'){
                      localSectionData.dataSource.data.entries = filteredSearchItem;
                  }else if(request.application === 'giniKontestsV2'){
                      localSectionData.dataSource.data = filteredSearchItem;
                  }
            }

            let template = '';
            if(request.edit){
              let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, localSectionData, request.application, request);
              template = res.template;
              socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, edit: request.edit, templateData: res.templateData});
            }else{
              template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, localSectionData, request.application, request);
              sectionData.dataSource.data = dummyData;
              socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
            }
      }else if(request.apiRef === "allPublicApis"){
            if(request.action === 'public_apis_by_category'){
                  let data = sectionData.dataSource.data;
                  console.log("55555555555555555 sectionData.dataSource.data : ", sectionData.dataSource.data);
            }
      }else if(request.apiRef === "request_initial_sections"){
          if(request.application !== undefined && request.application !== null && request.application !== ''){
                if(request.application === 'gini_home'){
                    let giniHomeAllSectionsData = GINI_HOME.gini_home_processing.get_section_data("all_sections").values;
                    let defaultStyle = GINI_HOME.gini_home_processing.get_section_data('default_style');
                    let sections = {values: giniHomeAllSectionsData, sectionStyle: 'background: #F1F3F6;'}
                    socket.emit("response-generic-portfolio", {initSections : sections, defaultStyle: defaultStyle, apiRef: request.apiRef});
                }else if(request.application === 'restaurant_home'){
                    let allSections = RESTAURANT_APP_SERVICES.restaurant_app_services.get_section_data("all_sections").values;
                    let initSections = RESTAURANT_APP_SERVICES.restaurant_app_services.get_section_data("init_sections").values;
                    let defaultStyle = RESTAURANT_APP_SERVICES.restaurant_app_services.get_section_data('default_style');
                    let sections = {values: initSections, sectionStyle: 'background: #F1F3F6;'}
                    socket.emit("response-generic-portfolio", {initSections : sections, allSectionsData : allSections, defaultStyle: defaultStyle, apiRef: request.apiRef});
                    // {allSectionsData : sections, defaultStyle: defaultStyle});
                }else if(request.application === 'music_home'){
                    console.log("========== calling music home application =============");
                    let allSections = MUSIC_APP_SERVICES.music_app_services.get_section_data("all_sections").values;
                    let initSections = MUSIC_APP_SERVICES.music_app_services.get_section_data("init_sections").values;
                    let defaultStyle = MUSIC_APP_SERVICES.music_app_services.get_section_data('default_style');
                    let sections = {values: initSections, sectionStyle: 'background: #F1F3F6;'}
                    socket.emit("response-generic-portfolio", {initSections : sections, allSectionsData : allSections, defaultStyle: defaultStyle, apiRef: request.apiRef});
                    // {allSectionsData : sections, defaultStyle: defaultStyle});
                }else if(request.application === 'gini_nearby_app'){
                    console.log("========== calling music home application =============");
                    let allSections = NEARBY_APP_SERVICES.nearby_app_services.get_section_data("all_sections").values;
                    let initSections = NEARBY_APP_SERVICES.nearby_app_services.get_section_data("init_sections").values;
                    let defaultStyle = NEARBY_APP_SERVICES.nearby_app_services.get_section_data('default_style');
                    let sections = {values: initSections, sectionStyle: 'background: #F1F3F6;'}
                    socket.emit("response-generic-portfolio", {initSections : sections, allSectionsData : allSections, defaultStyle: defaultStyle, apiRef: request.apiRef});
                    // {allSectionsData : sections, defaultStyle: defaultStyle});
                }else if(request.application === 'shopping_home'){
                    console.log("========== calling music home application =============");
                    let allSections = SHOPPING_APP_SERVICES.shopping_app_services.get_section_data("all_sections").values;
                    let initSections = SHOPPING_APP_SERVICES.shopping_app_services.get_section_data("init_sections").values;
                    let defaultStyle = SHOPPING_APP_SERVICES.shopping_app_services.get_section_data('default_style');
                    let sections = {values: initSections, sectionStyle: 'background: #F1F3F6;'}
                    socket.emit("response-generic-portfolio", {initSections : sections, allSectionsData : allSections, defaultStyle: defaultStyle, apiRef: request.apiRef});
                    // {allSectionsData : sections, defaultStyle: defaultStyle});
                }else if(request.application === 'new_project'){
                    console.log("========== calling new_project home application =============");
                    let allSections = NEW_PROJECT_APP_SERVICES.app_services.get_section_data("all_sections").values;
                    let initSections = NEW_PROJECT_APP_SERVICES.app_services.get_section_data("init_sections").values;
                    let defaultStyle = NEW_PROJECT_APP_SERVICES.app_services.get_section_data('default_style');
                    let sections = {values: initSections, sectionStyle: 'background: #F1F3F6;'}
                    socket.emit("response-generic-portfolio", {initSections : sections, allSectionsData : allSections, defaultStyle: defaultStyle, apiRef: request.apiRef});
                    // {allSectionsData : sections, defaultStyle: defaultStyle});
                }else if(request.application === 'PORTFOLIO'){
                    let fileControllerPath = './server/'+request.application+'/portfolio.js';
                    let filePath = null;
                    let file = null;
                    if(request.fileName === 'default'){
                      filePath = './server/'+request.application+'/store/generic_portfolio_data.js';
                      file = {path: filePath, type: "utf8"};
                    }else{
                      filePath = './server/'+request.application+'/store/'+request.fileName+'.js';
                      file = {path: filePath, type: "utf8"};
                    }
                    console.log("===== filePath : ", filePath);
                    let CURRENT_PORTFOLIO_DATA = require(filePath).portfolio_data;
                    let initAllSectionData = CURRENT_PORTFOLIO_DATA['all_sections'].values;
                    let settingsSectionData = CURRENT_PORTFOLIO_DATA['settings_section'].block.sections[0].parts;
                    let defaultStyle = CURRENT_PORTFOLIO_DATA['default_style'];
                    loadInitialComponents(initAllSectionData, settingsSectionData, defaultStyle, socket, request.application, request.fileName);
                }else if(request.application === 'GINIMUSIC'){
                    // let filePath = ROOT_DIR+'/server/'+request.application+'/store/'+request.fileName+'.js';
                    let filePath = './server/GINIMUSIC/store/giniMusicApp.js';

                    console.log("===== filePath : ", filePath);
                    let GINI_MUSIC_DATA = require(filePath).portfolio_data;
                    console.log("===== GINI_MUSIC_DATA : ", GINI_MUSIC_DATA);
                    let initAllSectionData = GINI_MUSIC_DATA['all_sections'].values;
                    let settingsSectionData = GINI_MUSIC_DATA['settings_section'].block.sections[0].parts;
                    let defaultStyle = GINI_MUSIC_DATA['default_style'];
                    loadInitialComponents(initAllSectionData, settingsSectionData, defaultStyle, socket, request.application, request.fileName);
                }else{
                    let dataFileName = request.application;
                    let dataFilePath = './server/'+request.application+'/store/'+request.application+'Data.js';
                    // let x = './server/publicApis/store/publicApisApp.js';
                    console.log("dataFilePath : ", dataFilePath);
                    let DATA = require(dataFilePath).portfolio_data;
                    let initAllSectionData = DATA['all_sections'].values;
                    let initSectionsData = DATA['init_sections'].values;

                    let settingsSectionData = DATA['settings_section'].block.sections[0].parts;
                    let defaultStyle = DATA['default_style'];
                    // loadInitialComponents(initAllSectionData, settingsSectionData, defaultStyle, socket, request.application, request.fileName);
                    loadPrimaryInitialComponents(initSectionsData, initAllSectionData, settingsSectionData, defaultStyle, socket, request.application, request.fileName);

                }
          }
      }else{
          let template = '';

          if(
            sectionData !== undefined &&
            sectionData !== null &&
            sectionData.dataSource !== undefined &&
            sectionData.dataSource !== null &&
            sectionData.dataSource.type !== undefined &&
            sectionData.dataSource.type !== null &&
            sectionData.dataSource.type === "API"
          ){
            console.log("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
            CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_api_data(sectionData.dataSource.url, sectionData.dataSource.authorizationKey).then((data) => {
                // console.log("@@@ Response from APIS : ", data);
                if(request.apiRef === "allPublicApis_section"){
                    console.log("**********************************");
                   let futureKontests = [];
                   let runningKontests = [];
                   let playedKontests = [];
                   if(request.byCategory === 'future_contests' || request.byCategory === 'live_contests' || request.byCategory === 'played_contests'){
                       data.forEach((item, i) => {
                         let today = new Date();
                         let itemStartDate = new Date(item.start_time);
                         let itemEndDate = new Date(item.end_time);
                         let compareVal = today < itemStartDate;
                         // console.log("---------------------");
                         // console.log("@@@ itemStartDate : ", itemStartDate);
                         // console.log("@@@ today : ", today);
                         // console.log("@@@ compareVal : ", compareVal);
                         // console.log("---------------------");
                         if( (today < itemStartDate) && request.byCategory === 'future_contests'){
                              futureKontests.push(item)
                         }else if((today > itemStartDate && today < itemEndDate) && request.byCategory === 'live_contests'){
                              runningKontests.push(item);
                         }else if(request.byCategory === 'played_contests'){
                              playedKontests.push(item);
                         }
                       });
                       if(request.byCategory === 'future_contests'){
                          sectionData.dataSource.data = futureKontests;
                       }else if(request.byCategory === 'played_contests'){
                          sectionData.dataSource.data = playedKontests;
                       }else if(request.byCategory === 'live_contests'){
                          sectionData.dataSource.data = runningKontests;
                       }
                       console.log("@@@@@@@@@@@ futureKontests : ", futureKontests);
                       console.log("@@@@@@@@@@@ playedKontests : ", playedKontests);
                       console.log("@@@@@@@@@@@ runningKontests : ", runningKontests);
                       console.log("@@@@@@@@@@@ length : ", sectionData.dataSource.data.length);
                   }else{
                        sectionData.dataSource.data = data;
                   }

                }else if(request.apiRef === "kontestsApisLeftSideBarSearch_section"){
                   let filteredArr = [];
                   data.forEach((item, i) => {
                     let obj = {siteName: item[0], siteCode: item[1], siteSource: item[2]};
                     filteredArr.push(obj);
                   });
                   // data = filteredArr;
                   // console.log("@@@ filteredArr : ", filteredArr);
                   sectionData.dataSource.data = filteredArr;
                }else{
                  sectionData.dataSource.data = data;

                }

                if(request.edit){
                  let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
                  template = res.template;
                  socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, edit: request.edit, templateData: res.templateData});
                }else{
                  template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
                  if(request.apiRef === 'hereMapNearByRestaurant_section'){
                    console.log("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999");
                    // console.log("@@@@ 999999 \n: ", template);
                  }
                  socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
                }
            })

          }else if(
            sectionData !== undefined && sectionData !== null && sectionData !== '' &&
            sectionData.dataSource !== undefined &&
            sectionData.dataSource !== null &&
            sectionData.dataSource.type !== undefined &&
            sectionData.dataSource.type !== null &&
            sectionData.dataSource.type === "DATA-SERVER"
          ){
              console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
              let filePath = './server'+sectionData.dataSource.dataFilePath;
              console.log("++++++++++++++++++ file path ::: ", filePath);
              let rawData = require(filePath).rawData;
              rawData = JSON.parse(JSON.stringify(rawData));
              if(request.apiRef === "allPublicApis_section" && request.actionType === 'public_apis_by_category' && request.byCategory !== 'All'){
                    let filteredArr = [];
                    let data = rawData.entries;
                    data.forEach((item, i) => {
                        if(item.Category === request.byCategory){
                              filteredArr.push(item);
                        }
                    });
                    sectionData.dataSource.data = {count: filteredArr.length, entries: filteredArr};
                    let sName = 'allPublicApisGlobalSearch_section';
                    sName = sName.split('_')[0];
                    let beforeUpdateSectionData = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.new_get_section_data({application: 'publicApis', sectionName: 'allPublicApisGlobalSearch_section'});
                    //beforeUpdateSectionData.block.sections[2].parts[0].desc[1].key.name = filteredArr.length;
                    // console.log("++++= beforeUpdateSectionData : ", JSON.stringify(beforeUpdateSectionData));
                    let template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, beforeUpdateSectionData, request.application, request);
                    socket.emit("response-generic-portfolio", {template : template, blockId: 'custom_'+sName+'_block', templateId: 'custom_'+sName+'_template', loaderId: 'custom_'+sName+'_loader', apiRef : request.apiRef});
              }else{
                sectionData.dataSource.data = rawData;
              }

              let template = '';
              if(request.edit){
                let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
                template = res.template;
                socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, edit: request.edit, templateData: res.templateData});
              }else{
                template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
                socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});

              }
          }else{
            if(request.edit){
              let res = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
              template = res.template;
              socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, edit: request.edit, templateData: res.templateData});
            }else{
              template = CUSTOM_PORTFOLIO_SERVICE.generic_portfolio_functionality_mapping.get_section_template(request.apiRef, request.edit, sectionData, request.application, request);
              socket.emit("response-generic-portfolio", {template : template, blockId: request.blockId, templateId: request.templateId, loaderId: request.loaderId, apiRef : request.apiRef});
            }
          }
      }
  })


    // *************************************  CODE FOR GINI HOME PAGE START HERE  **************************************


    socket.on("request-gini-home-initial-sections", (request) => {
        console.log("=========== calling request-gini-home-initial-sections ===========");
        let giniHomeAllSectionsData = GINI_HOME.gini_home_processing.get_section_data("init_sections").values;
        let defaultStyle = GINI_HOME.gini_home_processing.get_section_data('default_style');
        let sections = {values: giniHomeAllSectionsData, sectionStyle: 'background: #F1F3F6;'}
        socket.emit("response-gini-home-initial-sections", {initSections : sections, defaultStyle: defaultStyle});
    })



    // *************************************  CODE FOR GINI HOME PAGE START HERE  **************************************


});







var port = process.env.PORT || 4000;
http.listen(port, function(){
  console.log("nodejs running on port :  "+port);

});
