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

// template = '<a href="#" onclick="return false;" style=""><div id="'+itemId+'" style="margin-right: 5px; padding: 10px; border-radius: 20px; padding: 10px 30px 10px 30px; background-color: '+bgColor+'; color: '+fontColor+'; font-weight: 700;" ><input type="text" id="fname" name="fname" placeholder="Search..."></div></a>';
// ======= filter the states name based on query =======
console.log("@@@ request.query : ", request.query);
if(request.query !== null && request.query !== undefined && request.query !== ''){
    console.log("==== request.query: ", request.query);
    states_name = states_name.filter(function(item){
      // item = item.toLowerCase();
      // let selectedEle = request.selectedElement.toLowerCase();
      // item = item.toLowerCase();
      // request.query = request.query.toLowerCase();
      // console.log("## selectedEle : ", selectedEle);
      // console.log("## item : ", item);
      // console.log("## request.query : ", request.query);

      if((item.indexOf(request.query !== -1))){
        console.log("---------");
        return true;
      };
    });
}
console.log("@@@ after filter states names :: \n",states_name );
console.log("@@@ zone wise default selected state : ", request.selectedElement);

// if(states_name.length > 0){
  //======================================================
    // if(states_name.length > 1){
    //     let index = states_name.indexOf(request.selectedElement);
    //     states_name.splice(index, 1);
    //     states_name.unshift(request.selectedElement);
    // }
    if(request.scrollType === "vertical"){
      idPrefixValue = "verticalTestingLabState";
      from = "vertical";
      bgColor = "#4267B2";
    }else if(request.scrollType === "home_death_recoveries"){
      idPrefixValue = "deathRecoveries";
      from = "home_death_recoveries";
      bgColor = "green";
    }else if(request.scrollType === "vertical_death_recoveries"){
      idPrefixValue = "verticalDeathRecoveries";
      from = "vertical_death_recoveries";
      bgColor = "green";
    }else if(request.scrollType === "home_district_wise_report"){
      idPrefixValue = "districtWiseReport";
      from = "home_district_wise_report";
      bgColor = default_style.themeColor;
    }else if(request.scrollType === "home_zone_wise_report"){
      console.log("=== calling home_zone_wise_report ===");
      idPrefixValue = "zoneWiseReportState";
      from = "home_zone_wise_report";
      bgColor = "#4267B2";
    }else{
      idPrefixValue = "testingLabState";
      from = "home";
      bgColor = "#4267B2";
    }

    searchId = 'search_'+idPrefixValue;
    searchMethod = 'onKeyUp="onClickSearchStatesName(\'' + searchId + '\', event)"';
    template = `
      <a href="#" onclick="return false;" style="">
        <div id="searchBlock_`+idPrefixValue+`"   style="margin-right: 5px; padding: 10px; border-radius: 20px; padding: 10px 15px 10px 15px; background-color: #E9EBEE; color: #4b4f56; font-weight: 700;" >
          <input id="`+searchId+`"  type="text" `+searchMethod+` name="fname" placeholder="Search..." style="background-color: #E9EBEE; border: none; outline: none !important; width: 150px;">
        </div>
      </a>
    `;

    states_name.forEach((item, i) => {
        if(from === "home_district_wise_report" || from === "home_zone_wise_report"){
          itemId = item.replace(/\s+/g, '-');
        }else{
          itemId = item.replace(/\s+/g, '');
        }
        itemId = idPrefixValue+'_'+itemId;
        if(item === request.selectedElement){
          template += '<a href="#" onclick="return false;" style=""><div id="'+itemId+'" style="margin-right: 5px; padding: 10px; border-radius: 20px; padding: 10px 30px 10px 30px; background-color: '+bgColor+'; color: '+fontColor+'; font-weight: 700;" onclick="onClickTestingLabStateItem(\''+itemId+'\', \''+from+'\')">'+item+'</div></a>';
        }else{
          template += '<a href="#" onclick="return false;" style=""><div id="'+itemId+'" style="margin-right: 5px; padding: 10px; border-radius: 20px; padding: 10px 30px 10px 30px; background-color: #E9EBEE; color: #4b4f56; font-weight: 700;" onclick="onClickTestingLabStateItem(\''+itemId+'\', \''+from+'\')">'+item+'</div></a>';
        }
    });
// }


  socket.emit("github-who-covid19-api-response", { returnMsg: template, apiRef : request.apiRef,  resposeTeplateId: request.resposeTeplateId, loaderId: request.loaderId});
