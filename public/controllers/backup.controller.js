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
    $scope.showLoader = false;
    $scope.showMike = true;
    $scope.ChatRoomHome = true;
    $scope.liveChatRoom = false;
    $scope.groupChatRoom = false;
    $scope.activeUsers = [];
    $scope.helpInfoItems = [
      "Hello",
      "todays weather",
      "Weather in kolkata ?",
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

    $scope.onClickHelpInfoItems = function(helpInfoTxt){
        var d = new Date();
        var hr = d.getHours();
        var mnt = d.getMinutes();
        // var sec = d.getSeconds();
        var ampm = (hr >= 12) ? "PM" : "AM";
        inputTime = hr+':'+mnt+" "+ampm;
        dummyQuery = helpInfoTxt;

        client.emit("query-request", {query : helpInfoTxt});
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
                   }else{
                      $scope.query = '';
                      document.getElementById("chatQuery").value = '';
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

     client.on("query-response", function(data){
        $scope.$apply(function(){
          // console.log("query response : ", data.returnMsg);
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
          if(data.returnMsg === "show-network-info"){
            template = getNetworkInformation();
          }else if(data.returnMsg && data.email !== undefined){
              console.log("=== send email functionality ...");
              template = data.returnMsg;
              // document.getElementById("sendBtn").disabled = true;
              // document.getElementById("chatQuery").disabled = true;
              noInput = true;
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
          output = `
             <div>
                 <div>`+template+`<div>
                 <div style="font-size: 10px; float: right;">
                    `+outputTime+`
                 </div>
             </div>
          `;

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
       // function updateConnectionStatus() {
       // console.log("Connection type changed from " + type + " to " + connection.type);
       // }
       //
       // connection.addEventListener('change', updateConnectionStatus);
       return template;
     }

});
