const promise = require("promise");
const request = require("request");
const ROOT_DIR = require("path").resolve();
const GENERIC_TEMPLATE_GENERATOR = require(ROOT_DIR+'/GenericTemplateCenter/basicGenericTemplateGenerator.js');
// var LIBRARIES_PLATFORMS_DATA = require('./store/openSourceLibraries_platforms.js');
// var LIBRARIES_PLATFORMS_REPOSITORY_DATA = require('./store/openSourceLibraries_repository.js');
// var LIBRARIES_PLATFORMS_DEPANDANTS_DATA = require('./store/openSourcePlatforms_depandants.js');
// var LIBRARIES_PLATFORMS_LIBRARIES_DATA = require('./store/openSource_libraries.js');
var WHO_COVID19_QUESTION_AND_ANSWER_DATA = require('./store/covidProsAndConsQuesAns.js');
var COVID19_COUNTRY_DATA = require('./store/covid19EffectedCountryData.js');
var WORLD_COUNTRY_DATA = require('./store/world-countries-data.js');
var COVID19_INDIA_RESOURCES_DATA = require('./store/covid19IndiaResources.js');
// var COVID19_INDIA_STATES_DAILY_CHANGES_DATA = require('./store/statesDailyChanges.js');
var COVID19_INDIA_DEATH_RECOVERIES_DATA = require('./store/covid19IndiaDeathRecoveries.js');
var COVID19_DOS_DONTS = require('./store/dosAndDontsCorona.js');


// console.log("@@@@ states daily changes :: ", JSON.stringify(mainDailyChangesObj));

// BHARAT MATRIMONY :  B2241978 :)

// var TEST_DATA = require('./store/testdata.js');
// let covid_country_list = TEST_DATA.new_country_list;
// let country_all_data = TEST_DATA.country_all_data;
// let obj = {};
// for (var i = 0; i < country_all_data.length; i++) {
//     let alpha3code = country_all_data[i].alpha3Code;
//     let country_info = {};
//     country_info.country_name = country_all_data[i].name;
//     country_info.country_alpha3code = country_all_data[i].alpha3Code;
//     country_info.country_alpha2code = country_all_data[i].alpha2Code;
//     country_info.country_capital = country_all_data[i].capital;
//     country_info.country_region = country_all_data[i].region;
//     country_info.country_population = country_all_data[i].population;
//     country_info.country_numericCode = country_all_data[i].numericCode;
//     country_info.country_flag = country_all_data[i].flag;
//     obj[alpha3code] = country_info;
// }
// console.log("country list :: \n\n", JSON.stringify(obj));


// let country_obj = {};
// for (let i = 0; i < country_list.length; i++) {
//     let obj = country_list[i];
//     for(var cname in obj){
//       country_obj[cname] = {};
//     }
// }

// console.log("country list :: \n\n", JSON.stringify(obj));
// let death_recoveries_arr = TEST_DATA.death_recoveries_data;
// console.log("$$$$$$$$$$$$$$$$$   death recoveries arr count : ", death_recoveries_arr.length);
// let index_arr = [];
// let obj = {};
// for (var i = 0; i < death_recoveries_arr.length; i++) {
//     let state = death_recoveries_arr[i].state;
//     if(index_arr.indexOf(state) === -1){
//         let arr = [];
//         arr.push(death_recoveries_arr[i]);
//         obj[state] = arr;
//         index_arr.push(state);
//     }else{
//       obj[state].push(death_recoveries_arr[i]);
//     }
// }
// console.log("#####   obj \n\n\n", JSON.stringify(obj));

// var country_data = require('./store/testdata.js');
// // console.log("country_data \n", country_data);
// let c_code = COVID19_COUNTRY_DATA.COVID19_EFFECTED_COUNTRY_DATA_V2;
// let cnt_data = country_data.country_data;
// let arr = {};
// for (let item in c_code) {
//     let x = item.substring(0, 2);
//     console.log("item: ", x);
//
//     for(let i=0; i<cnt_data.length; i++){
//         if(x === cnt_data[i].code){
//             arr[x] = {name : cnt_data[i].name}
//         }
//     }
// }
//
// console.log("#####   arr \n\n", JSON.stringify(arr));


// I09@koulp
// https://api.covid19india.org/

let default_style = {
  boxShadow: "box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 3px 0px, rgba(0, 0, 0, 0.11) 0px 0px 0px 0px;",
  // themeColor: '#4C007C',
  themeColor: '#607D8B',
  borderColor: "#ccd0d5",
  msBoxShadow: "box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 3px 0px, rgba(0, 0, 0, 0.11) 0px 0px 0px 0px;",
  mortalityRateColor: 'firebrick',
  confirmed: '',
  deaths: '',
  recovered: ''
}

let github_covid19_press_release_template_arglist = [
    {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['GITHUB:covid19_api'] }, style:'width: 100%; height: 165px; position: relative; top: 0px; border: none;'},
    {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black; font-size: 14px;  position: relative; line-height: 1.1;"},
    {key : "author", subkey: null, type: "block", prefixValue: 'Author ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 13px; position: relative; line-height: 1; margin-top: 7px;"},
    {key : "publication", subkey: null, type: "block", prefixValue: 'Publication ', sharedObj : 'title',  postfixValue: '', ellipse : 'one line', style: "color: #4b4f56;  font-size: 13px;  position: relative; line-height: 1; margin-top: 3px;"},
    {key : "publishDate", subkey: null, type: "block", prefixValue: 'Date ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 13px; position: relative; margin-top: 2px;"},
];

let github_covid19_global_report_template_arglist = [
  {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'height: auto; width: 100%; border: none; position: relative; top: 0px;'},
  {key : "date", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black; font-weight: 700; font-size: 16px;  position: relative; "},
  {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> confirmed: </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid orange; padding-right: 8%; color: orange;"},
  {key : "deaths", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Deaths: </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "font-size: 14px;  position: relative; text-align: right; border-right: 8px solid red; padding-right: 8%; color: red; margin-top: 3px;"},
  {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Recovered: </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid green; padding-right: 8%; color: green; margin-top: 3px;"},
  {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: '+default_style.mortalityRateColor+'; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: '+default_style.mortalityRateColor+';;"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid "+default_style.mortalityRateColor+"; padding-right: 8%; color: "+default_style.mortalityRateColor+"; margin-top: 3px; font-weight: 400;"},

]

let github_covid19_global_report_by_date_range_template_arglist = [
  {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'height: 125px; border: none; position: relative; top: 15px;'},
  {key : "from_date", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black;  font-size: 16px;  position: relative;  text-align: center; display: inline-block;"},
  {key : "to_text", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black;  font-size: 16px;  position: relative; color: black; text-align: center; display: inline-block;left: 10px;font-weight: bolder;"},
  {key : "to_date", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black;  font-size: 16px;  position: relative;  text-align: center; display: inline-block;left: 20px;"},
  {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left;  color: #4b4f56;"> Confirmed </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 14px;  position: relative; border-right: 8px solid orange; margin-top: 3px; color: orange; text-align: right; padding-right: 8%;"},
  {key : "deaths", subkey: null, type: "block", prefixValue: '<span style="float: left;  color: #4b4f56;"> Deaths </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 14px;  position: relative; border-right: 8px solid red; margin-top: 3px; color: red; text-align: right; padding-right: 8%;"},
  {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Recovered </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 14px;  position: relative; border-right: 8px solid green; margin-top: 3px; color: green; text-align: right; padding-right: 8%;"},
  {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: '+default_style.mortalityRateColor+'; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: '+default_style.mortalityRateColor+';"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid "+default_style.mortalityRateColor+"; padding-right: 8%; color: "+default_style.mortalityRateColor+"; margin-top: 3px; font-weight: 400;"},

]

let github_covid19_compare_countries_record_template_arglist = [
  {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'width: 100%; height: 135px; border: none; position: relative;'},
   // margin-left: 14%; border-left: 10px solid Yellow; border-right: 10px solid Yellow;
  {key : "date", subkey: null, type: "block", prefixValue: '<span > Date </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black; font-size: 16px;  position: relative;"},
  {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Confirmed </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 14px;  position: relative; border-right: 8px solid orange; margin-top: 3px; color: orange; text-align: right; padding-right: 8%;"},
  {key : "deaths", subkey: null, type: "block", prefixValue: '<span style="float: left;  color: #4b4f56;"> Deaths </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 14px;  position: relative; border-right: 8px solid red; margin-top: 3px; color: red; text-align: right; padding-right: 8%;"},
  {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left;  color: #4b4f56;"> Recovered </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 14px;  position: relative; border-right: 8px solid green; margin-top: 3px; color: green; text-align: right; padding-right: 8%;"},
  {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: '+default_style.mortalityRateColor+'; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: '+default_style.mortalityRateColor+';"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid "+default_style.mortalityRateColor+"; padding-right: 8%; color: "+default_style.mortalityRateColor+"; margin-top: 3px; font-weight: 400;"},

]

let covid19_india_zones_report_template_arglist = [
  {key : "zone", subkey: null, type: "block", prefixValue: '<span style="float: left; color: white; font-weight: 500;"> Zone </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: white; font-size: 16px;  position: relative; text-align: right; font-weight: 500;"},
  {key : "district", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: white;  font-size: 24px;  position: relative;  margin-top: 3px; font-weight: 600; text-align: center; top: 5px;"},
  // {key : "date", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 3px; color: white; font-weight: 500; text-align: center; top: -59px;"},

  // <span class="glyphicon glyphicon glyphicon-time" style="color: white; position: relative; top: 2px; font-size: 15px; margin-right: 2px; font-weight: 500; "></span>
  // {key : "date", subkey: null, type: "block", prefixValue: '<span style="float: left;  color: white;"> Date </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 3px; color: white; text-align: right;"},
  // {key : "source", subkey: null, type: "block", api: 'COVID19:india_testing_report', onclick: undefined, preBlockTemplate: {template : '<div style="display: inline-block; width: 5%; position: relative; top: 4px;"><span class="glyphicon glyphicon-file" style=" font-size: 16px; position: relative; top: -5px; color: white;"></span> </div>', style: ''}, postBlockTemplate: null,  prefixValue: ' ', sharedObj : 'title',  postfixValue: '', ellipse : 'one line', style: "font-size: 12px;  position: relative; margin-top: 10px; word-break: break-all; color: white; margin-left: 5px; display: inline-block; width: 295px; "},
  {key : "", subkey: null, type: "button", btnName: '<span class="glyphicon glyphicon-new-window" style="color: white; position: relative; top: 3px; font-size: 14px; margin-right: 2px; "></span> Source', onclick: {methodName: 'onOpenModal', params: ['source'], defaults: ['newWindow'] },  style: 'width: 100%; background-color: transparent; color: white; border: none; outline: none !important;  border-radius: 0px; position: relative; top: 10px; '},

];


let github_covid19_india_report_by_date_template_arglist = [
  {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'height: auto; border: none; position: relative; top: 15px;'},
   // margin-left: 14%; border-left: 10px solid Yellow; border-right: 10px solid Yellow;
  {key : "date", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Date </span>', sharedObj : 'title',  postfixValue: '<span class="glyphicon glyphicon glyphicon-time" style="  color: '+default_style.themeColor+';position: relative;top: 4px;font-size: 18px;font-weight: 700; left: 4px; "></span>', ellipse : 'none', style: "color: black; font-size: 16px; font-weight: 600;position: relative; text-align: right;"},
  {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Confirmed </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-weight: 400; font-size: 14px;  position: relative; border-right: 8px solid orange; margin-top: 3px; color: orange; text-align: right; padding-right: 8%;"},
  {key : "deaths", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Deaths </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-weight: 400; font-size: 14px;  position: relative; border-right: 8px solid red; margin-top: 3px; color: red; text-align: right; padding-right: 8%;"},
  {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left;  color: #4b4f56;"> Recovered </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-weight: 400; font-size: 14px;  position: relative; border-right: 8px solid green; margin-top: 3px; color: green; text-align: right; padding-right: 8%;"},
  {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: '+default_style.mortalityRateColor+'; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: '+default_style.mortalityRateColor+';"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid "+default_style.mortalityRateColor+"; padding-right: 8%; color: "+default_style.mortalityRateColor+"; margin-top: 3px; font-weight: 400;"},

]

let github_covid19_daily_report_template_arglist = [
  {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'height: 175px; border: none; position: relative; top: 3px;'},
  {key : "date", subkey: null, type: "block", prefixValue: '<span class="glyphicon glyphicon glyphicon-time" style="  color: '+default_style.themeColor+' ;position: relative;top: 2px;font-size: 18px;font-weight: 700; left: 4px; float: left; margin-right: 12px; "></span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black;  font-size: 16px; font-weight: 600;  position: relative; margin-top: 0px; position: relative; top: 10px;"},
  {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Confirmed </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 30px; border-right: 8px solid orange; color: orange; text-align: right; padding-right: 8%;"},
  {key : "deaths", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Deaths:  </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "  font-size: 14px;  position: relative; margin-top: 0px; border-right: 8px solid red; color: red; text-align: right; padding-right: 8%; margin-top: 3px;"},
  {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Recovered:  </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "  font-size: 14px;  position: relative; margin-top: 0px; border-right: 8px solid green; color: green; text-align: right; padding-right: 8%; margin-top: 3px;"},
  {key : "compareToPreviousDay", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: "+default_style.themeColor+";  font-size: 14px;  position: relative; margin-top: 10px; margin-bottom: 10px; text-align: center; font-weight: 600;"},
  {key : "confirmedDiff", subkey: null, type: "block", customIcon: 'up-arrow orange', prefixValue: '<span style="float: left; color: #4b4f56;"> Confirmed :  </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 0px; border-right: 8px solid orange; color: orange; text-align: right; padding-right: 8%;"},
  {key : "deathsDiff", subkey: null, type: "block", customIcon: 'up-arrow red', prefixValue: '<span style="float: left; color: #4b4f56;"> Deaths:  </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "  font-size: 14px;  position: relative; margin-top: 0px; border-right: 8px solid red; color: red; text-align: right; padding-right: 8%; margin-top: 3px;"},
  {key : "recoveredDiff", subkey: null, type: "block", customIcon: 'up-arrow green', prefixValue: ' <span style="float: left; color: #4b4f56;"> Recovered: </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "font-size: 14px;  position: relative; margin-top: 0px; border-right: 8px solid green; color: green; text-align: right; padding-right: 8%; margin-top: 3px;"},
  {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: '+default_style.mortalityRateColor+'; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: '+default_style.mortalityRateColor+';"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid "+default_style.mortalityRateColor+"; padding-right: 8%; color: "+default_style.mortalityRateColor+"; margin-top: 3px; font-weight: 400;"},
// <span style="float: left; color: #4b4f56; font-weight: 400;"></span>
]

// let githuib_covid19_country_wise_report = [
//   {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'height: 75px; width: 75%; border: none; position: relative; top: 35px; left: 12%; border-radius: 10px; white-space: nowrap;'},
//   {key : "country", subkey: null, type: "block", prefixValue: '<span style="color: #4b4f56;"></span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black; font-weight: 600; font-size: 15px;  position: relative; margin-top: 4px;"},
//   {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Confirmed </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "font-size: 14px;  position: relative; margin-top: 4px; border-right: 5px solid orange; color: orange; text-align: right; padding-right: 10%;"},
//   {key : "deaths", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Deaths </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "font-size: 14px;  position: relative; margin-top: 4px;  text-align: right; border-right: 5px solid red; color: red; padding-right: 10%; "},
//   {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Recovered </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 4px; text-align: right; border-right: 5px solid green; color: green; padding-right: 10%;"},
//   {key : "population", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Population </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 4px; text-align: right; border-right: 5px solid #6EAEF6; color: #6EAEF6; padding-right: 10%;"},
//   {key : "region", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Region </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 4px; text-align: right; border-right: 5px solid firebrick; color: firebrick; padding-right: 10%;"},
//   {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: red; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: red;"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 5px solid red; padding-right: 8%; color: red; margin-top: 3px; font-weight: 600;"},
//
// ]

let githuib_covid19_country_wise_report = [
  {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'height: 75px; width: 75%; border: none; position: relative; display: inline-block;'},
  {key : "country", subkey: null, type: "block", prefixValue: '<span style="color: #4b4f56;"></span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black; font-weight: 600; font-size: 15px;  position: relative; margin-top: 30px; display: inline-block; top: -16px; width: 75%;"},
  {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Confirmed </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "font-size: 14px;  position: relative; margin-top: 4px; border-right: 5px solid orange; color: orange; text-align: right; padding-right: 5%;"},
  {key : "deaths", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Deaths </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "font-size: 14px;  position: relative; margin-top: 4px;  text-align: right; border-right: 5px solid red; color: red; padding-right: 5%; "},
  {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Recovered </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 4px; text-align: right; border-right: 5px solid green; color: green; padding-right: 5%;"},
  {key : "population", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Population </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 4px; text-align: right; border-right: 5px solid #6EAEF6; color: #6EAEF6; padding-right: 5%;"},
  {key : "region", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;">Region </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; margin-top: 4px; text-align: right; border-right: 5px solid firebrick; color: firebrick; padding-right: 5%;"},
  {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: '+default_style.mortalityRateColor+'; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: '+default_style.mortalityRateColor+';"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 5px solid "+default_style.mortalityRateColor+"; padding-right: 5%; color: "+default_style.mortalityRateColor+"; margin-top: 3px; font-weight: 400;"},

]

let github_covid19_india_state_wise_daily_report_template_arglist = [
  {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'width: 100%; height: auto; border: none; position: relative; top: 0px;'},
  {key : "state", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black; font-size: 16px;  position: relative; top: 10px;"},
  {key : "active", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Active: </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 14px;  position: relative; margin-top: 0px; color: orange; border-right: 8px solid orange; margin-top: 10px; text-align: right; padding-right: 8%;"},
  {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> confirmed: </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 14px;  position: relative; margin-top: 0px; color: orange; border-right: 8px solid orange; margin-top: 3px; text-align: right; padding-right: 8%;"},
  {key : "deaths", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Deaths: </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 14px;  position: relative; margin-top: 0px; color: red; border-right: 8px solid red; margin-top: 3px; text-align: right; padding-right: 8%;"},
  {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Recovered: </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 14px;  position: relative; margin-top: 0px; color: green; border-right: 8px solid green; margin-top: 3px; text-align: right; padding-right: 8%;"},
  {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: '+default_style.mortalityRateColor+'; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: '+default_style.mortalityRateColor+';"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid "+default_style.mortalityRateColor+"; padding-right: 8%; color: "+default_style.mortalityRateColor+"; margin-top: 3px; font-weight: 400;"},

]

let github_covid19_india_district_wise_daily_report_template_arglist = [
  {key : "", subkey: null, type: "collapse-group", prefixValue: 'State: ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black; font-weight: 700; font-size: 14px;  position: relative; margin-top: 0px;"},
];

let github_covid19_india_district_wise_daily_report_template_arglist_new = [
  {key : "name", subkey: null, type: "block", prefixValue: '', sharedObj : '',  postfixValue: '', ellipse : 'none', style: "color: black; font-weight: 600; font-size: 22px;  position: relative; text-align: center;"},
  {key : "date", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Date </span>', sharedObj : 'title',  postfixValue: '<span class="glyphicon glyphicon glyphicon-time" style="  color: '+default_style.themeColor+';position: relative;top: 4px;font-size: 18px;font-weight: 700; left: 4px; "></span>', ellipse : 'none', style: "color: black; font-size: 14px;  position: relative; text-align: right; padding-right: 0%; margin-top: 10px;"},
  // {key : "active", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Active </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid orange; padding-right: 8%; color: orange;"},
  {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Confirmed </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid orange; padding-right: 8%; color: orange; margin-top: 3px;"},
  {key : "deceased", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Deaths </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "font-size: 14px;  position: relative; text-align: right; border-right: 8px solid red; padding-right: 8%; color: red; margin-top: 3px;"},
  {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Recovered </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid green; padding-right: 8%; color: green; margin-top: 3px;"},
  {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: '+default_style.mortalityRateColor+'; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: '+default_style.mortalityRateColor+';"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid "+default_style.mortalityRateColor+"; padding-right: 8%; color: "+default_style.mortalityRateColor+"; margin-top: 3px; font-weight: 400;"},

];

let github_covid19_india_time_series_by_india_govt_report_template_arglist = [
  {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'height: 175px; width: 100%; border: none; position: relative;'},
  {key : "date", subkey: null, type: "block", prefixValue: '<span class="glyphicon glyphicon-calendar" style="color: #4b4f56;"></span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black; font-size: 16px;  position: relative; margin-top: 0px; text-align: center;"},
  {key : "totalconfirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Total Confirmed </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 13px;  position: relative; margin-top: 5px; text-align: right; border-right: 8px solid orange; padding-right: 8%; color: orange;"},
  {key : "dailyconfirmed", subkey: null, type: "block", prefixValue: ' <span style="float: left; color: #4b4f56;"> Daily Confirmed </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 13px;  position: relative; margin-top: 2px; text-align: right; border-right: 8px solid orange; padding-right: 8%; color: orange;"},
  {key : "totalrecovered", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56;"> Total Recovered </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 13px;  position: relative; margin-top: 2px; text-align: right; border-right: 8px solid green; padding-right: 8%; color: green;"},
  {key : "dailyrecovered", subkey: null, type: "block",  prefixValue: '<span style="float: left; color: #4b4f56;"> Daily Recovered </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56;  font-size: 13px;  position: relative; margin-top: 2px; text-align: right; border-right: 8px solid green; padding-right: 8%; color: green;"},
]

let github_covid19_india_testing_by_india_govt_report_template_arglist = [
  {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'height: 175px; width: 100%px; border: none; position: relative;'},
  {key : "updatetimestamp", subkey: null, type: "block", prefixValue: '<span class="glyphicon glyphicon-calendar" style="color: #4b4f56; font-size: 14px;"></span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: black; font-size: 20px;  position: relative; margin-top: 0px;"},
  {key : "totalindividualstested", subkey: null, type: "block", prefixValue: ' <span style="float: left; color: #4b4f56;"> Total Individuals Tested </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 13px;  position: relative; margin-top: 0px; text-align: right; padding-right: 8%; color: #4b4f56; border-right: 8px solid white;"},
  {key : "totalpositivecases", subkey: null, type: "block", prefixValue: ' <span style="float: left; color: #4b4f56;"> Total Positive Cases </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 13px;  position: relative; margin-top: 3px; text-align: right; padding-right: 8%; color: green; border-right: 8px solid green;"},
  {key : "testpositivityrate", subkey: null, type: "block", prefixValue: ' <span style="float: left; color: #4b4f56;"> Test Positivity Rate </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 13px;  position: relative; margin-top: 3px; text-align: right; padding-right: 8%; color: green; border-right: 8px solid green;"},
  {key : "totalsamplestested", subkey: null, type: "block", prefixValue: ' <span style="float: left; color: #4b4f56;"> Total Samples Tested </span> ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 13px;  position: relative; margin-top: 3px; text-align: right;  padding-right: 8%; color: #4b4f56; border-right: 8px solid white;"},
  // {key : "source", subkey: null, type: "block", api: 'COVID19:india_testing_report', onclick: undefined, preBlockTemplate: {template : '<div style="display: inline-block; width: 5%; position: relative; top: 4px;"><span class="glyphicon glyphicon-file" style=" font-size: 16px; position: relative; top: -7px;"></span> </div>', style: ''}, postBlockTemplate: null,  prefixValue: ' ', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "color: #4b4f56; font-size: 12px;  position: relative; margin-top: 3px; word-break: break-all; padding-right: 8%; color: #4b4f56; margin-left: 5px; display: inline-block;"},
  // {key : "", subkey: null, type: "button", btnName: '<span class="glyphicon glyphicon-open-file" style="color: #607D8B; font-size: 18px; position: relative; top: 2px;"></span> Open File', onclick: {methodName: 'onOpenModal', params: ['source'], defaults: ['open_pdf_in_modal'] },  style: 'width: 100%; background-color: white; color: #4b4f56; border: none; border-radius: 0px; position: relative; top: 10px; '},
  {key : "", subkey: null, type: "button", btnName: '<span class="glyphicon glyphicon-open-file" style="color: #607D8B; font-size: 18px; position: relative; top: 2px;"></span> Open File', onclick: {methodName: 'onOpenModal', params: ['source'], defaults: ['newWindow'] },  style: 'width: 100%; background-color: white; color: #4b4f56; border: none; border-radius: 0px; position: relative; top: 10px; '},


]

let who_covid19_question_and_answer_template_arglist = [
    {key : "image", subkey: null, type: "image", api: 'GITHUB:covid19_api',  style:'width: 84%; height: auto; border: none;'},
    {key : "question", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'one line', style: "color: black; font-weight: 600; font-size: 16px;  position: relative; text-align: justify; text-align: center; "},
    {key : "answer", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'one line', style: "color: #4b4f56; font-size: 14px; position: relative; text-align: justify;"},
    {key : 'who', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: #49A2C5; color: white; font-weight: 700; display: inline-block; width: 35px; height: 35px; text-align: center; padding-top: 11px; margin-top: 16px;'},
    {key : 'url', subkey: null, type: 'openUrlInNewTab', prefixValue: '', postfixValue: '', ellipse : '',  style: 'font-size: 13px; color: brown; display: inline-block; margin-left: 6px; color: #49A2C5; position: relative; top: 1px;'},
];

let defaultNewsTemplateArgList = [
    {key : "urlToImage", subkey: null, type: "image", api: 'NEWSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['NEWSAPI:newsByCategory'] }, style:'width: 318px; height: 175px; border: none;'},
    {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'one line',  style: "color: black; font-size: 16px; text-align: center; width: 300px;"},
    {key : "description", subkey: null, type: "block", prefixValue: '', sharedObj : 'text', postfixValue: '', ellipse : 'one line', style:'width: 300px;'},
    {key : "publishedAt", subkey: null, type: "block", prefixValue: '', postfixValue: '', ellipse : 'one line', style:''},
    //{key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', style: "color: black; font-weight: 700; font-size: 16px; text-align: center; "},
    {key : "source", subkey: [
        {key : 'name', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: #4b4f56; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
        {key : 'name', subkey: null, type: 'block', prefixValue: '', postfixValue: '', ellipse : '',  onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] }, style: 'font-size: 16px; color: #4b4f56; display: inline-block; margin-left: 12px;'},
    ]},
    {key : '', subkey: null, type: 'customThreeDots', style: 'display: inline-block; color: red; transform: rotate(90deg); font-size: 20px; float: right; color: black; position: relative; top: 16px; right: -10px;'},
    {key : 'title', subkey: null, type: 'textToSpeech', charCutOff: 2, charCutOffDirection: 'start',  style: 'float: right; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
];

let defaultWikipediaSearchTemplateArgList = [
    {key : "image", subkey: null, type: "image", api: 'wikipedia_search', onclick: {methodName: 'getNewsByCustomFilter', params: ['title'], defaults: ['wikipedia_search'] }, style:'width: auto; height: 200px; border: none;'},
    {key : "title", subkey: null, type: "block", api: 'wikipedia_search', prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none', api: 'NEWSAPI:newsBySource',  style: "color: black;  font-size: 18px; text-align: center;"},
    {key : "snippet", subkey: null, type: "block", api: 'wikipedia_search', prefixValue: '', sharedObj : 'text', postfixValue: '', ellipse : 'none', style:''},
    {key : "timestamp", subkey: null, type: "block", api: 'wikipedia_search', prefixValue: 'Time: ', sharedObj : 'text', postfixValue: '', ellipse : 'one line', style:''},
    {key : 'wiki', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: #4b4f56; color: white;  display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
    {key : 'wiki', subkey: null, type: 'block', prefixValue: '', postfixValue: '', ellipse : '', onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] }, style: 'font-size: 16px; color: brown; display: inline-block; margin-left: 12px;'},
    {key : '', subkey: null, type: 'customThreeDots', style: 'display: inline-block; color: red; transform: rotate(90deg); font-size: 20px; float: right; color: black; position: relative; top: 16px; right: -10px;'},
    {key : 'title', subkey: null, type: 'textToSpeech', charCutOff: 2, charCutOffDirection: 'start',  style: 'float: right; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},
];

let currentsDefaultNewsTemplateArgList = [
  {key : "image", subkey: null, type: "image", api: 'CURRETSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['CURRETSAPI:newsByCategory'] }, style:'width: 318px; height: 175px; border: none;'},
  {key : "title", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'one line',  style: "color: black; font-size: 16px; text-align: center;"},
  {key : "description", subkey: null, type: "block", prefixValue: '', sharedObj : 'text', postfixValue: '', ellipse : 'one line', style:''},
  {key : "published", subkey: null, type: "block", prefixValue: '', postfixValue: '', ellipse : 'one line', style:''},
  {key : '', subkey: null, type: 'customThreeDots', style: 'display: inline-block; color: red; transform: rotate(90deg); font-size: 20px; float: right; color: black; position: relative; top: 16px; right: -10px;'},
  {key : 'author', subkey: null, type: 'customIcon', charCutOff: 2, charCutOffDirection: 'start',  style: 'background-color: #4b4f56; color: white; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 5px;'},
  {key : 'author', subkey: null, type: 'block', prefixValue: '', postfixValue: '', ellipse : '',  onclick: {methodName: 'onOpenModal', params: ['url'], defaults: ['SOURCE:ICON'] }, style: 'font-size: 16px; color: #4b4f56; display: inline-block; margin-left: 12px; width: 65%; word-break: break-all;'},
  {key : 'title', subkey: null, type: 'textToSpeech', charCutOff: 2, charCutOffDirection: 'start',  style: 'position: relative; font-weight: 700; display: inline-block; width: 40px; height: 40px; text-align: center; padding-top: 10px; margin-top: 10px;'},

];

let covid19_india_state_wise_testing_lab_information_template_arglist = [
  // {key : "image", subkey: null, type: "image", api: 'CURRETSAPI:newsByCategory', onclick: {methodName: 'onOpenModal', params: ['url', 'customType'], defaults: ['CURRETSAPI:newsByCategory'] }, style:'width: 100%; height: 175px; border: none;'},
  {key : "nameoftheorganisation", subkey: null, type: "block", prefixValue: '', sharedObj : 'text', postfixValue: '', ellipse : 'none', style:'color: black; font-size: 18px; text-align: center; font-weight: 600; margin-top: -10px;'},
  {key : "category", subkey: null, type: "block", prefixValue: '', sharedObj : 'title',  postfixValue: '', ellipse : 'none',  style: "color: #4b4f56; font-size: 15px; margin-top: 8px; font-weight: 600; margin-top: 8px;"},
  {key : "descriptionandorserviceprovided", subkey: null, type: "block", prefixValue: '', sharedObj : 'one line',  postfixValue: '', ellipse : 'one line',  style: "color: #4b4f56; font-size: 14px;"},
  {key : "phonenumber", subkey: null, type: "block", prefixValue: '<span style="color: #4b4f56; font-weight: 400;">Phonenumber : </span>', postfixValue: '', ellipse : 'none', style:'color: #4b4f56; font-size: 14px; color: '+default_style.themeColor+'; font-weight: 600;'},
  {key : "state", subkey: null, type: "block", prefixValue: 'State: ', sharedObj : 'title',  postfixValue: '', ellipse : 'none',  style: "color: #4b4f56; font-size: 14px; "},
  {key : "city", subkey: null, type: "block", prefixValue: 'City: ', sharedObj : 'text', postfixValue: '', ellipse : 'none', style:'color: #4b4f56; font-size: 14px; '},
  {key : "contact", subkey: null, type: "block", prefixValue: '', postfixValue: '', ellipse : 'one line', style:'color: #4b4f56; font-size: 14px; '},
];

let covid19_india_state_wise_death_recoveries_information_template_arglist = [
  {key : "image", subkey: null, type: "image", api: 'COVID19: death_recoveries', onclick: undefined, style:'width: 100%; height: 100%; border: none; border-radius: 50%; margin-top: 12px; '},
  {key : "date", subkey: null, type: "block", prefixValue: '<strong style="color: black; ">Date: </strong>', sharedObj : 'one line',  postfixValue: '', ellipse : 'one line',  style: "color: black; font-size: 18px;"},
  {key : "agebracket", subkey: null, type: "block", prefixValue: '<strong style="color: black; ">Age: </strong>', sharedObj : 'text', postfixValue: '', ellipse : 'none', style:'color: black; font-size: 14px; margin-top: 2px;'},
  {key : "state", subkey: null, type: "block", prefixValue: '<strong style="color: black; ">State: </strong>', sharedObj : 'title',  postfixValue: '', ellipse : 'none',  style: "color: #4b4f56; font-size: 14px; margin-top: 2px;"},
  {key : "city", subkey: null, type: "block", prefixValue: '<strong style="color: black; ">City: </strong>', sharedObj : 'title',  postfixValue: '', ellipse : 'none',  style: "color: #4b4f56; font-size: 14px; margin-top: 2px;"},
  {key : "notes", subkey: null, type: "block", prefixValue: '<strong style="color: black; ">Notes: </strong>', postfixValue: '', ellipse : 'none', style:'color: #4b4f56; font-size: 14px; color: '+default_style.themeColor+'; line-height: 1.1; margin-top: 2px; height: 60px; overflow: hidden;'},
];

let covid19_india_states_daily_changes_template_arglist = [
  {key : "date", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Date </span>', sharedObj : 'title',  postfixValue: '<span class="glyphicon glyphicon glyphicon-time" style="  color: '+default_style.themeColor+';position: relative;top: 4px;font-size: 18px;font-weight: 700; left: 4px; "></span>', ellipse : 'none', style: "color: black; font-size: 14px;  position: relative; text-align: right; padding-right: 0%; margin-top: 10px;"},
  {key : "confirmed", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Confirmed </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid orange; padding-right: 8%; color: orange; margin-top: 3px;"},
  {key : "deceased", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Deaths </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: "font-size: 14px;  position: relative; text-align: right; border-right: 8px solid red; padding-right: 8%; color: red; margin-top: 3px;"},
  {key : "recovered", subkey: null, type: "block", prefixValue: '<span style="float: left; color: #4b4f56; "> Recovered </span>', sharedObj : 'title',  postfixValue: '', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid green; padding-right: 8%; color: green; margin-top: 3px;"},
  {key : "mortalityRate", subkey: null, type: "block", prefixValue: '<span style="float: left; color: '+default_style.mortalityRateColor+'; "> Mortality Rate</span>', sharedObj : 'title',  postfixValue: '<span style="color: '+default_style.mortalityRateColor+';"> % <span>', ellipse : 'none', style: " font-size: 14px;  position: relative; text-align: right; border-right: 8px solid "+default_style.mortalityRateColor+"; padding-right: 8%; color: "+default_style.mortalityRateColor+"; margin-top: 3px; font-weight: 400;"},
]

let covid19_india_dos_and_donts_template_arglist = [
  {key: "iconName", subkey: null, type: "icon", iconType: 'glyphicon', style: 'color: #607D8B; font-size: 24px; position: relative; display: block; text-align: center;'},
  {key : "img", subkey: null, type: "image", prefixTemplate: '', postfixTemplate: '', api: 'COVID19:dosAndDonts', style:'width: 100%; height: 20em; border: none; border-radius: 12px 12px 0px 0px;'},

  // {key : "img", subkey: null, type: "image", prefixTemplate: '<span class="glyphicon glyphicon-ok" style="color: #607D8B; font-size: 18px; position: relative; display: block; left: 24px; top: 30px; color: white;"></span> ', postfixTemplate: '', api: 'COVID19:dosAndDonts', style:'width: 100%; height: 20em; border: none; border-radius: 12px;'},

]


let default_payload = {
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
          color: '#4b4f56',
          fontSize : '13px',
          padding: '0px 0px 0px 0px',
          margin : '0px 0px 0px 0px',
          devider : '0px solid #4b4f56',
          coverPadding : '5px',
          border: "0px solid whiteSmoke",
          borderBottom: 'none',
          descriptionTemplateStyle : 'background-color: white;'

      }
    },
    emptySlide : 'no',
    emptySlideDesc: {
        visibility: true,
        template: {
            name : null,
            type: null,
            style : '',
            category : ''
        }
    }
};

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
          color: '#4b4f56',
          fontSize : '13px',
          padding: '0px 0px 0px 0px',
          margin : '0px 0px 0px 0px',
          devider : '0px solid #4b4f56',
          coverPadding : '5px',
          border: "0px solid whiteSmoke",
          borderBottom: 'none',
          descriptionTemplateStyle : 'background-color: white;',
          imageTemplateStyle : ''
      }
    },
    emptySlide : 'no',
    emptySlideDesc: {
        visibility: true,
        template: {
            name : null,
            type: null,
            style : '',
            category : ''
        }
    }
};

let SERVER_SIDE_INIT_DATA = {};

function http_request(uri, cat){
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
            console.log("########### covid request cat : ", cat);
            console.log("cric api  error: ", error);
            resolve(error);
          }else{
            // console.log("------------- sucessfull here map api result --------------");
            if(body !== undefined || body !== null || body !== ''){
              //console.log("type of body : ", typeof(body));
              // body = JSON.parse(body);
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

function calculateCovid19IndiaStatesDailyChanges(dailyData){
  // console.log("===== accling fun calculateCovid19IndiaStatesDailyChanges ======");
  // console.log("daily data :: ", dailyData);
  let codeIndexArr = [];
  let dateIndexArr = [];
  let tempDailyChangesObj = {};
  let mainDailyChangesObj = {};
  let tmpStoredObj = {};
  let overallDailyIndianCovidIReport = {confirm : 0, death: 0, recovered: 0};
  // let obj =;
  dailyData.forEach((item, i) => {
      for(var key in item){
            if(key !== "date" && key !== "status"){
                if(codeIndexArr.indexOf(key) === -1){
                    codeIndexArr.push(key);
                    mainDailyChangesObj[key] = [];
                    let obj = {};
                    obj.date = item.date;
                    if(item["status"] === "Confirmed"){
                        obj.confirmed = item[key];
                    }else if(item["status"] === "Recovered"){
                        obj.recovered = item[key];
                    }else if(item["status"] === "Deceased"){
                        obj.deceased = item[key];
                    }
                      mainDailyChangesObj[key].push(obj);
                }else{
                    let obj = {};
                    obj.date = item.date;
                    if(item["status"] === "Confirmed"){
                        obj.confirmed = item[key];
                    }else if(item["status"] === "Recovered"){
                        obj.recovered = item[key];
                    }else if(item["status"] === "Deceased"){
                        obj.deceased = item[key];
                    }
                    mainDailyChangesObj[key].push(obj);
                }
            }
      }
  });


  for(key in mainDailyChangesObj){
      let tempArr = mainDailyChangesObj[key];
      let obj = {};
      let arr = [];
      tempArr.forEach((item, i) => {
          if(item.date === SERVER_SIDE_INIT_DATA.modified_covid19_last_record_date && item.confirmed !== undefined){
              let state = COVID19_COUNTRY_DATA.COVID19_STATES_CODE_TO_STATES_NAME[key];
              tempDailyChangesObj[state] = {confirmed: item.confirmed, death: item.deceased};
              // console.log("@@@ item : ", item);
              // console.log("@@@ item.confirmed  :: ", item.confirmed );
              if(key === "tt"){
                overallDailyIndianCovidIReport.confirm = (parseInt(item.confirmed));
              }


          }
          if(item.date === SERVER_SIDE_INIT_DATA.modified_covid19_last_record_date && item.deceased !== undefined){
              let state = COVID19_COUNTRY_DATA.COVID19_STATES_CODE_TO_STATES_NAME[key];
              tempDailyChangesObj[state].death = item.deceased;
              if(key === "tt"){
                overallDailyIndianCovidIReport.death = (parseInt(item.deceased)) ;
              }

          }

          if(dateIndexArr.indexOf(item.date) === -1){
              dateIndexArr.push(item.date);
              obj = {};
              obj.date = item.date;
              if(item.confirmed !== null && item.confirmed !== undefined){
                  obj.confirmed = item.confirmed;

              }
              if(item.recovered !== null && item.recovered !== undefined){
                  obj.recovered = item.recovered;
              }
              if(item.deceased !== null && item.deceased !== undefined){
                  obj.deceased = item.deceased;

              }

              arr.push(obj);
          }else{
              if(item.confirmed !== null && item.confirmed !== undefined){
                  obj.confirmed = item.confirmed;
              }
              if(item.recovered !== null && item.recovered !== undefined){
                  obj.recovered = item.recovered;
              }
              if(item.deceased !== null && item.deceased !== undefined){
                  obj.deceased = item.deceased;
              }
              // ((tempObj.deaths * 100 ) / tempObj.confirmed).toFixed(2);
              if(obj.confirmed !== null && obj.deceased !== null && obj.confirmed !== undefined && obj.deceased !== undefined){
                  obj.mortalityRate = ((obj.deceased * 100 ) / obj.confirmed).toFixed(2);
              }
          }
      });
      mainDailyChangesObj[key] = arr;
      dateIndexArr = [];
  }

  SERVER_SIDE_INIT_DATA.covid19_india_states_daily_changes = mainDailyChangesObj;
  // console.log("@@@ SERVER_SIDE_INIT_DATA.covid19_last_record_date :: ", SERVER_SIDE_INIT_DATA.modified_covid19_last_record_date);
  // console.log("@@@ dailyChangesObj :: ", tempDailyChangesObj);
  // console.log("@@@ overallDailyIndianCovidIReport :: ", overallDailyIndianCovidIReport);
  SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_daily_state_wise_changes = tempDailyChangesObj;
  SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_daily_overall_changes = overallDailyIndianCovidIReport;


}

function calculateDeathDifference(arr){
    // console.log("==== calling calculate death differences ====");
    for (let i = 0; i < arr.length-2; i++) {
          arr[i].deathsDiff = arr[i].deaths - arr[i+1].deaths;
          arr[i].confirmedDiff = arr[i].confirmed - arr[i+1].confirmed;
          arr[i].recoveredDiff = arr[i].recovered - arr[i+1].recovered;
    }
    return arr;
}



function createMonthWiseIndiaCovidTable(items){
    // console.log("==== calling create month wise covid table ====");

    let classTableHeading = "display: inline-block;  text-align: center; font-size: 14px; float: left; background: #FDF5E6; font-weight: 600; height: 40px; padding-top: 10px; color: black; ";
    let classTableBody = "display: inline-block;  text-align: center; font-size: 14px; float: left; background: #FDF5E6; height: 30px; padding-top: 5px; ";

    let tableBodyTemplate = '';
    for(let item in items){
      let rowData = items[item];
      let mortalityRate = ((rowData.death * 100 ) / rowData.confirm).toFixed(2);
      tableBodyTemplate += `
          <div>
              <div style="`+classTableBody+` color: `+default_style.themeColor+`; font-weight: 700; width: 20%;" >`+item+`</div>
              <div style="`+classTableBody+` width: 23%; color: black;" >`+rowData.confirm+`</div>
              <div style="`+classTableBody+` width: 17%; color: black;" >`+rowData.death+`</div>
              <div style="`+classTableBody+` width: 23%; color: black;" >`+rowData.recover+`</div>
              <div style="`+classTableBody+` width: 17%; color: red; font-weight: 600;" > `+mortalityRate+` %</div>
          </div>
      `;
    }


    let template = `
        <div style="width: 100%;">
            <div style="text-align: center; font-size: 20px; color: `+default_style.themeColor+`; margin-bottom: 8px; font-weight: 500;"># Month Wise Covid19 Report Of India </div>
            <div style="width: 100%;">
                  <div class="table-heading">
                      <div style="`+classTableHeading+` width: 20%" >Month</div>
                      <div style="`+classTableHeading+` width: 23%;" >Confirmed</div>
                      <div style="`+classTableHeading+` width: 17%;" >Deaths</div>
                      <div style="`+classTableHeading+` width: 23%;" >Recovered</div>
                      <div style="`+classTableHeading+` width: 17%;" >mRate</div>
                  </div>
                  <div class="table-body" style="">
                      `+tableBodyTemplate+`
                      <div style="width: 100%; display: table-cell; font-size: 10px; margin-top: 12px; position: relative; top: 28px;"> *Note mRate (Mortality Rate)</div>
                  </div>

            </div>

        </div>

    `;

    return template;
}

function createOverAllIndianPredictionReport(request, socket){
    // console.log("======= createOverAllIndianPredictionReport ========");
    // console.log("#### SERVER_SIDE_INIT_DATA.covid19_india_month_wise_report : ", SERVER_SIDE_INIT_DATA.covid19_india_month_wise_report);
    let monthWiseIndiaCovid19TableTemplate = createMonthWiseIndiaCovidTable(SERVER_SIDE_INIT_DATA.covid19_india_month_wise_report);

    let obj = {
      dailyConfirmed: SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_daily_overall_changes.confirm,
      dailyDeath: SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_daily_overall_changes.death,
      totalConfirmed : SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_report.confirmed,
      totalDeath: SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_report.deaths
    }
    let afterTenDaysTotalConfirmd = obj.totalConfirmed + (10 * obj.dailyConfirmed);
    let afterTenDaysTotalDeath = obj.totalDeath  + (10 * obj.dailyDeath);
    let dailyConfirm = obj.dailyConfirmed;
    let dailyDeath = obj.totalDeath;

    // rajib
    obj = JSON.stringify(obj);


    let template = `
    <div style="background-color: #FDF5E6; padding-top: 12px; padding-bottom: 12px;">
        <center><div style="font-size: 20px; color: `+default_style.themeColor+`; font-weight: 500;"># Analysis Based On The Record</div></center>
        <div style=" width: 60%; margin: auto; margin-top: 10px;">
                <div style="display: inline-block; width: 50%; float: left;">
                    <div>Date </div>
                    <div>Confirm Case </div>
                    <div>Death Case </div>
                    <div>Country </div>
                </div>
                <div style="display: inline-block; width: 50%; font-weight: 600; text-align: right;">
                    <div >`+SERVER_SIDE_INIT_DATA.covid19_last_record_date+`</div>
                    <div>`+dailyConfirm+`</div>
                    <div>`+dailyDeath+`</div>
                    <div> India </div>
                </div>
        </div>
        <div style="width: 100%; margin-top: 16px; margin-bottom: 16px;">
          <div style="text-align: center; margin-bottom: 10px;">

              <span> After <span id="indiaDailyChangeDays_counter" style="font-size: 40px;font-weight: 600; color: #607D8B;  margin-left: 8px; margin-right: 8px;" >10</span> days </span>

          </div>
          <div style="width: 40%;  display: inline-block;  float: left; padding-left: 16px; position: relative;top: 10px; padding-right: 10px;">
              <div style="width: 100%; padding-right: 16px;">
                    <div style="display: inline-block; width: 20%;">
                      <div style="height: 30px; ">
                          <button type="button" id="indiaDailyChangeDays_minusBtn" data=`+obj+`  onclick="onClickPrediction(event)" style="border: none; outline: none !important; font-size: 20px; background-color: rgb(233, 235, 238); height: 30px; width: 36px;">-</button>
                      </div>
                    </div>
                    <div style="display: inline-block; width: 60%; text-align: center;">
                      <input type="text" id="indiaDailyChangeDays_inputText" data=`+obj+` value="10" onChange="onClickPrediction(event)" style="width: 100%; height: 31px; border: 1px solid `+default_style.borderColor+`; position: relative; left: 6px; padding-left: 16px; top: -2px; border: none;"></input>
                    </div>
                    <div style="display: inline-block; width: 20%;">
                      <button type="button" id="indiaDailyChangeDays_plusBtn" data=`+obj+` onclick="onClickPrediction(event)" style="border: none; outline: none !important; font-size: 20px; background-color: rgb(233, 235, 238); height: 30px; width: 36px;">+</button>
                    </div>
                </div>
          </div>
            <div style="width: 60%; display: inline-block; padding-left: 16px;">
                    <div style="display: block;">
                        <div style="display: inline-block; width: 10px; height: 10px; background-color: orange; margin-right: 5px;"></div>
                        <span>Confirmed  </span>
                        <span id="indiaDailyChangeDays_confirmData" style="color: orange; font-size: 20px; margin-left: 4px;">`+afterTenDaysTotalConfirmd+`</span>
                    </div>
                    <div style="display: block;">
                        <div style="display: inline-block;width: 10px; height: 10px; background-color: red; margin-right: 5px;"></div>
                        <span>Death </span>
                        <span id="indiaDailyChangeDays_deathData" style="color: red; font-size: 20px; margin-left: 32px;">`+afterTenDaysTotalDeath+`</span>
                    </div>
            </div>
        </div>

        <hr style="margin-top: 20px;margin-bottom: 20px;border: 0;border-top: 1px solid grey;">
        `+monthWiseIndiaCovid19TableTemplate+`

      </div>

    `;

    socket.emit("github-who-covid19-api-response", { returnMsg: template, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});


}

function calculateMonthWiseReportOfIndia(items){
    // console.log("====== calling calculateMonthWiseReportOfIndia function ======");
    let indexOftable = [];
    let obj = {};
    items.forEach((item) => {
        let month = item.date.split(" ")[1];
        if(indexOftable.indexOf(month) === -1){
            let counterObj = {confirm : 0, death: 0, recover: 0};
            counterObj.confirm += parseInt(item.dailyconfirmed);
            counterObj.death += parseInt(item. dailydeceased);
            counterObj.recover += parseInt(item.dailyrecovered);
            indexOftable.push(month);
            obj[month] = counterObj;
        }else{
            obj[month].confirm += parseInt(item.dailyconfirmed);
            obj[month].death += parseInt(item. dailydeceased);
            obj[month].recover += parseInt(item.dailyrecovered);

        }
    });
    indexOftable = [];
    SERVER_SIDE_INIT_DATA.covid19_india_month_wise_report = obj;
    // console.log("@@@@ monthwise india report :: ", obj);
}

function calculateMortality(confirmed, death){

}
function GITHUB_WHO_COVID19_API_PROCCESSING(request, socket){
// console.log("=== CALLING OPEN SOURCE LIBRARIES PROCESSING ===");
  var apiURL = null;
  var argList = null;

 if(request.category === "github_covid19_press_release"){
    apiURL = "https://covidtracking.com/api/press";
    argList = github_covid19_press_release_template_arglist;
    // apiURL = null;
    payload.style.defaults.width = "350px";
    payload.style.defaults.border = "none";
    // payload.style.imgPos = "top";

  }else if(request.category === "who_covid19_question_and_answer"){
    // apiURL = "https://covidtracking.com/api/press";
    argList = who_covid19_question_and_answer_template_arglist;
    apiURL = null;
    payload.style.defaults.width = "350px";
    payload.style.defaults.border = "none";
  }else if(request.category === "githuib_covid19_global_report"){
    apiURL = "https://covidapi.info/api/v1/global";
    argList = github_covid19_global_report_template_arglist;
    // apiURL = null;
    payload.style.defaults.width = "350px";
    payload.style.defaults.border = "none";
  }else if(request.category === "githuib_covid19_india_latest_report"){
    apiURL = "https://covidapi.info/api/v1/country/IND";
    argList = github_covid19_daily_report_template_arglist;
    // apiURL = null;

  }else if(request.category === "githuib_covid19_global_daily_report"){
    apiURL = "https://covidapi.info/api/v1/global/count";
    argList = github_covid19_daily_report_template_arglist;
    // apiURL = null;

  }else if(request.category === "githuib_covid19_india_state_wise_report" ){
    apiURL = "https://api.covid19india.org/data.json";
    argList = github_covid19_india_state_wise_daily_report_template_arglist;
    // apiURL = null;

  }else if(request.category === "githuib_covid19_india_district_wise_report"){
    apiURL = "https://api.covid19india.org/state_district_wise.json";
    argList = github_covid19_india_district_wise_daily_report_template_arglist;
    // apiURL = null;

  }else if(request.category === "githuib_covid19_india_district_wise_report_new"){
    apiURL = "https://api.covid19india.org/state_district_wise.json";
    argList = github_covid19_india_district_wise_daily_report_template_arglist_new;
    // apiURL = null;
  }else if(request.category === "githuib_covid19_india_time_series_by_india_govt_report"){
    apiURL = "https://api.covid19india.org/data.json";
    argList = github_covid19_india_time_series_by_india_govt_report_template_arglist;
    // apiURL = null;

  }else if(request.category === "githuib_covid19_india_testing_by_india_govt_report"){
    apiURL = "https://api.covid19india.org/data.json";
    argList = github_covid19_india_testing_by_india_govt_report_template_arglist;
    // apiURL = null;

  }else if(request.category === "githuib_covid19_country_wise_report"){
    apiURL = "https://covidapi.info/api/v1/global/latest";
    argList = githuib_covid19_country_wise_report;
  }else if(request.category === "githuib_covid19_india_daily_report_by_date"){
    apiURL = "https://covidapi.info/api/v1/country/IND/"+request.searchQuery;
    argList = github_covid19_india_report_by_date_template_arglist;
  }else if(request.category === "githuib_covid19_global_daily_report_by_date"){
    // console.log("global current days : ", request.searchQuery);
    apiURL = "https://covidapi.info/api/v1/global/"+request.searchQuery;
    argList = github_covid19_india_report_by_date_template_arglist;
  }else if(request.category === "githuib_covid19_india_daily_report_by_date_range"){
    console.log("india current days range  : ", request.searchQuery);
    apiURL = "https://covidapi.info/api/v1/country/IND/timeseries/"+request.searchQuery;
    argList = github_covid19_india_report_by_date_template_arglist;
  }else if(request.category === "githuib_covid19_global_daily_report_by_date_range"){
    // console.log("global current days range  : ", request.searchQuery);
    apiURL = "https://covidapi.info/api/v1/global/"+request.searchQuery;
    argList = github_covid19_global_report_by_date_range_template_arglist;
  }else if(request.category === "githuib_covid19_fetch_india_latest"){
    // console.log("compare country name : ", request.searchQuery);
    apiURL = "https://covidapi.info/api/v1/country/"+request.searchQuery+"/latest";
    argList = github_covid19_compare_countries_record_template_arglist;
  }else if(request.category === "covid19_india_zones_report"){
    apiURL = "https://api.covid19india.org/zones.json";
    argList = covid19_india_zones_report_template_arglist;
  }else if(request.category === "githuib_covid19_india_compare_states_data"){
    apiURL = null;
    argList = github_covid19_india_state_wise_daily_report_template_arglist;
  }else if(request.category === "githuib_covid19_india_state_wise_testing_lab_report"){
    apiURL = null;
    argList = covid19_india_state_wise_testing_lab_information_template_arglist;
  }else if(request.category === "githuib_covid19_india_state_wise_death_recoveries_report"){
    apiURL = null;
    argList = covid19_india_state_wise_death_recoveries_information_template_arglist;
  }else if(request.category === "githuib_covid19_overall_indian_prediction_report"){
    apiURL = null;
    argList = null;
  }else if(request.category === "githuib_covid19_dos"){
      apiURL = null;
      argList = covid19_india_dos_and_donts_template_arglist;

  }else if(request.category === "githuib_covid19_donts"){
      apiURL = null;
      argList = covid19_india_dos_and_donts_template_arglist;
  }else if(request.category === "customSearch"){
    // console.log("request.currentCustomSearchSource : ", request.currentCustomSearchSource);
    // console.log("request.searchQuery : ", request.searchQuery);

    if(request.currentCustomSearchSource === "News"){
      apiURL = "http://newsapi.org/v2/everything?q="+request.searchQuery+"&sortBy=publishedAt&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba";
      argList = defaultNewsTemplateArgList;
    }else if(request.currentCustomSearchSource === "Journal"){
      apiURL = 'http://newsapi.org/v2/everything?domains='+request.journalName+'&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba';
      argList = defaultNewsTemplateArgList;
    }else if(request.currentCustomSearchSource === "Wikipedia"){
      apiURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch='+request.searchQuery;
      argList = defaultWikipediaSearchTemplateArgList;
    }else if(request.currentCustomSearchSource === "Wikipedia"){
      apiURL = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch='+request.searchQuery;
      argList = defaultWikipediaSearchTemplateArgList;
    }else if(request.currentCustomSearchSource === "Currents"){
      apiURL = 'https://api.currentsapi.services/v1/search?category='+request.searchQuery+'&regions=IN&language=en&apiKey=2FbMfIxy7UHyAOTt3KlqY38VC7aUSS5XbsZvUWWxMZnjRnJf';
      argList = currentsDefaultNewsTemplateArgList;
    }


    // console.log("API URL : ", apiURL);
  }else if(request.category === "init_server_data"){
      if(request.apiRef === "init_last_record_date"){
        apiURL = 'https://covidapi.info/api/v1/latest-date';
        argList = null;
      }else if(request.apiRef === "latest_country_wise_data"){
        apiURL = 'https://covidapi.info/api/v1/global/timeseries/2020-03-10/2020-03-19';
        argList = null;
      }else if(request.apiRef === "init_testing_lab_states_names_info"){
        apiURL = null;
        argList = null;
      }else if(request.apiRef === "covid19_india_zones_report"){
        apiURL = 'https://api.covid19india.org/zones.json';
        argList = null;
      }else if(request.apiRef === "covid19_india_states_daily_changes_report"){
        apiURL = 'https://api.covid19india.org/states_daily.json';
        argList = covid19_india_states_daily_changes_template_arglist;
      }
  }
  // if(request.priority !== null && request.priority !== undefined){
  //     priorityCount += request.priority;
  //     // console.log("@@@@@priority count : ", priorityCount);
  // }
  http_request(apiURL, request.category).then((response) => {
    if(response === null){
      // console.log("@@@@@@ response : ", response);
      let template = `Oop's We Are Facing Some Problem To Fetch The data.
        <br><br>
        Please Try After Some Time.
        `;
      socket.emit("github-who-covid19-api-response", { returnMsg : template, category: request.category, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId, blockId: request.blockId, priority: request.priority, emptySlideDesc: request.emptySlideDesc, emptySlideAction: request.emptySlideAction});
      return;
    }

    let footer = {};
    let finalData = null;
    let filteredData = [];
    // // ================= FILTER OUT THE DATA AND ADD VIEW ALL EMPTY SLIDE TO THE END ===================
    // if((request.scrollType !== null && request.scrollType !== undefined && request.scrollType === "vertical") || (request.category === "githuib_covid19_india_district_wise_report_new")){
    //   response = response;
    // }else{
    //   if(response.length > 10){
    //       // arr.slice(1, 3);
    //       response = response.slice(0, 11);
    //       // console.log("finaldata :: ", finalData);
    //   }else{
    //       response = response;
    //   }
    // }


    if(request.footer !== null && request.footer !== undefined){
        footer = request.footer;
    }
    if(request.category === "init_server_data"){
      if(request.apiRef === "init_last_record_date"){
          let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          SERVER_SIDE_INIT_DATA.covid19_last_record_date = response;
          // console.log("@@@ last record date :: ", response);
          let d = new Date(response);
          let m = d.getMonth();
          m = months[m];
          let day = d.getDate();
          if(day < 10){
              day = "0"+day;
          }
          let modifiedDate = day+'-'+m+'-'+20;
          SERVER_SIDE_INIT_DATA.modified_covid19_last_record_date = modifiedDate;
          // console.log(" ##### modifiedDate : ", modifiedDate);
          socket.emit("github-who-covid19-api-response", { returnMsg : '', apiRef : 'init_last_record_date', last_record_date: response, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});

      }else if(request.apiRef === "fetch_compare_state_list"){
          // let country_data = COVID19_COUNTRY_DATA.COVID19_EFFECTED_COUNTRY_DATA_V3;
          // let country_code_data = COVID19_COUNTRY_DATA.COVID19_EFFECTED_COUNTRY_DATA_V2;
          let states_name = COVID19_COUNTRY_DATA.COVID19_INDIA_EFFECTED_STATES_NAME;
          let custom_obj = {
              compareFirstStateOptionListTemplate : '',
              compareSecondStateOptionListTemplate : '',
          }
          for (let i = 0; i < states_name.length; i++) {
              if(states_name[i] === "West Bengal" || states_name[i] === "Maharashtra"){
                if(states_name[i] === "West Bengal"){
                  custom_obj.compareFirstStateOptionListTemplate += '<option value="'+states_name[i]+'" selected >'+states_name[i]+'</option>';
                }
                if(states_name[i] === "Maharashtra"){
                  custom_obj.compareSecondStateOptionListTemplate += '<option value="'+states_name[i]+'" selected >'+states_name[i]+'</option>';
                }
              }else{
                custom_obj.compareFirstStateOptionListTemplate += '<option value="'+states_name[i]+'" >'+states_name[i]+'</option>';
                custom_obj.compareSecondStateOptionListTemplate += '<option value="'+states_name[i]+'" >'+states_name[i]+'</option>';
              }
          }
          socket.emit("github-who-covid19-api-response", { states_option_list: custom_obj, apiRef : request.apiRef, last_record_date: response, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});
      }else if(request.apiRef === "fetch_compare_country_list"){
          let country_data = WORLD_COUNTRY_DATA.WORLD_COUNTRIES_DATA;
          let custom_obj = {
              firstCountryOptionList : '',
              secondCountryOptionList : '',
              firstDefaultSelect : '',
              secondDefaultSelect : '',
          }
          let firstCountryOptionList = '';
          let secondCountryOptionList = '';
          let firsdtSelected = '';
          for(let item in country_data){
              if(item === "IND"){
                custom_obj.firstDefaultSelect = "selected";
              }
              if(item === "USA"){
                custom_obj.secondDefaultSelect = "selected";
              }
              custom_obj.firstCountryOptionList += '<option value="'+item+'" '+custom_obj.firstDefaultSelect+'>'+country_data[item].country_name+'</option>';
              custom_obj.secondCountryOptionList += '<option value="'+item+'" '+custom_obj.secondDefaultSelect+'>'+country_data[item].country_name+'</option>';
              custom_obj.firstDefaultSelect = "";
              custom_obj.secondDefaultSelect = "";
          }
          socket.emit("github-who-covid19-api-response", { compare_country_option_list: custom_obj, apiRef : request.apiRef, last_record_date: response, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});

      }else if(request.apiRef === "init_testing_lab_states_names_info" ){
          // console.log("### request.selectedElement : ", request.selectedElement);
          // console.log("### request.query : ", request.query);
          // console.log("### request.currentZoneWiseDefaultState : ", request.currentZoneWiseDefaultState);
          let states_codes = null;
          let states_name = COVID19_COUNTRY_DATA.COVID19_INDIA_EFFECTED_STATES_NAME;
          let template = '';
          let defaultStateTemplet = '';
          let finalTemplate = '';
          let itemId = '';
          let idPrefixValue = "";
          let from = "";
          let searchId = '';
          let bgColor = '';
          let fontColor = "white";
          let searchMethod = '';
          let searchBlockId = '';
          let onKeyUpMethodTemplate = '';
          let onClickMethodTemplate = '';

          if(request.scrollType === "home_states_daily_changes_report" || request.scrollType === "vertical_states_daily_changes_report"){
              states_codes = COVID19_COUNTRY_DATA.COVID19_INDIA_EFFECTED_STATES_CODES;
          }

          if(request.query !== null && request.query !== undefined && request.query !== ''){
              console.log("==== request.query: ", request.query);
              states_name = states_name.filter(function(item){
                if(((item.toLowerCase().indexOf(request.query.toLowerCase()) !== -1)) || (item.toLowerCase() === request.selectedElement.toLowerCase())){
                  console.log("---------");
                  return true;
                };
              });
          }
          // console.log("================= \n @@@ after filter states names :: \n",states_name );
          // console.log("@@@ zone wise default selected state : \n=======================", request.selectedElement);

          if(states_name.length > 0){
            //======================================================
              if(states_name.length > 1){
                  let index = states_name.indexOf(request.selectedElement);
                  states_name.splice(index, 1);
                  states_name.unshift(request.selectedElement);
              }
              if(request.scrollType === "vertical"){
                // console.log("=== calling vertical ===");
                //expandSearchState = 'isExpandVerticalSearchStateInput';
                idPrefixValue = "verticalTestingLabState";
                from = "vertical";
                // bgColor = "#4267B2";
                bgColor = default_style.themeColor;
                searchId = 'search_'+idPrefixValue;
                searchBlockId = "searchBlock_"+idPrefixValue;
                //searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"  onClick="onClickSearchStates(\'' + from + '\',\'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
                onKeyUpMethodTemplate = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"';
                onClickMethodTemplate = 'onClick="onClickSearchStates(\'' + from + '\',\'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
              }else if(request.scrollType === "home_death_recoveries"){
                // console.log("=== calling home_death_recoveries ===");

                idPrefixValue = "deathRecoveries";
                from = "home_death_recoveries";
                bgColor = default_style.themeColor;
                searchId = 'search_'+idPrefixValue;
                searchBlockId = "searchBlock_"+idPrefixValue;
                //searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"  onClick="onClickSearchStates(\'' + from + '\', \'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
                onKeyUpMethodTemplate = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"';
                onClickMethodTemplate = 'onClick="onClickSearchStates(\'' + from + '\',\'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
              }else if(request.scrollType === "vertical_death_recoveries"){
                // console.log("=== calling vertical_death_recoveries ===");

                idPrefixValue = "verticalDeathRecoveries";
                from = "vertical_death_recoveries";
                // bgColor = "green";
                bgColor = default_style.themeColor;

                searchId = 'search_'+idPrefixValue;
                searchBlockId = "searchBlock_"+idPrefixValue;
                //searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"  onClick="onClickSearchStates(\'' + from + '\', \'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
                onKeyUpMethodTemplate = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"';
                onClickMethodTemplate = 'onClick="onClickSearchStates(\'' + from + '\',\'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
              }else if(request.scrollType === "home_district_wise_report"){
                // console.log("=== calling home_district_wise_report ===");
                idPrefixValue = "districtWiseReport";
                from = "home_district_wise_report";
                bgColor = default_style.themeColor;
                searchId = 'search_'+idPrefixValue;
                searchBlockId = "searchBlock_"+idPrefixValue;
                //searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"  onClick="onClickSearchStates(\'' + from + '\', \'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
                onKeyUpMethodTemplate = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"';
                onClickMethodTemplate = 'onClick="onClickSearchStates(\'' + from + '\',\'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
              }else if(request.scrollType === "home_zone_wise_report"){
                // console.log("=== calling home_zone_wise_report ===");
                idPrefixValue = "zoneWiseReportState";
                from = "home_zone_wise_report";
                bgColor = default_style.themeColor;
                searchId = 'search_'+idPrefixValue;
                searchBlockId = "searchBlock_"+idPrefixValue;
                //searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"  onClick="onClickSearchStates(\'' + from + '\', \'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
                onKeyUpMethodTemplate = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"';
                onClickMethodTemplate = 'onClick="onClickSearchStates(\'' + from + '\',\'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
              }else if(request.scrollType === "home_states_daily_changes_report"){
                // console.log("=== calling home_zone_wise_report ===");
                idPrefixValue = "stateDailyChangesReportState";
                from = "home_states_daily_changes_report";
                bgColor = default_style.themeColor;
                searchId = 'search_'+idPrefixValue;
                searchBlockId = "searchBlock_"+idPrefixValue;
                //searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"  onClick="onClickSearchStates(\'' + from + '\', \'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
                onKeyUpMethodTemplate = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"';
                onClickMethodTemplate = 'onClick="onClickSearchStates(\'' + from + '\',\'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
              }else if(request.scrollType === "vertical_states_daily_changes_report"){
                // console.log("=== calling vertical_states_daily_changes_report ===");

                idPrefixValue = "verticalStateDailyChangesReportState";
                from = "vertical_states_daily_changes_report";
                bgColor = default_style.themeColor;
                searchId = 'search_'+idPrefixValue;
                searchBlockId = "searchBlock_"+idPrefixValue;
                //searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"  onClick="onClickSearchStates(\'' + from + '\', \'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
                onKeyUpMethodTemplate = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"';
                onClickMethodTemplate = 'onClick="onClickSearchStates(\'' + from + '\',\'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
              }else{
                idPrefixValue = "testingLabState";
                from = "home";
                // bgColor = "#4267B2";
                bgColor = default_style.themeColor;
                searchId = 'search_'+idPrefixValue;
                searchBlockId = "searchBlock_"+idPrefixValue;
                //searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"  onClick="onClickSearchStates(\'' + from + '\', \'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
                onKeyUpMethodTemplate = 'onKeyUp="onClickSearchStatesName(\'' + from + '\', \'' + searchId + '\', event)"';
                onClickMethodTemplate = 'onClick="onClickSearchStates(\'' + from + '\',\'' + searchId + '\', \''+searchBlockId+'\' , \'' + bgColor + '\' )"';
              }

              // searchId = 'search_'+idPrefixValue;
              // searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + searchId + '\', event)"  onClick="onClickSearchStates(\'' + searchId + '\')"';
              // // placeholder=""
              // template = `
              //   <a href="#" onclick="return false;" style="">
              //     <div id="searchBlock_`+idPrefixValue+`"   style="margin-right: 5px; padding: 10px; border-radius: 20px; padding: 10px 16px 10px 16px; background-color: #E9EBEE; color: #4b4f56; font-weight: 700;" >
              //       <span><span class="glyphicon glyphicon-search" style="position: relative; left: 5px; top: 3px; color: `+bgColor+`"></span></span>
              //       <span><input id="`+searchId+`"  type="text" `+searchMethod+` name="fname"  style="background-color: #E9EBEE; border: none; outline: none !important; width: 5px; transition: all .5s;"></span>
              //     </div>
              //   </a>
              // `;

              template = `
                <a href="#" onclick="return false;" style="">
                  <div id="searchBlock_`+idPrefixValue+`"  `+onClickMethodTemplate+`  style="margin-right: 5px; padding: 10px; border-radius: 20px; padding: 10px 16px 10px 16px; background-color: #E9EBEE; color: #4b4f56; font-weight: 700;" >
                    <span><span class="glyphicon glyphicon-search" style="position: relative; left: 0px; top: 3px; color: `+bgColor+`"></span></span>
                    <span><input id="`+searchId+`"  type="text" `+onKeyUpMethodTemplate+` name="fname"  style="background-color: #E9EBEE; border: none; outline: none !important; width: 0px; transition: all .5s; font-weight: 400;"></span>
                  </div>
                </a>
              `;

              if(request.query !== null && request.query !== undefined && request.query !== ''){
                template += '<a href="#" onclick="return false;" style=""><div id="" style="margin-right: 5px; padding: 10px; border-radius: 20px; padding: 10px 16px 10px 16px; background-color: red; color: white; font-weight: 700;" onclick="onClickResetSearchItems(\''+from+'\')">Reset</div></a>';
              }

              states_name.forEach((item, i) => {
                  if(request.scrollType === "home_states_daily_changes_report" || request.scrollType === "vertical_states_daily_changes_report"){
                      itemId = item.replace(/\s+/g, '-');
                      itemId = idPrefixValue+'_'+itemId+'_'+states_codes[i];
                  }else{
                      itemId = item.replace(/\s+/g, '-');
                      itemId = idPrefixValue+'_'+itemId;
                  }

                  if(item === request.selectedElement){
                    template += '<a href="#" onclick="return false;" style=""><div id="'+itemId+'" style="margin-right: 5px; padding: 10px; border-radius: 20px; padding: 10px 16px 10px 16px; background-color: '+bgColor+'; color: '+fontColor+'; font-weight: 700;" onclick="onClickTestingLabStateItem(\''+itemId+'\', \''+from+'\')">'+item+'</div></a>';

                  }else{
                    template += '<a href="#" onclick="return false;" style=""><div id="'+itemId+'" style="margin-right: 5px; padding: 10px; border-radius: 20px; padding: 10px 16px 10px 16px; background-color: #E9EBEE; color: #4b4f56; font-weight: 700;" onclick="onClickTestingLabStateItem(\''+itemId+'\', \''+from+'\')">'+item+'</div></a>';
                  }
                  // rajib
              });


          }else{
              template = "No Results Found.";
          }


          socket.emit("github-who-covid19-api-response", { returnMsg: template, apiRef : request.apiRef,  resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});

      }else if(request.apiRef === "covid19_india_states_daily_changes_report"){
          // console.log("============= init_testing_lab_states_names_info =============");
          let res = JSON.parse(response);
          res = res["states_daily"];
          calculateCovid19IndiaStatesDailyChanges(res);
          socket.emit("covid19-response-states-daily_changes-completed",{});
          //createOverAllIndianPredictionReport(request, socket);
      }
    }

    if(response !== "SERVER_SIDE_DATA"){
          response = JSON.parse(response);
          let tmpResult = null;
          if(request.category === "githuib_covid19_global_report" || request.category === "githuib_covid19_global_daily_report_by_date" ){
              tmpResult = response.result;
              let tempObj = {};
              tempObj = response.result;
              tempObj.date = response.date;
              tempObj.mortalityRate = ((tempObj.deaths * 100 ) / tempObj.confirmed).toFixed(2);
              tmpResult = tempObj;

          }else if(request.category === "githuib_covid19_india_daily_report_by_date" ){
              tmpResult = response.result;
              let tempObj = {};
              tempObj = tmpResult[request.searchQuery];
              // tempObj = response.result;
              tempObj.date = request.searchQuery;
              tempObj.mortalityRate = ((tempObj.deaths * 100 ) / tempObj.confirmed).toFixed(2);
              tmpResult = tempObj;
              SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_report = tempObj;
              // console.log("@@@ SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_report :: ", SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_report);

          }else if(request.category === "githuib_covid19_india_daily_report_by_date_range" || request.category === "githuib_covid19_global_daily_report_by_date_range"){

              if(request.category === "githuib_covid19_global_daily_report_by_date_range"){
                  // console.log("tmpResult : ", tmpResult);
                  tmpResult = response.result;
                  tmpResult.date = response.from_date+' - '+response.to_date;
                  tmpResult.from_date = response.from_date;
                  tmpResult.to_date = response.to_date;
                  tmpResult.to_text = " - ";
                  tmpResult.mortalityRate = ((tmpResult.deaths * 100 ) / tmpResult.confirmed).toFixed(2);
              }else{
                  tmpResult = response.result;
                  for (var i = 0; i < tmpResult.length; i++) {
                      tmpResult[i].mortalityRate = ((tmpResult[i].deaths * 100 ) / tmpResult[i].confirmed).toFixed(2);
                  }
              }
          }else if(request.category === "githuib_covid19_india_latest_report" || request.category === "githuib_covid19_global_daily_report"){
              let arr = [];
              for(var i in response.result){
                let obj = {};
                obj = response.result[i];
                obj.date = i;
                let d = new Date(i);
                d.setDate( d.getDate() - 1 );
                let prevDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
                obj.compareToPreviousDay = "<span> --- Compare To  "+prevDate+" --- </span>";
                obj.mortalityRate = ((obj.deaths * 100 ) / obj.confirmed).toFixed(2);
                arr.unshift(obj);
              }
              let calculatedArr = calculateDeathDifference(arr);
              tmpResult = calculatedArr;

          }else if(request.category === "githuib_covid19_fetch_india_latest"){
              let arr = [];
              for(var i in response.result){
                let obj = {};
                obj = response.result[i];
                obj.date = i;
                obj.mortalityRate = ((obj.deaths * 100 ) / obj.confirmed).toFixed(2);
                //obj.compareToPreviousDay = "Compare To Previous Day ";
                arr.unshift(obj);
              }
              //let calculatedArr = calculateDeathDifference(arr);
              tmpResult = arr;
              // console.log("$$$$$ tempresult : ", tmpResult);

          }else if(request.category === "githuib_covid19_country_wise_report" ){
              // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
              let arr = [];
              let resulatArr = response.result;
              let world_country_data = WORLD_COUNTRY_DATA.WORLD_COUNTRIES_DATA;
              let IRNObj = {}
              for(var x = 0; x < resulatArr.length; x++) {
                  let eachObj = resulatArr[x];
                  let country_code = '';
                  let country_obj = {};
                  let country_name = '';
                  let obj = {};
                  for(var i in eachObj){
                    if(world_country_data[i] === undefined){
                      // console.log("country object : ", dummy_country_data[country_code]);
                      country_name = i;
                    }else{
                        country_obj = world_country_data[i];
                        country_name = country_obj.country_name;
                    }
                    obj = eachObj[i];
                    obj.country = country_name;
                    obj.image = country_obj.country_flag;
                    obj.mortalityRate = ((obj.deaths * 100 ) / obj.confirmed).toFixed(2);
                    obj.population = country_obj.country_population;
                    obj.region = country_obj.country_region;
                    if(i === "IND"){
                        arr.unshift(obj);
                    }else if(i === "IRN"){
                        IRNObj = obj;
                    }else{
                        arr.push(obj);
                    }
                  }
              }
              arr.push(IRNObj);
              tmpResult = arr;
              // console.log("country wise temp result : \n\n", tmpResult);
          }else if(request.category === "githuib_covid19_india_state_wise_report" ){
              let arr = [];
              // let statesName = [];
              let temp_state_wise_data = {};
              tmpResult = response["statewise"];
              for (let i = 0; i < tmpResult.length; i++) {
                    temp_state_wise_data[tmpResult[i].state] = tmpResult[i];
                    tmpResult[i].mortalityRate = ((tmpResult[i].deaths * 100 ) / tmpResult[i].confirmed).toFixed(2);
                    if(tmpResult[i].state === 'West Bengal'){
                        arr.unshift(tmpResult[i]);
                    }else{
                        arr.push(tmpResult[i]);
                    }
                    // statesName.push(tmpResult[i].state);
              }
              tmpResult = arr;
              COVID19_COUNTRY_DATA.COVID19_INDIA_STATES_EFFECTED_ONLOAD_DATA = temp_state_wise_data;
              // console.log("@@@@ COVID19_COUNTRY_DATA.COVID19_INDIA_STATES_EFFECTED_ONLOAD_DATA  : \n", JSON.stringify(COVID19_COUNTRY_DATA.COVID19_INDIA_STATES_EFFECTED_ONLOAD_DATA ));
          }else if(request.category === "githuib_covid19_india_district_wise_report" ){
              let arr = [];
              for(var i in response){
                let obj = {};
                tempDistrictObj = response[i];
                let tempDistrictData = tempDistrictObj["districtData"];
                obj.collapseName = i;
                obj.collapseData = tempDistrictData;
                if(i === "West Bengal"){
                    arr.unshift(obj);
                }else{
                    arr.push(obj);
                }
              }
              tmpResult = arr;
          }else if(request.category === "covid19_india_zones_report"){
              // console.log("SERVER_SIDE_INIT_DATA.covid19_last_record_date :: ", SERVER_SIDE_INIT_DATA.covid19_last_record_date);
              // console.log("$$$ zone wise api cll default state : ", request.currentZoneWiseDefaultState);
              response = response["zones"];
                let index_arr = [];
                let obj = {};
                let color = '';
                response.forEach(function(item){
                    if(item.zone === "Green"){
                        color = '#28A745';
                    }else if(item.zone === "Orange"){
                        color = '#FA6800';
                    }else if(item.zone === "Red"){
                        color = '#DC3C30';
                    }
                    if(index_arr.indexOf(item.state) === -1){
                        let arr = [];
                        item.descriptionTemplateBgColor = color;
                        item.date = SERVER_SIDE_INIT_DATA.covid19_last_record_date;
                        arr.push(item);
                        obj[item.state] = arr;
                        index_arr.push(item.state);
                    }else{

                        item.descriptionTemplateBgColor = color;
                        item.date = SERVER_SIDE_INIT_DATA.covid19_last_record_date;
                        obj[item.state].push(item);
                    }
                });
                SERVER_SIDE_INIT_DATA.covid19_india_zones_object = obj;
                //console.log("#####   obj \n\n\n", JSON.stringify(obj));
                let zoneArr = obj[request.currentZoneWiseDefaultState];
                if(request.currentZoneWiseDefaultState === "West Bengal"){
                    let arr = [];
                    for (var i = 0; i < zoneArr.length; i++) {
                        if(zoneArr[i].district === "Kolkata"){
                            arr.unshift(zoneArr[i]);
                        }else{
                            arr.push(zoneArr[i]);
                        }
                    }
                    tmpResult = arr;

                }else{
                    tmpResult = zoneArr;
                }

                // console.log("west bengal zones data :: \n", finalData);
          }else if(request.category === "githuib_covid19_india_district_wise_report_new" ){
              // console.log("===== githuib_covid19_india_district_wise_report_new =====");
              // console.log("@@@ search query : ", request.searchQuery);
              let arr = [];
              let districtObj = {};
              let headlingObj = {totalConfirmed : 0, totalDeceased: 0, totalRecover: 0};
              let totalConfirmed = 0;
              let totalDeceased = 0;
              let totalRecover = 0;
              let stateData = response[request.searchQuery];
              stateData = stateData["districtData"];
              for(i in stateData){
                districtObj = stateData[i];
                districtObj.name = i;
                districtObj.date = SERVER_SIDE_INIT_DATA.covid19_last_record_date;
                districtObj.mortalityRate = ((districtObj.deceased * 100 ) / districtObj.confirmed).toFixed(2);
                headlingObj.totalConfirmed += districtObj.confirmed;
                headlingObj.totalDeceased += districtObj.deceased;
                headlingObj.totalRecover += districtObj.recovered;

                if(request.searchQuery === 'West Bengal' && i === 'Kolkata'){
                    arr.unshift(districtObj);
                }else{
                    arr.push(districtObj);
                }

              }
              headlingObj.mortalityRate = ((headlingObj.totalDeceased * 100 ) / headlingObj.totalConfirmed).toFixed(2);
              let lastRecordDateStateDailyConfirmed = SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_daily_state_wise_changes[request.searchQuery].confirmed;
              let lastRecordDateStateDailyDeath = SERVER_SIDE_INIT_DATA.covid19_india_last_record_date_daily_state_wise_changes[request.searchQuery].death;
              let obj = {
                dailyConfirmed: lastRecordDateStateDailyConfirmed,
                dailyDeath: lastRecordDateStateDailyDeath,
                totalConfirmed : headlingObj.totalConfirmed,
                totalDeath: headlingObj.totalDeceased
              }
              let afterTenDaysTotalConfirmd = headlingObj.totalConfirmed + (10 * lastRecordDateStateDailyConfirmed);
              let afterTenDaysTotalDeath = headlingObj.totalDeceased + (10 * lastRecordDateStateDailyDeath);

              // console.log("@@@ lastRecordDateStateDailyConfirmed :: ", lastRecordDateStateDailyConfirmed);
              // console.log("@@@ lastRecordDateStateDailyDeath :: ", lastRecordDateStateDailyDeath);
              // console.log("@@@ afterTenDaysTotalConfirmd :: ", afterTenDaysTotalConfirmd);
              // console.log("@@@ obj :: ", obj);

              obj = JSON.stringify(obj);
              // <hr style="width: 80%; margin-left: 10%;">
              let districtWiseReportFooterBlock =  `
                <div>
                	<div style=" width: 100%; padding-top: 15px; height: 50px; background-color: aliceblue;">
                  	<div style="width: 15%; display: inline-block; padding-left: 10px; font-weight: 700; ">Total </div>
                    <div style="width: 20%; display: inline-block; text-align: center; border-right: 1px solid `+default_style.borderColor+`;">
                    	<div style="display: inline-block;width: 10px; height: 10px; background-color: orange; margin-right: 5px;"></div>
                        <span>`+headlingObj.totalConfirmed+`</span>
                    </div>
                    <div style="width: 20%; display: inline-block; text-align: center; border-right: 1px solid `+default_style.borderColor+`;">
                      <div style="display: inline-block;width: 10px; height: 10px; background-color: red; margin-right: 5px;"></div>
                        <span>`+headlingObj.totalDeceased+`</span>
                    </div>
                    <div style="width: 20%; display: inline-block; text-align: center; border-right: 1px solid `+default_style.borderColor+`;">
                       <div style="display: inline-block;width: 10px; height: 10px; background-color: green; margin-right: 5px;"></div>
                         <span>`+headlingObj.totalRecover+`</span>
                     </div>
                     <div style="width: 20%; display: inline-block; text-align: center; border-right: 1px solid `+default_style.borderColor+`;">
                        <div style="display: inline-block;width: 10px; height: 10px; background-color: `+default_style.mortalityRateColor+`; margin-right: 5px;"></div>
                          <span>`+headlingObj.mortalityRate+`%</span>
                      </div>
                  </div>

                  <div style="background-color: #FDF5E6; padding-top: 12px; padding-bottom: 12px;">
                      <center><div style="font-size: 20px; color: `+default_style.themeColor+`; font-weight: 500;"># Analysis Based On The Record</div></center>
                      <div style=" width: 60%; margin: auto; margin-top: 10px;">
                              <div style="display: inline-block; width: 50%; float: left;">
                              	  <div>Date </div>
                                  <div>Confirm Case </div>
                                  <div>Death Case </div>
                                  <div>State </div>
                              </div>
                              <div style="display: inline-block; width: 50%; font-weight: 600; text-align: right;">
                              	  <div>`+SERVER_SIDE_INIT_DATA.covid19_last_record_date+`</div>
                                  <div>`+lastRecordDateStateDailyConfirmed+`</div>
                                  <div>`+lastRecordDateStateDailyDeath+`</div>
                                  <div>`+request.searchQuery+` </div>

                              </div>
                      </div>
                      <div style="width: 100%; margin-top: 16px; margin-bottom: 16px;">
                        <div style="text-align: center; margin-bottom: 10px;">
                            <span> After <span id="stateWiseDailyChangeDays_counter" style="font-size: 40px;font-weight: 600; color: #607D8B; margin-left: 8px; margin-right: 8px;" >10</span> days </span>
                        </div>
                      	<div style="width: 40%;  display: inline-block;  float: left; padding-left: 16px; position: relative;top: 10px; padding-right: 10px;">
                      		<div style="width: 100%; padding-right: 16px;">
                              	<div style="display: inline-block; width: 20%;">
                                  	<div style="height: 30px; ">
                                      	<button type="button" id="stateWiseDailyChangeDays_minusBtn" data=`+obj+`  onclick="onClickPrediction(event)" style="border: none; outline: none !important; font-size: 20px; background-color: rgb(233, 235, 238); height: 30px; width: 36px;">-</button>
                                      </div>
                                  </div>
                                  <div style="display: inline-block; width: 55%; text-align: center;">
                                  	<input type="text" id="stateWiseDailyChangeDays_inputText" data=`+obj+` value="10" onChange="onClickPrediction(event)" style="width: 100%; height: 31px; border: 1px solid `+default_style.borderColor+`; position: relative; left: 6px; padding-left: 16px; top: -2px; border: none;"></input>
                                  </div>
                                  <div style="display: inline-block; width: 15%;">
                                  	<button type="button" id="stateWiseDailyChangeDays_plusBtn" data=`+obj+` onclick="onClickPrediction(event)" style="border: none; outline: none !important; font-size: 20px; background-color: rgb(233, 235, 238); height: 30px; width: 36px;">+</button>
                                  </div>
                              </div>
                      	</div>
                          <div style="width: 60%; display: inline-block; padding-left: 16px;">
                  				        <div style="display: inline-block;">
                                      <div style="display: inline-block; width: 10px; height: 10px; background-color: orange; margin-right: 5px;"></div>
                                    	<span>Confirmed  </span>
                                      <span id="stateWiseDailyChangeDays_confirmData" style="color: orange; font-size: 20px; margin-left: 4px;">`+afterTenDaysTotalConfirmd+`</span>
                                  </div>
                                  <div style="display: inline-block;">
                                      <div style="display: inline-block;width: 10px; height: 10px; background-color: red; margin-right: 5px;"></div>
                                      <span>Death </span>
                                    	<span id="stateWiseDailyChangeDays_deathData" style="color: red; font-size: 20px; margin-left: 32px;">`+afterTenDaysTotalDeath+`</span>
                                  </div>
                          </div>
                      </div>
                  </div>
                </div>
              `;
              // .footerId = request.footer.
              // payload.districtWiseReportFooterBlockTemplate = headlingObj;
              footer.footerTemplate = districtWiseReportFooterBlock;
              tmpResult = arr;
              //console.log("### headlingObj :: ", headlingObj);

              // console.log("### tmpResult :: ", tmpResult);
          }else if(request.category === "githuib_covid19_india_time_series_by_india_govt_report"){
              tmpResult = response["cases_time_series"];
              tmpResult = tmpResult.reverse();
              // console.log("tmp result state wise :: ", tmpResult);

              calculateMonthWiseReportOfIndia(tmpResult);
          }else if(request.category === "githuib_covid19_india_testing_by_india_govt_report" ){
              tmpResult = response["tested"];
              tmpResult = tmpResult.reverse();
              // console.log("tmp result state wise :: ", tmpResult);
          }else if(request.apiRef === "covid19_india_states_daily_changes_report"){
            let state = request.defaultState;
            let wb_data = SERVER_SIDE_INIT_DATA.covid19_india_states_daily_changes[state];
            tmpResult = wb_data;
            tmpResult = tmpResult.reverse();
          }else if(request.category === "customSearch"){
              if(request.currentCustomSearchSource === "News" || request.currentCustomSearchSource === "Journal" ){
                  tmpResult = response.articles;
                  // console.log("final data : ", tmpResult);
              }else if(request.currentCustomSearchSource === "Wikipedia"){
                  tmpResult = response.query.search;
                  // console.log("final data : ", finalData);
              }else if(request.currentCustomSearchSource === "Currents"){
                  tmpResult = response.news;
              }
          }else{
              tmpResult = response;
          }


          if(Array.isArray(tmpResult) === false){
              let arr = [];
              arr.push(tmpResult);
              finalData = arr;
          }else{
            finalData = tmpResult;
          }
    }else if(response === "SERVER_SIDE_DATA"){
            if(request.category === "who_covid19_question_and_answer"){
              finalData = WHO_COVID19_QUESTION_AND_ANSWER_DATA.WHO_COVID19_QUESTION_AND_ANSWER_DATA;
            }else if(request.category === "githuib_covid19_india_compare_states_data"){
                let obj = COVID19_COUNTRY_DATA.COVID19_INDIA_STATES_EFFECTED_ONLOAD_DATA[request.searchQuery];
                let arr = [];
                arr.push(obj);
                finalData = arr;

            }else if(request.category === "githuib_covid19_india_state_wise_testing_lab_report"){
                // console.log("***********************  STATE WISE TESTING LAB  RESOURCES  *************************");
                let arr = COVID19_INDIA_RESOURCES_DATA.COVID19_INDIA_RESOURCES[request.searchQuery];
                finalData = arr;
                // console.log("@@@@ finaldata : \n\n", finalData);
            }else if(request.category === "githuib_covid19_india_state_wise_death_recoveries_report"){
                // console.log("***********************  STATE WISE TESTING LAB  RESOURCES  *************************");
                let arr = COVID19_INDIA_DEATH_RECOVERIES_DATA.COVID19_INDIA_DEATH_RECOVERIES[request.searchQuery];
                finalData = arr;
                // console.log("@@@@ finaldata : \n\n", finalData);
            }else if(request.category === "githuib_covid19_overall_indian_prediction_report"){
                createOverAllIndianPredictionReport(request, socket);
            }else if(request.category === "githuib_covid19_dos"){
                finalData = COVID19_DOS_DONTS.covid19_do;
                // console.log("finaldata : ", finalData);
            }else if(request.category === "githuib_covid19_donts"){
                finalData = COVID19_DOS_DONTS.covid19_dont;

            }

    }

// console.log("finaldata :: \n\n", finalData);
    // // ================= FILTER OUT THE DATA AND ADD VIEW ALL EMPTY SLIDE TO THE END ===================
    if((request.scrollType !== null && request.scrollType !== undefined && request.scrollType === "vertical") || (request.category === "githuib_covid19_india_district_wise_report_new") || (request.category === "covid19_india_zones_report")){
      finalData = finalData;
    }else{
      if(finalData.length > 10){
          // arr.slice(1, 3);
          finalData = finalData.slice(0, 11);
          // console.log("finaldata :: ", finalData);
      }else{
          finalData = finalData;
      }
    }

// https://www.countryflags.io/in/flat/64.png
    finalData.forEach((item) => {
          item.customType = "newWindow";
          if(request.category === "github_covid19_press_release"){
                item.image = 'static/images/press.jpg';
          }else if(request.category === "who_covid19_question_and_answer"){
                item.who = "WHO";
                item.url = "https://www.who.int/news-room/q-a-detail/q-a-coronaviruses";
                item.openUrlInTabText = 'World Health Organization';
                item.image = 'static/images/logo-who.jpg';
          }else if(request.category === "githuib_covid19_india_latest_report"){
                // item.image = 'https://www.countryflags.io/in/flat/64.png';
                item.image = 'https://restcountries.eu/data/ind.svg';
          }else if(request.category === "githuib_covid19_global_daily_report"){
                item.image = 'static/images/covid-spread.jpg';
          }else if(request.category === "githuib_covid19_global_report"){
                // item.image = 'static/images/covid19.jpg';
                item.image = 'static/images/covid-spread.jpg';

          }else if(request.category === "githuib_covid19_india_state_wise_report"){
                item.image = 'static/images/india-state-map.jpg';
          }else if(request.category === "githuib_covid19_india_testing_by_india_govt_report"){
                item.image = 'static/images/covid-testing.jpg';
                item.customType = "open_pdf_in_modal";
                // item.source = '<span style="position: relative; left: 5%;">'+item.source+'</span>';
          }else if(request.category === "githuib_covid19_india_time_series_by_india_govt_report"){
                item.image = 'static/images/covid-daily-update.jpg';
          }else if(request.category === "githuib_covid19_india_daily_report_by_date" || request.category === "githuib_covid19_india_daily_report_by_date_range" ){
                item.image = 'https://restcountries.eu/data/ind.svg';
          }else if(request.category === "githuib_covid19_india_state_wise_death_recoveries_report"){
                item.image = 'static/images/img_avatar.png';
          }else if( request.category === "githuib_covid19_fetch_india_latest"){
              // request.category === "githuib_covid19_country_wise_report" ||
              // console.log("##########################################################");
              // console.log("country flag :: ", request.searchQuery)
              item.image = WORLD_COUNTRY_DATA.WORLD_COUNTRIES_DATA[request.searchQuery].country_flag;
          }
          else if(request.category === "customSearch"){
              if(request.currentCustomSearchSource === "News"){
                  if(item.urlToImage === null || item.urlToImage === undefined){
                      item.urlToImage = 'static/images/json-news-api.png';
                  }
              }else if(request.currentCustomSearchSource === "Wikipedia"){
                  item.image = 'static/images/wikipedia.jpg';
                  item.wiki = "Wikipedia";
                  item.url = "www.wikipedia.com";
              }else if(request.currentCustomSearchSource === "Currents"){
                  if(item.image === null || item.image === "None" || item.image === undefined || item.image === "undefined" || item.image === "null"){
                        item.image = 'static/images/currents-news.png';
                  }
              }
          }else{
              if(item.image === null || item.image === undefined){
                // item.image = 'static/images/covid19.jpg';
                item.image = 'static/images/covid-spread.jpg';
              }
          }
    })


    // I09@koulp
    if(filteredData.length > 0){
      payload.data = filteredData;
    }else{
      payload.data = finalData;
    }
    payload.argList = argList;

    if(request.scrollType !== null && request.scrollType !== undefined && request.scrollType === "vertical"){
        payload.style.defaults.border = "none";
        payload.style.defaults.borderBottom = "none";
        if(request.category === "github_covid19_press_release"){
            argList[0].style += 'width: 100%; height: 250px;';
            argList[1].ellipse = 'none';
            payload.style.defaults.width = "auto";
            payload.style.defaults.margin = '12px 12px 12px 12px';
            payload.style.defaults.style = "border: none; padding: 0px 0px 0px 0px; "+default_style.boxShadow;
            payload.style.defaults.descriptionTemplateStyle = "padding: 12px 12px 12px 12px;";
        }else if(request.category === "who_covid19_question_and_answer"){
            argList[1].ellipse = 'none';
            argList[2].ellipse = 'none';
            payload.style.defaults.width = "auto";
            payload.style.defaults.style= "padding: 0px; margin: 12px 12px 12px 12px;"+default_style.boxShadow;
        }else if(request.category === "githuib_covid19_india_latest_report" || request.category === "githuib_covid19_global_daily_report" ){
            payload.style.defaults.top = "0px";
            payload.style.imgPos = "none";
            argList[0].style = "height: 40px; width: 60px; border: none; position: relative; display: inline-block; float: right; right: 1px; object-fit: fill; border-radius: 5px;";
            argList[1].key = 'date';
            payload.style.defaults.width = "95%";
            payload.style.defaults.border = "none";
            payload.style.defaults.margin = '0px 8px 0px 0px';
            payload.style.defaults.padding = '10px 10px 10px 10px'; // image left position
            payload.style.defaults.style = "border: 1px solid "+default_style.borderColor+"; margin: auto; margin-bottom: 10px; box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 3px 0px, rgba(0, 0, 0, 0.11) 0px 0px 0px 0px;";
            payload.style.defaults.imageTemplateStyle = "text-align: center;";
        }else if(request.category === "githuib_covid19_india_district_wise_report"){
            payload.style.imgPos = "none";
            payload.style.defaults.width = "auto";
            payload.style.defaults.margin = '12px 12px 12px 12px';
            payload.style.defaults.padding = '0px 0px 0px 0px';
            payload.collapseOpenView = "yes";
        }else if(request.category === "githuib_covid19_india_time_series_by_india_govt_report"){
            payload.style.defaults.width = "auto";
            payload.style.defaults.margin = '12px 12px 12px 12px';
            payload.style.defaults.padding = '0px 0px 0px 0px';
            payload.style.defaults.style = "border: 1px solid #ccc; border-radius: 0px;"+default_style.boxShadow;;

        }else if(request.category === "githuib_covid19_india_state_wise_report"){
            payload.style.defaults.width = "auto";
            payload.style.defaults.margin = '12px 12px 12px 12px';
            payload.style.defaults.padding = '0px 0px 0px 0px';
            argList[0].style = 'width: 100%;';
            payload.style.defaults.style="border-radius: 0px;"+default_style.boxShadow;
            payload.style.defaults.descriptionTemplateStyle = "padding: 10px 10px 10px 10px;";
        }else if(request.category === "githuib_covid19_india_testing_by_india_govt_report"){
            payload.style.defaults.width = "auto";
            payload.style.defaults.margin = '12px 12px 12px 12px';
            payload.style.defaults.padding = '0px 0px 0px 0px';
            payload.style.defaults.style="border-radius: 0px; border: 1px solid #ccc;"+default_style.boxShadow;
        }else if(request.category === 'githuib_covid19_india_state_wise_testing_lab_report' || request.category === 'githuib_covid19_india_state_wise_death_recoveries_report'){
            if(request.category === "githuib_covid19_india_state_wise_death_recoveries_report"){
              payload.style.imgPos = "left";
              payload.style.defaults.width = "auto";
              payload.style.defaults.style = "border-style: solid; border-width: 4px 0px 0px 0px; border-color: "+default_style.themeColor+"; border-radius: 0px; margin: 12px 12px 12px 12px;"+default_style.boxShadow;;

            }else{
              payload.style.imgPos = "none";
              payload.style.defaults.width = "auto";
              argList[2].ellipse = 'none';
              argList[6].ellipse = 'none';
              payload.style.defaults.style = "border-style: solid; border-width: 4px 0px 0px 0px; border-color: "+default_style.themeColor+"; border-radius: 0px; margin: 12px 12px 12px 12px;"+default_style.boxShadow;;

            }
            // payload.style.defaults.width = "";
            payload.style.defaults.margin = '12px 12px 12px 12px';
            payload.style.defaults.padding = '16px 10px 10px 10px';
            payload.style.defaults.top = "0px";
        }else if(request.apiRef === "covid19_india_states_daily_changes_report"){
            payload.style.defaults.width = "auto";
            payload.style.defaults.margin = '12px 12px 12px 12px';
            payload.style.defaults.padding = '16px 10px 10px 10px';
            payload.style.defaults.top = "0px";
            payload.style.defaults.style = "border-style: solid; border-width: 4px 0px 0px 0px; border-color: "+default_style.themeColor+"; border-radius: 0px; margin: 12px 12px 12px 12px;"+default_style.boxShadow;;

        }else if(request.category === "customSearch"){
            payload.style.defaults.width = "auto";
            argList[0].style = 'width: 100%;height: 200px; border: none;';
            payload.style.defaults.padding = '0px 0px 0px 0px';
            payload.style.defaults.margin = '12px 12px 12px 12px';
            argList[1].ellipse = 'none';
            argList[1].style = 'color: black; font-size: 16px; text-align: center; width: auto; line-height: 1.2;';
            argList[2].ellipse = 'none';
            argList[2].style = 'width: auto; margin-top: 5px; line-height: 1.4;';
            payload.style.defaults.style = ''+default_style.boxShadow;

        }else if(request.category === "githuib_covid19_country_wise_report"){
            payload.style.imgPos = "left";
            payload.style.defaults.width = "auto";
            argList[0].style = 'width: 90%; height: 100%; border: none; position: relative; top: 50px; left: 6px; border-radius: 0px;';
            // payload.style.defaults.height = "130px";
            // payload.style.defaults.border = "1px solid #ccc";
            payload.style.defaults.margin = '8px 6px 8px 6px';
            //payload.style.defaults.padding = '10px 10px 10px 10px';
            payload.style.defaults.style = "padding: 5px 10px 5px 10px; border: none; margin: 10px 10px 10px 10px;"+default_style.boxShadow;
            payload.style.defaults.descriptionTemplateStyle = "padding: 0px 0px 0px 8px;";
        }else{
          argList[0].style = 'width: auto; height: auto;';
          payload.style.defaults.width = "100%";
        }
          // payload.emptySlide = 'no';
    }else{
      if(request.category === "githuib_covid19_india_latest_report"){
          //argList[0].style = 'width: 100%;top: 50px;position: relative;top: 65px;left: 4%;height: 90px;'; // image in left position
          // argList[0].style = 'width: 100%; position:relative; height: 100%;';  // imagfe in top position
          argList[0].style = "height: 40px; width: 60px; border: none; position: relative; display: inline-block; float: right; right: 1px; object-fit: fill; border-radius: 5px;";
          payload.style.imgPos = "none";
          // payload.style.imgPos = "top";
          payload.style.defaults.width = "300px";
          payload.style.defaults.margin = '0px 8px 8px 0px';
          payload.style.defaults.padding = '16px 10px 10px 10px';
          payload.style.defaults.style = "border: 1px solid"+default_style.borderColor+"; padding: 16px; border-radius: 12px;"+default_style.boxShadow;
          //payload.style.defaults.descriptionTemplateStyle += "padding-left: 0px; padding-right: 8px;";
          payload.style.defaults.imageTemplateStyle = "text-align: center;";

      }else if(request.category === "who_covid19_question_and_answer"){
          payload.style.defaults.width = "340px";
          payload.style.defaults.style= "padding: 16px; margin: 0px 8px 8px 0px; border: 1px solid "+default_style.borderColor+"; border-radius: 12px; "+default_style.boxShadow;
      }else if(request.category === "githuib_covid19_india_district_wise_report_new"){
          payload.style.defaults.width = "275px";
          payload.style.defaults.style= "padding: 5px;  margin: 0px 8px 8px 0px; border: 1px solid "+default_style.borderColor+"; border-radius: 12px;"+default_style.boxShadow;
      }else if(request.category === "githuib_covid19_global_daily_report"){
          payload.style.defaults.top = "0px";
          payload.style.imgPos = "none";
          argList[0].style = "height: 40px; width: 60px; border: none; position: relative; display: inline-block; float: right; right: 1px; object-fit: fill; border-radius: 5px;";
          argList[1].key = 'date';
          payload.style.defaults.width = "300px";
          payload.style.defaults.border = "none";
          payload.style.defaults.margin = '0px 8px 8px 0px';
          payload.style.defaults.padding = '10px 10px 10px 10px'; // image left position
          payload.style.defaults.style = "padding: 16px; border-radius: 12px; border: 1px solid "+default_style.borderColor+"; "+default_style.boxShadow;
          payload.style.defaults.imageTemplateStyle = "text-align: center;";
      }else if(request.category === "github_covid19_press_release" || request.category === "githuib_covid19_india_state_wise_report"){
          payload.style.defaults.width = "320px";
          payload.style.defaults.border = "none";
          payload.style.defaults.margin = '0px 8px 8px 0px';
          payload.style.defaults.padding = '0px 0px 0px 0px';
          // payload.style.defaults.style = "border-radius: 0px; "
          if(request.category === "githuib_covid19_india_state_wise_report"){
              payload.style.defaults.width = "300px";
              payload.style.defaults.border = "none";
              payload.style.defaults.borderBottom = "none";
              payload.style.defaults.style = "margin: 0px 8px 8px 0px; padding: 0px 0px 10px 0px; border-radius: 0px 0px 10px 10px; box-shadow: rgba(0, 0, 0, 0.13) 5px 5px 6px 0px, rgba(0, 0, 0, 0.11) 0px 0px 10px 3px;";
              argList[0].style = "width: 100%;height: auto;top: 0px;";
          }else if(request.category === "github_covid19_press_release"){
              payload.style.imgPos = "left";
              payload.style.defaults.style = "border-radius: 0px; border: 1px solid #ccd0d5;"
              payload.style.defaults.descriptionTemplateStyle += "padding-bottom: 0px";
          }
      }else if(request.category === "githuib_covid19_global_report" ){
          payload.style.imgPos = "top";
          // argList[0].style = "height: auto; width: 85%; border: none; position: relative; top: 25px; left: 10%;";
          payload.style.defaults.width = "auto";
          payload.style.defaults.border = "none";
          payload.style.defaults.margin = '0px 0px 0px 0px';
          payload.style.defaults.padding = '0px 0px 0px 0px';
      }else if(request.category === "githuib_covid19_india_testing_by_india_govt_report"){
          payload.style.defaults.width = "340px";
          payload.style.defaults.margin = '0px 8px 8px 0px';
          payload.style.defaults.padding = '0px 0px 0px 0px';
          argList[0].style = 'width: 100%; height: 175px; border: none; position: relative; border-radius: 10px 10px 0px 0px;';
          payload.style.defaults.style="border-radius: 12px; border: 1px solid #ccd0d5; padding-bottom: 10px; "+default_style.boxShadow;
      }else if(request.category === "githuib_covid19_country_wise_report"){
          payload.style.imgPos = "none";
          payload.style.defaults.width = "300px";
          // argList[0].style = "height: 90px;width: 100%;position: relative;top: 40px;left: 0%;white-space: nowrap;";
          argList[0].style = "height: 40px; width: 60px; border: none; position: relative; display: inline-block; float: right; right: 1px; object-fit: fill; border-radius: 5px;";
          payload.style.defaults.margin = '10px 8px 8px 0px';
          payload.style.defaults.border = "1px solid "+default_style.borderColor+"";
          payload.style.defaults.borderBottom = "1px solid #ccd0d5";
          // payload.style.defaults.style = "padding: 10px 10px 10px 10px; ";
          // border-radius: 10px;
          payload.style.defaults.descriptionTemplateStyle = "padding: 10px 10px 10px 10px;";
          payload.style.defaults.imageTemplateStyle = "text-align: center;";
          payload.style.defaults.style = "margin: 10px 8px 8px 0px; border-radius: 16px;"+default_style.boxShadow;

      }else if(request.category === "customSearch"){
          payload.style.defaults.width = "320px;";
          payload.style.defaults.border = "1px solid #ccd0d5";
          payload.style.defaults.margin = '0px 8px 0px 0px';
          argList[1].ellipse = 'one line';
          argList[2].ellipse = 'one line';
          payload.style.defaults.style = "padding: 0px 0px 0px 0px; border: 1px solid "+default_style.borderColor+";";
      }else if(request.category === "githuib_covid19_india_district_wise_report"){
          payload.collapseOpenView = "no";
          payload.style.imgPos = "none";
          payload.style.defaults.width = "100%";
          payload.style.defaults.margin = '5px 0px 8px 0px';
          payload.style.defaults.padding = '0px 0px 0px 0px';
      }else if(request.category === "githuib_covid19_india_daily_report_by_date" ||
              request.category === "githuib_covid19_global_daily_report_by_date" ||
              request.category === "githuib_covid19_india_daily_report_by_date_range" ||
              request.category === "githuib_covid19_global_daily_report_by_date_range" ||
              request.category === 'githuib_covid19_fetch_india_latest'){
          // rajib
          payload.style.imgPos = "left";
          payload.style.defaults.border = "none";
          payload.style.defaults.width = "100%";
          payload.style.defaults.style = "border: none;";
          payload.style.defaults.margin = '5px 10px 0px 0px';
          payload.style.defaults.padding = '0px 0px 0px 0px';
          payload.style.defaults.descriptionTemplateStyle = "padding-left: 5px; padding-right: 10px; width: 70%;";
          payload.style.defaults.imageTemplateStyle = "text-align: center; width: 30%;";
          if(request.category === "githuib_covid19_india_daily_report_by_date" ||
              request.category === "githuib_covid19_india_daily_report_by_date_range" ||
              request.category === 'githuib_covid19_fetch_india_latest'){
              payload.style.defaults.margin = '5px 0px 0px 0px';
              // argList[0].style = 'width: 90%;top: 50px;position: relative;top: 23px;height: 100px; left: 4%;';
              argList[0].style = 'width: 70%; top: 36px; height: 55px; position: relative; object-fit: fill; border: none; border-radius: 8px;';
              // payload.style.defaults.descriptionTemplateStyle = "padding-left: 10px;";
              // payload.style.defaults.imageTemplateStyle = "text-align: center;";
              // rajib
          }else if(request.category === "githuib_covid19_global_daily_report_by_date" || request.category === "githuib_covid19_global_daily_report_by_date_range"){
              // argList[0].style = 'width: 92%; top:30px; height:90px; position: relative; left: 2%;';
              // argList[0].style = 'width: 70%; top: 30px; height: 82px; position: relative;  object-fit: fill; border: none; ';
              // payload.style.defaults.width = "100%";
              // payload.style.imgPos = "right";
              argList[0].style = 'width: 72%; top: 40px; height: 55px; position: relative; object-fit: fill; border: none; border-radius: 5px;';

          }
      }else if(request.apiRef === "covid19_india_states_daily_changes_report"){
          payload.style.defaults.width = "250px";
          payload.style.defaults.margin = '0px 8px 8px 0px';
          payload.style.defaults.padding = '5px 5px 5px 5px';
          payload.style.defaults.style = "border: 1px solid #ccd0d5; border-radius: 12px;"+default_style.boxShadow;
      }else if(request.category === "githuib_covid19_india_time_series_by_india_govt_report"){
          payload.style.defaults.width = "320px";
          payload.style.defaults.margin = '0px 8px 8px 0px';
          payload.style.defaults.padding = '0px 0px 0px 0px';
          argList[0].style = 'height: 150px; width: 100%; border: none; position: relative; border-radius: 10px 10px 0px 0px;';
          payload.style.defaults.style = "border: 1px solid #ccd0d5; padding-bottom: 10px; border-radius: 12px; "+default_style.boxShadow;
      }else if(request.category === "covid19_india_zones_report"){
          payload.style.imgPos = "none";
          payload.style.defaults.width = "260px";
          payload.style.defaults.margin = '0px 8px 8px 0px';
          payload.style.defaults.padding = '10px 10px 10px 10px';
          payload.style.defaults.style = "border: none; border-bottom: none; border-radius: 15px; padding: 16px; "+default_style.boxShadow;
      }else if(request.category === 'githuib_covid19_india_compare_states_data'){
          payload.style.imgPos = "left";
          payload.style.defaults.width = "100%";
          // argList[0].style = 'width: 96%;left: 3%;height: auto;top: 0px;position: relative; border: none; border-bottom: none;';
          argList[0].style = "width: 80%; left: 8%; height: auto; top: 10px; position: relative; border: none; border-bottom: none;";
          payload.style.defaults.border = "1 px solid white";
          payload.style.defaults.borderBottom = "1 px solid white";
          payload.style.defaults.margin = '0px 0px 0px 0px';
          payload.style.defaults.top = "0px";
          //payload.style.defaults.style = "top: 0px;";
          payload.style.defaults.descriptionTemplateStyle = "position: relative; padding: 0px 12px 0px 0px;";
      }else if(request.category === 'githuib_covid19_india_state_wise_testing_lab_report' || request.category === 'githuib_covid19_india_state_wise_death_recoveries_report'){
          if(request.category === "githuib_covid19_india_state_wise_death_recoveries_report"){
            payload.style.imgPos = "left";
            argList[0].style = 'width: 70%; height: 70%; border: none; border-radius: 50%; margin-top: 12px; margin-left: 15%';
            payload.style.defaults.padding = '16px 0px 10px 10px';
            payload.style.defaults.width = "305px";
            payload.style.defaults.margin = '0px 8px 8px 0px';
            payload.style.defaults.top = "0px";
            payload.style.defaults.style = "border-width: 6px 1px 1px 1px; border-color: "+default_style.themeColor+"; border-style: solid; padding: 16px; border-radius: 16px; "+default_style.boxShadow;
          }else{
            payload.style.imgPos = "none";
            payload.style.defaults.padding = '16px 10px 10px 10px';
            payload.style.defaults.width = "305px";
            payload.style.defaults.margin = '0px 8px 8px 0px';
            payload.style.defaults.top = "0px";
            payload.style.defaults.style = "border-width: 6px 1px 1px 1px; border-color: "+default_style.themeColor+"; border-style: solid; height: 230px; padding: 16px; border-radius: 16px;"+default_style.boxShadow;
          }

      }else if(request.category === 'githuib_covid19_dos' || request.category === 'githuib_covid19_donts'){
            payload.style.defaults.width = "320px";
            payload.style.defaults.height = "auto";
            payload.style.defaults.margin = '16px 8px 8px 0px';
            payload.style.defaults.padding = '0px 0px 0px 0px';
            payload.style.defaults.border = 'none';
            payload.style.defaults.borderBottom = "none";
            payload.style.defaults.style = " border-radius: 12px;"+default_style.boxShadow;
            payload.style.defaults.descriptionTemplateStyle = "padding: 1rem; background-color: white; border-radius: 12px;";

      }
        // payload.emptySlide = 'yes';
    }
    if(request.emptySlideDesc !== null && request.emptySlideDesc !== undefined && request.emptySlideDesc === true){
        payload.emptySlideDesc.visibility = true;
        payload.emptySlideDesc.template.type = "button";
        payload.emptySlideDesc.template.name = "View All";
        payload.emptySlideDesc.template.style = "";
        payload.emptySlideDesc.template.action = request.emptySlideAction;

    }else{
        payload.emptySlideDesc.visibility = null;
    }
    // console.log("payload  : ", payload);
    // let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);

    let template = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
    // payload = default_payload;
    {
      if(payload.style.imgPos !== "top"){
          payload.style.imgPos = "top";
      }
      if(payload.headingBlock !== undefined){
        payload.headingBlock = null;
      }
      payload.style.defaults.style = '';
      payload.style.defaults.descriptionTemplateStyle = "background-color: white;";
      payload.style.defaults.imageTemplateStyle = "";

    }

    // console.log(" final template : ", template);
    if(finalData !== null && finalData.length > 0){
        if(request.from === 'Gini'){
          socket.emit("query-response", { returnMsg : template, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});
        }else if(request.from === "Api"){
          // socket.emit("response-openwhyd-playlist-by-genre", {returnMsg : findResponseTemplate});
          socket.emit("github-who-covid19-api-response", { returnMsg : template, category: request.category, resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId, blockId: request.blockId, priority: request.priority, emptySlideDesc: request.emptySlideDesc, emptySlideAction: request.emptySlideAction, footer: footer});
        }
    }else{
      let template = "<i>We are finding some problem. <br> Please try again later.<strong></strong></i>";
      socket.emit("query-response", { returnMsg : template});
    }



  });

}

// else if(request.category === "githuib_covid19_dos"){
//     payload.style.imgPos = "none";
//     payload.style.defaults.width = "340px";
// }


module.exports.GITHUB_WHO_COVID19_API_PROCCESSING = GITHUB_WHO_COVID19_API_PROCCESSING;
