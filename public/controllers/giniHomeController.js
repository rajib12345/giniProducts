var app = angular.module('myApp', []);

app.directive('myRepeatDirective', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      setTimeout(function(){
        var elmnt = document.getElementById("emptydiv");
        elmnt.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
      }, 100)


    }

  };
});

app.filter('unsafe', function($sce) {
return function(val) {
    return $sce.trustAsHtml(val);
  };
});

app.controller('giniHomeController', function($scope, $window) {
	console.log("main controller is loading...");
  // var appWindow = angular.element($window);

	var client = io();
    $scope.chatContainer = [];
    $scope.query = '';
    var dummyQuery = '';
    var inputTime = '';
    var changeRequest = '';
    var changeResponse = {};
    var dialogFlowState = false;
    var dialogFlowStateName = null;
    var localDialogFlowStateStart;


    $scope.showLoader = false;
    $scope.showMike = true;
    $scope.ChatRoomHome = true;
    $scope.liveChatRoom = false;
    $scope.groupChatRoom = false;
    $scope.activeUsers = [];
    $scope.helpInfoItems = [
      "Hello",
      "Change language",
      "Find books by name",
      "Book shelf",
      "Football Live",
      "Cannabis strains",
      "Recent cannabis study",
      "Top sports news in India",
      "Hacker News Top Stories",
      "Hacker News Best Stories",
      "Hacker News Job Stories",
      "Hacker News New Stories",
      "Hacker News Show Stories",
      "Advance search",
      "Todays weather",
      "Send Sms",
      "Listen To Top Most Loved Track",
      "Find Album",
      "Trending Music Videos In US",
      "Listen To Sound Cloud Music",
      "Play quiz",
      "Find near by place category",
      "Find nearby places",
      "Find nearby popular places",
      "Find near by Zomato restaurant",
      "Find Zomato collections",
      "Find movie reviews",
      // "Weather in kolkata ?",
      "Define today",
      "Network information ?",
      "Send Email",
      "Top Articles published by the Wall Street Journal",
      "Top business headlines from TechCrunch",
      "top 10 sports news in india",
      "Upcomming cricket matches ?",
      "Who are the developer in sdp team ?",
      "Previous cricket matches history.",
      "Sachin tendulkar",
      "Who are the developer in adc team ?"
     ];
    // ============ custo event calling to sync the chat container ==============
    //========================================================================================================


    //========================================================================================================
    // ======= WELCOME BOT RESPONSE =======
    function showWelcomeMsg(){
        var welcomeChatObject = {};
        var date = new Date();
        var HR = date.getHours();
        var MNT = date.getMinutes();
        // var SEC = date.getSeconds();
        var ampm = (HR >= 12) ? "PM" : "AM";
        var welOutputTime = HR+':'+MNT+" "+ampm;
        // <span class="glyphicon glyphicon-time"></span>
        var welOutputMsg = `
                 <div>
                     <div><strong><i>Gini:</i></strong> Welcome, how can I help you ?<div>
                     <div style="font-size: 10px; float: right;">
                        `+welOutputTime+`
                     </div>
                 </div>
              `;
          welcomeChatObject["input"] = '';
          welcomeChatObject["output"] = welOutputMsg;
          $scope.chatContainer.push(welcomeChatObject);
    };
    showWelcomeMsg();

    function showPosition(position) {
        console.log("latitude :: ",position.coords.latitude );
        console.log("latitude :: ",position.coords.longitude );
        client.emit('fetched-current-location', {latitude : position.coords.latitude, longitude : position.coords.longitude });

    }

    function fetchUserCurrentLocation(){

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
    }

    fetchUserCurrentLocation();


    function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'bn'}, 'google_translate_element');
    }

    function googleTranslateElementInit(changeLanguageRequestCount) {
      console.log("=== call google translate apis ===");
      new google.translate.TranslateElement({pageLanguage: 'en'}, google_translate_element);
    }
    // googleTranslateElementInit();
    var changeLanguageRequestCount = 0;
    $scope.onClickHelpInfoItems = function(helpInfoTxt){
        var d = new Date();
        var hr = d.getHours();
        var mnt = d.getMinutes();
        // var sec = d.getSeconds();
        var ampm = (hr >= 12) ? "PM" : "AM";
        inputTime = hr+':'+mnt+" "+ampm;
        dummyQuery = helpInfoTxt;

        if(helpInfoTxt === "Change language" && !dialogFlowState){
          let template = '';
          let input = '';
          let output = '';
          let d = new Date();
          let hr = d.getHours();
          let mnt = d.getMinutes();
          let ampm = (hr >= 12) ? "PM" : "AM";
          let outputTime = hr+':'+mnt+" "+ampm;
          let chatObject = {};
          changeLanguageRequestCount = changeLanguageRequestCount + 1;
          // <div id="poweredByGini" style="color: green; margin-top: -18px;color: #4267b2;margin-left: 65px;font-size: 16px;font-weight:700;"></div>

          template += `
              <div id="google_translate_element"></div>
              <div style="color: green; margin-top: -18px;color: #4267b2;margin-left: 65px;font-size: 16px;font-weight:700;"><span id="poweredByGini"></span></div>
          `;
          input = `
             <div>
                 <div><strong style="padding-right: 3px;"><i>You:</i></strong>`+dummyQuery+`</div>
                 <div style="font-size: 10px; float: right; ">
                  `+inputTime+`
                 </div>
             </div>
          `;
          output = `
             <div>
                 <div>`+template+`<div>
                 <div style="font-size: 10px; float: right;">
                    `+outputTime+`
                 </div>
             </div>
          `;

          chatObject["input"] = input;
          chatObject["output"] = output;
          $scope.showLoader = false;
          if(changeLanguageRequestCount === 1){
            $scope.chatContainer.push(chatObject);

            setTimeout(function(){
              googleTranslateElementInit();
            }, 50)
            setTimeout(function(){
              document.getElementById("poweredByGini").innerHTML = "Gini";
            }, 200)
          }else{
            let elmnt = document.getElementById("google_translate_element");
            elmnt.scrollIntoView({behavior: "instant", block: "start", inline: "center"});
          }

        }else if(helpInfoTxt === "Find movie reviews"){
             console.log("==== call Find movie reviews ====");
             document.getElementById("query").placeholder = "Type Movie name here...";
             document.getElementById("query").style.backgroundColor = "#4267b2";
             document.getElementById("query").style.color = "white";
             document.getElementById("query").classList.add("custom-placeholder");
             dialogFlowState = true;
             dialogFlowStateName = 'MOVIE_REVIEWS';

        }else if(helpInfoTxt === "Find books by name"){
             console.log("==== call Find books by name ====");
             document.getElementById("query").placeholder = "Type Book name here...";
             document.getElementById("query").style.backgroundColor = "#4267b2";
             document.getElementById("query").style.color = "white";
             document.getElementById("query").classList.add("custom-placeholder");
             dialogFlowState = true;
             dialogFlowStateName = 'FIND_BOOKS';

        }else if(helpInfoTxt === "Advance search"){
             console.log("==== call Find books by name ====");
             document.getElementById("query").placeholder = "Find archived music and videos...";
             document.getElementById("query").style.backgroundColor = "#4267b2";
             document.getElementById("query").style.color = "white";
             document.getElementById("query").classList.add("custom-placeholder");
             dialogFlowState = true;
             dialogFlowStateName = 'ADVANCE_SEARCH';

        }else if(helpInfoTxt === "Top sports news in India"){
             console.log("==== call news api  ====");
             client.emit("news-api-request", {from : 'Gini'});

        }else if(helpInfoTxt === "Book shelf"){

              client.emit("request-book-shelf", {from: "Gini"})
        }else if(helpInfoTxt === "Play quiz"){
            client.emit("fetch-quiz-api", {from : 'gini'});
        }else if(helpInfoTxt === "Find near by place category"){
            client.emit("here-map-places-category-request", {from : 'gini', placeCategory : 'restaurant'});

        }else if(helpInfoTxt === "Find near by Zomato restaurant"){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(" @@latitude :: ",position.coords.latitude );
                    console.log(" @@latitude :: ",position.coords.longitude );
                    let locationObj = {lat : position.coords.latitude, lon: position.coords.longitude}
                    console.log("locationObj : ", locationObj);
                    client.emit("query-request", {query : helpInfoTxt, locationObj : locationObj});
                });
            }

        }else if(helpInfoTxt === "Listen To Sound Cloud Music"){
            client.emit("sound-cloud-api-request", {from : "Gini"})
        }else if(helpInfoTxt === "Football Live"){
            client.emit("request-score-highlight-video", {from : "Gini"})
        }else if(helpInfoTxt === "Send Sms"){
            client.emit("send-twilio-sms-template-request");
        }else if(helpInfoTxt === "Listen To Top Most Loved Track"){
            client.emit("music_trending-album-request", {from: 'Gini'});
        }else if(helpInfoTxt === "Trending Music Videos In US"){
            client.emit("music_top-50-most-loved-track-request", {from: 'Gini'});
        }else if(helpInfoTxt === "Cannabis strains"){
            console.log("==== request cannabis api ====");
            client.emit("cannabis-api-request", {from: 'Gini', category: "product_by_strains"});
        }else if(helpInfoTxt === "Recent cannabis study"){
            console.log("==== request cannabis api ====");
            client.emit("cannabis-api-request", {from: 'Gini', category: "recent_cannabis_study"});
        }else if(
           helpInfoTxt === "Hacker News Top Stories"
        || helpInfoTxt === "Hacker News Best Stories"
        || helpInfoTxt === "Hacker News Job Stories"
        || helpInfoTxt === "Hacker News Show Stories"
        || helpInfoTxt === "Hacker News New Stories"){

              let newsCategory = "";
              if(helpInfoTxt === "Hacker News Top Stories"){
                  newsCategory = "topstories";
              }else if(helpInfoTxt === "Hacker News Best Stories"){
                  newsCategory = "beststories";
              }else if(helpInfoTxt === "Hacker News Job Stories"){
                  newsCategory = "jobstories";
              }else if(helpInfoTxt === "Hacker News Show Stories"){
                  newsCategory = "showstories";
              }else if(helpInfoTxt === "Hacker News New Stories"){
                  newsCategory = "newstories";
              }
              client.emit("request-hacker-news-api", {from: 'Gini', hackerNewsCatgory : newsCategory});
        }else if(helpInfoTxt === "Find Album"){
          console.log("==== call Find album reviews ====");
          document.getElementById("query").placeholder = "Type Album name here...";
          document.getElementById("query").style.backgroundColor = "#4267b2";
          document.getElementById("query").style.color = "white";
          document.getElementById("query").classList.add("custom-placeholder");
          dialogFlowState = true;
          dialogFlowStateName = 'FIND_ALBUMS';
          // wikiResult
        }else if(!dialogFlowState){
          console.log("==== call query request ====");
          client.emit("query-request", {query : helpInfoTxt});
        }
    }

     $scope.resetChat = function(){
        console.log("calling reset chat....");
        $scope.chatContainer = [];
        // client.emit("send-updated-chat-container", {chatContainer : $scope.chatContainer});
     }

     // ==== ON BACKSPACE :  enable diseable mike or send icon ====
     $scope.onClickBackSpace = function(keyEvent, queryMsg){
       if (keyEvent.which === 8){
            // console.log(" onClickBackSpace: ", queryMsg.length);
             if(queryMsg.length === 1){
                 $scope.showMike = true;
                 $scope.showLoader = false;
             }
       }
     }



     $scope.sendMsgByEnter = function(keyEvent, queryMsg, source){
          var d = new Date();
          var hr = d.getHours();
          var mnt = d.getMinutes();
          // var sec = d.getSeconds();
          var ampm = (hr >= 12) ? "PM" : "AM";
          inputTime = hr+':'+mnt+" "+ampm;
          var duplicateQueryMsg = queryMsg;
          // console.log("scope.query : ", duplicateQueryMsg.length);
          // ==== ON KEY PRESS : enable diseable mike or send icon ====
          if(duplicateQueryMsg.length >= 0){
              $scope.showMike = false;
              $scope.showLoader = true;
          }
          if(queryMsg === undefined){
              var chatObject = {};
              chatObject["input"] = '';
              chatObject["output"] = 'Please write something for query.';
              $scope.chatContainer.push(chatObject);
              return;
          }

          if (keyEvent.which === 13 || source === "send"){
                  queryMsg = queryMsg.replace(/\s\s+/g, ' ');
                  dummyQuery = queryMsg;
                  if(queryMsg === '' || queryMsg === undefined){
                       var chatObject = {};
                       chatObject["input"] = '';
                       chatObject["output"] = 'I am sorry that is a little out of my league.<br> Can you please give response in proper format.';
                       $scope.chatContainer.push(chatObject);
                   }else if(changeRequest.requestTopic === 'show jive info'){
                       // console.log("== show jive info ==")
                       processChangeRequest(changeRequest);
                   }else if(changeRequest.requestTopic){
                       processChangeRequest(changeRequest);
                   }else if(dialogFlowStateName !== null && dialogFlowStateName === "MOVIE_REVIEWS"){
                        let queryValue = document.getElementById("query").value;
                        queryValue = "sow me the details of movie "+queryValue;
                        client.emit("query-request", {query : queryValue});
                        dialogFlowState = false;
                        document.getElementById("query").placeholder = "Type query here...";
                        document.getElementById("query").style.backgroundColor = "white";
                        document.getElementById("query").style.color = "grey";
                        document.getElementById("query").classList.remove("custom-placeholder");
                        document.getElementById("query").value = '';

                   }else if(dialogFlowStateName !== null && dialogFlowStateName === "FIND_BOOKS"){
                         let queryValue = document.getElementById("query").value;
                         //queryValue = "show me the details of movie "+queryValue;
                         client.emit("request-google-books-by-name", {bookName : queryValue, from: 'Gini'});
                         dialogFlowState = false;
                         document.getElementById("query").placeholder = "Type query here...";
                         document.getElementById("query").style.backgroundColor = "white";
                         document.getElementById("query").style.color = "grey";
                         document.getElementById("query").classList.remove("custom-placeholder");
                         document.getElementById("query").value = '';

                   }else if(dialogFlowStateName !== null && dialogFlowStateName === "ADVANCE_SEARCH"){
                        console.log("!!!!!!!!!!!!!!!!!!!!");
                         let queryValue = document.getElementById("query").value;
                         //queryValue = "show me the details of movie "+queryValue;
                         client.emit("request-advance-archive-search", {query : queryValue, from: 'Gini'});
                         dialogFlowState = false;
                         document.getElementById("query").placeholder = "Type query here...";
                         document.getElementById("query").style.backgroundColor = "white";
                         document.getElementById("query").style.color = "grey";
                         document.getElementById("query").classList.remove("custom-placeholder");
                         document.getElementById("query").value = '';
                   }else if(dialogFlowStateName !== null && dialogFlowStateName === "FIND_ALBUMS"){
                        console.log("!!!!!!!!!!!!!!!!!!!!");
                         let queryValue = document.getElementById("query").value;
                         //queryValue = "show me the details of movie "+queryValue;
                         client.emit("find-album-api-request", {albumName : queryValue, from: 'Gini'});
                         dialogFlowState = false;
                         document.getElementById("query").placeholder = "Type query here...";
                         document.getElementById("query").style.backgroundColor = "white";
                         document.getElementById("query").style.color = "grey";
                         document.getElementById("query").classList.remove("custom-placeholder");
                         document.getElementById("query").value = '';
                   }else{
                      $scope.query = '';
                      document.getElementById("query").value = '';
                      // console.log("before send scope.query : ", duplicateQueryMsg);
                      client.emit("query-request", {query : duplicateQueryMsg})
                  }

          }
     }

     var processChangeRequest = function(){
        if(changeRequest.requestTopic){
            switch(changeRequest.requestTopic){
                case 'email':
                    processEmailChangeRequest();
                    break;
                case 'start date':
                    processEmailChangeRequest();
                    break;
                case 'show jive info':
                    processEmailChangeRequest();
                    break;

            }
        }
     }

     var emailChangeOptions = null;

     var count = 0;
     var processEmailChangeRequest = function(){
        console.log("entered email id :: ", $scope.query);
        //$scope.query = '';
        var d = new Date();
        var hr = d.getHours();
        var mnt = d.getMinutes();
        // var sec = d.getSeconds();
        var ampm = (HR >= 12) ? "PM" : "AM";
        var outputTime = hr+':'+mnt+' '+apmp;

        var chatObject = {};
        var msg = '';
        var input = '';

        console.log("email changeResponse :: ", emailChangeOptions);

        for(var i=0; i<emailChangeOptions.length; i++){

           if(emailChangeOptions[i].isVisited === 'active'){

              emailChangeOptions[i].value = dummyQuery;
              emailChangeOptions[i].isVisited = 'done';

              if(emailChangeOptions.length === count ){
               //console.log("need to send the email response option to server :: ",emailChangeOptions);

                var input = `
                  <div>
                     <div>`+dummyQuery+`<div>
                     <div style="font-size: 10px; float: right; ">`+inputTime+`</div>
                  </div>
                `;
                msg = 'please wait... <br> while I am processing your request.';
                var output = `
                  <div>
                     <div>`+msg+`<div>
                     <div style="font-size: 10px; float: right;">`+outputTime+`</div>
                  </div>
                `;
                chatObject["input"] = '';
                chatObject["output"] = output;
                $scope.chatContainer.push(chatObject);


                //console.log("need to send the email response option to server 2:: ",emailChangeOptions);
                client.emit('email-change-request-data', {emailChangeOptions : emailChangeOptions, changeRequest : changeRequest});

                // --------- initialize to default state ------------
                changeRequest.requestTopic = null;
                count = 0;
                $scope.query = '';

                emailChangeOptions = null;

                return;
            }
            }

        }

        for(var j=0; j<emailChangeOptions.length; j++){
           if(emailChangeOptions[j].isVisited === 'inactive'){
                emailChangeOptions[j].isVisited = 'active';
                msg = emailChangeOptions[j].msg;
                count++;
                var input1 = `
                  <div>
                     <div>`+dummyQuery+`<div>
                     <div style="font-size: 10px; float: right; ">`+inputTime+`</div>
                  </div>
                `;

                var output1 = `
                  <div>
                     <div>`+msg+`<div>
                     <div style="font-size: 10px; float: right;">`+outputTime+`</div>
                  </div>
                `;
                chatObject["input"] = input1;
                chatObject["output"] = output1;
                $scope.chatContainer.push(chatObject);
                break;
           }
        }
        $scope.query = '';
        console.log("email changeResponse :: ", emailChangeOptions);
        console.log("count :: ", count);



        // client.emit("send-updated-chat-container", {chatContainer : $scope.chatContainer});

        //client.on("change-email-request", {changeResponse : changeResponse})

     }
//==========  DEVICE MOTION ACCELARATION  ============
      var shakeEvent = new Shake({threshold: 15});
      // var isShaked = false;
      shakeEvent.start();
      window.addEventListener('shake', function(){
         // isShaked = true;
         document.getElementById("query").value = '';
      }, false);
      function stopShake(){
          shakeEvent.stop();
      }
 //==============================================================
     var startVibrate = function(){
      if(navigator.vibrate){
          navigator.vibrate([500, 250, 500, 250, 500, 250, 500, 250, 500, 250, 500]);
          // navigator.vibrate(1000);
      }
    }

     client.on("fetch-current-location-request", function(){
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition((position) => {
                 console.log("@@ latitude :: ",position.coords.latitude );
                 console.log("@@ latitude :: ",position.coords.longitude );
                 client.emit('fetch-current-location-response', {latitude : position.coords.latitude, longitude : position.coords.longitude });

             });
         }
     })

     client.on("query-response", function(data){
    $scope.$apply(function(){
      console.log("query response data.displayType : ", data.displayType);
      // console.log("zomato collection response : ", data.returnMsg);
      var template = null;
      var input = '';
      var noInput = false;
      var output = '';
      var d = new Date();
      var hr = d.getHours();
      var mnt = d.getMinutes();
      var ampm = (hr >= 12) ? "PM" : "AM";
      var outputTime = hr+':'+mnt+" "+ampm;
      var chatObject = {};

      if(data.api === 'quiz api'){
        quizCorrectAnswers = data.quizCorrectAnswers;
      }
      if(data.returnMsg === "show-network-info"){
        template = getNetworkInformation();
      }else if(data.returnMsg && data.email !== undefined){
          console.log("=== send email functionality ...");
          template = data.returnMsg;
          // document.getElementById("sendBtn").disabled = true;
          // document.getElementById("chatQuery").disabled = true;
          noInput = true;
      }else if(data.isBadWord){
          dummyQuery = data.returnMsg;
          template = '<div style="color: red; ">PLEASE DON\'T USE SLANG. <br> TRY WITH SOME DIFFERENT KEYWORD.<div>';
          startVibrate();
      }else{
        template = data.returnMsg;
      }
      input = `
         <div>
             <div><strong style="padding-right: 3px;"><i>You:</i></strong>`+dummyQuery+`</div>
             <div style="font-size: 10px; float: right; ">
              `+inputTime+`
             </div>
         </div>
      `;

      if(data.displayType !== undefined && data.displayType === "horizontalSlide"){
          output = `
             <div style="">
                 <div class="scrollmenu" style="width: none; margin-bottom: -1rem;">`+template+`<div>

             </div>
          `;
      }else{
          output = `
             <div style="max-width: 350px; min-width: 150px;">
                 <div class="">`+template+`<div>
                 <div style="font-size: 10px; float: right;">
                    `+outputTime+`
                 </div>
             </div>
          `;
      }


      if(noInput){
        chatObject["input"] = '';
      }else{
        chatObject["input"] = input;
      }
      chatObject["output"] = output;
      $scope.showLoader = false;
      if(data.returnMsg != '' || data.returnMsg === undefined)
          $scope.chatContainer.push(chatObject);
      })

    // client.emit("send-updated-chat-container", {chatContainer : $scope.chatContainer});

 })

     client.on("change-request", function(data){
        //$scope.$apply(function(){
        console.log("change request object :: ", data.changeRequest);
        console.log("change request options :: ", data.emailChangeOptions);
        changeRequest = data.changeRequest;
        emailChangeOptions = data.emailChangeOptions;

        //})

     });

     client.on('email-change-request-response', function(data){
       $scope.$apply(function(){
        var d = new Date();
        var hr = d.getHours();
        var mnt = d.getMinutes();
        // var sec = d.getSeconds();
        var outputTime = hr+':'+mnt;

        var chatObject = {};
        var msg = '';
        var input = `
             <div>
                 <div>`+msg+`<div>
                 <p style="font-size: 10px; float: right; ">`+inputTime+`</p>
             </div>
        `;
        var output = `
             <div>
                 <div>`+data.returnMsg+`<div>
                 <p style="font-size: 10px; float: right;">`+outputTime+`</p>
             </div>
        `;
        if(data.returnMsg != '' ){
            chatObject["input"] = '';
            chatObject["output"] = output;
            $scope.chatContainer.push(chatObject);
        }

        // client.emit("send-updated-chat-container", {chatContainer : $scope.chatContainer});

        })
     });


     //================== [ end ] chat application flow  =======================

     $scope.openChatOptions = function(arg){
       console.log("calling open chat options...",arg);
       switch (arg) {
         case 'ChatBot':
         $scope.ChatRoomHome = true;
         $scope.liveChatRoom = false;
         $scope.groupChatRoom = false;
           break;
         case 'Default':
         $scope.ChatRoomHome = true;
         $scope.liveChatRoom = false;
         $scope.groupChatRoom = false;
           break;
         case 'LiveChat':
         $scope.ChatRoomHome = false;
         $scope.liveChatRoom = true;
         $scope.groupChatRoom = false;
         client.emit('fetch-active-users', {});
           break;
         case 'ChatRoom':
         $scope.ChatRoomHome = false;
         $scope.liveChatRoom = false;
         $scope.groupChatRoom = true;
           break;
         default:

       }

       return true;
     }

     client.on('fetch-active-users-response', function(data){
       $scope.$apply(function(){
           $scope.activeUsers = data.activeUsers;
           console.log("active users :: ", $scope.activeUsers);
       })
     });

     //========================   WEB APIS FUNCTIONS  =============================
     function initialize() {
       var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
       viewer.load('ISBN:1449355870');

     }
     google.books.setOnLoadCallback(initialize);

     window.onClickButtonAction = function(bookIsbn, bookTitle, bookImg, api){
       console.log("============ on click button action ==============");
       console.log("isbn: ", bookIsbn);
       console.log("title: ", bookTitle);
       console.log("bookImg : ", bookImg);
       console.log("@@@@ api : ", onClickButtonAction);
       if(title === "HACKER-NEWS:topstories"){

       }else{
         client.emit("add-book-to-shelf",{from: 'Gini', bookIsbn: bookIsbn, bookTitle: bookTitle, bookImg:bookImg, api: api});
       }
     }

     window.getBooksPreview = function(id, api){
         console.log("===============================");
         console.log("call get products by id : ", id);
         console.log("call get products by api : ", api);
         if(api === 'GOOGLE:books'){
             console.log("========  GOOGLE:books  ========= ");
             $("#GOOGLE_BOOKS_PREVIEW").modal();
             let customIsbn = 'ISBN:'+id;
             var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
             viewer.load(customIsbn);
         }else{
           let booksPreviewUrl = "https://archive.org/details/"+id+"/page/n1";
           document.getElementById("urlIframe").src = '';
           document.getElementById("urlIframe").src = booksPreviewUrl;
           $("#URLModal").modal();
         }

     }

     window.getProductsById = function(id, api){
        console.log("call get products by id : ", id);
        console.log("call get products by api : ", api);
        client.emit("find-products-by-id-request", {id : id , api: api, from: 'Gini'})
     }

     window.sendEmail = function(){
        // console.log("calling send email function...");
        let mailTo = document.getElementById("mailTo").value;
        let mailSubject = document.getElementById("mailSubject").value;
        let mailBody = document.getElementById("mailBody").value;
        let mailObj = {
          mailFrom : 'gini.assistant@gmail.com',
          mailTo : mailTo,
          mailSubject : mailSubject,
          mailBody : mailBody,
        }
        // document.getElementById("sendBtn").disabled = false;
        // document.getElementById("chatQuery").disabled = false;
        // document.getElementById("sendEmailBtn").disabled = true;
        client.emit("send-gini-email", {mailObject : mailObj});
     }

     window.webShare = function(title, text, url){
       console.log("title : ", title);
         console.log("=== calling web share function ===");
         console.log("title : ", title);
         console.log("text : ", text);
         console.log("url : ", url);

         if(navigator.share){
             console.log("==== supported web share ====");
             navigator.share({
               title : title,
               text : text,
               url : url,
             }).then((data) => {
                 console.log("thanks for sharingthe data.");
                 console.log("data : ", data);
             })
             .catch((err) => {
                 console.log("error occured when we are sharing the post.");
             })
         }
     }

     var getNetworkInformation = function(){
       var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
       var template = '';
       // console.log("connection :: ", connection);
       var type = connection.type;
       if(connection){
         template = `
              <div>
                  <div> <strong> Network type : </strong> `+connection.type+` </div>
                  <div> <strong> Effective network type : </strong> `+connection.effectiveType+` </div>
                  <div> <strong> Effective bandwidth : </strong> `+connection.downlink +` Mbps </div>
                  <div> <strong> Effective round-trip time : </strong> `+connection.rtt+` </div>

              </div>
         `;
       }
       return template;
     }

     //====================================== NEW ADDED FUNCTIONALITY ON OPEN MODAL FUNCTION  ======================================

     window.onOpenModal = function(url, type, api){
         console.log("==== call open modal function ====");
         console.log("== href value :: ", url);
         console.log("== type value :: ", type);
         console.log("== api name : ", api);

         if(type !== undefined && type !== null && type === 'newWindow'){
           window.open(url);
         }else if(type !== undefined && type !== null && type === 'openModalWithContent'){
           modalState = type;
           client.emit("open-modal-with-content-request", {url : url, api: api});
         }else if(type === "here map"){
            client.emit("here-map-api-request", {from : 'gini', placesCategory : url});
         }else if(type === "type_text"){
           document.getElementById("urlIframe").style.display = "none";
           document.getElementById("modalCloseBtn").style.display = "none";
           document.getElementById("modalDialog").style.marginTop = "50%";
           document.getElementById("modalContentBlock").style.width = "100%";
           document.getElementById("modalContent").style.textAlign = "center";
           document.getElementById("modalContent").style.marginTop = "-15px";
           document.getElementById("modalContent").style.color = "gray";
           document.getElementById("modalContent").style.fontWeight = "bold";
           document.getElementById("modalContent").innerHTML = url;
           $("#URLModal").modal();
         }else{
           document.getElementById("urlIframe").src = url;
           $("#URLModal").modal();
         }

     }

     client.on("open-modal-with-content-response", function(data){
         console.log("==== call open modal with content response ====");
         // console.log("open-modal-with-content-response :: ", data.template);
         if(modalState === 'openModalWithContent'){
             document.getElementById("urlIframe").style.display = "none";
             document.getElementById("modalContent").innerHTML = data.template;
             $("#URLModal").modal();
         }
         modalState = null;
     })

     var blockIdRefrence = null;
     window.onClickBlock = function(blockData, blockId){
         console.log("calling on click block fun ");
         console.log("clicked blockData :: ", blockData);
         console.log("clicked blockId :: ", blockId);
         if(blockIdRefrence){
           document.getElementById(blockIdRefrence).style.backgroundColor = "white";
           document.getElementById(blockIdRefrence).style.color = "grey";
         }

         blockIdRefrence = blockId;
         document.getElementById(blockId).style.backgroundColor = "darkcyan";
         document.getElementById(blockId).style.color = "white";

         client.emit("fetch-quiz-quistions-by-category", { categoryId :  blockId});
     }

     window.sendTwilioSms = function(){
        console.log("==== calling send twilio sms fun =====");
        let ph = document.getElementById("twilioPhNo").value;
        let sms = document.getElementById("twilioSms").value;
        client.emit("send-twilio-sms", {ph: ph, sms: sms});
     }

     window.onclickRadioBtn = function(api, itemIndex, value){
         console.log("apiname :: ", api);
         console.log("index :: ", itemIndex);
         console.log("value :: ", value);
         //quizUserCorrectAnswers[itemIndex] = value;
         let userRadioResponse = {};
         // let prevSelection = null;
         userRadioResponse.api = api;
         userRadioResponse.itemIndex = itemIndex;
         userRadioResponse.value = value;
         userRadioResponse.prevSelection = 'radioLabel-'+value;
         // quizUserCorrectAnswers.push(userRadioResponse);


         if(quizUserCorrectAnswers[itemIndex] !== undefined){
           prevSelection = quizUserCorrectAnswers[itemIndex].prevSelection;
           document.getElementById(prevSelection).style.color = "grey";
         }
         quizUserCorrectAnswers[itemIndex] = userRadioResponse;
         document.getElementById(userRadioResponse.prevSelection).style.color = "darkcyan";
         console.log("user correct answers : ", quizUserCorrectAnswers);
         let radioLabelId = "radioLabel-"+value;
         console.log("radio label value :: ", radioLabelId);

     }
     var quizAnalysis = {correct : 0};
     var quizCorrectAnswers = [];
     var quizUserCorrectAnswers = [];
     window.onClickEmptySlideSubmitBtn = function(apiName, idIndex){
         if(apiName === "quizApi"){
           // console.log("!!!!!!!quizCorrectAnswers : ", quizUserCorrectAnswers);

             console.log("!!!!!!!!!!quizAnalysis : ", quizAnalysis);
             // console.log("!!!!!!!!!!!!quizUserCorrectAnswers : ", quizUserCorrectAnswers);
             let submitBtnId = 'quizApi-submitbtn-'+idIndex;
             let submitBtnResponseId = 'quizApi-submitbtn-response-'+idIndex;
             let submitBtnResponseTemplate = '';
             let successFactors = ((quizAnalysis.correct * 100) / quizCorrectAnswers.length);
             console.log("@@@successFactors : ", successFactors);
             console.log("@@@ quizCorrectAnswers : ", quizCorrectAnswers);

             // quizCorrectAnswers.forEach((id) => {
             //    if(id !== undefined && id !== null){
             //      id = "radioLabel-"+id;
             //      console.log("@@ id : ", id);
             //      document.getElementById(id).style.color = "green";
             //    }
             // })


             console.log("!!!=== quizUserCorrectAnswers : ", quizUserCorrectAnswers);
             // quizUserCorrectAnswers.forEach((item, index) => {
             //   console.log("item : ", item);
             //     if(typeof(item) === 'object'){
             //         let id = item.prevSelection;
             //         document.getElementById(id).style.color = "red";
             //     }
             // });

             for (var i = 0; i < quizUserCorrectAnswers.length; i++) {
                 let radioLabelId = 'radioLabel-'+quizCorrectAnswers[i];
                 console.log("radioLabelId: ", radioLabelId);
                 console.log("== radioLabelId : ", radioLabelId);
                 // if(radioLabelId !== undefined && radioLabelId !== null && document.getElementById(radioLabelId).style !== null && document.getElementById(radioLabelId).style !== undefined && document.getElementById(radioLabelId).style.color !== undefined){
                 //   document.getElementById(radioLabelId).style.color = "green";
                 // }
                 if(typeof(quizUserCorrectAnswers[i]) === 'object' && (quizCorrectAnswers[i] === quizUserCorrectAnswers[i].value)){
                     quizAnalysis.correct = quizAnalysis.correct + 1;
                     let id = quizUserCorrectAnswers[i].prevSelection;
                     document.getElementById(id).style.color = "green";
                 }else if(typeof(quizUserCorrectAnswers[i]) === 'object' && (quizCorrectAnswers[i] !== quizUserCorrectAnswers[i].value)){
                     let id = quizUserCorrectAnswers[i].prevSelection;
                     document.getElementById(id).style.color = "red";
                 }else{

                 }
             }

             submitBtnResponseTemplate += `
                 <div style="color: teal;">
                     <center>YOUR QUIZ SCORE</center>
                     <div style="margin-top: 10px;">
                         <div>Correct Answers : `+quizAnalysis.correct+`</div>
                         <div>Inorrect Answers : `+(quizCorrectAnswers.length - quizAnalysis.correct)+`</div>
                         <div>Success % : `+successFactors+`</div>
                         <div style="margin-top: 10px; margin-left: 40px;">
                              <div >
                              	<div style="height: 10px; width: 10px; background-color: green; display: inline-block;"></div>
                                <span>Correct Answers</span>
                              </div>
                              <div >
                              	<div style="height: 10px; width: 10px; background-color: red; display: inline-block;"></div>
                                <span>Wrong Answers</span>
                              </div>
                         </div>
                     </div>
                 </div>
             `;

             document.getElementById(submitBtnId).style.display = "none";
             document.getElementById(submitBtnResponseId).style.display = "block";
             document.getElementById(submitBtnResponseId).innerHTML = submitBtnResponseTemplate;

         }
     }


});
