const Promise = require('promise');const request = require('request');
const category = ['restaurant', 'cinema', 'shopping', 'pharmacy'];
var radioNameCounter = 0;
let collapseIdCounter = 0;

function getNewMethodTemplate(arguments, item){
    console.log("==== call getNewMethodTemplate ====");
    let template = '';
    let method = ``;
    if(arguments.onclick !== undefined){
        method = `onclick="`;
        method += arguments.onclick.methodName+'(';
        let params = arguments.onclick.params;
        // console.log("@@@@ params : ", params);

        if(params.length > 0){
          for (let i = 0; i < params.length; i++) {
              // method += item[params[i]];
              // console.log("item[params[i]] : ", item[params[i]]);
              if(item[params[i]] !== null && item[params[i]] !== undefined && Array.isArray(item[params[i]]) === true){
                let ia = item[params[i]];
                // console.log("======= ia :: ", ia);
                method += `'`+ia[0].toString()+`'`;
                // method += `'`+ia[0].toString()+`'getIframe`;

                method += ',';
              }else{
                method += `'`+item[params[i]].toString()+`'`;
                // method += `'https://www.scorebat.com//embed//g//899757//?s=2'`;

                method += ',';

              }
  //            method += ',';
          }
        }

        // console.log("@@@@ method : ", method);

        if(arguments.onclick.defaults.length > 0){
          for (let i = 0; i < arguments.onclick.defaults.length; i++) {
              method += `'`+arguments.onclick.defaults[i].toString()+`'`;
          }
        }

        // method += ', ';
        // method += arguments.api.toString();
        method += `)"`;

  }else{
    method = '';
  }

  return method;


}

function getLinkTemplate(link, arguments){
    let template = '';
    let text = arguments.text !== '' ? arguments.text : 'Click me';
    // console.log("link : ", link);
    template = '<div> <a href="'+link+'" target="_blank" style="color: orange;">'+text+'</a> </div>';
    return template;
}

function getWebShareTemplate(sharedObj, content){
    let icon = content !== '' ? '<i class="fa fa-share-alt" aria-hidden="true"></i>' : content
    let template = '<button type="button" id="shareBtn" onclick="webShare(\'' + sharedObj.title + '\', \'' + sharedObj.text + '\', \'' + sharedObj.url + '\')">'+icon+'</button>';
    return template;
}

function getEmptySlideWithButtonTemplate(){
    let template = '';
    let apiName = 'quizApi';
    template += '<div id="quizApi-submitbtn-'+radioNameCounter+'" style="width:200px; height: auto; margin-top: 50px; margin-left: 109px;"><button type="button" class="btn btn-primary" onclick="onClickEmptySlideSubmitBtn(\'' + apiName + '\', \'' + radioNameCounter + '\')">Submit</button></div>';
    template += '<div id="quizApi-submitbtn-response-'+radioNameCounter+'" style="width:200px; height: auto;"></div>';

    return template;
}

function getEmptySlideWithDescriptionTemplate(param){
  let template = '';
  let method = 'onclick="onClickSideMenu(\'' + param.action + '\')"';

  template += `
  <div style="height: 100%;">
      <div id="" style="width:200px; height: auto; margin-top: 40%; margin-left: 50%;`+param.style+`">
          <button type="button" class="btn" `+method+` style="width: 50px;height: 50px;border-radius: 50%;box-shadow: 1px 1px 4px 1px dimgrey;">
          <span class="glyphicon glyphicon-arrow-right" style="color: #607D8B; font-size: 20px; "></span>
          </button>
          <span style="display: block; color: #607D8B; margin-top: 5px;">`+param.name+`</span>
      </div>
  </div>`;


  return template;
}

function getCollapseTemplate(content, agrlist){
  let template = '';
  template += `
  <div id="collapse-`+radioNameCounter+`" class="collapse" style="white-space: normal;">
    `+content+`
  </div>
  <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#collapse-`+radioNameCounter+`">Simple collapsible</button>
  `
  return template;
}

function getCollapseGroupTemplate(item, arglist, collapseOpenView){
  // console.log("=== calling collapse group template fun ===");
  // color: darkolivegreen : cadetblue
  // <div><span class="glyphicon glyphicon-menu-down"></span></div>

  let collapseName = item.collapseName;
  let collapseData = item.collapseData;
  let collapseInAttr = '';
  let tmpCollapseBodyTemplate = '';
  let collapsePanelScrollId = '';
  let customCollapseNameStyle = '';
  let panelHeadingStyle = "border: none; border-radius: 0px;";
  for(let i in collapseData){
      let collapseBodyTemplate = '';
      let collapseBodyData = collapseData[i];
      collapseBodyTemplate += '<span style="position: absolute; right: 30px;">Confirmed : '+collapseBodyData["confirmed"]+'</span>';
      let finalCollapseTemplate = '<span style="color: black; font-weight: 700; margin-left: 16px;">'+i+'</span>';
      finalCollapseTemplate += collapseBodyTemplate;
      tmpCollapseBodyTemplate += `<li class="list-group-item">`+finalCollapseTemplate+`</li>`;
  }
  if(collapseOpenView === 'yes' ) {
      collapseInAttr += 'in';
      panelHeadingStyle += 'background-color: maroon;';
  }else if(item.collapseName === "West Bengal"){
      collapseInAttr += 'in';
      panelHeadingStyle += 'background-color: #FFFDB8;';
      customCollapseNameStyle += "background-color: #FFFDB8; color: black; "
  }else {
      collapseInAttr += '';
  }
  let template = `
          <div class="panel panel-default" style="margin-bottom: 0px;">
            <div class="panel-heading" style="padding: 0px 0px;`+panelHeadingStyle+`">
              <h4 class="panel-title" style="text-align: center;">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse`+collapseIdCounter+`">
                    <div class="panel-title" style="padding: 16px 90px; font-size: 18px; font-weight: 700; color: grey; `+customCollapseNameStyle+`">`+collapseName+`</div>
                </a>
              </h4>
            </div>
            <div id="collapse`+collapseIdCounter+`" class="panel-collapse collapse `+collapseInAttr+`">
              <ul class="list-group" style="margin-left: -1px;">
              `+tmpCollapseBodyTemplate+`
            </ul>
          </div>
        </div>
    `;

collapseIdCounter += 1;
return template;
}

function getListTemplate(item, arglist, collapseOpenView){
  console.log("===== calling get list template  ======");
  console.log("item : ", item);
  console.log("arglist : ", arglist);
  console.log("collapseOpenView : ", collapseOpenView);


}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function getOpenModalBtnWithContent(content, arguments, sharedObj){
  // console.log("0000000000000000000000000000");
    let template = '';
    let shredIcon = '';
    if(arguments.appendKey !== null){
        content = arguments.appendKey+content;
    }
    // console.log("###shared obj : ", sharedObj);
    if(!isEmpty(sharedObj) && arguments.shareBtn !== undefined) {
          // Object is empty (Would return true in this example)
          let tempSharedObj = {};
          tempSharedObj.title = arguments.shareBtn.title !== '' ? arguments.shareBtn.title : sharedObj.title;
          tempSharedObj.text = arguments.shareBtn.text !== '' ? arguments.shareBtn.text : sharedObj.text;
          tempSharedObj.url = arguments.shareBtn.url !== '' ? arguments.shareBtn.url : sharedObj.url;
          if(tempSharedObj.title.includes("'")){
            let escapeChar = new RegExp("'", 'g');
            tempSharedObj.title = tempSharedObj.title.replace(escapeChar, '');
          }
          if(tempSharedObj.text.includes("'")){
            let escapeChar = new RegExp("'", 'g');
            tempSharedObj.text = tempSharedObj.text.replace(escapeChar, '');
          }
          shredIcon = '<i class="fa fa-share-alt" aria-hidden="true" style="float: right; padding-top: 3px; width: 10%; font-size: 24px; color: teal;" onclick="webShare(\'' + tempSharedObj.title + '\', \'' + tempSharedObj.text + '\', \'' + tempSharedObj.url + '\')"></i>'
          // let sharedObj = {title : arguments.shareBtn.title, text : arguments.shareBtn.text, url : arguments.shareBtn.url}
      }
    // console.log("### shredIcon : ", shredIcon);
    if(sharedObj !== undefined && sharedObj !== null && (arguments.shareBtn !== null || arguments.shareBtn !== undefined) && shredIcon !== ''){

      template = '<div style=""><button type="button" class="btn btn-success" style="background-color: teal; color: white; width: 85%; border-radius: 0px; border: none; '+arguments.style+'" name="button" onclick="onOpenModal(\''+content+'\', \''+arguments.type+'\', \''+arguments.api+'\')">'+arguments.btnName+'</button>'+shredIcon+'</div>';
    }else{
      // console.log("!!! shredIcon : ", shredIcon);
      template = '<div style=""><button type="button" class="btn btn-success" style="background-color: teal; color: white; width: 100%; border-radius: 0px; border: none; '+arguments.style+'" name="button" onclick="onOpenModal(\''+content+'\', \''+arguments.type+'\', \''+arguments.api+'\')">'+arguments.btnName+'</button></div>';
    }
    return template;
}

function getEmbededTemplate(embededHTML, arguments){
    // console.log("==== embed url : ", embedUrl);
    let template = '';
      template += '<div>'+embededHTML+'</div>';

    return template;
}

function getIframeTemplate(embedUrl, arguments){
    // console.log("==== embed url : ", embedUrl);
    let template = '';
      template += '<iframe width="300" height="200" style="'+arguments.style+'" src="'+embedUrl+'"></iframe>'

    return template;
}

function getRadioTemplate(itemIndex, data, type, radioNameCounter){
    let template = '';
    let obj = {name : 'rajib', add: 'bkp kolkata '};
    let api = "quizApi";
    if(type === 'string'){
      if(data.includes("'")){
        var r = new RegExp("'", 'g');
        data = data.replace(r, '');
      }
      template += '<div class="radio">';
      template += '<label  id="radioLabel-'+data+'" style="white-space: normal; "><input type="radio" name="radioName-'+radioNameCounter+'" value="'+data+'" style="white-space: normal; " onclick="onclickRadioBtn(\'' + api + '\',\'' + itemIndex + '\',\'' + data + '\')">'+data+'</label>';
      template += '</div>';
    }else if(type === 'array'){
        for (var i = 0; i < data.length; i++) {
          if(data[i].includes("'")){
            var r = new RegExp("'", 'g');
            data[i] = data[i].replace(r, '');
          }
          template += '<div class="radio">';
          template += '<label id="radioLabel-'+data[i]+'" style="white-space: normal; "><input type="radio" name="radioName-'+radioNameCounter+'" value="'+data[i]+'" style="white-space: normal;"  onclick="onclickRadioBtn(\'' + api + '\',\'' + itemIndex + '\',\'' + data[i] + '\')">'+data[i]+'</label>';
          template += '</div>';
        }
    }

    // console.log("#### before return from radio :: ", template);
    return template;
}

function getButtonTemplate(arguments, item){
  // console.log("===================== getButtonTemplate =======================");
  // console.log("arguments : ", arguments);
  // console.log("ite :: ", item);
  let template = '';
  let method = `onclick="`;
  if(arguments.onclick !== undefined){
      method += arguments.onclick.methodName+'(';
      let params = arguments.onclick.params;
      // console.log("@@@@ params : ", params);

      if(params.length > 0){
        for (let i = 0; i < params.length; i++) {
            // method += item[params[i]];
            // console.log("item[params[i]] : ", item[params[i]]);
            if(item[params[i]] !== null && item[params[i]] !== undefined && Array.isArray(item[params[i]]) === true){
              let ia = item[params[i]];
              // console.log("======= ia :: ", ia);
              method += `'`+ia[0].toString()+`'`;
              // method += `'`+ia[0].toString()+`'getIframe`;

              method += ',';
            }else{
              method += `'`+item[params[i]].toString()+`'`;
              // method += `'https://www.scorebat.com//embed//g//899757//?s=2'`;

              method += ',';

            }
//            method += ',';
        }
      }

      // console.log("@@@@ method : ", method);

      if(arguments.onclick.defaults.length > 0){
        for (let i = 0; i < arguments.onclick.defaults.length; i++) {
            method += `'`+arguments.onclick.defaults[i].toString()+`'`;
        }
      }

      // method += ', ';
      // method += arguments.api.toString();
      method += `)"`;
      // console.log("method : ", method);

      template = `
        <button type="button" class="btn btn-default" style="width: 100%;`+arguments.style+`"  `+method+`>`+arguments.btnName+`</button>
      `;
  }


  return template;
}

function getAudioTeplate(audioUrl, arguments){
    console.log("==========  getArchiveMediatypeTeplate  ===========");
    // console.log("item : ", item);
    // console.log("arguments : ", arguments);
    let template = ``;

    template = `
      <audio controls>
        <source src="`+audioUrl+`" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    `;
    return template;
}

function getArchiveMediatypeTeplate(item, arguments){
    console.log("==========  getArchiveMediatypeTeplate  ===========");
    // console.log("item : ", item);
    // console.log("arguments : ", arguments);
    let template = '';
    let identifier = '';

    if(item.mediatype === "audio"){
      identifier = item.identifier;
      template = `
        <iframe src="https://archive.org/embed/`+identifier+`" width="350" height="300" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
      `;
    }else if(item.mediatype === "movies"){
      identifier = item.identifier;
      template = `
        <div>
          <iframe src="https://archive.org/embed/`+identifier+`" width="350" height="300" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe>
        </div>
      `;
    }
    return template;
}

function getImageTemplate(imageOrIconPath, arguments, item){
   // console.log("arguments : ", arguments);

   // console.log("item : ", item);
   // console.log("item : ", item);

  let template = '';
  let method = `onclick="`;
  if(arguments.onclick !== undefined){
      method += arguments.onclick.methodName+'(';
      let params = arguments.onclick.params;
      // console.log("@@@@ params : ", params);

      if(params.length > 0){
        for (let i = 0; i < params.length; i++) {
            // method += item[params[i]];
            // console.log("item[params[i]] : ", item[params[i]]);
            if(item[params[i]] !== null && item[params[i]] !== undefined && Array.isArray(item[params[i]]) === true){
              let ia = item[params[i]];
              // console.log("======= ia :: ", ia);
              method += `'`+ia[0].toString()+`'`;
              // method += `'`+ia[0].toString()+`'getIframe`;

              method += ',';
            }else{
              method += `'`+item[params[i]].toString()+`'`;
              // method += `'https://www.scorebat.com//embed//g//899757//?s=2'`;

              method += ',';

            }
//            method += ',';
        }
      }

      // console.log("@@@@ method : ", method);//////////////

      if(arguments.onclick.defaults.length > 0){
        for (let i = 0; i < arguments.onclick.defaults.length; i++) {
            method += `'`+arguments.onclick.defaults[i].toString()+`'`;
        }
      }

      // method += ', ';
      // method += arguments.api.toString();
      method += `)"`;
      // console.log("method : ", method);
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@  image @@@@@@@@@@@@@@@@@@@@@@@@");

      template = `
        <img src="`+imageOrIconPath+`" style="width: 100%;`+arguments.style+`" `+method+`  />
      `;
  }else{
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@  image @@@@@@@@@@@@@@@@@@@@@@@@");
    // console.log("imageOrIconPath : ", imageOrIconPath);

    template = `
      <img src="`+imageOrIconPath+`" style="width: 100%;`+arguments.style+`" />
    `;
  }
  // console.log("######## image  template :: ", template);

  return template;
}

let products = '<audio controls> <source src="https://api.radio.walzr.com/http%3A%2F%2Fwsrss.bbc.co.uk%2Fbizdev%2Fbbcminute%2Fbbcminute.rss"></audio>';

function getNewWindowTemplate(url, arguments, sharedObj){
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // console.log("url : ", url);

    let template = '';
    let text = arguments.text !== '' ? arguments.text : 'Track location';

    var x = (!isEmpty(sharedObj) && sharedObj !== undefined && sharedObj !== null && (arguments.shareBtn !== null || arguments.shareBtn !== undefined));
    // console.log("+++++++++++++ x : ", x);
    if(!isEmpty(sharedObj) && sharedObj !== undefined && sharedObj !== null && (arguments.shareBtn !== null || arguments.shareBtn !== undefined)){
      let shredIcon = '';
      // if(arguments.appendKey !== null){
      //     content = arguments.appendKey+content;
      // }

      // if(!isEmpty(sharedObj) && (sharedObj.title !== undefined && sharedObj.text !== undefined && sharedObj.url !== undefined) && arguments.shareBtn !== undefined) {
            // Object is empty (Would return true in this example)
            // console.log("firsttttttttttttttttttttttttttttttttt");
            let tempSharedObj = {};
            tempSharedObj.title = arguments.shareBtn.title !== '' ? arguments.shareBtn.title : sharedObj.title;
            tempSharedObj.text = arguments.shareBtn.text !== '' ? arguments.shareBtn.text : sharedObj.text;
            tempSharedObj.url = arguments.shareBtn.url !== '' ? arguments.shareBtn.url : sharedObj.url;
            // console.log("secondddddddddddddddddddddddddddddddddddddddd");

            if(tempSharedObj.title.includes("'")){
              var r = new RegExp("'", 'g');
              tempSharedObj.title = tempSharedObj.title.replace(r, '');
            }
            if(tempSharedObj.text.includes("'")){
              var r = new RegExp("'", 'g');
              tempSharedObj.text = tempSharedObj.text.replace(r, '');
            }
            shredIcon = '<i class="fa fa-share-alt" aria-hidden="true" style="float: right; padding-top: 3px; width: 10%; margin-top: 10px; font-size: 24px; color: teal;" onclick="webShare(\'' + tempSharedObj.title + '\', \'' + tempSharedObj.text + '\', \'' + tempSharedObj.url + '\')"></i>'
            // let sharedObj = {title : arguments.shareBtn.title, text : arguments.shareBtn.text, url : arguments.shareBtn.url}
        // }
      // let sharedObj = {title : arguments.shareBtn.title, text : arguments.shareBtn.text, url : arguments.shareBtn.url}
      template = '<div style=""><button type="button" class="btn btn-success" style="background-color: teal; color: white; width: 85%; border-radius: 0px; border: none; '+arguments.style+'" name="button" onclick="onOpenModal(\''+url+'\', \''+arguments.type+'\')">'+text+'</button>'+shredIcon+'</div>';
    }else{
      template = '<div style=""><button type="button" class="btn btn-success" style="background-color: teal; color: white; width: 100%; border-radius: 0px; border: none; '+arguments.style+'" name="button" onclick="onOpenModal(\''+url+'\', \''+arguments.type+'\')">'+text+'</button></div>';
    }

      // console.log("************************************************\n template : \n", template);
      return template;
}

function getCustomIconTemplate(value, argList){
    // console.log("======== call getCustomIconTemplate =========");
    // console.log("=== value : ", value);
    // console.log("=== argList : ", argList);
    let template = '';
    let method = '';
    let content = '';
    if(value.indexOf(".com") !== -1){
        content = 'https://www.'+value.toLowerCase();
        method += 'onclick="onOpenModal(\'' + content + '\', \'' +'newWindow'+ '\')"';
        // console.log("@@@@@@@@@@ method : ", method);
    }else{
        content = 'https://www.'+content.toLowerCase()+'.com';
        method += 'onclick="onOpenModal(\'' + content + '\', \'' +'newWindow'+ '\')"';

    }
    let cutOffChar = value.substr(0,3).toUpperCase();
    // let method = getNewMethodTemplate(argList, item);
    // console.log("===  method : ", method);
    template += '<div '+method+' style="width: 30px; height: 30px; border-radius: 50%; background-color: blue; color: white; '+argList.style+'">'+cutOffChar+'</div>';
    // template += '<a href='+value.url+' style="width: 30px; height: 30px; border-radius: 50%; background-color: blue; color: white; '+argList.style+'">'+cutOffChar+'</a>';
    return template;
}

function getTextToSpeechIconTemplate(value, argList){
    // console.log("======== call getTextToSpeechIconTemplate =========");
    // console.log("@@@ value : ", value);
    // console.log("=== argList : ", argList);
    let template = '';
    let method = '';
    let content = '';
    let dynId = '';
    value = value.replace(/'/g, " ");
    dynId = value.replace(/\s/g, '');
    dynId = dynId.replace(/-/g, '');
    dynId = dynId.replace(/,/g, '');

    method += 'onclick="onOpenModal(\'' + value + '\', \'' +'textToSpeech'+ '\'); return false;"';
    template += '<span id="play:'+dynId+'" '+method+' style="font-size: 20px; display: block;'+argList.style+'" class="glyphicon glyphicon-play"></span>';
    // template += '<span id="pause:'+dynId+'" style="font-size: 20px; float: right; position: relative; top: 20px;" onclick="onOpenModal(\'' + dynId + '\', \'' +'textToPause'+ '\'); return false;" class="glyphicon glyphicon-pause"></span>';

    return template;
}

function getCustomThreeDotsTemplate(argList){
    // console.log("======== call getCustomThreeDotsTemplate =========");
    // console.log("=== argList : ", argList);
    let template = '';
    template += '<div onclick="onOpenThreeDotsActionModal()" style="float: right; color: grey; '+argList.style+'" >...</div>';
    return template;
}

// function getTemplateByInnerHtml(content, arguments){
//     console.log("%%%arguments: ", arguments);
//     console.log("%%%content: ", content);
//     let template = '';
//     template += '<div onclick="onOpenThreeDotsActionModal()" style="float: right; color: grey; '+argList.style+'" >...</div>';
//     return template;
//
// }

function getBlockTemplate(content, arguments, ellipseWidth, item){
  // console.log("?????????????????????????????????????????????????????????????");
  // console.log("=========== calling get block template ============");
  // console.log("content : ", content);
  // console.log("arguments.prefixValue : ", arguments.prefixValue);
  // console.log("arguments.postfixValue : ", arguments.postfixValue);
  let template = '';
  let customStyles = '';
  let api = '';
  let method = '';
  let opeWindowUrl = '';
  let customIconTemplate = '';
  let prefixTemplate = '';
  let postfixTemplate = '';
  let preBlockTemplate = '';
  let postBlockTemplate = '';
  if((arguments.customIcon !== null || arguments.customIcon !== undefined) ){
      if(arguments.customIcon === "up-arrow red"){
        customIconTemplate += '<span style="color: red; font-size: 14px; margin-left: 10px; " class="glyphicon glyphicon-arrow-up"></span>';
      }else if(arguments.customIcon === "up-arrow green"){
        customIconTemplate += '<span style="color: green; font-size: 14px; margin-left: 10px; " class="glyphicon glyphicon-arrow-up"></span>';
      }else if(arguments.customIcon === "up-arrow yellow"){
        customIconTemplate += '<span style="color: yellow; font-size: 14px; margin-left: 10px; " class="glyphicon glyphicon-arrow-up"></span>';
      }
  }
  if(content === null || content === undefined || content === ''){
      content = "unknown"
  }
  if(arguments.api !== undefined){
      api = arguments.api;
  }

  if(arguments.style !== undefined && arguments.style.length > 0){
    customStyles = arguments.style;
  }

  if(arguments.onclick !== undefined && arguments.onclick !== null){
        opeWindowUrl = 'https://www.'+content+'';
        method += 'onclick="onOpenModal(\'' + opeWindowUrl + '\', \'' +'newWindow'+ '\')"';
  }else if(arguments.onclick === undefined || arguments.onclick === null){
      if(arguments.api === "NEWSAPI:newsBySource"){
          method += 'onclick="getNewsByCustomFilter(\'' + content + '\', \'' +arguments.api+ '\')"';
      }else if(arguments.api === "COVID19:india_testing_report"){
          method += 'onclick="onOpenModal(\'' + content + '\',\'' +'open_pdf_in_modal'+ '\')"';
      }
  }

  if(arguments.prefixValue !== null && typeof(arguments.prefixValue) === 'string' && arguments.prefixValue !== ''){
      prefixTemplate = ' '+arguments.prefixValue+' ';
  }
  if(arguments.postfixValue !== null && arguments.postfixValue !== '' && arguments.postfixValue !== undefined){
        postfixTemplate = ' '+arguments.postfixValue+' ';
  }

  if(typeof(content) === 'string' && (content.length > 25)){
      if(content.includes("<br/>")){
        content = content.replace("<br/>", " ");
      }
      if(arguments.ellipse === 'one line'){
        content = content.replace( /(<([^>]+)>)/ig, ' ');
        template += '<div class="ellipse " '+method+' style="width: '+ellipseWidth+'; white-space: nowrap; ;'+customStyles+'" onclick="onOpenModal(\'' + content + '\', \'' +'type_text'+ '\')">'+prefixTemplate+' '+content+' '+postfixTemplate+' '+customIconTemplate+'</div>';
        template += '<div class="tooltip">'+content+'</div>';
      }else if(arguments.ellipse === 'none'){
        if(arguments.api === "wikipedia_search"){
          template += '<div class="  " '+method+' style=" white-space: normal; '+customStyles+'" >'+prefixTemplate+' '+content+' '+postfixTemplate+' '+customIconTemplate+'</div>';

        }else{
          // let contentTemplate = '<span>'+content+'</span>';
          template += '<div class="  " '+method+' style=" white-space: normal; '+customStyles+'" onclick="onOpenModal(\'' + content + '\', \'' + 'type_text' + '\')">'+prefixTemplate+''+content+' '+customIconTemplate+' </div>';

        }
      }
  }else{
    template += '<div class="" '+method+' style=" white-space: normal; '+customStyles+'" >'+prefixTemplate+' '+content+' '+postfixTemplate+' '+customIconTemplate+'</div>';
  }

  // console.log("template : ", template);
  if((arguments.preBlockTemplate !== null && arguments.preBlockTemplate !== undefined && arguments.preBlockTemplate !== "") && (content !== null && content !== undefined && content !== '')){
      // console.log("===========================  PRE BLOCK TEMPLATE ==========================");
      // template = arguments.preBlockTemplate.template+' '+template;
      // console.log("arguments.preBlockTemplate : ", arguments.preBlockTemplate);
      // console.log("arguments.preBlockTemplate type: ", typeof(arguments.preBlockTemplate));
      // console.log("arguments : ", arguments);
      // console.log("### content : ", content);
      // console.log("@@@ content : ", content);

      template = '<div>'+arguments.preBlockTemplate.template +''+template+'</div>';
      // console.log("template ## \n", template);
  }
  if((arguments.postBlockTemplate !== null && arguments.postBlockTemplate !== undefined && arguments.preBlockTemplate !== "") && (content !== null && content !== undefined && content !== '')){
      // template = template + '' + arguments.postBlockTemplate;
      console.log("===========================  POST BLOCK TEMPLATE ==========================");
      console.log("### content : ", content);
      template = '<div>'+ template + '' + arguments.postBlockTemplate.template +'</div>';

  }
  // console.log("template : \n\n", template);
  return template;
}

function hScrollBar(data, devider){
    let template = '';
      template = '<a href="#" onclick="return false;" style=""><div style="border-right: '+devider+';">'+data+'</div></a>';
    return template;
}

function getLeftImagewithDescTemplate(templateData, style){
  let customStyle = '';
  let descriptionTemplateStyle = '';
  let imageTemplateStyle = '';
  if(style.defaults.descriptionTemplateStyle !== undefined && style.defaults.descriptionTemplateStyle !== null){
      descriptionTemplateStyle = style.defaults.descriptionTemplateStyle;
  }
  if(style.defaults.imageTemplateStyle !== undefined && style.defaults.imageTemplateStyle !== null){
      imageTemplateStyle = style.defaults.imageTemplateStyle;
  }
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
          customStyle += 'border-right: '+style.defaults.borderRight+';';
      }else if(key === 'borderBottom'){
          customStyle += 'border-bottom: '+style.defaults.borderBottom+';';
      }else if(key === 'style'){
          customStyle += ''+style.defaults.style+';';
      }else{
          customStyle += key+' : '+style.defaults[key]+';';
      }
  }

  let template = `
  <div style="">
        <div class="">
          <div class="row" style="`+customStyle+`">
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-5" style="padding-left: 0px; padding-right: 0px; `+imageTemplateStyle+`">
                  `+templateData.imageTemplate+`
              </div>
              <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 col-7" style="padding:1rem; `+descriptionTemplateStyle+`">
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
  let descriptionTemplateStyle = '';
  if(style.defaults.descriptionTemplateStyle !== undefined){
      descriptionTemplateStyle = style.defaults.descriptionTemplateStyle;
  }
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
      }else if(key === "borderRadius"){
          let borderRadius = style.borderRadius !== null ? style.borderRadius : style.defaults.borderRadius;
          customStyle += 'border-radius : '+borderRadius+';';

      }else if(key === "marginBottom"){
          let marginBottom = style.marginBottom !== null ? style.marginBottom : style.defaults.marginBottom;
          customStyle += 'margin-bottom : '+marginBottom+';';

      }else if(key === 'borderBottom'){
          customStyle += 'border-bottom: '+style.defaults.borderBottom+';';
      }else if(key === 'style'){
          customStyle += ''+style.defaults.style+';';
      }else{
          customStyle += key+' : '+style.defaults[key]+';';
      }
  }
  let template = `

      <div class="row" style="`+customStyle+`">
          <div class="" style="">
              `+templateData.imageTemplate+`
          </div>
          <div class="" style="padding:1rem; `+descriptionTemplateStyle+`">
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
          <div class="row" style="padding-top: 5px; padding-bottom: 5px; font-size: 13px; padding-left: 25px; margin-bottom: 5px; padding-top: 10px;">
              <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 col-7" style="">
                  `+templateData.descTemplate+`
              </div>
              <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-5" style=" padding-left: 0px; ">
                  `+templateData.imageTemplate+`
              </div>
          </div>
        </div>
    </div>
  `;
  return template;
}

function getNoImagewithDescTemplate(item, templateData, style){
  // console.log("@@@ item :: ", item);
  // console.log("@@@ item.descriptionTemplateBgColor : ", item.descriptionTemplateBgColor);

  let customStyle = '';
  let descriptionTemplateStyle = '';

  if(style.defaults.descriptionTemplateStyle !== undefined){
      descriptionTemplateStyle = style.defaults.descriptionTemplateStyle;
  }
  if(item.descriptionTemplateBgColor !== null && item.descriptionTemplateBgColor !== undefined){
      descriptionTemplateStyle += 'background-color: '+item.descriptionTemplateBgColor;
  }
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
      }else if(key === 'borderBottom'){
          customStyle += 'border-bottom: '+style.defaults.borderBottom+';';
      }else if(key === 'style'){
          customStyle += ''+style.defaults.style+';';
      }else{
          customStyle += key+' : '+style.defaults[key]+';';
      }
  }
  let template = `

          <div class="" style="`+customStyle+` `+descriptionTemplateStyle+`">
              <div class="" style="">
                  `+templateData.descTemplate+`
              </div>
          </div>

  `;
  return template;
}

function getOpenUrlInTabTemplate(arguments, item){
  // console.log("======== calling get open url in new tab  ========");
  let template = '';
  let style = '';
  let url = 'www.google.com';
  let urlText = '';
  let method = '';
  if((item.url !== null || item.url !== undefined) && (item.openUrlInTabText !== null || item.openUrlInTabText !== undefined)){
      url = item.url;
      urlText = item.openUrlInTabText;
  }
  style += arguments.style;
  method += 'onclick="onOpenModal(\'' + url + '\', \'' +'newWindow'+ '\')"';
  template += '<div class="  " '+method+' style=" white-space: normal; margin-top: 3px;'+style+'" >'+urlText+'</div>';
  return template;
}

var basic_template_generator = function(payload){
  // console.log("\n\n********************************************************************************************\n\n");
  let template = '';
  let data = payload.data;
  let argList = payload.argList;
  let ellipseWidth = payload.style.defaults.ellipseWidth;
  if(Array.isArray(payload.data)){
    data.forEach(function(item, itemIndex){
          // console.log("item :: ", item);
          let sharedObj = {};
          let templateData = {imageTemplate : '', descTemplate : ''};
              for (var i = 0; i < argList.length; i++) {
                      if(argList[i].subkey === null){


                            if(argList[i].sharedObj !== undefined){
                                // ============== CREATE THE SHARED OBJECT FOR THE WEB SHARE API =================
                                sharedObj[argList[i].sharedObj] = item[argList[i].key];
                            }

                            if(argList[i].type === "image"){
                                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                                    templateData.imageTemplate = getImageTemplate(item[argList[i].key], argList[i], item);

                            }else if(argList[i].type === "block"){

                                  if(item[argList[i].key] === undefined || item[argList[i].key] === null){
                                    templateData.descTemplate += getBlockTemplate("N/A", argList[i], ellipseWidth, item);
                                  }else{
                                    templateData.descTemplate += getBlockTemplate(item[argList[i].key], argList[i], ellipseWidth, item);
                                  }
                            }else if(argList[i].type === "link"){
                                    templateData.descTemplate += getLinkTemplate(item[argList[i].key]);
                            }else if(argList[i].type === "button"){
                                    templateData.descTemplate += getButtonTemplate(argList[i], item);
                            }else if(argList[i].type === "openUrlInNewTab"){
                                    templateData.descTemplate += getOpenUrlInTabTemplate(argList[i], item);
                            }else if(argList[i].type === "customIcon"){
                                    // console.log("===== call customIcon ====");
                                    // console.log("===== item : ", item);/
                                    templateData.descTemplate += getCustomIconTemplate(item[argList[i].key], argList[i]);
                            }else if(argList[i].type === "textToSpeech"){
                                    // console.log("===== call customIcon ====");
                                    // console.log("===== item : ", item);/
                                    templateData.descTemplate += getTextToSpeechIconTemplate(item[argList[i].key], argList[i]);
                            }else if(argList[i].type === "customThreeDots"){
                                    templateData.descTemplate += getCustomThreeDotsTemplate(argList[i]);
                            }else if(argList[i].type === "iFrame"){
                                    templateData.descTemplate += getIframeTemplate(item[argList[i].key], argList[i]);
                            }else if(argList[i].type === "archive_mediatype"){
                                    console.log("#####################################################");
                                    templateData.descTemplate += getArchiveMediatypeTeplate(item, argList[i]);
                            }else if(argList[i].type === "audio"){
                                    console.log("#####################################################");
                                    templateData.descTemplate += getAudioTeplate(item[argList[i].key], argList[i]);

                            }else if(argList[i].type === "embededHTML"){
                                    templateData.descTemplate += getEmbededTemplate(item[argList[i].key], argList[i]);
                            }else if(argList[i].type === "radio"){

                                if(typeof(item[argList[i].key]) === 'string'){
                                    templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "string", radioNameCounter);
                                }else if(typeof(item[argList[i].key]) === 'object' && Array.isArray(item[argList[i].key])){
                                    templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "array", radioNameCounter);
                                }

                            }else if(argList[i].type === 'newWindow'){
                              if(argList[i].shareBtn !== undefined || argList[i].shareBtn !== null){
                                templateData.descTemplate += getNewWindowTemplate(item[argList[i].key], argList[i], sharedObj);
                              }else{
                                templateData.descTemplate += getNewWindowTemplate(item[argList[i].key], argList[i], null);
                              }
                            }else if(argList[i].type === "collapse"){
                                templateData.descTemplate += getCollapseTemplate(item[argList[i].key], argList[i]);
                            }else if(argList[i].type === "collapse-group"){
                                templateData.descTemplate += getCollapseGroupTemplate(item, argList[i], payload.collapseOpenView);
                            }else if(argList[i].type === "openModalWithContent"){
                              templateData.descTemplate += getOpenModalBtnWithContent(item[argList[i].key], argList[i], sharedObj);
                            }

                            // else if(argList[i].type === "list"){
                            //     templateData.descTemplate += getListTemplate(item, argList[i]);
                            // }
                      }else if(argList[i].subkey.length > 0){
                          let subData = item[argList[i].key];
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
                                    // console.log("33333333333333333333333");

                                        templateData.descTemplate += getBlockTemplate(subValue, argList[i].subkey[j], ellipseWidth);
                                  }else if(subType === "customIcon"){
                                    // console.log("===== call customIcon ====");
                                    // console.log("===== item : ", item);//////

                                          templateData.descTemplate += getCustomIconTemplate(subValue, argList[i].subkey[j]);
                                  }else if(argList[i].type === "textToSpeech"){
                                          // console.log("===== call customIcon ====");
                                          // console.log("===== item : ", item);/
                                          templateData.descTemplate += getTextToSpeechIconTemplate(item[argList[i].key], argList[i]);
                                  }else if(subType === "customThreeDots"){
                                    console.log("===== 222 call customIcon ====");
                                          templateData.descTemplate += getCustomThreeDotsTemplate(subValue, argList[i].subkey[j]);
                                  }else if(subType === "link"){
                                    // console.log("222222222222222222222222222222222222222");

                                          templateData.descTemplate += getLinkTemplate(subValue, argList[i].subkey[j]);
                                  }else if(subType === "iFrame"){
                                          templateData.descTemplate += getIframeTemplate(subValue, argList[i].subkey[j]);
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

                                  // console.log("============ not null else block is calling  =============");
                                  // if(subKeyList[j].sharedObj !== undefined){
                                  //     // ============== CREATE THE SHARED OBJECT FOR THE WEB SHARE API =================
                                  //     sharedObj[argList[i].subkey[j].sharedObj] = item[argList[i].subkey[j].sharedObj];
                                  //     // console.log("22222222222222222 sharedObj : ", sharedObj);
                                  // }
                                  let newSubData = subData[subKeyList[j].key];
                                  // console.log("$$$ new sub data : ", newSubData);
                                  // console.log("$$$ new sub data type of : ", typeof(newSubData));
                                  // console.log("Array.isArray(newSubData) : ", Array.isArray(newSubData));
                                  if(typeof(newSubData) === 'string'){
                                      // console.log("@@@ value : ", newSubData);
                                      // console.log("@@@ subData[subKeyList[j] : ", subKeyList[j]);
                                      let newSubType = subKeyList[j].type;
                                      // console.log("@@@ newSubType: ", newSubType);

                                      if( newSubType === "image"){

                                            templateData.imageTemplate += getImageTemplate(newSubData, subKeyList[j]);
                                      }else if(newSubType === "block"){

                                        // console.log("222 key : ",subData[subKeyList[j].key]);
                                        // console.log("222 val : ",newSubData);
                                            templateData.descTemplate += getBlockTemplate(newSubData, subKeyList[j], ellipseWidth);
                                      }else if(newSubType === "link"){
                                        // console.log("3333333333333333333333333333333333");

                                              templateData.descTemplate += getLinkTemplate(newSubData, subKeyList[j]);
                                      }else if(newSubType === "radio"){

                                          if(typeof(item[argList[i].key]) === 'string'){
                                              templateData.descTemplate += getRadioTemplate(newSubData, subKeyList[j], "string", radioNameCounter);
                                          }else if(typeof(item[argList[i].key]) === 'object' && Array.isArray(item[argList[i].key])){
                                              templateData.descTemplate += getRadioTemplate(newSubData, subKeyList[j], "array", radioNameCounter);
                                          }

                                      }else if(newSubType === 'newWindow'){
                                        templateData.descTemplate += getNewWindowTemplate(newSubData, subKeyList[j]);
                                      }else if(newSubType === "collapse"){
                                          templateData.descTemplate += getCollapseTemplate(newSubData, subKeyList[j]);
                                      }else if(newSubType === "openModalWithContent"){
                                        templateData.descTemplate += getOpenModalBtnWithContent(newSubData, subKeyList[j]);
                                      }else if(newSubType === "customIcon"){
                                        // console.log("===== call customIcon ====");
                                              templateData.descTemplate += getCustomIconTemplate(newSubData, subKeyList[j]);
                                      }else if(argList[i].type === "textToSpeech"){
                                              // console.log("===== call customIcon ====");
                                              // console.log("===== item : ", item);/
                                              templateData.descTemplate += getTextToSpeechIconTemplate(newSubData, subKeyList[j]);
                                      }else if(newSubType === "customThreeDots"){
                                        console.log("===== 333 call customIcon ====");
                                              templateData.descTemplate += getCustomThreeDotsTemplate(newSubData, subKeyList[j]);
                                      }

                                  }
                                  if(Array.isArray(newSubData)){
                                      // TYPE IS ARRAY
                                      // for(let i=0; i<)


                                  }
                                  if(!Array.isArray(newSubData)){
                                      // TYPE IS OBJECT
                                      // console.log("== object part ==");
                                      // console.log("@@@@ subKeyList : ", subKeyList[j].key);
                                      // console.log("newSubData : ", newSubData);
                                      // console.log("subKeyList[j].key : ", subKeyList[j].subkey);
                                      for (let i = 0; i < subKeyList[j].subkey.length; i++) {
                                            let newSubKey = subKeyList[j].subkey[i].key;
                                            let newSubType = subKeyList[j].subkey[i].type;
                                            let newSubValue = newSubData[newSubKey];

                                            // if(subKeyList[j].sharedObj !== undefined){
                                            //     // ============== CREATE THE SHARED OBJECT FOR THE WEB SHARE API =================
                                            //     sharedObj[argList[i].subkey[j].sharedObj] = item[argList[i].subkey[j].sharedObj];
                                            //     // console.log("33333333333333 sharedObj : ", sharedObj);
                                            // }
                                            // console.log("newSubKey : ", newSubKey);
                                            // console.log("newSubType : ", newSubType);
                                            // console.log("newSubValue : ", newSubValue);
                                            if( newSubType === "image"){

                                                  templateData.imageTemplate += getImageTemplate(newSubValue, subKeyList[j].subkey[i]);
                                            }else if(newSubType === "block"){
                                                  templateData.descTemplate += getBlockTemplate(newSubValue, subKeyList[j].subkey[i], ellipseWidth);
                                            }else if(newSubType === "link"){
                                              // console.log("444444444444444444444444444444444444444444");

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
                                            }else if(newSubType === "customIcon"){
                                              // console.log("===== call customIcon ====");

                                                    templateData.descTemplate += getCustomIconTemplate(newSubValue, subKeyList[j].subkey[i]);
                                            }else if(argList[i].type === "textToSpeech"){
                                                    // console.log("===== call customIcon ====");
                                                    // console.log("===== item : ", item);/
                                                    templateData.descTemplate += getTextToSpeechIconTemplate(newSubValue, subKeyList[j].subkey[i]);
                                            }else{

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
                                      templateData.imageTemplate += getImageTemplate(subValue, argList[i].subkey[j]);
                                }else if(subType === "block"){
                                  // console.log("333333333333333");

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
                    if(payload.style.hScroll !== null){
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
                    let tmp = getNoImagewithDescTemplate(item, templateData, payload.style);

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
      }else if((payload.emptySlideDesc !== null && payload.emptySlideDesc !== undefined )&& (payload.emptySlideDesc.visibility !== null && payload.emptySlideDesc.visibility !== undefined && payload.emptySlideDesc.visibility === true)){
          let extraSlideTemplate = getEmptySlideWithDescriptionTemplate(payload.emptySlideDesc.template);
          let tmpExtraSlideTemplate = hScrollBar(extraSlideTemplate);
          template += tmpExtraSlideTemplate;
      }
  }else{
      // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      // console.log("object template arglist :: ", argList);
      let item = payload.data;
      // for(var key in payload.data){

          let sharedObj = {};
          let templateData = {imageTemplate : '', descTemplate : ''};
          for(let i=0; i<argList.length; i++){

              if(argList[i].subkey === null ){

                  if(argList[i].sharedObj !== undefined){
                      if(item[argList[i].key] !== undefined){
                        // console.log("111111111111111111111");
                        //
                        // console.log("item[argList[i].key] : ", item[argList[i].key]);
                        // console.log("sharedObj[argList[i].sharedObj] : ", sharedObj[argList[i].sharedObj]);

                        sharedObj[argList[i].sharedObj] = item[argList[i].key];

                      }
                  }

                  if(argList[i].type === "image"){
                        templateData.imageTemplate = getImageTemplate(item[argList[i].key], argList[i]);
                  }else if(argList[i].type === "block"){
                        if(item[argList[i].key] === undefined || item[argList[i].key] === null){
                          templateData.descTemplate += getBlockTemplate("N/A", argList[i], ellipseWidth);
                        }else{
                          templateData.descTemplate += getBlockTemplate(item[argList[i].key], argList[i], ellipseWidth);
                        }
                  }else if(argList[i].type === "link"){
                    // console.log("55555555555555555555555555555555");

                          templateData.descTemplate += getLinkTemplate(item[argList[i].key]);
                  }else if(argList[i].type === "radio"){
                      if(typeof(item[argList[i].key]) === 'string'){
                          templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "string", radioNameCounter);
                      }else if(typeof(item[argList[i].key]) === 'object' && Array.isArray(item[argList[i].key])){
                          templateData.descTemplate += getRadioTemplate(itemIndex, item[argList[i].key], "array", radioNameCounter);
                      }

                  }else if(argList[i].type === 'newWindow'){
                    // console.log("99999999999999999999999999999999999999999999");
                    templateData.descTemplate += getNewWindowTemplate(item[argList[i].key], argList[i], sharedObj);
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
                          if(typeof(item) === 'object' && !(Array.isArray(item))){
                            let subKeyList = argList[i].subkey.subkey;
                            for (var j = 0; j < subKeyList.length; j++) {
                              let subkey = subKeyList[j].key;
                              let subType = subKeyList[j].type;
                              let subValue = item[subkey];

                              if(subKeyList[j].sharedObj !== undefined && item[subKeyList[j].key]){
                                  // ============== CREATE THE SHARED OBJECT FOR THE WEB SHARE API =================
                                  // console.log("22222222222222222222222222222222222222222");
                                  // console.log(" 222 item[subKeyList[j].key] : ", subValue);
                                  // console.log("2222 sharedObj[subKeyList[j].sharedObj] : ", subKeyList[j].sharedObj);

                                  sharedObj[subKeyList[j].sharedObj] = subValue;
                              }


                                if( subType === "image"){

                                      templateData.imageTemplate += getImageTemplate(subValue, subKeyList[j]);
                                }else if(subType === "block"){
                                      templateData.descTemplate += getBlockTemplate(subValue, subKeyList[j], ellipseWidth);
                                }else if(subType === 'newWindow'){
                                  // console.log("88888888888888888888888888888888888888888");
                                  templateData.descTemplate += getNewWindowTemplate(subValue, subKeyList[j], sharedObj);
                                }
                            }
                          }else if(typeof(item) === 'object' && (Array.isArray(item))){
                            let subKeyList = argList[i].subkey.subkey;
                            for (var j = 0; j < subKeyList.length; j++) {

                              let subkey = subKeyList[j].key;
                              // console.log("$$$ item val : ", item);
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


                                    if(subKeyList[j].sharedObj !== undefined){
                                        // ============== CREATE THE SHARED OBJECT FOR THE WEB SHARE API =================
                                        // console.log("33333333333333333333333333333333333");
                                        // console.log("subValue : ", subValue);
                                        // console.log("sharedObj[subKeyList[j].sharedObj] : ", sharedObj[subKeyList[j].sharedObj]);

                                        sharedObj[subKeyList[j].sharedObj] = subValue;
                                    }

                                      if( subType === "image"){

                                            templateData.imageTemplate += getImageTemplate(subValue, subKeyList[j]);
                                      }else if(subType === "block"){
                                            templateData.descTemplate += getBlockTemplate(subValue, subKeyList[j], ellipseWidth);
                                      }else if(subType === "link"){
                                        templateData.descTemplate += getLinkTemplate(subValue, subKeyList[j]);
                                      }else if(subType === 'newWindow'){
                                        // console.log("777777777777777777777777777777777777777777");
                                        templateData.descTemplate += getNewWindowTemplate(subValue, subKeyList[j],sharedObj);
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
                // console.log("33333333333333333333333333");
                let tmp = getNoImagewithDescTemplate(item, templateData, payload.style);

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
