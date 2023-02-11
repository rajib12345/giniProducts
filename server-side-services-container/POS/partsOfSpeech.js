const promise = require("promise");
var WordPOS = require('wordpos');
const pos = new WordPOS();


var getPos = function(sentence){
  var wordDetailsPromise = new promise(function(resolve, reject){
    pos.getPOS(sentence, function(response){
        resolve(response)
    })
  });
  return wordDetailsPromise;

}


module.exports.getPos = getPos;
