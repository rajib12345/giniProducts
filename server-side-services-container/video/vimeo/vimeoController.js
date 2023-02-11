let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("f3392f878f809fe35369b0df2d4e642aa6857df4", "RSmb3Cc320ch1KVhhxRdAp3QwexD95s4NVHsWzW4KlPod38//fvqt/+m8PeM/YxMM57Lmbt7xg3xJPSh5iDX3sEMgDzeGcjDuhVe5OAVpMgCaDkBG/oOPMserKh5J1rw", "a5c212cd0fc109fe206f9f56bc7149a1");



function getVimeoVideo(){
    console.log("============= call get  vimeo video ==============");
    // client.request({
    //   method: 'GET',
    //   path: '/tutorial'
    // }, function (error, body, status_code, headers) {
    //   if (error) {
    //     console.log(error);
    //   }
    //   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
    //   console.log(body);
    // })

    client.request(/*options*/{
      // This is the path for the videos contained within the staff picks
      // channels
      path: '/channels/staffpicks/videos',
      // This adds the parameters to request page two, and 10 items per
      // page
      query: {
        page: 2,
        per_page: 10,
        fields: 'uri,name,description,duration,created_time,modified_time'
      }
    }, /*callback*/function (error, body, status_code, headers) {
      if (error) {
        console.log('error');
        console.log(error);
      } else {
        console.log('body');
        console.log(body);
      }

    });
}

module.exports.getVimeoVideo = getVimeoVideo;
