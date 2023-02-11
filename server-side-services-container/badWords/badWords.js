var Filter = require('bad-words');
var filter = new Filter();
// console.log("filter :: ", filter);
// filter.Filter.list.indexof(" you are an bastard");
// var x = filter.isProfane("you are an bastard");
// console.log("x : ", x);
// console.log(filter.clean("Don't be an ash0le"));


var filterBadWord = function(query){
    let isbadWord = filter.isProfane(query);
    if(isbadWord){
        let replacePlaceholder = filter.clean(query);
        return replacePlaceholder
    }else{
        return false;
    }
}



module.exports.filterBadWord = filterBadWord;
