var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request');

var spotifyApi = new SpotifyWebApi({
  clientId: '1596b5e97be6409cb04670618b53a62d',
  clientSecret: 'd22590a9254e4d51a5c2ea923e11f150',
  redirectUri: 'http:localhost:3000/spotify'
});
let current_state = {access_token: null, refresh_token: null};

function setAccessToken(){
    if(current_state.access_token !== undefined && current_state.access_token !== null){
        spotifyApi.setAccessToken(current_state.access_token);
    }
}

function getData(options){
  var options = {
    'method': options.method,
    'url': options.url,
    'headers': {
      'Authorization': 'Bearer '+current_state.access_token,
      'Cookie': 'sp_m=in; sp_t=ab15149c-db88-41f9-adfc-a529209edfe4; sp_new=1; sp_landingref=https%3A%2F%2Fwww.spotify.com%2Fin%2Fhelp%2F'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("******* spotify data :: \n",);
    console.log(response.body);
    console.log("@@@@@ data \n\n", JSON.stringify(response.body));
  });
}

let getSpotifyData = function(){
    console.log("***************************** SPOTIFY *********************************");
    console.log("======== calling get spotify data =========");
    // Get Elvis' albums
    // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    //   function(data) {
    //     // console.log('Artist albums', data.body);
    //     console.log("stringify : \n\n", JSON.stringify(data.body));
    //   },
    //   function(err) {
    //     console.error(err);
    //   }
    // );

    // spotifyApi.searchTracks('love')
    //   .then(function(data) {
    //     // console.log('Search by "Love"', data.body);
    //         console.log("stringify : \n\n", JSON.stringify(data.body));
    //
    //   }, function(err) {
    //     console.error(err);
    //   });

    // spotifyApi.searchPlaylists('love')
    // .then(function(data) {
    //   // console.log('Found playlists are', data.body);
    //   console.log("@@@@ body :: ", JSON.stringify(data.body));
    // }, function(err) {
    //   console.log('Something went wrong!', err);
    // });


    // /* Get Audio Analysis for a Track */
    // spotifyApi.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK')
    //  .then(function(data) {
    //    console.log(data.body);
    //    // console.log("@@@@@ data \n\n", JSON.stringify(data.body));
    //  }, function(err) {
    //     console.log('Something went wrong!', err);
    //  });

    // Get multiple artists

    // var options = {
    //   'method': 'GET',
    //   'url': 'https://api.spotify.com/v1/browse/artists',
    //   'headers': {
    //     'Authorization': 'Bearer '+current_state.access_token,
    //     'Cookie': 'sp_m=in; sp_t=ab15149c-db88-41f9-adfc-a529209edfe4; sp_new=1; sp_landingref=https%3A%2F%2Fwww.spotify.com%2Fin%2Fhelp%2F'
    //   }
    // };
    // request(options, function (error, response) {
    //   if (error) throw new Error(error);
    //   //console.log(response.body);
    //   console.log("@@@@@ data \n\n", JSON.stringify(response.body));
    // });

    // // let requestOptions = {
    // //   method : 'GET',
    // //   url: 'https://api.spotify.com/v1/browse/new-releases',
    // // }
    //
    // let requestOptions = {
    //   method : 'GET',
    //   url: 'https://api.spotify.com/v1/browse/artists',
    // }
    // getData(requestOptions);


};









module.exports.getSpotifyData = getSpotifyData;
module.exports.getData = getData;

module.exports.current_state = current_state;
