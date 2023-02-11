
var userCurrentLocation = null;


var setUserCurrentLocation = function(location){
  var latlon = location.latitude + "," + location.longitude;
  userCurrentLocation = latlon;
  console.log("user current location :: ", latlon);
}

var getUserCurrentLocation = function(){
    if(userCurrentLocation !== null)
        return userCurrentLocation;
}

module.exports.setUserCurrentLocation = setUserCurrentLocation;
module.exports.getUserCurrentLocation = getUserCurrentLocation;
