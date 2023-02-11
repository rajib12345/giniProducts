var user_sessions   = [];
var last_session_id = 0;


app.post('/webhook', function (req, res) {
 try {
   var data = req.body;
   console.log("++++++ fired post webhooks from fb....");
   console.log("\n\n++++++ after hit webhook the data :  ", JSON.stringify(data));
   console.log("\n\n");
   if (data.object == 'page') {
     var msg = data.entry[0].messaging[0];
     // -- get user FB id
     var user_FB_id = msg.sender.id;
     // -- create/get session id
     var session = get_session(user_FB_id);
     // -- iterate over each entry, there may be multiple if batched
     data.entry.forEach(function (pageEntry) {
       var pageID = pageEntry.id;
       var timeOfEvent = pageEntry.time;
       // -- iterate over each messaging event
       pageEntry.messaging.forEach(function (messagingEvent) {
         if (messagingEvent.message) {
           // console.log("messagingEvent.message :: ", messagingEvent.message);
            console.log("+++++ message event:: ", JSON.stringify(messagingEvent));
               if(messagingEvent.message.text === "hi" || messagingEvent.message.text === "hello"){
                   sendTextMessage(session.id, "oops something went wrong when hit the webhook.");
               }
         }
       });
     });
     // -- must send back a 200, within 20 seconds,
     // -- otherwise, FB will timeout the request.
     res.sendStatus(200);
   }
 } catch (e) {
       console.log("error occured when hit the webhook :: \n\n", e);
       sendTextMessage(session.id, "oops something went wrong when hit the webhook.")
 } finally {

 }

});

function get_session(user_FB_id) {
 var ret_session;
 try {
   // -- try locating the passed FB id in sessions array
   if (user_sessions.length > 0) {
     for (var i = 0; i < user_sessions.length; i++) {
       if (user_sessions[i].id == user_FB_id) {
         ret_session = user_sessions[i];
         break;
       }
     }
   }


   // -- not found, create new session
   if (!ret_session) {
     ret_session = {
       id: user_FB_id
     }
     user_sessions.push(ret_session);
   }
 } catch (err) {
   // write_error_log("in get_session()=>" + err);
 }
 return ret_session;
}

function clear_session(session) {

}

function sendTextMessage(recipientId, messageText) {
 /* -- Sends a text message using FB Send API. -- */
 var messageData = {
   recipient: {
     id: recipientId
   },
   message: {
     text: messageText,
     metadata: "DEVELOPER_DEFINED_METADATA"
   }
 };


 return callSendAPI(messageData);
}

function callSendAPI(messageData) {
 try {
   return new Promise(function (resolve, reject) {
     request({
       uri: 'https://graph.facebook.com/v2.6/me/messages',
       qs: { access_token: config.FB_PAGE_ACCESS_TOKEN },
       method: 'POST',
       json: messageData
     }, function (error, response, body) {
       try {
         if (!error && response.statusCode == 200) {
           var recipientId = body.recipient_id.toString();
           if(body.message_id !== undefined){
             var messageId = body.message_id.toString();
           }
           console.log("==================================================================");
           console.log("recipientId :: ", recipientId);
           console.log("messageId :: ", messageId);
           console.log("==================================================================");


             if (messageId) {
               // write_log("successfully sent message with id " + messageId + " to recipient " + recipientId + ".");
             } else {
               // write_log("Successfully called Send API for recipient " + recipientId);
             }


           resolve();
         } else {
           console.log("\n\n\nbody.error :: ", body.error);
           // sendTextMessage(session.id, "oops something went wrong when send api is calling.")
          // write_log("Failed calling Send API: ststus=>[" + response.statusCode + "] message=>[" + response.statusMessage + "] error=>[" + body.error + "].");
           reject(error);
         }
       } catch (e) {
           console.log("error occured :: ", e);
           //sendTextMessage(session.id, "oops something went wrong when send api is calling.")
       }
     });
   });
 } catch (e) {
     console.log("error occoured when calling send api...");
 } finally {
 }
}
