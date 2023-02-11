const Promise = require('promise');const request = require('request');
const category = ['restaurant', 'cinema', 'shopping', 'pharmacy'];
var radioNameCounter = 0;


function getLinkTemplate(link, arguments){
    let template = '';
    let text = arguments.text !== '' ? arguments.text : 'Click me';
    console.log("link : ", link);
    template = '<div> <a href="'+link+'" target="_blank" style="color: orange;">'+text+'</a> </div>';
    return template;
}

function getEmptySlideWithButtonTemplate(){
    let template = '';
    let apiName = 'quizApi';
    template += '<div id="quizApi-submitbtn-'+radioNameCounter+'" style="width:200px; height: auto; margin-top: 50px;"><button type="button" class="btn btn-primary" onclick="onClickEmptySlideSubmitBtn(\'' + apiName + '\', \'' + radioNameCounter + '\',)">Submit</button></div>';
    template += '<div id="quizApi-submitbtn-response-'+radioNameCounter+'" style="width:200px; height: auto;"></div>';

    return template;
}

function getCollapseTemplate(content){
  let template = '';
  template += `
  <div id="collapse-`+radioNameCounter+`" class="collapse" style="white-space: normal;">
    `+content+`
  </div>
  <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#collapse-`+radioNameCounter+`">Simple collapsible</button>
  `
  return template;
}

function getOpenModalBtnWithContent(content, arguments){
    let template = '';
    template = '<div style=""><button type="button" class="btn btn-success" style="background-color: teal; color: white; width: 100%; border-radius: 0px; border: none; '+arguments.style+'" name="button" onclick="onOpenModal(\''+content+'\', \''+arguments.type+'\')">'+arguments.btnName+'</button></div>';
    return template;
}
function getRadioTemplate(itemIndex, data, type, radioNameCounter){
    let template = '';
    let obj = {name : 'rajib', add: 'bkp kolkata '};
    let api = "quizApi";
    if(type === 'string'){
      template += '<div class="radio">';
      template += '<label id="radioLabel-'+data+'"><input type="radio" name="radioName-'+radioNameCounter+'" value="'+data+'"  onclick="onclickRadioBtn(\'' + api + '\',\'' + itemIndex + '\',\'' + data + '\')">'+data+'</label>';
      template += '</div>';
    }else if(type === 'array'){
        for (var i = 0; i < data.length; i++) {
          template += '<div class="radio">';
          template += '<label id="radioLabel-'+data[i]+'"><input type="radio" name="radioName-'+radioNameCounter+'" value="'+data[i]+'"  onclick="onclickRadioBtn(\'' + api + '\',\'' + itemIndex + '\',\'' + data[i] + '\')">'+data[i]+'</label>';
          template += '</div>';
        }
    }

    // console.log("#### before return from radio :: ", template);
    return template;
}

function getImageTemplate(imageOrIconPath, arguments){
  let template = `
  <img src="`+imageOrIconPath+`" style="width: 100%;`+arguments.style+`" />
  `;
  return template;
}

function getNewWindowTemplate(url, arguments){
    let template = '';
    let text = arguments.text !== '' ? arguments.text : 'Track location';
      template = '<div style="text-align: center; margin-top: 10px;"><button type="button" class="btn btn-success" style="background-color: teal; color: white; width: 100%; border-radius: 0px; border: none;" name="button" onclick="onOpenModal(\''+url+'\', \''+arguments.type+'\')">'+text+'</button></div>';
      return template;
}

function getBlockTemplate(content, arguments, ellipseWidth){
  let template = '';
  let customStyles = '';
  if(arguments.prefixValue !== null && typeof(arguments.prefixValue) === 'string' && arguments.prefixValue !== ''){
      // content = '<span style="color:black;">'+arguments.prefixValue+' : </span>' + content ;
      // console.log("prefixvalue : ", arguments.prefixValue);
      content = arguments.prefixValue+' '+content;
  }
  if(arguments.style !== undefined && arguments.style.length > 0){
    // console.log("arguments.style : ", arguments.style);
    customStyles = arguments.style;
  }
  if(typeof(content) === 'string' && (content.length > 35)){
      if(content.includes("<br/>")){
        content = content.replace("<br/>", " ");
      }
      if(arguments.ellipse === 'one line'){
        template = '<div class="ellipse" style="width: '+ellipseWidth+'; white-space: nowrap; margin-top: 3px; ;'+customStyles+'" onclick="onOpenModal(\'' + content + '\')">'+content+'</div>';
        template += '<div class="tooltip">'+content+'</div>';
      }
  }else{
    template = '<div class="" style=" white-space: normal; margin-top: 3px;'+customStyles+'" onclick="onOpenModal(\'' + content + '\')">'+content+'</div>';
  }
  return template;
}

function hScrollBar(data, devider){
    let template = '';
      template = '<a href="#" style=""><div style="border-right: '+devider+';">'+data+'</div></a>';
    return template;
}

function getLeftImagewithDescTemplate(templateData){
  let template = `
  <div style="">
        <div class="">
          <div class="row" style="color: grey; padding-top: 10px; padding-bottom: 10px; font-size: 13px;">
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3" style="padding-left: 0px;">
                  `+templateData.imageTemplate+`
              </div>
              <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-9" style="">
                  `+templateData.descTemplate+`
              </div>
          </div>
        </div>
    </div>
  `;
  return template;
}

function getTopImagewithDescTemplate(templateData,style){
  let customStyle = '';
  for(var key in style.defaults){
      if(key === 'backgroundColor'){
          let bg = style.backgroundColor !== null ? style.backgroundColor : style.defaults.backgroundColor;
          customStyle += 'background-color : '+style.defaults[key]+';';
      }else if(key === 'fontSize'){
          let fs = style.fontSize !== null ? style.fontSize : style.defaults.fontSize;
          customStyle += 'font-size : '+fs+';';
      }else if(key === 'textAlign'){
          let ta = style.textAlign !== null ? style.textAlign : style.defaults.textAlign;
          customStyle += 'text-align : '+ta+';';
      }else if(key === 'height'){
          let height = style.height !== null ? style.height : style.defaults.height;
          customStyle += 'height : '+height+';';
      }else if(key === 'width'){
          let width = style.width !== null ? style.width : style.defaults.width;
          customStyle += 'width : '+width+';';
      }else if(key === 'padding'){
          let padding = style.padding !== null ? style.padding : style.defaults.padding;
          customStyle += 'padding : '+padding+';';
      }else{
          customStyle += key+' : '+style.defaults[key]+';';
      }
  }
  let template = `

      <div class="row" style="`+customStyle+`">
          <div class="" style="">
              `+templateData.imageTemplate+`
          </div>
          <div class="" style="">
               `+templateData.descTemplate+`
          </div>
      </div>
  `;

  return template;
}

function getRightImagewithDescTemplate(templateData){
  let template = `
  <div style="background-color: white;">
        <div class="">
          <div class="row" style="background-color: teal; color: white; padding-top: 10px; padding-bottom: 10px; font-size: 13px;">
              <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-9" style="">
                  `+templateData.descTemplate+`
              </div>
              <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3" style="">
                  `+templateData.imageTemplate+`
              </div>
          </div>
        </div>
    </div>
    <hr>
  `;
  return template;
}

function getNoImagewithDescTemplate(templateData, style){
  // let finalAlignment = style.textAlign !== null ? style.textAlign : style.defaults.textAlign;
  // let finalBackgroundColor = style.backgroundColor !== null ? style.backgroundColor : style.defaults.backgroundColor;
  // let height = style.height !== null ? style.height : style.defaults.height;
  // let width = style.width !== null ? style.width : style.defaults.width;
  // // let style = finalAlignment+';'+finalBackgroundColor+';'+height+';'+width+';';
  // let fontSize = style.fontSize !== null ? style.fontSize : style.defaults.fontSize;
  // let color = style.color !== null ? style.color : style.defaults.color;
  let customStyle = '';
  for(var key in style.defaults){
      if(key === 'backgroundColor'){
          let bg = style.backgroundColor !== null ? style.backgroundColor : style.defaults.backgroundColor;
          customStyle += 'background-color : '+style.defaults[key]+';';
      }else if(key === 'fontSize'){
          let fs = style.fontSize !== null ? style.fontSize : style.defaults.fontSize;
          customStyle += 'font-size : '+fs+';';
      }else if(key === 'textAlign'){
          let ta = style.textAlign !== null ? style.textAlign : style.defaults.textAlign;
          customStyle += 'text-align : '+ta+';';
      }else if(key === 'height'){
          let height = style.height !== null ? style.height : style.defaults.height;
          customStyle += 'height : '+height+';';
      }else if(key === 'width'){
          let width = style.width !== null ? style.width : style.defaults.width;
          customStyle += 'width : '+width+';';
      }else if(key === 'padding'){
          let padding = style.padding !== null ? style.padding : style.defaults.padding;
          customStyle += 'padding : '+padding+';';
      }else if(key === 'borderRight'){
          let br = style.defaults.borderRight;
          customStyle += 'border-right : '+br+';';
      }else{
          customStyle += key+' : '+style.defaults[key]+';';
      }
  }
  let template = `

          <div class="" style="`+customStyle+`">
              <div class="" style="">
                  `+templateData.descTemplate+`
              </div>
          </div>

  `;
  return template;
}



var basic_template_generator = function(payload){
  // console.log("== call image desc template ==");
  let template = '';
  let data = payload.data;
  let argList = payload.argList;
  let ellipseWidth = payload.style.defaults.width;
  if(Array.isArray(payload.data)){
    data.forEach(function(item, itemIndex){
          let templateData = {imageTemplate : '', descTemplate : ''};
              for (var i = 0; i < argList.length; i++) {
                      if(argList[i].subkey === null){
                            if(argList[i].type === "image"){
                                  templateData.imageTemplate = getImageTemplate(item[argList[i].key], argList[i]);
                            }else if(argList[i].type === "block"){

                                  if(item[argList[i].key] === undefined || item[argList[i].key] === null){
                                    templateData.descTemplate += getBlockTemplate("N/A", argList[i], ellipseWidth);
                                  }else{
                                    templateData.descTemplate += getBlockTemplate(item[argList[i].key], argList[i], ellipseWidth);
                                  }
                            }else if(argList[i].type === "link"){
                                    templateData.descTemplate += getLinkTemplate(item[argList[i].key]);
                            }else if(argList[i].type === "radio"){

                                if(typeof(item[argList[i].key]) === 'string'){
                                    templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "string", radioNameCounter);
                                }else if(typeof(item[argList[i].key]) === 'object' && Array.isArray(item[argList[i].key])){
                                    templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "array", radioNameCounter);
                                }

                            }else if(argList[i].type === 'newWindow'){
                              templateData.descTemplate += getNewWindowTemplate(item[argList[i].key], argList[i]);
                            }else if(argList[i].type === "collapse"){
                                templateData.descTemplate += getCollapseTemplate(item[argList[i].key]);
                            }else if(argList[i].type === "openModalWithContent"){
                              templateData.descTemplate += getOpenModalBtnWithContent(item[argList[i].key], argList[i]);
                            }
                      }else if(argList[i].subkey.length > 0){
                          let subData = item[argList[i].key];
                          // console.log("subdata : ", subData);
                          let subKeyList = argList[i].subkey;
                          if(typeof(subData) === 'object'){



                            for (var j = 0; j < subKeyList.length; j++) {
                              if(argList[i].subkey[j].subkey === null){
                                let subkey = argList[i].subkey[j].key;
                                let subType = argList[i].subkey[j].type;
                                let subValue = subData[subkey];
                                  if( subType === "image"){
                                        templateData.imageTemplate += getImageTemplate(subValue, argList[i].subkey[j]);
                                  }else if(subType === "block"){
                                    console.log("22222222222222");

                                        templateData.descTemplate += getBlockTemplate(subValue, argList[i].subkey[j], ellipseWidth);
                                  }else if(subType === "link"){
                                          templateData.descTemplate += getLinkTemplate(subValue, argList[i].subkey[j]);
                                  }else if(subType === "radio"){

                                      if(typeof(item[argList[i].key]) === 'string'){
                                          templateData.descTemplate += getRadioTemplate(subValue, argList[i].subkey[j], "string", radioNameCounter);
                                      }else if(typeof(item[argList[i].key]) === 'object' && Array.isArray(item[argList[i].key])){
                                          templateData.descTemplate += getRadioTemplate(subValue, argList[i].subkey[j], "array", radioNameCounter);
                                      }

                                  }else if(subType === 'newWindow'){
                                    templateData.descTemplate += getNewWindowTemplate(subValue, argList[i].subkey[j]);
                                  }else if(subType === "collapse"){
                                      templateData.descTemplate += getCollapseTemplate(subValue, argList[i].subkey[j]);
                                  }else if(subType === "openModalWithContent"){
                                    templateData.descTemplate += getOpenModalBtnWithContent(subValue, argList[i].subkey[j]);
                                  }
                              }else{

                                  console.log("============ not null else block is calling  =============");
                                  let newSubData = subData[subKeyList[j].key];
                                  if(Array.isArray(newSubData)){
                                      // TYPE IS ARRAY
                                      // for(let i=0; i<)


                                  }else if(!Array.isArray(newSubData)){
                                      // TYPE IS OBJECT
                                      // console.log("== object part ==");
                                      // console.log("@@@@ subKeyList : ", subKeyList[j].key);
                                      // console.log("newSubData : ", newSubData);
                                      // console.log("subKeyList[j].key : ", subKeyList[j].subkey);
                                      for (let i = 0; i < subKeyList[j].subkey.length; i++) {
                                            let newSubKey = subKeyList[j].subkey[i].key;
                                            let newSubType = subKeyList[j].subkey[i].type;
                                            let newSubValue = newSubData[newSubKey];
                                            // console.log("newSubKey : ", newSubKey);
                                            // console.log("newSubType : ", newSubType);
                                            // console.log("newSubValue : ", newSubValue);
                                            if( newSubType === "image"){
                                                  templateData.imageTemplate += getImageTemplate(newSubValue, subKeyList[j].subkey[i]);
                                            }else if(newSubType === "block"){
                                              // console.log("22222222222222");

                                                  templateData.descTemplate += getBlockTemplate(newSubValue, subKeyList[j].subkey[i], ellipseWidth);
                                            }else if(newSubType === "link"){
                                                    templateData.descTemplate += getLinkTemplate(newSubValue, subKeyList[j].subkey[i]);
                                            }else if(newSubType === "radio"){

                                                if(typeof(item[argList[i].key]) === 'string'){
                                                    templateData.descTemplate += getRadioTemplate(newSubValue, subKeyList[j].subkey[i], "string", radioNameCounter);
                                                }else if(typeof(item[argList[i].key]) === 'object' && Array.isArray(item[argList[i].key])){
                                                    templateData.descTemplate += getRadioTemplate(newSubValue, subKeyList[j].subkey[i], "array", radioNameCounter);
                                                }

                                            }else if(newSubType === 'newWindow'){
                                              templateData.descTemplate += getNewWindowTemplate(newSubValue, subKeyList[j].subkey[i]);
                                            }else if(newSubType === "collapse"){
                                                templateData.descTemplate += getCollapseTemplate(newSubValue, subKeyList[j].subkey[i]);
                                            }else if(newSubType === "openModalWithContent"){
                                              templateData.descTemplate += getOpenModalBtnWithContent(newSubValue, subKeyList[j].subkey[i]);
                                            }
                                      }
                                  }

                              }

                            }




                          }else if(typeof(subData) === 'Array'){
                            console.log("@@@ type array value : ", subData);
                            for (var j = 0; j < subKeyList.length; j++) {
                              let subkey = argList[i].subkey[j].key;
                              let subType = argList[i].subkey[j].type;
                              let subValue = subData[subkey];
                                if( subType === "image"){
                                      // console.log("=====================");
                                      templateData.imageTemplate += getImageTemplate(subValue, argList[i].subkey[j]);
                                }else if(subType === "block"){
                                  console.log("333333333333333");

                                      templateData.descTemplate += getBlockTemplate(subValue);
                                }else if(subType === 'newWindow'){
                                  templateData.descTemplate += getNewWindowTemplate(subValue, argList[i].subkey[j]);
                                }
                            }
                          }

                      }




              }
              // console.log("@@@@   templateData:  \n\n", templateData);
              if(payload.style.imgPos === "left"){
                  let tmp = getLeftImagewithDescTemplate(templateData, payload.style);
                  // console.log("left temp template :: \n\n", tmp);
                  if(payload.style.hScroll !== null){
                    template += hScrollBar(tmp);
                  }else{
                    tmp += "<hr>";
                    template += tmp;
                  }
                    // template += getLeftImagewithDescTemplate(templateData, payload.style);
                    // template += hScrollBar(template);
              }else if(payload.style.imgPos === "top"){
                    // template += getTopImagewithDescTemplate(templateData, payload.style);
                    let tmp = getTopImagewithDescTemplate(templateData, payload.style);
                    // console.log("@@ in top : tmp : \n\n", tmp);
                    if(payload.style.hScroll === 'hScroll'){
                      template += hScrollBar(tmp, payload.style.defaults.devider);
                    }else{
                      tmp += "<hr>";
                      template += tmp;
                    }
                    // template += hScrollBar(template);
              }else if(payload.style.imgPos === "right"){
                    // template += getRightImagewithDescTemplate(templateData, payload.style);
                    let tmp = getRightImagewithDescTemplate(templateData, payload.style);
                    if(payload.style.hScroll !== null){
                      template += hScrollBar(tmp);
                    }else{
                      template += tmp;
                    }
                    // template += hScrollBar(template);
              }else if(payload.style.imgPos === "none"){
                    // template += getNoImagewithDescTemplate(templateData, payload.style);
                    let tmp = getNoImagewithDescTemplate(templateData, payload.style);

                    if(payload.style.hScroll !== null){
                      template += hScrollBar(tmp);
                    }else{
                      template += tmp;
                    }
              }


              radioNameCounter++;
      });
      if(payload.emptySlide === 'yes'){
          let extraSlideTemplate = getEmptySlideWithButtonTemplate();
          let tmpExtraSlideTemplate = hScrollBar(extraSlideTemplate);
          template += tmpExtraSlideTemplate;
      }
  }else{
      // console.log("object template arglist :: ", argList);
      let item = payload.data;
      // for(var key in payload.data){
          let templateData = {imageTemplate : '', descTemplate : ''};
          for(let i=0; i<argList.length; i++){
              // console.log("111111111111111111111");

              if(argList[i].subkey === null ){
                  if(argList[i].type === "image"){
                        templateData.imageTemplate = getImageTemplate(item[argList[i].key], argList[i]);
                  }else if(argList[i].type === "block"){
                        if(item[argList[i].key] === undefined || item[argList[i].key] === null){
                          templateData.descTemplate += getBlockTemplate("N/A", argList[i], ellipseWidth);
                        }else{
                          templateData.descTemplate += getBlockTemplate(item[argList[i].key], argList[i], ellipseWidth);
                        }
                  }else if(argList[i].type === "link"){
                          templateData.descTemplate += getLinkTemplate(item[argList[i].key]);
                  }else if(argList[i].type === "radio"){
                      if(typeof(item[argList[i].key]) === 'string'){
                          templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "string", radioNameCounter);
                      }else if(typeof(item[argList[i].key]) === 'object' && Array.isArray(item[argList[i].key])){
                          templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "array", radioNameCounter);
                      }

                  }else if(argList[i].type === 'newWindow'){
                    templateData.descTemplate += getNewWindowTemplate(item[argList[i].key], argList[i]);
                  }else if(argList[i].type === "collapse"){
                      templateData.descTemplate += getCollapseTemplate(item[argList[i].key]);
                  }else if(argList[i].type === "openModalWithContent"){
                    templateData.descTemplate += getOpenModalBtnWithContent(item[argList[i].key], argList[i]);
                  }

              }else{
                  if(!Array.isArray(argList[i].subkey)){
                      let tmpitem = item[argList[i].key];
                      let tmpkey = argList[i].subkey.key;

                      if(Array.isArray(argList[i].subkey.subkey) && argList[i].subkey.subkey.length > 0){
                          let item = tmpitem[tmpkey];
                          console.log("@@ item : ", item);
                          if(typeof(item) === 'object' && !(Array.isArray(item))){
                            let subKeyList = argList[i].subkey.subkey;
                            for (var j = 0; j < subKeyList.length; j++) {
                              // console.log("2222222222222");
                              let subkey = subKeyList[j].key;
                              let subType = subKeyList[j].type;
                              let subValue = item[subkey];
                              // console.log("subkey : ", subkey);
                              // console.log("subType : ", subType);
                              // console.log("subValue : ", subValue);

                                if( subType === "image"){
                                      templateData.imageTemplate += getImageTemplate(subValue, subKeyList[j]);
                                }else if(subType === "block"){
                                      templateData.descTemplate += getBlockTemplate(subValue, subKeyList[j], ellipseWidth);
                                }else if(subType === 'newWindow'){
                                  templateData.descTemplate += getNewWindowTemplate(subValue, subKeyList[j]);
                                }
                            }
                          }else if(typeof(item) === 'object' && (Array.isArray(item))){
                            let subKeyList = argList[i].subkey.subkey;
                            for (var j = 0; j < subKeyList.length; j++) {
                              // console.log("2222222222222");
                              let subkey = subKeyList[j].key;
                              // console.log("$$$ item val : ", item);
                              // console.log("$$$$ key val ", subkey);
                              for(let i=0; i<item.length; i++){
                                  if(Array.isArray(item[i])){
                                      // if array elements are array type

                                  }else if(!Array.isArray(item[i])){
                                    // if array elements are object type
                                    let subkey = subKeyList[j].key;
                                    let subType = subKeyList[j].type;
                                    let subValue = null;

                                    for(let key in item[i]){
                                      let obj = item[i];
                                      if(key === subkey){
                                          subValue = obj[subkey];
                                      }
                                    }

                                      if( subType === "image"){
                                            templateData.imageTemplate += getImageTemplate(subValue, subKeyList[j]);
                                      }else if(subType === "block"){
                                            templateData.descTemplate += getBlockTemplate(subValue, subKeyList[j], ellipseWidth);
                                      }else if(subType === "link"){
                                        templateData.descTemplate += getLinkTemplate(subValue, subKeyList[j]);
                                      }else if(subType === 'newWindow'){
                                        templateData.descTemplate += getNewWindowTemplate(subValue, subKeyList[j]);
                                      }
                                  }else if(typeof(item[i]) === 'string'){
                                    // if array elements are string type

                                  }else if(typeof(item[i]) === 'Number'){
                                    // if array elements are number (integer or float or double ) type

                                  }
                              }


                            }
                          }

                      }
                  }else{

                  }
              }
          }

          if(payload.style.imgPos === "left"){
              let tmp = getLeftImagewithDescTemplate(templateData, payload.style);
              // console.log("left temp template :: \n\n", tmp);
              if(payload.style.hScroll !== null){
                template += hScrollBar(tmp);
              }else{
                tmp += "<hr>";
                template += tmp;
              }
                // template += getLeftImagewithDescTemplate(templateData, payload.style);
                // template += hScrollBar(template);
          }else if(payload.style.imgPos === "top"){
                // template += getTopImagewithDescTemplate(templateData, payload.style);
                let tmp = getTopImagewithDescTemplate(templateData, payload.style);
                // console.log("@@ in top : tmp : \n\n", tmp);
                if(payload.style.hScroll === 'hScroll'){
                  template += hScrollBar(tmp, payload.style.defaults.devider);
                }else{
                  tmp += "<hr>";
                  template += tmp;
                }
                // template += hScrollBar(template);
          }else if(payload.style.imgPos === "right"){
                // template += getRightImagewithDescTemplate(templateData, payload.style);
                let tmp = getRightImagewithDescTemplate(templateData, payload.style);
                if(payload.style.hScroll !== null){
                  template += hScrollBar(tmp);
                }else{
                  template += tmp;
                }
                // template += hScrollBar(template);
          }else if(payload.style.imgPos === "none"){
                // template += getNoImagewithDescTemplate(templateData, payload.style);
                let tmp = getNoImagewithDescTemplate(templateData, payload.style);

                if(payload.style.hScroll !== null){
                  template += hScrollBar(tmp);
                }else{
                  template += tmp;
                }
          }
      // }


  }



    // console.log("Final template : \n\n", template);
    return template;
}


var searchByLocation = function(location, category){
  const searchNearByLocationURL = 'https://places.cit.api.here.com/places/v1/discover/around?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg&at='+location+'&cat='+category;
  console.log("==== calling search by location using here map  ====");
    let searchByLocationPromise = new Promise(function(resolve, reject){
      request.get(searchNearByLocationURL, function(err, res, body){
          if(err){
              console.log("***** error : ", error);
          }
          if(res){
              // console.log("near by location result :: \n\n", res);
              // body = JSON.parse(body)
              resolve(body);
          }
      });
    });
    return searchByLocationPromise;
}

var searchByLocationTemplate = function(data){
    console.log("== call serach by location template ==");
    let template = '';
    data.results.items.forEach(function(item){
    template += `
        <div style="background-color: white;">

              <div class="">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-3" style="">
                        <img src="`+item.icon+`" style="padding-left:15px; padding-top: 8px; " />
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 col-9" style="">
                       <div style="">`+item.title+`</div>
                       <div>`+item.vicinity+`</div>
                           <div>`+item.category.title+`</div>
                    </div>
                </div>
              </div>

          </div>
          <hr>
      `;
  });
    return template;
  }



module.exports.searchByLocation = searchByLocation;
module.exports.searchByLocationTemplate = searchByLocationTemplate;
module.exports.basic_template_generator = basic_template_generator;
