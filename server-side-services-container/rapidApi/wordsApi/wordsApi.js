const promise = require("promise");
const request = require("request");

var keywords = ["syllables", "examples", "antonyms", "definitions", "frequency", "pronunciation", "rhymes", "synonyms", "words"];

var getWordDetails = function(word){
  console.log("=== call wordsapi with word : ", word);
  try {
    var wrodApiUrl = "https://wordsapiv1.p.mashape.com/words/"+word;
    var wordDetailsPromise = new promise(function(resolve, reject){
      request({
          headers: {
            "X-Mashape-Key" : "Mb58JCJic7mshPthY310k0p4z9NRp116Jmpjsnom0Wl6sAYBXa",
            "X-Mashape-Host" : "wordsapiv1.p.mashape.com"
          },
          uri: wrodApiUrl,
          method: 'GET'
        }, function (err, res, body) {
            if(err){
                console.log("error occured when fetching wordsapi :: error :: ",err );
            }else{
              body = JSON.parse(body);
              resolve(body);
            }
        });
    });
    return wordDetailsPromise;
  } catch (e) {

  }

}

var create_word_details_template = function(wordAPIResponse){
    let results = wordAPIResponse.results;
    let template = '<div>';
        template += `<div style="text-align: center; border-bottom: 10px;">
            <h3>`+wordAPIResponse.word+`</h3>
        </div>`;
    for (var i = 0; i < results.length; i++) {
        template += '<div>';
            template += '<div> <strong>Definition</strong> : '+results[i].definition+'</div>';
            template += '<div> <strong>Part Of Speech</strong> : '+results[i].partOfSpeech+'</div>';

            if(results[i].synonyms !== undefined){
              template += '<div> <strong>Synonyms</strong> : '+results[i].synonyms.join("  ")+'</div>';
            }

            if(results[i].typeOf !== undefined){
              template += '<div> <strong>TypeOf</strong> : '+results[i].typeOf.join("  ")+'</div>';
            }

            if(results[i].examples !== undefined){
              template += '<div> <strong>Examples</strong> : '+results[i].examples.join("  ")+'</div>';
            }

        template += '</div>';
        template += '<hr>';
    }
    template += '</div>';
    return template;
}





module.exports.getWordDetails = getWordDetails;
module.exports.create_word_details_template = create_word_details_template;
