const promise = require("promise");
const HTTP_SERVICE = require('../http/http.js');

var getIpInfo = function(){
    try {
       var ipInfoPromise = new promise(function(resolve, reject){
         console.log("=== call ipinfo fun ===");
         HTTP_SERVICE.get("https://ipinfo.io", null, null).then(function(response){
               // console.log("ipinfo response : ", response);
               // response = JSON.parse(response);
               resolve(response);
         })
       });
       return ipInfoPromise;
    } catch (e) {

    } finally {

    }
}



module.exports.getIpInfo = getIpInfo;
