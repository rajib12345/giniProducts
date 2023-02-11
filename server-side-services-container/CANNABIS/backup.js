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
