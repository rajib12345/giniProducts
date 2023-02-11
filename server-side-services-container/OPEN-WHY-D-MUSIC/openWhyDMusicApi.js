
      socket.on("request-openwhyd-playlist-category", (data) => {
      let bookCat = DUMMY_QUIZ_DATA.OPENWHYD_MUSIC_GENERE_CATEGORY;
      let argList = [
        {key : "name", subkey: null, type: "block", prefixValue: '', postFixValue: '', ellipse : 'one line', style: '    white-space: normal; margin-top: 3px; text-align: center; font-size: 20px; color: black; font-weight: 900;'},
        {key : "imgUrl", subkey: null, type: "image", api: 'OPENWHYD:genre-category', onclick: {methodName: 'getProductsById', params: ['value',], defaults: ['OPENWHYD:genre-category'] }, style:'width: 325px; height: 200px; border: none;'},

      ];
      let payload = {
          data : bookCat,
          argList : argList,
          style : {
            imgPos : 'top',
            textAlign : 'left',
            hScroll: "hScroll",
            backgroundColor : null,
            height : null,
            width : null,
            padding: null,
            fontSize: null,
            defaults : {
                backgroundColor : 'white',
                textAlign : 'center',
                height: 'auto',
                width : '338px',
                color: 'grey',
                fontSize : '13px',
                padding: '5px 5px',
                margin : '5px 2px',
                devider : '0px solid grey',
                coverPadding : '5px',
                border: " 1px solid whitesmoke",
                descriptionTemplateStyle : 'background-color: whitesmoke;'

            }
          },
          emptySlide : 'no'
      };
      console.log("1111111111111111111111111111111111");
      let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        if(data.from === 'gini'){
          socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
        }else if(data.from === 'Api'){
          socket.emit("response-openwhyd-playlist-category", {returnMsg : findResponseTemplate});
        }

    })

      socket.on("request-openwhyd-playlist-by-genre", (data) => {
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // console.log("@@@@@ data :: ", data);
      let LIIMIT = 100;
      let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let albumData = response;
        let filteredData = [];
        albumData.forEach((item) => {
            if(item.eId !== null && item.eId !== undefined){
                let eId = item.eId.split("/");
                // console.log("eid :: ", eId);
                if(eId[1] === 'yt'){
                  item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                  filteredData.push(item);
                }
            }
        })

        let argList = [
          // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
          // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
          {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
          {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
        ];
        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '400px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(albumData !== null && albumData.length > 0){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-openwhyd-playlist-by-genre", {returnMsg : findResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }
      });

    })

      //===============================  START :: SHOWING OPENWHYD PLALISTS ============================
      //1
      socket.on("request-openwhyd-playlist-by-genre-one", (data) => {
      // console.log("@@@@@ data :: ", data);
      let LIIMIT = 100;
      let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let albumData = response;
        let filteredData = [];
        if(albumData.length > 20){
              albumData = albumData.slice(1, 20);
        }
        albumData.forEach((item) => {
            if(item.eId !== null && item.eId !== undefined){
                let eId = item.eId.split("/");
                // console.log("eid :: ", eId);
                if(eId[1] === 'yt'){
                  item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                  filteredData.push(item);
                }
            }
        })
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        let argList = [
          // {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 318px; height: 250px; border: none;'},
          // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
          // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
          {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
          {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
        ];
        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '400px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(albumData !== null && albumData.length > 0){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-openwhyd-playlist-by-genre-one", {returnMsg : findResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }
      });

    })

      //2

      socket.on("request-openwhyd-playlist-by-genre-two", (data) => {
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        // console.log("@@@@@ data :: ", data);
        let LIIMIT = 100;
        let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

        HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
          // console.log(" response : ", response);
          let albumData = response;
          let filteredData = [];
          if(albumData.length > 20){
                albumData = albumData.slice(1, 20);
          }
          albumData.forEach((item) => {
              if(item.eId !== null && item.eId !== undefined){
                  let eId = item.eId.split("/");
                  // console.log("eid :: ", eId);
                  if(eId[1] === 'yt'){
                    item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                    filteredData.push(item);
                  }
              }
          })

          let argList = [
            // {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
            // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
            // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
            {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
            {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
            {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
          ];
          let payload = {
              data : filteredData,
              argList : argList,
              style : {
                imgPos : 'top',
                textAlign : 'left',
                hScroll: "hScroll",
                backgroundColor : null,
                height : null,
                width : null,
                padding: null,
                fontSize: null,
                defaults : {
                    backgroundColor : 'white',
                    textAlign : 'center',
                    height: 'auto',
                    width : '400px',
                    color: 'grey',
                    fontSize : '13px',
                    padding: '5px 5px',
                    margin : '5px 2px',
                    devider : '0px solid grey',
                    coverPadding : '5px',
                    border: " 1px solid whitesmoke",
                    descriptionTemplateStyle : 'background-color: whitesmoke;'

                }
              },
              emptySlide : 'no'
          };
          let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
          // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
          if(albumData !== null && albumData.length > 0){
              if(data.from === 'Gini'){
                socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
              }else if(data.from === "Api"){
                socket.emit("response-openwhyd-playlist-by-genre-two", {returnMsg : findResponseTemplate});
              }
          }else{
            let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
            socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
          }
        });

      })

      //3

      socket.on("request-openwhyd-playlist-by-genre-three", (data) => {
          // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
          // console.log("@@@@@ data :: ", data);
          let LIIMIT = 100;
          let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

          HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
            // console.log(" response : ", response);
            let albumData = response;
            let filteredData = [];
            if(albumData.length > 20){
                  albumData = albumData.slice(1, 20);
            }
            albumData.forEach((item) => {
                if(item.eId !== null && item.eId !== undefined){
                    let eId = item.eId.split("/");
                    // console.log("eid :: ", eId);
                    if(eId[1] === 'yt'){
                      item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                      filteredData.push(item);
                    }
                }
            })


            let argList = [
              // {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
              // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
              // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
              {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
              {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
              {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
              {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
            ];
            let payload = {
                data : filteredData,
                argList : argList,
                style : {
                  imgPos : 'top',
                  textAlign : 'left',
                  hScroll: "hScroll",
                  backgroundColor : null,
                  height : null,
                  width : null,
                  padding: null,
                  fontSize: null,
                  defaults : {
                      backgroundColor : 'white',
                      textAlign : 'center',
                      height: 'auto',
                      width : '400px',
                      color: 'grey',
                      fontSize : '13px',
                      padding: '5px 5px',
                      margin : '5px 2px',
                      devider : '0px solid grey',
                      coverPadding : '5px',
                      border: " 1px solid whitesmoke",
                      descriptionTemplateStyle : 'background-color: whitesmoke;'

                  }
                },
                emptySlide : 'no'
            };
            let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
            // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
            if(albumData !== null && albumData.length > 0){
                if(data.from === 'Gini'){
                  socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
                }else if(data.from === "Api"){
                  socket.emit("response-openwhyd-playlist-by-genre-three", {returnMsg : findResponseTemplate});
                }
            }else{
              let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
              socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
            }
          });

        })

      //4
      socket.on("request-openwhyd-playlist-by-genre-four", (data) => {
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // console.log("@@@@@ data :: ", data);
      let LIIMIT = 100;
      let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let albumData = response;
        let filteredData = [];
        if(albumData.length > 20){
              albumData = albumData.slice(1, 20);
        }
        albumData.forEach((item) => {
            if(item.eId !== null && item.eId !== undefined){
                let eId = item.eId.split("/");
                // console.log("eid :: ", eId);
                if(eId[1] === 'yt'){
                  item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                  filteredData.push(item);
                }
            }
        })

        let argList = [
          // {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
          // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
          // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
          {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
          {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
        ];
        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '400px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(albumData !== null && albumData.length > 0){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-openwhyd-playlist-by-genre-four", {returnMsg : findResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }
      });

      })

      //5
      socket.on("request-openwhyd-playlist-by-genre-five", (data) => {
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      // console.log("@@@@@ data :: ", data);
      let LIIMIT = 100;
      let apiURL = "https://openwhyd.org/u/4d94501d1f78ac091dbc9b4d/playlist/"+data.id+"?format=json&limit="+LIIMIT+"";

      HERE_MAP_API_SERVICE.hereMapApiProcessing(apiURL).then((response) => {
        // console.log(" response : ", response);
        let albumData = response;
        let filteredData = [];
        if(albumData.length > 20){
              albumData = albumData.slice(1, 20);
        }
        albumData.forEach((item) => {
            if(item.eId !== null && item.eId !== undefined){
                let eId = item.eId.split("/");
                // console.log("eid :: ", eId);
                if(eId[1] === 'yt'){
                  item.customVideoEmbedUrl = "https://www.youtube.com/embed/"+eId[2];
                  filteredData.push(item);
                }
            }
        })

        let argList = [
          // {key : "embedUrl", subkey: null, type: "iFrame", style:'width: 350px; height: 250px; border: none;'},
          // onclick: {methodName: 'onOpenModal', params: ['customUrl', 'customType'], defaults: ['HACKER-NEWS:topstories'] },
          // {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 318px; height: 250px; border: none;'},
          // {key : "img", subkey: null, type: "image", api: 'HACKER-NEWS:topstories',  style:'width: 318px; height: 200px; border: none;'},
          {key : "customVideoEmbedUrl", subkey: null, type: "iFrame", style:'width: 100%; height: 275px; border: none;'},
          {key : "uNm", subkey: null, type: "block", prefixValue: 'Artist: ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "name", subkey: null, type: "block", prefixValue: 'Title : ', postFixValue: '', ellipse : 'one line', style: ''},
          {key : "strGenre", subkey: null, type: "block", prefixValue: 'Genre : ', postFixValue: '', ellipse : 'one line', style: ''},
        ];
        let payload = {
            data : filteredData,
            argList : argList,
            style : {
              imgPos : 'top',
              textAlign : 'left',
              hScroll: "hScroll",
              backgroundColor : null,
              height : null,
              width : null,
              padding: null,
              fontSize: null,
              defaults : {
                  backgroundColor : 'white',
                  textAlign : 'center',
                  height: 'auto',
                  width : '400px',
                  color: 'grey',
                  fontSize : '13px',
                  padding: '5px 5px',
                  margin : '5px 2px',
                  devider : '0px solid grey',
                  coverPadding : '5px',
                  border: " 1px solid whitesmoke",
                  descriptionTemplateStyle : 'background-color: whitesmoke;'

              }
            },
            emptySlide : 'no'
        };
        let findResponseTemplate = GENERIC_TEMPLATE_GENERATOR.basic_template_generator(payload);
        // console.log("findAlbumResponseTemplate : ", findAlbumResponseTemplate);
        if(albumData !== null && albumData.length > 0){
            if(data.from === 'Gini'){
              socket.emit("query-response", { returnMsg : findResponseTemplate, displayType : 'horizontalSlide'});
            }else if(data.from === "Api"){
              socket.emit("response-openwhyd-playlist-by-genre-five", {returnMsg : findResponseTemplate});
            }
        }else{
          let template = "Oops, sorry we didn't find any album of <i><strong>"+data.albumName+"</strong></i>";
          socket.emit("query-response", { returnMsg : hereMapNearByPlacesCategoryTemplate});
        }
      });

      })
