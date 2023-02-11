const Promise = require('promise');const request = require('request');
const category = ['restaurant', 'cinema', 'shopping', 'pharmacy'];
var radioNameCounter = 0;
function getLinkTemplate(link){
    let template = '';
    template = '<div> <a href="'+link+'" target="_blank" style="color: orange;"> click me </a> </div>';
    return template;
}

function getEmptySlideWithButtonTemplate(){
    let template = '';
    let apiName = 'quizApi';
    template += '<div id="quizApi-submitbtn-'+radioNameCounter+'" style="width:200px; height: auto; margin-top: 50px;"><button type="button" class="btn btn-primary" onclick="onClickEmptySlideSubmitBtn(\'' + apiName + '\', \'' + radioNameCounter + '\',)">Submit</button></div>';
    template += '<div id="quizApi-submitbtn-response-'+radioNameCounter+'" style="width:200px; height: auto;"></div>';

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

function getImageTemplate(imageOrIconPath){
  let template = `
  <img src="`+imageOrIconPath+`" style="height: 145px; width: 250px;" />
  `;
  return template;
}

function getBlockTemplate(content, arguments){
  let template = '';
  let customStyles = '';
  if(arguments.prefixValue !== null && typeof(arguments.prefixValue) === 'string' && arguments.prefixValue !== ''){
      // content = '<span style="color:black;">'+arguments.prefixValue+' : </span>' + content ;
      content = arguments.prefixValue+' : '+content;
  }
  if(arguments.style !== undefined && arguments.style.length > 0){
    // console.log("arguments.style : ", arguments.style);
    customStyles = arguments.style;
  }
  if(typeof(content) === 'string' && content.includes("<br/>") && (content.length > 35) && arguments.ellipse !== null){
      content = content.replace("<br/>", " ");
          template = '<div class="one-line-ellipse-hscroll-bar" style="width: 240px; white-space: normal; margin-top: 3px;'+customStyles+'" onclick="onOpenModal(\'' + content + '\')">'+content+'</div>';

  }else{
    template = '<div class="" style=" white-space: normal; margin-top: 3px; '+customStyles+'" onclick="onOpenModal(\'' + content + '\')">'+content+'</div>';
  }
  return template;
}

function hScrollBar(data){
    let template = '';
    template = '<a href="#" style="">'+data+'</a>';
    // console.log("=== in scrollbar fun template val \n\n", template);
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

function getTopImagewithDescTemplate(templateData, style, item){
  // console.log("item.href :: ", item.href);
  item.href = "https://wego.here.com/india/barrackpur/restaurant/badsha--356tunce-c68d8d78a297418da9d2516763ab58a2?map=22.76719,88.38833,15,normal&x=ep";
  let btn = '<button type="button" name="button" onclick="onOpenModal(\''+item.href+'\')">more...</button>';
  let template = `
  <div style="background-color: white; text-align: center; ">
        <div class="">
          <div class="row" style="background-color: white; color: black; padding-top: 10px; padding-bottom: 10px; font-size: 13px;">
              <div class="" style="">
                  `+templateData.imageTemplate+`
              </div>
              <div class="" style="background-color: whitesmoke; padding-top: 10px; padding-bottom: 10px;">
                  `+templateData.descTemplate+`
                  `+btn+`
              </div>
          </div>
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

          <div class="row" style="`+customStyle+`">
              <div class="" style="">
                  `+templateData.descTemplate+`
              </div>
          </div>

  `;
  return template;
}



var image_desc_template = function(payload){
  // console.log("== call image desc template ==");
  let template = '';
  let data = payload.data;
  let argList = payload.argList;

  data.forEach(function(item, itemIndex){
        let templateData = {imageTemplate : '', descTemplate : ''};
            for (var i = 0; i < argList.length; i++) {
                    if(argList[i].subkey === null){
                          if(argList[i].type === "image"){
                                templateData.imageTemplate = getImageTemplate(item[argList[i].key]);
                          }else if(argList[i].type === "block"){
                                if(item[argList[i].key] === undefined || item[argList[i].key] === null){
                                  templateData.descTemplate += getBlockTemplate("N/A", argList[i]);
                                }else{
                                  templateData.descTemplate += getBlockTemplate(item[argList[i].key], argList[i]);
                                }
                          }else if(argList[i].type === "link"){
                                  templateData.descTemplate += getLinkTemplate(item[argList[i].key]);
                          }else if(argList[i].type === "radio"){

                              if(typeof(item[argList[i].key]) === 'string'){
                                  templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "string", radioNameCounter);
                              }else if(typeof(item[argList[i].key]) === 'object' && Array.isArray(item[argList[i].key])){
                                  templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "array", radioNameCounter);
                              }

                          }
                    }else if(argList[i].subkey.length > 0){

                        let subData = item[argList[i].key];
                        let subKeyList = argList[i].subkey;
                        for (var j = 0; j < subKeyList.length; j++) {
                          let subkey = argList[i].subkey[j].key;
                          let subType = argList[i].subkey[j].type;
                          let subValue = subData[subkey];
                            if( subType === "image"){
                                  // console.log("=====================");
                                  templateData.imageTemplate = getImageTemplate(subValue);
                            }else if(subType === "block"){
                                  templateData.descTemplate += getBlockTemplate(subValue);
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
                  let tmp = getTopImagewithDescTemplate(templateData, payload.style, item);
                  // console.log("@@ in top : tmp : \n\n", tmp);
                  if(payload.style.hScroll !== null){
                    template += hScrollBar(tmp);
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


  // var image_desc_template = function(data, argList){
  //   console.log("== call image desc template ==");
  //   let template = '';
  //   console.log("arglist :: ", argList);
  //   data.results.items.forEach(function(item){
  //         let templateData = {imageTemplate : '', descTemplate : ''};
  //         for(key in item){
  //             for (var i = 0; i < argList.length; i++) {
  //                 if(key === argList[i].key){
  //                     if(argList[i].subkey === null){
  //                         if(argList[i].type === "image"){
  //                               templateData.imageTemplate = getImageTemplate(item[key]);
  //                         }else if(argList[i].type === "block"){
  //                               templateData.descTemplate += getBlockTemplate(item[key]);
  //                         }
  //                     }else if(argList[i].subkey.length > 0){
  //                         let subData = item[key];
  //                         let subKeyList = argList[i].subkey;
  //                         for (var j = 0; j < subKeyList.length; j++) {
  //                           let subkey = argList[i].subkey[j].key;
  //                           let subType = argList[i].subkey[j].type;
  //                           let subValue = subData[subkey];
  //                             if( subType === "image"){
  //                                   templateData.imageTemplate = getImageTemplate(subValue);
  //                             }else if(subType === "block"){
  //                                   templateData.descTemplate += getBlockTemplate(subValue);
  //                             }
  //                         }
  //                     }
  //                 }
  //             }
  //         }
  //
  //         template += getLeftImagewithDescTemplate(templateData);
  //     });
  //     return template;
  // }

module.exports.searchByLocation = searchByLocation;
module.exports.searchByLocationTemplate = searchByLocationTemplate;
module.exports.image_desc_template = image_desc_template;
