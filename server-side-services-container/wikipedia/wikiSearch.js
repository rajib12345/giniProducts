const promise = require("promise");
const request = require("request");




var wikiAPIUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch="
var wikiSearch = function(query){
  // console.log("========= calling wiki search function ==========");
  var wikiSearchPromise = new promise(function(resolve, reject){
    var wikiSearchOption = {
              uri: wikiAPIUrl+query,
              method: 'GET'
    };
    request(wikiSearchOption,  function(error, response, body){
      if(error || (response.statusCode != 200)){
        console.log("wiki search  error: ", error);
      }else{
        // console.log("------------- sucessfull wiki search result --------------");
        body = JSON.parse(body);
        resolve(body);
      }
    });
  });
  return wikiSearchPromise;
}

var createWikihResponseTemplate = function(wikiResponse) {
  console.log("==== calling create wiki response template fun...");
  // console.log("wikiResponse :: ", JSON.stringify(wikiResponse));
	var res = '';
	var searchResult = wikiResponse.query.search;
    	for(var i=0; i<searchResult.length; i++){
        	res += `
                  <div class="row" style="border-bottom: 1px solid #e9ebee; padding-top: 8px;">
                      <div class="col-lg-4 col-md-4 col-sm-4 col-4" style="">
                          <strong> Title: </strong> `+searchResult[i].title+`
                      </div>
                      <div class="col-lg-8 col-md-8 col-sm-8 col-8" style="padding-bottom: 8px;">
                           <strong> Snippet: </strong> `+searchResult[i].snippet+`
                      </div>
                  </div>
            `;
        }

      return res;
}




module.exports.wikiSearch = wikiSearch;
module.exports.createWikihResponseTemplate = createWikihResponseTemplate;
