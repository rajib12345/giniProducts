
'use strict';




/* ------------------------------------------------------------ //
//      1800 Contacts reorder bot for FB messenger              //
// ------------------------------------------------------------ //
//
// -- 1. show actual lens images from API call
// -- 2. get promotions from API call
// -- 3. handle single eye lens cases
// -- 4. date format in card expiry date
// -- 5. paymentType: get visa/mastercard from it?
// -- 6. set actual lens attributes from the collection
// -- 7. price calculation logic
// -- 8. actual order place API call
//
// ------------------------------------------------------------ */


//------------  heroku upload commands -------------------------


// git add .
// git commit -m "description..."
// git push heroku master


//-----------------------------------------------------------------


var express = require('express');
var cool = require('cool-ascii-faces');
var bodyParser = require('body-parser');
//--------------------------------------------
var crypto = require('crypto');
var https = require('https');
var fs = require('fs');
var apiai = require('apiai');
//--------------------------------------------
var request = require('request');
var app = express();
var config = require('./config');
var prompts = require('./prompts');
var promise = require('promise');


var dummySessionToken = '';
//----------------------------------------------------
// const config = {
//   VERIFY_TOKEN: process.env.VERIFY_TOKEN || 'token',
//   PAGE_TOKEN: process.env.PAGE_TOKEN || 'token',
// }


//----------------------------------------------------


app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));


// views is directory for all template files
app.set('views', __dirname + '/views');


app.set('view engine', 'ejs');


app.get('/', function(request, response) {
 response.render('pages/index');
});


app.get('/cool', function(request, response) {
 response.send(cool());
});


//--------------------------------------- START FB INTEGRATE CODE HERE ------------------------------------


// -- NLP service agent
var nlp = apiai(config.APIAI_ACCESS_TOKEN);


var user_sessions   = [];
var last_session_id = 0;




app.get('/webhook', function(req, res) {
 console.log("-----  hit the webhook at heroku.com  ------");
 if (req.query['hub.mode'] === 'subscribe' &&
     req.query['hub.verify_token'] === "1800Contacts") {
   console.log("=============  Validating webhook  ===============");
   res.status(200).send(req.query['hub.challenge']);
   // res.send("sucessfull...");
 } else {
   console.error("Failed validation. Make sure the validation tokens match.");
   res.sendStatus(403);
 }


 // res.send("sucessfull...")
});


//----------------------------- START WORKING ON RUNNING THE EXISTING 1800-contacts PROJECT -------------------


app.get('/authorize', function(req, res) {
 // -- account linking called, show login page
 res.render('authorize');
});


app.post('/authorize', function(req, res) {
 //-- login page posts here --
 //var redirectURI = "https://www.messenger.com/messenger_platform/account_linking/?account_linking_token=ARSBZI68_S6vD4mESP8xq21f0YXlC4G4I2vmDq02NYLBz3XqJxv8TwaC0hDB3hInQPqe4TvnsgKilFWczXYGobJYMX4W7PuVbZRtCRrk0P9TdQ";
 var accountLinkingToken = req.query.account_linking_token;
 var redirectURI = req.query.redirect_uri;
 var uid = req.body.txtUID;
 var pwd = req.body.txtPwd;
 console.log("req.url :: ", req.url);
 console.log("req.query :: ", req.query);
 // console.log("req.originalUrl :: ", req.originalUrl);
 console.log("req.body :: ", req.body);
 console.log("+++ accountLinkingToken : ", accountLinkingToken);
 console.log("+++ redirectURI : ", redirectURI);
 console.log("+++ Authorization token : ", req.body.Authorization);
 console.log("autthorization code: ", req.body.sessionId);
 redirectURI = redirectURI + "&authorization_code=" + req.body.sessionId;
 doLogin(uid, pwd, redirectURI, accountLinkingToken, res);
 //res.redirect(redirectURI);  //sendTextMessage(id, "calling account linking function....")
});


app.post('/fblogin', function(req, res) {
 //-- login page posts here --
 console.log("request.query :: ", req.query);
 console.log("request.query :: ", req.params);
 console.log("request.query :: ", req.body);




 console.log("+++++++ after sucessfull authentication hits the postback url......");
 var accountLinkingToken = req.query.account_linking_token;
 var redirectURI = req.query.redirect_uri;
 console.log("====== accountLinkingToken : ", accountLinkingToken);
 console.log("====== redirectURI : ", redirectURI);
 console.log("====== Authorization token : ", req.body.Authorization);
 redirectURI = redirectURI + "&authorization_code=" + req.body.Authorization;


});


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
         if(messagingEvent.read !== undefined){
             try {
               console.log("---- read event is calling---- ");
               if(messagingEvent.read.seq === 0){
                   console.log("--- calling read event seq zero event from delivery messaging----");
                   // sendTypingOnAction(session.id);
                   // sendTypingOffAction(session.id);
                   // sendActionMessage(session.id, "typing_on").then(function(){
                   //     sendActionMessage(session.id, "typing_off");
                   // })
                   sendActionMessage(session.id, "typing_off");




                   return;
                   //sendTextMessage(session.id, "opps something went wrong when hitting the webhook ");
               }
             } catch (e) {
                 console.log("error occured when hit the web hook :: \n\n", e);
                 sendTextMessage(session.id, "opps something went wrong when hitting the webhook ");
                 return ;
             }


         }


         if(messagingEvent.delivery !== undefined && messagingEvent.delivery !== null){
             try {
               console.log("---- read event is calling---- ");
               if(messagingEvent.delivery.seq === 0){


                   console.log("--- calling read event seq zero event ----");
                   // sendTypingOnAction(session.id);
                   // sendTypingOffAction(session.id);
                   // sendActionMessage(session.id, "typing_on").then(function(){
                   //     sendActionMessage(session.id, "typing_off");
                   // })
                   sendActionMessage(session.id, "typing_off");
               }
             } catch (e) {
                 console.log("error occured when hit the web hook :: \n\n", e);
                 sendTextMessage(session.id, "opps something went wrong when hitting the webhook ");
                 // return ;
             }


         }




         if (messagingEvent.message) {
           // console.log("messagingEvent.message :: ", messagingEvent.message);
            console.log("+++++ message event:: ", JSON.stringify(messagingEvent));
               if(messagingEvent.message.text === "hi" || messagingEvent.message.text === "hello"){
                   sendTypingOnAction(session.id);
                   //sendGreetingText();
                   showWelcome(session);


               }else if(messagingEvent.message.quick_reply){
                   sendTypingOnAction(session.id);
                   process_quick_replies_buttons(session, messagingEvent.message);
               }else{
                   sendTypingOnAction(session.id);
                   process_text_response(session, messagingEvent.message);
               }
         } else if (messagingEvent.postback) {
           sendTypingOnAction(session.id);
           receivedPostback(messagingEvent);
         } else if (messagingEvent.account_linking) {
           console.log("\n\n==========================================================\n\n");
           console.log("++++ fired account_linking event on fb.....");
           console.log("\n\n==========================================================\n\n");
           sendTypingOnAction(session.id);
           receivedAccountLink(session, messagingEvent);
         } else if (messagingEvent.optin) {
           sendTypingOnAction(session.id);
           receivedAuthentication(messagingEvent);
         } else if (messagingEvent.delivery) {
           doNothing();
         } else if (messagingEvent.read) {
           doNothing();
         } else {
           write_log("webhook received unknown messagingEvent: [" + messagingEvent + "].");
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
 var data = req.body;


 // -- make sure this is a page subscription


});


/* ====================== [ MESSAGE RECEIVED HANDLERS ] ====================== */
//sendGreetingText();


function receivedMessage(session, event) {
 var senderID = event.sender.id;
 var recipientID = event.recipient.id;
 var timeOfMessage = event.timestamp;
 var message = event.message;


 write_log("received message " + JSON.stringify(message) + " from user " + senderID + ".");


 var isEcho = message.is_echo;
 var messageId = message.mid;
 var appId = message.app_id;
 var metadata = message.metadata;


 // You may get a text or attachment but not both
 var messageText = message.text;
 var messageAttachments = message.attachments;
 var quickReply = message.quick_reply;


 if (isEcho) {
   console.log("Received echo for message %s and app %d with metadata %s", messageId, appId, metadata);
   return;
 } else if (quickReply) {
   console.log("Quick reply for message %s with payload %s", messageId, quickReply.payload);
   sendTextMessage(senderID, "Quick reply tapped");
   return;
 }


 if (messageText) {
   // -- received a text message
   process_text_message(session, messageText);
 } else if (messageAttachments) {
   // -- received an attachment message
   sendTextMessage(senderID, "Sorry, I don't handle this kind of attachment messages.");
 }
}


function receivedPostback(event) {


 var senderID = event.sender.id;
 var recipientID = event.recipient.id;
 var timeOfPostback = event.timestamp;
 console.log("+++++  received postback is calling....");
 // -- create/get session id
 var session = get_session(senderID);


 var payload_string = event.postback.payload;
 var payload = JSON.parse(event.postback.payload);


 if (payload) {
   switch (payload.action) {
     case "startFlow.ok":
       console.log("+++++  within switch case: starts flow.ok....");
       sendTypingOnAction(session.id);
       beginOrderFlow(session);
     break;


     case "login.ok":
       console.log("+++++  within switch case: login.ok....");
       sendTypingOnAction(session.id);
       sendAccountLinking(session.id, prompts.loginHeding);
     break;


     case "showPatients.ok":
       // sendPatientList(session);
       sendTypingOnAction(session.id);
       fetchLastOrderDetails(session);
     break;


     case "confirmOrder.ok":
       sendTypingOnAction(session.id);
       fetchLastOrderDetails(session);


     break;


     case "single-user-order-confirmation-ok":
           sendTypingOnAction(session.id);
           processSingleUserConfirmOrder(session);
     break;


     case "multiple-user-order-confirmation-ok":
             sendTypingOnAction(session.id);
             processMultipleUserConfirmOrder(session);
     break;


     case "multiple-user-make-changes-to-order-ok":
               sendTypingOnAction(session.id);
               makeChangesToOrder(session);
     break;


     case "makeChangesToOrder":
           let msg = "What do you want to change ?";
           sendTypingOnAction(session.id);
           makeChangesToOrder(session);
     break;            //beginOrderFlow(session);




     case "updateContactsPaymentMethod":


           sendTypingOnAction(session.id);
           updateContactsPaymentMethod(session, payload);
     break;


     case "updateContactsShippingOptions":


           console.log("----- ship ############################ -----");
           sendTypingOnAction(session.id);
           updateContactsShippingOptions(session, payload);


     break;


     case "updateContactsDeliveryAddress":
           console.log("----- delivery ##### -----");
           sendTypingOnAction(session.id);
           updateContactsDeliveryAddress(session, payload);
     break;


     case "orderConfirmation.ok":
       sendTextMessage(session.id, prompts.onOrderAccepted).then(function () {
         sendInvoice(session);
       });
     break;


     case "cancel.general":
       sendTypingOnAction(session.id);
       sendTextMessage(session.id, prompts.onCancelGeneral);
     break;


     case "processMultipleAddUser":
             console.log("----- add user ############################ -----");
             sendTypingOnAction(session.id);
             process_multiple_add_user_response(session);
     break;


     case "placeAnotherReorder":
           console.log("\n\n=========  calling the place another order within switch case ==========");
           sendTypingOnAction(session.id);
           onSuccessfulLogin(session);
     break;


     case "processNopeAllDone":
           console.log("\n\n=========  calling the Nope all done order within switch case ==========");
           sendTypingOnAction(session.id);
           processNopeAllDone(session);
     break;


     case "onGetStartedButton":
           console.log("\n\n=========  calling the Nope all done order within switch case ==========");
           sendTypingOnAction(session.id);
           sendTextMessage(session.id, "clicked on get started button.")
     break;




     default:
       sendTextMessage(session.id, "Postback called 01");
     break;
   }
 } else {
   console.log("received postback for user %d and page %d with payload '%s' " + "at %d", senderID, recipientID, payload, timeOfPostback);
   sendTextMessage(senderID, "Postback called");
 }
}


function receivedAccountLink(session, event) {
 console.log("======= received account linking function is calling =======");
 var senderID = event.sender.id;
 var recipientID = event.recipient.id;


 var status = event.account_linking.status;
 var authCode = event.account_linking.authorization_code;
 console.log("++++ sucessfully calling received account linking.....");
 write_log("received account link callback event for user [" + senderID + "] with status [" + status + "] and auth code [" + authCode + "].");


 if (status == 'linked') {
   //session.authCode = authCode;
   console.log("++++ sucessfully calling received account linking with param linked......");
   //session.authCode = 'Token token="ef7b40ca-015c-4492-937a-ae6301278704"';
   //storePaymentMethods(session);
   session.auth_code = dummySessionToken;
   onSuccessfulLogin(session);
   //beginOrderFlow(session);
 } else {
   session.authCode = "";
   console.log("++++ sucessfully calling received account linking with param unlinked......");
   sendAccountLinking(session.id, prompts.onLoginFailure);
 }
}


function receivedAuthentication(event) {
 var senderID = event.sender.id;
 var recipientID = event.recipient.id;
 var timeOfAuth = event.timestamp;


 var passThroughParam = event.optin.ref;


 write_log("received authentication for user %d and page %d with pass " + "through param '%s' at %d", senderID, recipientID, passThroughParam, timeOfAuth);


 // send a message back to the sender to notify that it was successful
 sendTextMessage(senderID, "Authentication successful");
}


var receivedQuickReplies = function(event){
   var senderID = event.sender.id;
   var recipientID = event.recipient.id;
   var timeOfPostback = event.timestamp;
   console.log("+++++  received quick replies postback is calling....");
   console.log("+++++  event : ", JSON.stringify(event));
   // -- create/get session id
   var session = get_session(senderID);
}


/* ============================ [ G E N E R A L  F U N C T I O N S ] ============================ */


// -- data access ---------------
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
       id: user_FB_id,
       customerNumber: "",
       authCode: "",
       firstName: "",
       lastName: "",
       fullName: "",
       phoneNumber: "",
       patients: [],
       shippingAddresses: [],
       payMethods: [],
       shippingOptions: [],
       orderTotal: 0,
       orderShippingAddress: null,
       orderPayMethod: null,
       orderShippingOption: null,
       RxCapture: "",
       orderItems: [],
       context: "",
       updatedQuantity : {},
       selectedBothEyeFlag : 0,
       selectedBoth_rightEye : 0,
       currentUsage : {}


     }
     user_sessions.push(ret_session);
   }
 } catch (err) {
   write_error_log("in get_session()=>" + err);
 }


 return ret_session;
}


function clear_session(session) {
 session.patients = [];
 session.shippingAddresses = [];
 //session.payMethods = [];
 session.shippingOptions = [];
 session.orderTotal = 0;
 session.orderShippingAddress = null;
 session.orderPayMethod = null;
 session.orderShippingOption = null;
 session.RxCapture = "";
 session.orderItems = [];
 session.context = "";
}


// -- 1800 API calls ----------
function doLogin(uid, pwd, rd_url, fb_al_token, res) {
 var auth_code;
 var redirect_url = rd_url;


 var creds = {
   Password: 123456,
 UserName: uid
 }


 request({
   uri: (config.C1800_API_BASE_URL + '/account/session/?createAccount=false'),
   method: 'POST',
   headers: {
     apikey: config.C1800_API_KEY
   },
   json: creds
 }, function (error, response, body) {
   if (!error && response.statusCode == 200) {
     if (body.Result) {
       // auth_code = body.Result.AutoSignInToken;
       auth_code = body.Result.SessionToken;
       dummySessionToken = body.Result.SessionToken;
       if ( (auth_code) && (auth_code.length > 0) ) {
         console.log("");
         redirect_url = redirect_url + "&authorization_code=" + auth_code;
         console.log("redirect url: ", redirect_url);
         console.log("auth_code :: ", auth_code);
         //beginOrderFlow();
       } else {
         write_log("login failed for [" + uid + "/" + pwd + "] RC03.");
       }
     } else {
       write_log("login failed for [" + uid + "/" + pwd + "] RC02.");
     }
   } else {


     console.log("====== error occured in login : ", error);
     write_error_log("error in calling login API for [" + uid + "/" + pwd + "] RC01.");
   }
   console.log("=====================  *******  =====================");
   res.redirect(redirect_url);
 });
}

function fetchLastOrderDetails(session) {
 clear_session(session);
 var sessionToken = "64f5ffd2-07c9-4c0c-8902-60694dfa6cad";
 request({
   uri: (config.C1800_API_BASE_URL + '/customer/lastOrder/'),
   method: 'GET',
   headers: {
     apikey: config.C1800_API_KEY,
     Authorization: 'Token token="'+sessionToken+'"'
   },
   json: {}
 }, function (error, response, body) {
   if (!error && response.statusCode == 200) {
     try {
       var patients = [];
       var current_patient;
       var prescription;
       console.log("type of body: ", typeof(body));
       //body = JSON.parse(body);
       console.log("last order total: ", body.OrderTotal);
       console.log("type of body: ", typeof(body));
       session.lastOrderDetails = body;
       console.log("++++++  sucessfully fetch last order details....");
       console.log("++++++  result body: ", body);
       // -- customer general info --


       if (session.lastOrderDetails.patients.length > 0) {
         // session.patients = patients;
         // session.orderItems = [];
         return showPrescriptionList(session, 0);
       } else {
         session.patients = [];
         return sendTextMessage(session.id, prompts.onNoPrescriptionFound);
       }
     } catch (err) {
       console.log("\n\n\n\n=======  error: \n\n\n\n", err);
       write_error_log("error in processing customer API response for [" + session.id + "]: " + err);
       return sendTextMessage(session.id, prompts.errMsgGeneric);
     }
   } else {
     if (error) {
       console.log("++++++ error occours when accessing the last order details....");
       write_error_log("error in calling customer API for [" + session.id + "]: " + error);
     } else {
       write_error_log("invalid status code returned by customer API for [" + session.id + "]: " + response.statusCode);
     }
     return sendTextMessage(session.id, prompts.errMsgGeneric);
   }
 });
}


function storePaymentMethods(session) {
 request({
   uri: (config.C1800_API_BASE_URL + '/customer/payments/?showGoogleWallet=false'),
   method: 'GET',
   headers: {
     apikey: config.C1800_API_KEY,
     Authorization: session.authCode
   },
   json: {}
 }, function (error, response, body) {
   if (!error && response.statusCode == 200) {
     try {
       var pay_methods = [];


       body.Result.forEach(function (pay_method) {
         if (pay_method.IsExpired == false) {
           pay_methods.push(pay_method);
         }
       });


       session.payMethods = pay_methods;
     } catch (err) {
       write_error_log("error in processing payment method API response for [" + session.id + "]: " + err);
     }
   } else {
     if (error) {
       write_error_log("error in calling payment method API for [" + session.id + "]: " + error);
     } else {
       write_error_log("invalid status code returned by payment method API for [" + session.id + "]: " + response.statusCode);
     }
   }
 });
}


// -- fixed text command handling -----------
function process_text_message(session, messageText) {
 // sendPatientList(session, prompts.onGreetings);
 fetchLastOrderDetails(session, prompts.onGreetings);


}


// -- general functions -------
function showWelcome(session) {
 console.log("-------  calling the show welcome function --------");
 var card = [{
   title: prompts.cardFirstTimeWelcome.caption,
   buttons: [{
     type: "postback",
     title: prompts.cardFirstTimeWelcome.options[0],
     payload: JSON.stringify({
       action: "startFlow.ok"
     })
   }
 ]
 }];


 sendCardMessage(session.id, card);
}


// function onSuccessfulLogin(session) {
//   // console.log("++++ on sucessfull login : "+session.lastOrderDetails.Patients[0].FirstName);
//   console.log("\n\n========= calling onSuccessfulLogin function =========\n\n");
//   //beginOrderFlow(session);
//   var msg = prompts.cardOnSuccessfulLogin.caption;
//
//   var buttons = [{
//     type: "postback",
//     title: prompts.cardOnSuccessfulLogin.options[0],
//     payload: JSON.stringify({
//       action: "confirmOrder.ok"
//     })
//   }, {
//     type: "postback",
//     title: prompts.cardOnSuccessfulLogin.options[1],
//     payload: JSON.stringify({
//       action: "makeChangesToPrevOrder.ok"
//     })
//   }]
//
//   sendButtonMessage(session.id, msg, buttons);
// }


function onSuccessfulLogin(session) {
 console.log("\n\n========= calling onSuccessfulLogin function =========\n\n");
 console.log("\n\nsession :: \n\n", session);
 sendTypingOnAction(session.id);
 fetch_last_order_details(session.auth_code).then(function(result){
     console.log("fetched lastOrderData order total : ", result.OrderTotal);
     session.lastOrderDetails = result;
     session.activeUser = session.lastOrderDetails.Patients[0].FirstName+" "+session.lastOrderDetails.Patients[0].LastName;
     showLastOrderDetails(session, 0);
     //onSuccessfulLogin(session);
 })
}


function showPrescriptionList(session, index) {
 try {
   console.log("++++ calling show prescription list.....");
   console.log("+++ session :: ", session);
   if (session.lastOrderDetails.Patients.length === 1) {
     var prescription = session.lastOrderDetails.Patients[0];
     console.log("+++  first name: ",prescription.FirstName);
     if (prescription) {
       let msg = "Prescription for " + prescription.FirstName + ":";
       sendTextMessage(session.id, msg).then(function () {
         var card1 = [{
         title: "Right Eye: ",
         image_url: config.SERVER_URL + "/assets/air_optics.jpg",
         subtitle: "showing the power",}];
         // -- show card for right eye --
         return sendCardMessage(session.id, card1);
       })
       .then(function () {
         var card2 = [{
           title: "Left Eye: ",
           image_url: config.SERVER_URL + "/assets/av_define.png",
           subtitle: "showing the power",
           buttons: [{
             type: "postback",
             title: "Confirm Order",
             payload: JSON.stringify({
               action: "confirmOrder.ok",
               //pid: prescription.prescriptionId
             })
           },{
             type: "postback",
             title: "Make Changes To Previous Order",
             payload: JSON.stringify({
               action: "makeChangesToPreviousOrder",
               //pid: prescription.prescriptionId
             })
           }
         ]
         }];
         // -- show card for right eye --
         return sendCardMessage(session.id, card2);
       })
     }
   }else{
       // fetch multiple last order details
   }
 } catch (e) {
       console.log("error occured when processing last order details :: ", e);
       sendTextMessage(session.id, "oops something went wrong when processing the last order details.");
 } finally {


 }


}


// ===============================================  CUSTOM PROCESSING FUNCTIONS  =================================


var fetch_delivery_address_details = function(sessionToken){
 var p = new promise(function(resolve, reject){
   // var sessionToken = "64f5ffd2-07c9-4c0c-8902-60694dfa6cad";
   //var sessionToken = "6158963c-68c1-4382-b97c-80a948a8cc46";


     try{
       var options = {
             method: 'GET',
             url : 'https://services.1800contactstest.com/MobileService/4/customer/',
             qs: { showGoogleWallet: 'false' },
              headers : {
                  apikey: 'gingerbread',
                  authorization : 'Token token="'+sessionToken+'"',
             }
         };


         request(options, function (error, response, body) {
             var returnMsg = '';
             if (error) {
                 throw new Error(error);
                 console.log("when accessing last order details : ", error);
             }else{
               var data = JSON.parse(body);
               resolve(data);
             }
         });
     }catch(err){
       console.log("catch error: ", err);
     }
 });
 return p;


}


var fetch_contacts_payments_details = function(sessionToken){
 var p = new promise(function(resolve, reject){
   // var sessionToken = "64f5ffd2-07c9-4c0c-8902-60694dfa6cad";
   //var sessionToken = "6158963c-68c1-4382-b97c-80a948a8cc46";


     try{
       var options = {
             method: 'GET',
             url : 'https://services.1800contactstest.com/MobileService/4/customer/payments/',
             qs: { showGoogleWallet: 'false' },
              headers : {
                  apikey: 'gingerbread',
                  authorization : 'Token token="'+sessionToken+'"',
             }
         };


         request(options, function (error, response, body) {
             var returnMsg = '';
             if (error) {
                 throw new Error(error);
                 console.log("when accessing last order details : ", error);
             }else{
               console.log("sucessfully fetch last order data....");
               var data = JSON.parse(body);
               resolve(data.Result);


             }
         });




     }catch(err){
       console.log("catch error: ", err);
     }
 });
 return p;


}


var fetch_last_order_details = function(sessionToken){
     try {
       console.log("\n\n====== calling fetch last order details =======\n\n");
       console.log("\n\nsessionToken :: \n\n", sessionToken);
       var p = new promise(function(resolve, reject){
         //var sessionToken = "64f5ffd2-07c9-4c0c-8902-60694dfa6cad";
         //var sessionToken = "6158963c-68c1-4382-b97c-80a948a8cc46";
           try{
             var options = {
                   method: 'GET',
                   url : 'https://services.1800contactstest.com/MobileService/4/customer/lastOrder/',
                   headers : {
                        apikey: 'gingerbread',
                        authorization : 'Token token="'+sessionToken+'"',
                   }
               };


               request(options, function (error, response, body) {
                   var returnMsg = '';
                   if (error) {
                       throw new Error(error);
                       console.log("when accessing last order details : ", error);
                   }else{
                     console.log("sucessfully fetch last order data....");
                     var data = JSON.parse(body);
                     resolve(data);


                   }
               });




           }catch(err){
             console.log("catch error: ", err);
           }
       });
       return p;
     } catch (e) {
         console.log("error occured when calling place another re-order.");
         sendTextMessage(session.id, "oops something went wrong when processing the place another re-order.")
     }


}


var fetch_contacts_shipping_options = function(sessionToken){
 var p = new promise(function(resolve, reject){
   // var sessionToken = "64f5ffd2-07c9-4c0c-8902-60694dfa6cad";
   // /var sessionToken = "6158963c-68c1-4382-b97c-80a948a8cc46";


     try{
       var options = {
             method: 'GET',
             url : 'https://services.1800contactstest.com/MobileService/4/customer/lastOrder/',
             headers : {
                  apikey: 'gingerbread',
                  authorization : 'Token token="'+sessionToken+'"',
             }
         };


         request(options, function (error, response, body) {
             var returnMsg = '';
             if (error) {
                 throw new Error(error);
                 console.log("when accessing last order details : ", error);
             }else{
               var data = JSON.parse(body);
               resolve(data.ShippingOptions);


             }
         });




     }catch(err){
       console.log("catch error: ", err);
     }
 });
 return p;
}


var fetch_contacts_customer_details = function(sessionToken){
 var p = new promise(function(resolve, reject){
   //var sessionToken = "64f5ffd2-07c9-4c0c-8902-60694dfa6cad";
   //var sessionToken = "6158963c-68c1-4382-b97c-80a948a8cc46";


     try{
       var options = {
             method: 'GET',
             url : 'https://services.1800contactstest.com/MobileService/4/customer/',
             headers : {
                  apikey: 'gingerbread',
                  authorization : 'Token token="'+sessionToken+'"',
             }
         };


         request(options, function (error, response, body) {
             var returnMsg = '';
             if (error) {
                 throw new Error(error);
                 console.log("when accessing last order details : ", error);
             }else{
               var data = JSON.parse(body);
               resolve(data);


             }
         });




     }catch(err){
       console.log("catch error: ", err);
     }
 });
 return p;
}


var process_contacts_confirm_order = function(sessionToken, placeOrderObject){
 var p = new promise(function(resolve, reject){
   // var sessionToken = "64f5ffd2-07c9-4c0c-8902-60694dfa6cad";
   //var sessionToken = "6158963c-68c1-4382-b97c-80a948a8cc46";


     try{
       var options = {
           method: 'POST',
           url : 'https://services.1800contactstest.com/MobileService/4/order/',
           headers : {
                apikey: 'gingerbread',
                authorization : 'Token token="'+sessionToken+'"',
           },
           json: placeOrderObject,
       };
         request(options, function (error, response, body) {
             var returnMsg = '';
             if (error) {
                 throw new Error(error);
                 console.log("when accessing last order details : ", error);
             }else{
               console.log("sucessfully fetch last order data....");
               var data = JSON.stringify(body);
               resolve(body);


             }
         });




     }catch(err){
       console.log("catch error: ", err);
     }
 });
 return p;
}




// function beginOrderFlow(session) {
//   console.log("++++ session :: ", session);
//   console.log("++++ session.authcode :: ", session.authCode);
//   if (session.authCode.length > 0) {
//     console.log("++++++ begin order flow.....");
//     sendTextMessage(session.id, prompts.beginOrderRetUser).then(function () {
//       //showLastOrderDetails(session, 0);
//       beginOrderFlow(session);
//       //sendPatientList(session);
//     });
//   } else {
//     console.log("++++++ resend for the login request.....");
//     sendRequestToLogin(session.id);
//      //newSendRequestToLogin(session.id);
//   }
// }
//


// function beginOrderFlow(session) {
//   console.log("++++ session :: ", session);
//   fetch_last_order_details().then(function(result){
//       console.log("fetched lastOrderData order total : ", result.OrderTotal);
//       session.lastOrderDetails = result;
//       session.activeUser = session.lastOrderDetails.Patients[0].FirstName+" "+session.lastOrderDetails.Patients[0].LastName;
//       // if(session.lastOrderDetails.Patients.length === 1){
//       //     session.userType = "singleUser";
//       // }else if(session.lastOrderDetails.Patients.length > 1){
//       //   session.userType = "multiUser";
//       // }
//       showLastOrderDetails(session, 0)
//       //onSuccessfulLogin(session);
//   })
// }


function beginOrderFlow(session) {
 console.log("++++ session :: ", session);
 if (session.authCode.length > 0) {
   session.auth_code = dummySessionToken;
   fetch_last_order_details(session.auth_code).then(function(result){
       console.log("fetched lastOrderData order total : ", result.OrderTotal);
       session.lastOrderDetails = result;
       session.activeUser = session.lastOrderDetails.Patients[0].FirstName+" "+session.lastOrderDetails.Patients[0].LastName;
       showLastOrderDetails(session, 0)
       //onSuccessfulLogin(session);
   })


 } else {
   console.log("++++++ resend for the login request.....");
   sendRequestToLogin(session.id);
    //newSendRequestToLogin(session.id);
 }
}


function showLastOrderDetails(session, index) {
 try{
   console.log("++++ calling show last order details list.....");
   console.log("+++ session :: ", session);
   // if (session.lastOrderDetails.Patients.length === 1) {
     // --- creating last order details for the single user ---
     for (let i = 0; i < session.lastOrderDetails.Patients.length; i++) {
       var prescription = session.lastOrderDetails.Patients[i].Prescriptions[0];
       console.log("+++  first name: ",session.lastOrderDetails.Patients[i].FirstName);
       if (prescription) {
         var elementsArr = [];
         var shipObj = '';
         var rightLensDetails = '';
         var leftLensDetails = '';
         var order_number = "OCOR" + Math.floor(Math.random()*1000);
         var paymentMethod = 'xxxx';
         if(prescription.LeftItem !== null){
             leftLensDetails = {
               title : "Left Lens",
               subtitle : prescription.LeftItem.BrandName,
               quantity : prescription.LeftItem.Quantity,
               price : prescription.LeftItem.UnitPrice,
               currency : "USD",
               image_url : config.SERVER_URL + "/assets/air_optics.jpg"
             }
             // leftLensDetails = JSON.stringify(leftLensDetails);
             elementsArr.push(leftLensDetails);
         }
         if(prescription.RightItem !== null){
             rightLensDetails = {
               title : "Left Lens",
               subtitle : prescription.RightItem.BrandName,
               quantity : prescription.RightItem.Quantity,
               price : prescription.RightItem.UnitPrice,
               currency : "USD",
               image_url : config.SERVER_URL + "/assets/air_optics.jpg"
             }
             // rightLensDetails = JSON.stringify(rightLensDetails);
             elementsArr.push(rightLensDetails);
         }
         if(session.lastOrderDetails.ShippingAddress !== null){
           shipObj = {
               street_1 : session.lastOrderDetails.ShippingAddress.Address.Address1,
               street_2 : session.lastOrderDetails.ShippingAddress.Address.Address2,
               city : session.lastOrderDetails.ShippingAddress.Address.City,
               postal_code : session.lastOrderDetails.ShippingAddress.Address.PostalCode,
               state : session.lastOrderDetails.ShippingAddress.Address.State,
               country : session.lastOrderDetails.ShippingAddress.Address.Country
             }
           // shipObj = JSON.stringify(shipObj);
         }
         if(session.lastOrderDetails.Payment !== undefined && session.lastOrderDetails.Payment !== null){
             paymentMethod = session.lastOrderDetails.Payment.LastFour;
         }
         var payloads = {
                 template_type:"receipt",
                 recipient_name: session.lastOrderDetails.Patients[i].FirstName,
                 order_number: order_number,
                 currency: "USD",
                 payment_method: paymentMethod,
                 order_url: "",
                 timestamp: Math.floor(Date.now() / 1000).toString(),
                 elements: elementsArr,
                 address : shipObj,
                 summary : {
                   subtotal : session.lastOrderDetails.LineItemSubTotal,
                   shipping_cost: session.lastOrderDetails.ShippingOptions[0].CostBeforeDiscount,
                   total_tax : session.lastOrderDetails.Tax,
                   total_cost : (session.lastOrderDetails.OrderTotal).toFixed(2)
                 },
                 adjustments :[]
             }
             // payloads = JSON.stringify(payloads);
             var msg = 'What do you want to do next ?';
             var buttons = [
               {
               type: "postback",
               title: prompts.cardOnSuccessfulLogin.options[0],
               payload: JSON.stringify({
                 action: "single-user-order-confirmation-ok",
               })
             },
             {
               type: "postback",
               title: prompts.cardOnSuccessfulLogin.options[1],
               payload: JSON.stringify({
                 // action: "single-user-make-changes-to-order-ok"
                  action: "makeChangesToOrder"


               })
             },
           ]
           // -- showing the last order details --
           sendActionMessage(session.id, "typing_on").then(function(){
               let headingMsg = "Perfect, "+session.lastOrderDetails.Patients[i].FirstName+" You’re all signed in. \nHere’s your most recent order:";
               sendTextMessage(session.id, headingMsg).then(function(){
                   sendReceiptMessage(session.id, payloads).then(function(){
                       sendButtonMessage(session.id, msg, buttons);
                 })
               })


           })


         }
     }


 }catch(err){
     console.log("error occoured when showing last order detailos: ", err);
     sendTextMessage(session.id, "oops something went wrong when showing last order details.")
 }


}


var process_order_placed_invoice = function(session, orderPlaceResponse){
   console.log("----- calling generate invoice -----");
   console.log("order total : ", orderPlaceResponse.Result.OrderTotal);
   try {
     if (orderPlaceResponse.Result.Patients.length === 1) {
       // --- creating last order details for the single user ---


       var prescription = orderPlaceResponse.Result.Patients[0].Prescriptions[0];
       console.log("+++  first name: ",orderPlaceResponse.Result.Patients[0].FirstName);
       if (prescription) {
         var elementsArr = [];
         var shipObj = '';
         var rightLensDetails = '';
         var leftLensDetails = '';
         var order_number = "OCOR" + Math.floor(Math.random()*1000);
         console.log("----- send the payloads to the function ----1");


         if(prescription.LeftItem !== null){
             leftLensDetails = {
               title : "Left Lens",
               subtitle : prescription.LeftItem.BrandName,
               quantity : prescription.LeftItem.Quantity,
               price : prescription.LeftItem.UnitPrice,
               currency : "USD",
               image_url : config.SERVER_URL + "/assets/air_optics.jpg"
             }
             // leftLensDetails = JSON.stringify(leftLensDetails);
             elementsArr.push(leftLensDetails);
         }
         console.log("----- send the payloads to the function ----2");


         if(prescription.RightItem !== null){
             rightLensDetails = {
               title : "Left Lens",
               subtitle : prescription.RightItem.BrandName,
               quantity : prescription.RightItem.Quantity,
               price : prescription.RightItem.UnitPrice,
               currency : "USD",
               image_url : config.SERVER_URL + "/assets/air_optics.jpg"
             }
             // rightLensDetails = JSON.stringify(rightLensDetails);
             elementsArr.push(rightLensDetails);process_order_placed_invoice
         }
         console.log("----- send the payloads to the function ----3");


         if(orderPlaceResponse.Result.ShippingAddress !== null){
           shipObj = {
               street_1 : orderPlaceResponse.Result.ShippingAddress.Address.Address1,
               street_2 : orderPlaceResponse.Result.ShippingAddress.Address.Address2,
               city : orderPlaceResponse.Result.ShippingAddress.Address.City,
               postal_code : orderPlaceResponse.Result.ShippingAddress.Address.PostalCode,
               state : orderPlaceResponse.Result.ShippingAddress.Address.State,
               country : orderPlaceResponse.Result.ShippingAddress.Address.Country
             }
           // shipObj = JSON.stringify(shipObj);
         }
         console.log("----- send the payloads to the function ----4");
         var payloads = {
                 template_type:"receipt",
                 recipient_name: orderPlaceResponse.Result.Patients[0].FirstName,
                 order_number: order_number,
                 currency: "USD",
                 payment_method: "1111",
                 order_url: "",
                 timestamp: Math.floor(Date.now() / 1000).toString(),
                 elements: elementsArr,
                 address : shipObj,
                 summary : {
                   subtotal : 100,
                   shipping_cost: orderPlaceResponse.Result.ShippingMethod.Charge,
                   total_tax : orderPlaceResponse.Result.Tax,
                   total_cost : orderPlaceResponse.Result.OrderTotal
                 },
                 adjustments :[]
             }
             // payloads = JSON.stringify(payloads);
             console.log("----- send the payloads to the function ----5");


             var msg = 'What do you want to do next ?';
             var buttons = [
               {
               type: "postback",
               title: "Place Another Reorder",
               payload: JSON.stringify({
                 action: "placeAnotherReorder",
               })
             },
             {
               type: "postback",
               title: "Nope All Done",
               payload: JSON.stringify({
                 action: "processNopeAllDone"
               })
             },
           ]
           // -- showing the last order details --


           // sendReceiptMessage(session.id, payloads).then(function(){
           //     sendButtonMessage(session.id, msg, buttons);
           //
           // })
         }
         console.log("----- send the payloads to the function ----6");
         let result = {
             payloads : payloads,
             buttons : buttons
         }
         return result;
     }
   } catch (e) {


   } finally {


   }
}


var process_single_user_order_change_options = function(session, text){
   try{
       // var singleUserChangeOrderOptions = ['Update Quantity','Payment Type', 'Shipping Options', 'Delivery Address', 'Place Order'];
       // var singleUserChangeOrderPayloads = ["singleuser-updateQuantity", "singleuser-paymentType", "singleuser-shippingOption", "singleuser-deliveryAddress", "singleuser-placeOrder"];


       var singleUserChangeOrderOptions = ['Place order', 'Update quantity','Payment method', 'Shipping options', 'Shipping address'];
       var singleUserChangeOrderPayloads = [ "singleuser-placeOrder", "singleuser-updateQuantity", "singleuser-paymentType", "singleuser-shippingOption", "singleuser-deliveryAddress" ];




       let quickReplies = [];
       let msg = text;
        for (let i = 0; i < singleUserChangeOrderOptions.length; i++) {
          let quickRepliesButtonObject = {
             "content_type":"text",
             "title": singleUserChangeOrderOptions[i],
             "payload": singleUserChangeOrderPayloads[i]
          }
          quickReplies.push(quickRepliesButtonObject);
        }
        return sendQuickReplies(session.id, msg, quickReplies);


   }catch(err){
       console.log("error in process_single_user_order_change_options : ", err);
   }
}


var process_multi_user_order_change_options = function(session, text){
   try{
       // var multiUserChangeOrderOptions = ['Add User', 'Remove User', 'Update Quantity','Payment Type', 'Shipping Options', 'Delivery Address', 'Place Order'];
       // var multiUserChangeOrderPayloads = ["multiuser-addUser", "multiuser-removeUser", "multiuser-updateQuantity", "multiuser-paymentType", "multiuser-shippingOption", "multiuser-deliveryAddress", "multiuser-placeOrder"];


       var multiUserChangeOrderOptions = ['Place order', 'Add patient', 'Remove patient', 'Update quantity', 'Payment method', 'Shipping options', 'Shipping address',];
       var multiUserChangeOrderPayloads = ["multiuser-placeOrder", "multiuser-addUser", "multiuser-removeUser", "multiuser-updateQuantity", "multiuser-paymentType", "multiuser-shippingOption", "multiuser-deliveryAddress"];




       let quickReplies = [];
       let msg = text;
        for (let i = 0; i < multiUserChangeOrderOptions.length; i++) {
          let quickRepliesButtonObject = {
             "content_type":"text",
             "title": multiUserChangeOrderOptions[i],
             "payload": multiUserChangeOrderPayloads[i]
          }
          quickReplies.push(quickRepliesButtonObject);
        }
        return sendQuickReplies(session.id, msg, quickReplies);


   }catch(err){
       console.log("error in process_single_user_order_change_options : ", err);
       let msg = "oops something went wrong when processing multi user order change option"
       sendTextMessage(session.id, msg);
   }
}


var generate_response_single_user_order_change_options_response = function(session, userType, orderChangeOption, message){
   console.log("++++ calling generate_response_single_user_order_change_options......");
   console.log("++++ orderChangeOption : ", orderChangeOption);
   console.log("++++ message :: ",message );
       switch(orderChangeOption){
           case "updateQuantity":
             console.log("--- calling single user with updateQuantity  ----");
             process_single_user_update_quantity(session, userType, message);
             break;
           case "paymentType":
           console.log("--- calling single user with paymentType  ----");
             // process_update_payment_type(session);
             process_update_payment_type(session);
             break;
           case "shippingOption":
           console.log("--- calling single user with shippingOption  ----");
             process_update_shipping_options(session);
             break;


           case "placeOrder":
             console.log("--- calling single user with placeOrder  ----");
               // process_order_summary(session);
               //processSingleUserConfirmOrder(session);
               process_single_user_order_summary(session);
               break;


           case "deliveryAddress":
           console.log("--- calling single user with deliveryAddress  ----");
             process_update_delivery_address(session);


             break;


       }
}


var generate_response_multi_user_order_change_options_response = function(session, userType, orderChangeOption, message){
   console.log("++++ calling generate_response_multi_user_order_change_options......");
   console.log("++++ orderChangeOption : ", orderChangeOption);
   console.log("++++ message :: ",message );


       switch(orderChangeOption){
           case "updateQuantity":
             console.log("--- calling multiple user with updateQuantity  ----");
             choose_user_to_update_quantity(session);
             //process_multi_user_update_quantity(session, message);
             break;


           case "updateEyeQuantity":
               console.log("--- calling multiple user with updateEyeQuantity  ----");
               //choose_user_to_update_quantity(session);
               process_multi_user_update_quantity(session, message);
             break;


           case "paymentType":
           console.log("--- calling single user with paymentType  ----");
             // process_update_payment_type(session);
             process_update_payment_type(session);
             break;
           case "shippingOption":
           console.log("--- calling single user with shippingOption  ----");
             process_update_shipping_options(session);
             break;


           case "placeOrder":
             console.log("--- calling multiple user with placeOrder  ----");
               // process_order_summary(session);
               // processSingleUserConfirmOrder(session);
               // sendTextMessage(session.id, "hi...");


               process_multiple_user_place_order(session);
               break;


           case "deliveryAddress":
             console.log("--- calling single user with deliveryAddress  ----");
             process_update_delivery_address(session);


             break;


           case "addUser":
               console.log("--- calling multi user with add user  ----");
             process_add_user(session, message);


             break;


           case "removeUser":
                 console.log("--- calling multi user with remove user ----");
             process_remove_user(session, message);


             break;


       }
}


var process_text_response = function(session, message){
   // console.log("--- calling text response ---");
   // if(message.text){
   //     let updatedQuantity = parseInt(message.text);
   //     session.updated
   // }
}


function process_update_payment_type(session) {
 var cards = [];
 var card_item;
 fetch_contacts_payments_details(session.auth_code).then(function(data){
     try {
       console.log("payments data: ", data);
       session.paymentObj = data;
       if(data.length > 0 ){
           for (let i = 0; i < data.length; i++) {
             let billingAddress = "Billing Address\n";
             billingAddress += data[i].BillingAddress.Address1+", "+data[i].BillingAddress.City+", "+data[i].BillingAddress.Country;
             billingAddress += ", "+data[i].BillingAddress.State+"-"+data[i].BillingAddress.PostalCode;
             card_item = {
                   title: "**** **** **** " + data[i].LastFour,
                   image_url: config.SERVER_URL + "/assets/visa.png",
                   // subtitle: ("Name: " + data.Result[i].NameOnCard + "\nExpiry: " + data.Result[i].ExpirationDate),
                   subtitle: billingAddress,


                   buttons: [
                     {
                       type : "postback",
                       title : "Select Payment Method",
                       payload : JSON.stringify({
                         action : "updateContactsPaymentMethod",
                         updatedPaymentObjIndex : i
                       })
                     }]
                 };
                 cards.push(card_item);
           }
           sendTextMessage(session.id, prompts.promptPaymentMethodSelection).then(function() {
             sendCardMessage(session.id, cards);
           });
           } else {
             sendTextMessage(session.id, prompts.onNoPayMethodFound);
           }
     } catch (e) {
         sendTextMessage(session.id, "opps something went wrong when processing the update payment details.");
     } finally {


     }
     })
 //})
}


function process_update_shipping_options(session){
   try {
     var cards = [];
     var card_item;
     var index = 0;
       session.shippingOptions = session.lastOrderDetails.ShippingOptions;
       console.log("at shipping option session: ", session);
       var shippingData = session.shippingOptions;
           if(shippingData.length > 0 ){
               for (let i = 0; i < shippingData.length; i++) {
                 card_item = {
                       title: shippingData[i].Description,
                       subtitle: shippingData[i].CostBeforeDiscount,


                       buttons: [
                         {
                           type: "postback",
                           title: "Select Shipping Options",
                           payload: JSON.stringify({
                             action: "updateContactsShippingOptions",
                             updatedShippingObj: shippingData[i]
                           })
                         }]
                     };
                     cards.push(card_item);
               }
               sendTextMessage(session.id, prompts.promptPaymentMethodSelection).then(function() {
                 sendCardMessage(session.id, cards);
               });
               } else {
                 sendTextMessage(session.id, prompts.onNoPayMethodFound);
               }
   } catch (e) {
         sendTextMessage(session.id, "oops something went wrong when updating the shipping option.");


   } finally {


   }


}


// var create_quick_replies_buttons = function(data){
//   let quickReplies = [];
//   let msg = data.caption;
//     for (let i = 0; i <  data.options.length; i++) {
//       let quickRepliesButtonObject = {
//          "content_type":"text",
//          "title": data.options[i],
//          "payload": data.payloads[i]
//       }
//       quickReplies.push(quickRepliesButtonObject);
//     }
//     return quickReplies;
// }


var create_quick_replies_buttons = function(data){
 let quickReplies = [];
 let msg = data.caption;
   for (let i = 0; i <  data.options.length; i++) {
     let payload = '';
     if(typeof(data.payloads) === "string"){
         payload = data.payloads
     }else{
         payload = data.payloads[i]
     }


     let quickRepliesButtonObject = {
        "content_type":"text",
        "title": data.options[i],
        "payload": payload
     }
     quickReplies.push(quickRepliesButtonObject);
   }
   return quickReplies;
}


var process_quick_replies_buttons = function(session, message){
   try {
     console.log("----- calling process_quick_replies_buttons -----");
     console.log("message :: ", message);
     sendTypingOnAction(session.id);
     if(message.quick_reply.payload){
         let quickReplyPayload = message.quick_reply.payload;
         let splitQuickReplyPayload = quickReplyPayload.split("-");
         if(splitQuickReplyPayload[0] === "singleuser"){
           generate_response_single_user_order_change_options_response(session, splitQuickReplyPayload[0], splitQuickReplyPayload[1], message);
           return;
         }else if(splitQuickReplyPayload[0] === "multiuser"){
           generate_response_multi_user_order_change_options_response(session, splitQuickReplyPayload[0], splitQuickReplyPayload[1], message);


         }else{
                 quickReplyPayload = JSON.parse(quickReplyPayload);
                 try {
                   console.log("quickReplyPayload ", quickReplyPayload);
                   console.log("user name: ", quickReplyPayload.userName);
                   session.currentUserToUpdateQuantity = quickReplyPayload.userName;
                   console.log("quickReplyPayload.action :: ", quickReplyPayload.action);
                   if(quickReplyPayload.action === "processMultipleAddUser"){
                         console.log("\n\n quickReplyPayload.action : ", quickReplyPayload.action);
                         if(quickReplyPayload.userName === "Done"){
                           process_multi_user_order_change_options(session, prompts.onSelectSecondTimeEditOrderResponse.caption);
                           return;
                         }
                         process_multiple_add_user_response(session, quickReplyPayload.userName);


                   }else if(quickReplyPayload.action === "processMultipleRemoveUser"){
                         console.log("\n\n quickReplyPayload.action : ", quickReplyPayload.action);
                         if(quickReplyPayload.userName === "Done"){
                           process_multi_user_order_change_options(session, prompts.onSelectSecondTimeEditOrderResponse.caption);
                           return;
                         }
                         process_multiple_remove_user_response(session, quickReplyPayload.userName);
                   }else if(quickReplyPayload.action === "processMultipleUserUpdateQuantity"){
                         console.log("--- calling multiple userupdate quantity ----");
                         console.log("------ ^^^^^^^^^^^ --------");
                         let currentUserForUpdateQuantity = {};
                         session.currentUserForUpdateQuantity.user = quickReplyPayload.userName;
                         let quickRepliesButtons1 = create_quick_replies_buttons(prompts.onMultipleUserAskUpdateQuantity);
                         let msg1 = prompts.onMultipleUserAskUpdateQuantity.caption;
                         return sendQuickReplies(session.id, msg1, quickRepliesButtons1);
                         //process_multi_user_update_quantity(session, message);
                         //sendTextMessage(session.id, "processing the multiple user update quantity.")
                   }
                 } catch (e) {
                       sendTextMessage(session.id, "oops something went wrong when processing quick replies button.")
                 } finally {


                 }


         }
     }
   } catch (e) {
         sendTextMessage(session.id, "oops something went wrong when processing quick replies buttons.");
   } finally {


   }


}

var map_box_quantity_to_number = function(boxQuantity){
   let box = ["One Box", "Two Box", "Three Box", "Four Box", "Five Box", "Six Box", "Seven Box", "Eight Box", "Nine Box", "Ten Box"];
   let mapBoxToNumber = [1,2,3,4,5,6,7,8,9,10];
   let index = box.indexOf(boxQuantity);
   return mapBoxToNumber[index];
}


var process_single_user_update_quantity = function(session, userType, message){
   console.log("--- caling process_update_quantity --- ");
   console.log("quickReplies :: ", message);


   // send typing indicator
   sendTypingOnAction(session.id);


       if(message.quick_reply.payload === "singleuser-updateQuantity"){
              console.log("--- calling rsingle user update quantity ---");
              let quickRepliesButtons = create_quick_replies_buttons(prompts.onSingleUserAskUpdateQuantity);
              let msg = prompts.onSingleUserAskUpdateQuantity.caption;
              return sendQuickReplies(session.id, msg, quickRepliesButtons);


       }else if(message.quick_reply.payload === "singleuser-updateQuantity-rightEye"){
              console.log("--- calling right eye update quantity ---");
              let quickRepliesButtons = create_quick_replies_buttons(prompts.onSelectUpdateQuantityMsg);
              let msg = "Please select a quantity below";
              session.updatedQuantityType = "rightEye";
              return sendQuickReplies(session.id, msg, quickRepliesButtons);


       }else if(message.quick_reply.payload === "singleuser-updateQuantity-leftEye"){
              console.log("--- calling left eye update quantity ---");
              let quickRepliesButtons = create_quick_replies_buttons(prompts.onSelectUpdateQuantityMsg);
              let msg = prompts.onSingleUserAskUpdateQuantity.caption;
              session.updatedQuantityType = "leftEye";
              return sendQuickReplies(session.id, msg, quickRepliesButtons);


       }else if(message.quick_reply.payload === "singleuser-updateQuantity-bothEye"){
             session.selectedBothEyeFlag = 1;
             session.selectedBoth_rightEye = 1;
             console.log("----  calling the both eye section ----");
             let msg = "Please select a quantity below for right eye";
             let quickRepliesButtons = create_quick_replies_buttons(prompts.onSelectUpdateQuantityMsg);
             // let msg = prompts.onSelectUpdateQuantityMsg.caption;
             return sendQuickReplies(session.id, msg, quickRepliesButtons);


       }else if(message.quick_reply.payload === "singleuser-updateQuantity-updateBox"){
           try {
             console.log("--- calling updateQuantity-oneBox ---");


             sendTypingOnAction(session.id);


             let quantityInNumber = map_box_quantity_to_number(message.text);


             //if(message.text === "One Box"){
                   console.log("!!!!!!!!!!!!!!!!!!!");
                   if(session.updatedQuantityType === "rightEye"){
                   //----------------------------- RIGHT EYE SPECIFIC QUICKREPLIES AND PAYLOADS ---------------------
                       session.updatedQuantity.rightEye = quantityInNumber;
                       let quickRepliesOption = ["Left Eye", "Done"];
                       let payloads = ["singleuser-updateQuantity-leftEye", "singleuser-updateQuantity-Done"];
                       let quickRepliesButtons = [];
                       let msg = "Quantity updated for "+session.lastOrderDetails.Patients[0].FirstName+" "+session.lastOrderDetails.Patients[0].LastName+" ";
                       msg += "Do you want to change other quantity";
                       for (let i = 0; i <  quickRepliesOption.length; i++) {
                         let quickRepliesButtonObject = {
                            "content_type":"text",
                            "title": quickRepliesOption[i],
                            "payload": payloads[i]
                         }
                         quickRepliesButtons.push(quickRepliesButtonObject);
                       }
                       console.log("----updated Eye quantity: ", session.updatedQuantity);


                       return sendQuickReplies(session.id, msg, quickRepliesButtons);


                   //------------------------------------------------------------------------------------------------
                   }else if(session.updatedQuantityType === "leftEye"){
                       session.updatedQuantity.leftEye = quantityInNumber;
                       //----------------------------- LEFT EYE SPECIFIC QUICKREPLIES AND PAYLOADS ---------------------
                           let quickRepliesOption = ["Right Eye", "Done"];
                           let payloads = ["singleuser-updateQuantity-rightEye", "singleuser-updateQuantity-Done"];
                           let quickRepliesButtons = [];
                           let msg = "Quantity updated for "+session.lastOrderDetails.Patients[0].FirstName+" "+session.lastOrderDetails.Patients[0].LastName+" ";
                           msg += "Do you want to change other quantity";
                           for (let i = 0; i <  quickRepliesOption.length; i++) {
                             let quickRepliesButtonObject = {
                                "content_type":"text",
                                "title": quickRepliesOption[i],
                                "payload": payloads[i]
                             }
                             quickRepliesButtons.push(quickRepliesButtonObject);
                           }
                           console.log("----updated Eye quantity: ", session.updatedQuantity);


                           return sendQuickReplies(session.id, msg, quickRepliesButtons);


                       //------------------------------------------------------------------------------------------------


                   }else if(session.selectedBothEyeFlag === 1){
                         console.log("====  calling the both eye section ====  ");
                         if(session.selectedBoth_rightEye === 1){
                             session.updatedQuantity.rightEye = quantityInNumber;
                             console.log("updated eye quantity : ", session.updatedQuantity);
                             session.selectedBoth_rightEye = 0;
                             let msg = "Please select a quantity below for left eye";
                             let quickRepliesButtons = create_quick_replies_buttons(prompts.onSelectUpdateQuantityMsg);
                             // let msg = prompts.onSelectUpdateQuantityMsg.caption;
                             return sendQuickReplies(session.id, msg, quickRepliesButtons);
                         }else{
                           console.log("===========================================");
                           // let msg = "Quantity update completed for : "+session.lastOrderDetails.Patients[0].FirstName+" "+session.lastOrderDetails.Patients[0].LastName;
                           session.updatedQuantity.leftEye = quantityInNumber;
                           console.log("updated eye quantity : ", session.updatedQuantity);
                           // sendTextMessage(session.id, msg)
                           let msg = "Quantity update completed for "+session.activeUser;
                           sendTextMessage(session.id, msg).then(function(){
                               let text = "payment";
                               process_single_user_order_change_options(session, text);
                           })
                         }


                   }
           } catch (e) {
               console.log("error occured at line no: 1715");
               sendTextMessage(session.id, "oops something went wrong at line no: 1715")
           } finally {


           }


           //}
       }else if(message.quick_reply.payload === "singleuser-updateQuantity-Done"){
         console.log("---- calling update quantity done quick replies -----");
         console.log("---- active user : ", session.activeUser);
         let msg = "Quantity update completed for "+session.activeUser;
         sendTextMessage(session.id, msg).then(function(){
             let text = "Would you like to change anything else ?";
             console.log("----- ##### -----");
             process_single_user_order_change_options(session, text);
         })
       }
}


var process_multi_user_update_quantity = function(session, message){
   try {


       console.log("------ calling process_multi_user_update_quantity function -------");
       console.log("\n\n\n***message : ", message);
       console.log("message.quick_reply.payload.action :: ", message.quick_reply.payload.action);
       sendTypingOnAction(session.id);
       switch(message.quick_reply.payload){


           case "multiuser-updateQuantity":
                  console.log("--- calling multiple user update quantity ---");
                  let quickRepliesButtons1 = create_quick_replies_buttons(prompts.onMultipleUserAskUpdateQuantity);
                  let msg1 = prompts.onMultipleUserAskUpdateQuantity.caption;
                  return sendQuickReplies(session.id, msg1, quickRepliesButtons1);
           break;


           case "multiuser-updateEyeQuantity-rightEye":
           case "multiuser-updateEyeQuantity-leftEye":
                 try {
                     console.log("--- calling multiple user update quantity with right eye ---");
                     var eyeType = '';
                     let quickRepliesButtons2 = create_quick_replies_buttons(prompts.onSelectMultiUserUpdateQuantityMsg);
                     let typeOfEye = message.quick_reply.payload.split("-")
                     session.updatedQuantityType = typeOfEye[2];
                     if(session.updatedQuantityType === "rightEye"){
                         eyeType = "right eye";
                     }else if(session.updatedQuantityType === "leftEye"){
                         eyeType = "left eye";
                     }
                     let msg2 = prompts.onSelectMultiUserUpdateQuantityMsg.caption+" "+session.lastOrderDetails.Patients[0].FirstName+"\'s "+eyeType+" ?";


                     console.log("\n\n====== session.updatedQuantityType :: ", session.updatedQuantityType);
                     return sendQuickReplies(session.id, msg2, quickRepliesButtons2);
                 } catch (e) {
                     console.log("error occured in right.left eye update quantity \n\n", e);
                     sendTextMessage(session.id, "opps something went wrong when processing update quantity for left and right eye")


                 }


           break;


           case "multiuser-updateEyeQuantity-bothEye":
                 console.log("--- calling multiple user update quantity with both eye ---");
                 session.selectedBothEyeFlag = 1;
                 session.selectedBoth_rightEye = 1;
                 session.updatedQuantityType = "bothEye"
                 let msg5 = prompts.onSelectMultiUserUpdateQuantityMsg.caption+" "+session.lastOrderDetails.Patients[0].FirstName+"\'s both eye ?";
                 let quickRepliesButtons5 = create_quick_replies_buttons(prompts.onSelectMultiUserUpdateQuantityMsg);
                 return sendQuickReplies(session.id, msg5, quickRepliesButtons5);
           break;


           case "multiuser-updateEyeQuantity-updateBox":
                 try {
                   console.log("----- calling the multi user update box quantity -----");
                   console.log("session.updatedQuantityType :: ", session.updatedQuantityType);
                   let quantityInNumber = map_box_quantity_to_number(message.text);
                   switch(session.updatedQuantityType){
                      case "rightEye" :
                           session.updatedQuantity.rightEye = quantityInNumber;
                           session.currentUserForUpdateQuantity.rightEye = quantityInNumber;
                           console.log("\n\n====== session.updateEyeQuantity :: ", session.updatedQuantity);
                           let rightEyeOptions = {
                               caption : "Which eye do you want to change?",
                               options : ["leftEye", "Done"],
                               payloads : ["multiuser-updateEyeQuantity-leftEye", "multiuser-updateEyeQuantity-Done"],
                           }
                           let quickRepliesButtons4 = create_quick_replies_buttons(rightEyeOptions);
                           let msg = "We updated the quantity for "+session.currentUserToUpdateQuantity+". \nDo you want to change another quantity for ?";
                           sendTextMessage(session.id, msg).then(function(){
                             return sendQuickReplies(session.id, rightEyeOptions.caption, quickRepliesButtons4);
                           })
                           // sendTextMessage(session.id, "update right eye....");
                      break;


                      case "leftEye" :
                           session.updatedQuantity.leftEye = quantityInNumber;
                           session.currentUserForUpdateQuantity.leftEye = quantityInNumber;
                           console.log("\n\n====== session.updateEyeQuantity :: ", session.updatedQuantity);
                           let leftEyeOptions = {
                               caption : "Which eye do you want to change?",
                               options : ["rightEye", "Done"],
                               payloads : ["multiuser-updateEyeQuantity-rightEye", "multiuser-updateEyeQuantity-Done"],
                           }
                           let quickRepliesButtons3 = create_quick_replies_buttons(leftEyeOptions);
                           let leftEyeMsg = prompts.onSelectMultiUserUpdateQuantityMsg.caption+" "+session.lastOrderDetails.Patients[0].FirstName+"\'s both eye ?";
                           let leftEyeQuantityUpdatedMsg = "We updated the quantity for "+session.currentUserToUpdateQuantity+". \nDo you want to change another quantity for "+session.currentUserToUpdateQuantity+" ?";
                           sendTextMessage(session.id, leftEyeQuantityUpdatedMsg).then(function(){
                             return sendQuickReplies(session.id, leftEyeOptions.caption, quickRepliesButtons4);
                           })
                           //return sendQuickReplies(session.id, leftEyeMsg, quickRepliesButtons3);


                      break;


                      case "bothEye" :
                            if(session.selectedBothEyeFlag === 1){
                                  console.log("====  calling the both eye section ====  ");
                                  if(session.selectedBoth_rightEye === 1){
                                      session.updatedQuantity.rightEye = quantityInNumber;
                                      console.log("updated eye quantity : ", session.updatedQuantity);
                                      session.selectedBoth_rightEye = 0;
                                      session.selectedBothEyeFlag = 0;
                                      let msg6 = prompts.onSelectMultiUserUpdateQuantityMsg.caption+" "+session.lastOrderDetails.Patients[0].FirstName+"\'s both eye ?";
                                      let quickRepliesButtons6 = create_quick_replies_buttons(prompts.onSelectMultiUserUpdateQuantityMsg);
                                      // let msg = prompts.onSelectUpdateQuantityMsg.caption;
                                      return sendQuickReplies(session.id, msg6, quickRepliesButtons6);
                                  }else{


                                  }
                             }else{
                                 session.updatedQuantity.leftEye = quantityInNumber;
                                 console.log("session.updatedQuantity :: ", session.updatedQuantity);
                                 process_multi_user_order_change_options(session, "What do you want to change next ?");


                             }
                      break;
                      default :


                      break;
                   }
                 } catch (e) {
                     console.log("error occured when processing multiuser-updateEyeQuantity-updateBox : \n\n", e);
                     sendTextMessage(session.id, "something went wrong in multiuser-updateEyeQuantity-updateBox");
                 }


           break;


           case "multiuser-updateEyeQuantity-Done" :
                 try {
                     console.log("---- calling update quantity done quick replies -----");
                     let msg = "Quantity update completed for ";
                     session.currentUserListForUpdateQuantity.push(session.currentUserForUpdateQuantity);
                     console.log("session.currentUserForUpdateQuantity.rightEye  :: ", session.currentUserForUpdateQuantity);
                     console.log("session.currentUserListForUpdateQuantity :: ", session.currentUserListForUpdateQuantity);
                     sendTextMessage(session.id, msg).then(function(){
                         let text = "Would you like to change anything else ?";
                         process_multi_user_order_change_options(session, text);
                     })
                 } catch (e) {
                     console.log("\n\nerror occured when updating eye quantity :: ", e);
                     sendTextMessage(session.id, "oops something went wrong when updating eye quantity.");
                 }


           break;


           case "processMultipleUserUpdateQuantity" :
                 console.log("---- calling update quantity done quick replies -----");
                 process_multi_user_update_quantity(session, message);


           break;


           default:
               console.log("---- showing the default section -----");
           break;
                                                                                                                                                                                                                                                        break;
       }
   } catch (e) {
         console.log("Opps somethin went wrong when accessing multi user update quantity\n", e);
         sendTextMessage(session.id, "Opps somethin went wrong when accessing multi user update quantity.");
   } finally {


   }
}


var process_update_delivery_address = function(session){
 var cards = [];
 var card_item;
 fetch_delivery_address_details(session.auth_code).then(function(data){
     console.log("payments data: ", data);
     let shipAddressArr = data.Result.ShippingAddresses;
     if(shipAddressArr.length > 0 ){
         for (let i = 0; i < shipAddressArr.length; i++) {
           let addressObj = shipAddressArr[i].Address;
           let deliveryAddress = addressObj.FirstName+" "+addressObj.LastName+"\n";
           deliveryAddress += addressObj.Address1+" "+addressObj.Address2+"\n";
           deliveryAddress += addressObj.City+"\n";
           deliveryAddress += addressObj.Country+"\n";
           deliveryAddress += addressObj.State+"-"+addressObj.PostalCode;


           var card_item = {
             title: "Address "+(i+1
             subtitle: deliveryAddress,
             buttons: [{
               type: "postback",
               title: "Select Delivery Address",
               payload: JSON.stringify({
                 action: "updateContactsDeliveryAddress",
                 selectedDeliveryAddressObj: shipAddressArr[i]
               })
             }]
           };
           cards.push(card_item);
         }
         let msg = "Please select the delivery address"
         sendTextMessage(session.id, msg).then(function() {
           sendCardMessage(session.id, cards);
         });
         } else {
           sendTextMessage(session.id, prompts.onNoPayMethodFound);
         }
     })
}


var updateContactsShippingOptions = function(session, payload){
   console.log("------- calling shipping option update function ------- ");
   console.log("*********************************************************************8");
   session.currentUsage.updatedShippingObj = payload.updatedShippingObj;
   let selectShippingResponse = "Shipping option updated to : "+session.currentUsage.updatedShippingObj.Description;
   sendTextMessage(session.id, selectShippingResponse).then(function(){
     let text = "Would you like to change anything else ?";
     process_single_user_order_change_options(session, text);
   });
}


var updateContactsDeliveryAddress = function(session, payload){
   console.log("------- calling shipping option update function ------- ");
   session.currentUsage.updatedDeliveryAddressObj = payload.selectedDeliveryAddressObj;
   console.log("---- after update the session object is: ", session);
   let addressObj = session.currentUsage.updatedDeliveryAddressObj.Address;
   let deliveryAddress = addressObj.FirstName+" "+addressObj.LastName+"\n";
   deliveryAddress += addressObj.Address1+" "+addressObj.Address2+"\n";
   deliveryAddress += addressObj.City+"\n";
   deliveryAddress += addressObj.Country+"\n";
   deliveryAddress += addressObj.State+"-"+addressObj.PostalCode;
   let selectDeliveryResponse = "Delivery address updated to : "+deliveryAddress;
   sendTextMessage(session.id, selectDeliveryResponse).then(function(){
     let text = "Would you like to change anything else ?";
     process_single_user_order_change_options(session, text);
   });
}


var updateContactsPaymentMethod = function(session, payload){
   session.currentUsage.updatedPaymentObj = session.paymentObj[payload.updatedPaymentObjIndex];
   let txt = "Payment method updated to VISA *** "+session.currentUsage.updatedPaymentObj.LastFour;
   sendTextMessage(session.id, txt).then(function(){
     let text = "Would you like to change anything else ?";
     console.log("----- payment ##### -----");
     process_single_user_order_change_options(session, text);
   });
}
//
var process_single_user_order_summary = function(session){
   console.log("---- calling place order function -----");
   try{
     console.log("++++ calling show prescription list.....");
     console.log("+++ session :: ", session);
     if (session.lastOrderDetails.Patients.length === 1) {
       // --- creating last order details for the single user ---


       var prescription = session.lastOrderDetails.Patients[0].Prescriptions[0];
       console.log("+++  first name: ",session.lastOrderDetails.Patients[0].FirstName);
       if (prescription) {
         var elementsArr = [];
         var shipObj = '';
         var paymentCardDetails = '';
         var rightLensDetails = '';
         var leftLensDetails = '';
         var totalCost = 0;
         var order_number = "OCOR" + Math.floor(Math.random()*1000);
         if(prescription.RightItem !== null){
             let rightItemQuantity = 0;
             if(session.updatedQuantity.rightEye !== undefined){
                 rightItemQuantity = session.updatedQuantity.rightEye;
                 totalCost+= (rightItemQuantity * prescription.RightItem.UnitPrice);
             }else{
                 rightItemQuantity = prescription.RightItem.Quantity;
                 totalCost+= (rightItemQuantity * prescription.RightItem.UnitPrice);
             }
             rightLensDetails = {
               title : "Left Lens",
               subtitle : prescription.RightItem.BrandName,
               quantity : rightItemQuantity,
               price : prescription.RightItem.UnitPrice,
               currency : "USD",
               image_url : config.SERVER_URL + "/assets/air_optics.jpg"
             }
             // rightLensDetails = JSON.stringify(rightLensDetails);
             elementsArr.push(rightLensDetails);
         }
         if(prescription.LeftItem !== null){
             let leftItemQuantity = 0;
             if(session.updatedQuantity.leftEye !== undefined){
                 leftItemQuantity = session.updatedQuantity.leftEye;
                 totalCost+= (leftItemQuantity * prescription.LeftItem.UnitPrice);


             }else{
                 leftItemQuantity = prescription.LeftItem.Quantity;
                 totalCost+= (leftItemQuantity * prescription.LeftItem.UnitPrice);


             }
             leftLensDetails = {
               title : "Left Lens",
               subtitle : prescription.LeftItem.BrandName,
               quantity : leftItemQuantity,
               price : prescription.LeftItem.UnitPrice,
               currency : "USD",
               image_url : config.SERVER_URL + "/assets/air_optics.jpg"
             }
             // leftLensDetails = JSON.stringify(leftLensDetails);
             elementsArr.push(leftLensDetails);
         }
         if(session.currentUsage.updatedDeliveryAddressObj !== undefined){
             let updatedDeliveryAddress = session.currentUsage.updatedDeliveryAddressObj.Address;
             shipObj = {
                 street_1 : updatedDeliveryAddress.Address1,
                 street_2 : updatedDeliveryAddress.Address2,
                 city : updatedDeliveryAddress.City,
                 postal_code : updatedDeliveryAddress.PostalCode,
                 state : updatedDeliveryAddress.State,
                 country : updatedDeliveryAddress.Country
               }
         }else{
           shipObj = {
               street_1 : session.lastOrderDetails.ShippingAddress.Address.Address1,
               street_2 : session.lastOrderDetails.ShippingAddress.Address.Address2,
               city : session.lastOrderDetails.ShippingAddress.Address.City,
               postal_code : session.lastOrderDetails.ShippingAddress.Address.PostalCode,
               state : session.lastOrderDetails.ShippingAddress.Address.State,
               country : session.lastOrderDetails.ShippingAddress.Address.Country
             }
         }
         if(session.currentUsage.updatedPaymentObj !== undefined){
               paymentCardDetails = session.currentUsage.updatedPaymentObj.LastFour;
         }else{
               paymentCardDetails = session.lastOrderDetails.Payment.LastFour
         }
         var payloads = {
                 template_type:"receipt",
                 recipient_name: session.lastOrderDetails.Patients[0].FirstName,
                 order_number: order_number,
                 currency: "USD",
                 payment_method: paymentCardDetails,
                 order_url: "",
                 timestamp: Math.floor(Date.now() / 1000).toString(),
                 elements: elementsArr,
                 address : shipObj,
                 summary : {
                   subtotal : session.lastOrderDetails.LineItemSubTotal,
                   shipping_cost: session.lastOrderDetails.ShippingOptions[0].CostBeforeDiscount,
                   total_tax : 0,
                   total_cost : totalCost
                 },
                 adjustments :[]
             }
             // payloads = JSON.stringify(payloads);


             var msg = 'What do you want to do next ?';
             var buttons = [
               {
               type: "postback",
               title: "Confirm Order",
               payload: JSON.stringify({
                 action: "single-user-order-confirmation-ok",
               })
             },
             {
               type: "postback",
               title: "Make Changes To Order",
               payload: JSON.stringify({
                 action: "makeChangesToOrder"
               })
             },
           ]
           // -- showing the last order details --


           sendReceiptMessage(session.id, payloads).then(function(){
               sendButtonMessage(session.id, msg, buttons);


           })
         }
     }else{
         // fetch multiple last order details
         // --- creating last order details for the single user ---


     }
   }catch(err){
       console.log("error occoured when showing last order detailos: ", err);
   }
}


var process_multiple_user_place_order = function(session){
   console.log("----- calling the multi user place order function.");


   console.log("session.currentUserListForUpdateQuantity : ", session.currentUserListForUpdateQuantity);
   console.log("session \n\n ", session);
   //----------------------------------------------------------------------------------------
   try{
       if(session.removeUserList.length > 0){
           for (let i = 0; i < session.removeUserList.length; i++) {
               let customerDetailsPatientList  = session.customerDetails.Result.Patients;
               for (let j = 0; j < customerDetailsPatientList.length; j++) {
                   let patientName = customerDetailsPatientList[j].FirstName+" "+customerDetailsPatientList[j].LastName;


                   let patientUpdatedQuantityObject = null;
                   for(let k=0; k<session.currentUserListForUpdateQuantity.length; k++){
                       if(session.currentUserListForUpdateQuantity[k].user === patientName){
                           patientUpdatedQuantityObject = session.currentUserListForUpdateQuantity[k];
                       }
                   }


                   if(session.removeUserList[i] === patientName){
                       var elementsArr = [];
                       var shipObj = '';
                       var paymentCardDetails = '';
                       var rightLensDetails = '';
                       var leftLensDetails = '';
                       var totalCost = 0;
                       var leftItemQuantity = 0;
                       var leftItemPrice = 150;




                       var prescription = customerDetailsPatientList[j].Prescriptions[0];
                       // if(session.lastOrderPatientsName.indexOf(patientName) === -1){
                       //       patientPrescription = customerDetailsPatientList[j].Prescriptions;
                       // }else{
                       //     for(let l=0; l<session.lastOrderDetails.Patients.length; l++){
                       //         let pname = session.lastOrderDetails.Patients[l].FirstName+" "+session.lastOrderDetails.Patients[l].LastName;
                       //         if(session.removeUserList[i] === pname){
                       //             patientPrescription = session.lastOrderDetails.Patients[l]
                       //         }
                       //     }
                       // }


                       if(prescription){


                         var order_number = "OCOR" + Math.floor(Math.random()*1000);
                         // ===========   FETCH RIGHT EYE  DETAILS   =======================
                         if(prescription.RightEyeLens !== null){
                             try {
                               let rightEyeQuantity = 1;
                               let rightEyePrice = 156;
                               if(patientUpdatedQuantityObject !== null){
                                   rightEyeQuantity = patientUpdatedQuantityObject.rightEye;
                                   rightEyePrice = 156;
                                   totalCost += (rightEyePrice * rightEyeQuantity);
                               }else{
                                   rightEyeQuantity = 1;
                                   rightEyePrice = 156;
                                   totalCost += (rightEyePrice * rightEyeQuantity);
                               }
                               rightLensDetails = {
                                 title : "Left Lens",
                                 subtitle : prescription.RightEyeLens.BrandName,
                                 quantity : rightEyeQuantity,
                                 price : rightEyePrice,
                                 currency : "USD",
                                 image_url : config.SERVER_URL + "/assets/air_optics.jpg"
                               }
                               // rightLensDetails = JSON.stringify(rightLensDetails);
                               elementsArr.push(rightLensDetails);
                             } catch (e) {
                                 console.log("error occured in 2143 line no.");
                                 sendTextMessage(session.id, "opps something went wrong in line no 2143.")
                             }
                         }


                         if(prescription.LeftEyeLens !== null){
                             leftItemQuantity = 0;
                             leftItemPrice = 150;


                             if(patientUpdatedQuantityObject !== null){
                                 leftItemQuantity = patientUpdatedQuantityObject.leftEye;
                                 leftItemPrice = 150;
                                 totalCost+= (leftItemQuantity * leftItemPrice);
                             }else{
                                 leftItemQuantity = 1;
                                 leftItemPrice = 150;
                                 totalCost+= (leftItemQuantity * leftItemPrice);
                             }
                             leftLensDetails = {
                               title : "Left Lens",
                               subtitle : prescription.LeftEyeLens.Name,
                               quantity : leftItemQuantity,
                               price : leftItemPrice,
                               currency : "USD",
                               image_url : config.SERVER_URL + "/assets/air_optics.jpg"
                             }
                             // leftLensDetails = JSON.stringify(leftLensDetails);
                             elementsArr.push(leftLensDetails);
                         }


                         if(session.currentUsage.updatedDeliveryAddressObj !== undefined){
                             let updatedDeliveryAddress = session.currentUsage.updatedDeliveryAddressObj.Address;
                             shipObj = {
                                 street_1 : updatedDeliveryAddress.Address1,
                                 street_2 : updatedDeliveryAddress.Address2,
                                 city : updatedDeliveryAddress.City,
                                 postal_code : updatedDeliveryAddress.PostalCode,
                                 state : updatedDeliveryAddress.State,
                                 country : updatedDeliveryAddress.Country
                               }
                         }else{
                           shipObj = {
                               street_1 : session.lastOrderDetails.ShippingAddress.Address.Address1,
                               street_2 : session.lastOrderDetails.ShippingAddress.Address.Address2,
                               city : session.lastOrderDetails.ShippingAddress.Address.City,
                               postal_code : session.lastOrderDetails.ShippingAddress.Address.PostalCode,
                               state : session.lastOrderDetails.ShippingAddress.Address.State,
                               country : session.lastOrderDetails.ShippingAddress.Address.Country
                             }
                         }


                         if(session.currentUsage.updatedPaymentObj !== undefined){
                               paymentCardDetails = session.currentUsage.updatedPaymentObj.LastFour;
                         }else{
                               paymentCardDetails = session.lastOrderDetails.Payment.LastFour
                         }


                         var payloads = {
                                 template_type:"receipt",
                                 recipient_name: patientName,
                                 order_number: order_number,
                                 currency: "USD",
                                 payment_method: paymentCardDetails,
                                 order_url: "",
                                 timestamp: Math.floor(Date.now() / 1000).toString(),
                                 elements: elementsArr,
                                 address : shipObj,
                                 summary : {
                                   subtotal : session.lastOrderDetails.LineItemSubTotal,
                                   shipping_cost: session.lastOrderDetails.ShippingOptions[0].CostBeforeDiscount,
                                   total_tax : 0,
                                   total_cost : totalCost
                                 },
                                 adjustments :[]
                             }
                             // payloads = JSON.stringify(payloads);


                             var msg = 'What do you want to do next ?';
                             var buttons = [
                               {
                               type: "postback",
                               title: "Confirm Order",
                               payload: JSON.stringify({
                                 action: "multiple-user-order-confirmation-ok",
                               })
                             },
                             {
                               type: "postback",
                               title: "Make Changes To Order",
                               payload: JSON.stringify({
                                 action: "makeChangesToOrder"
                               })
                             },
                           ]
                           // -- showing the last order details --


                         sendReceiptMessage(session.id, payloads).then(function(){
                               sendButtonMessage(session.id, msg, buttons);


                           })
                         }
                       }
                   }
               }
           }
   }catch(err){
       console.log("error occoured when showing last order detailos: ", err);
   }


   //----------------------------------------------------------------------------------------
   // sendTextMessage(session.id, "i am in multi user place order ")
}


var processSingleUserConfirmOrder = function(session){
   console.log("----- calling single user confirm order function -----");
 var placeOrderPatientsObj = [];
 var leftItem = '';
 var rightItem = '';
 var formatPlaceOrderPatientObj = '';
 var formattedPlaceOrderPaymentObject = '';


 // let prescription = currentUserSession.lastOrderDetails.Patients[0].Prescriptions[0];
 if(session.lastOrderDetails.Patients.length === 1){
     var prescription = session.lastOrderDetails.Patients[0].Prescriptions[0];


     // create the left item object for place order
     if(prescription.LeftItem !== null){
         let parameter = null;
         let leftItemQuantity = '';
         if(prescription.LeftItem.Parameters !== null || prescription.LeftItem.Parameters !== undefined){
             parameter = prescription.LeftItem.Parameters;
         }
         if(session.updatedQuantity.leftEye !== undefined){
             leftItemQuantity = session.updatedQuantity.leftEye;
         }else{
             leftItemQuantity = prescription.LeftItem.Quantity;
         }
         leftItem = {
           AvailablePromotions: [],
           BrandId: prescription.LeftItem.BrandId,
           BrandName: prescription.LeftItem.BrandName,
           Upc: prescription.LeftItem.Upc,
           PrescriptionId: prescription.PrescriptionId,
           Parameters: parameter,
           changedQuantity: 0,
           LineItemSubTotal: prescription.LeftItem.LineItemSubTotal,
           DiscountTotal: prescription.LeftItem.DiscountTotal,
           UnitPrice: prescription.LeftItem.UnitPrice,
           Quantity: leftItemQuantity,
           PhotoOnlyParams: prescription.LeftItem.PhotoOnlyParams
         }
     }


     // create the right item object for place order
     if(prescription.RightItem !== null){
         let parameter = null;
         let rightItemQuantity = '';
         if(prescription.RightItem.Parameters !== null || prescription.RightItem.Parameters !== undefined){
             parameter = prescription.RightItem.Parameters;
         }
         if(prescription.LeftItem.Parameters !== null || prescription.LeftItem.Parameters !== undefined){
             parameter = prescription.LeftItem.Parameters;
         }
         if(session.updatedQuantity.leftEye !== undefined){
             rightItemQuantity = session.updatedQuantity.rightEye;
         }else{
             rightItemQuantity = prescription.LeftItem.Quantity;
         }
         rightItem = {
           AvailablePromotions: [],
           BrandId: prescription.RightItem.BrandId,
           BrandName: prescription.RightItem.BrandName,
           Upc: prescription.RightItem.Upc,
           PrescriptionId: currentUserSession.patientsObj[0].Prescriptions[0].PrescriptionId,
           Parameters: parameter,
           changedQuantity: 0,
           LineItemSubTotal: prescription.RightItem.LineItemSubTotal,
           DiscountTotal: prescription.RightItem.DiscountTotal,
           UnitPrice: prescription.RightItem.UnitPrice,
           Quantity: currentUserSession.localStorage.rightEyeQuantity,
           PhotoOnlyParams: prescription.RightItem.PhotoOnlyParams
         }
     }


     formatPlaceOrderPatientObj = {
       FirstName: session.lastOrderDetails.Patients[0].FirstName,
       LastName: session.lastOrderDetails.Patients[0].LastName,
       Prescriptions: [{
           DoctorName: null,
           Promotions: [],
           LeftItem: leftItem,
           Rightitem : rightItem,
           PrescriptionId: prescription.PrescriptionId,
           isUPP: false,
           changedAutoReorderPeriodDaysDifference: 0,
           ReorderPeriod: 0,
           changedAutoReorderDateDaysDifference: 0
         }
       ],
       PatientId: session.lastOrderDetails.Patients[0].PatientId
     }


     if(session.currentUsage.updatedPaymentObj !== undefined){
         formattedPlaceOrderPaymentObject = {
           PaymentMethodId : session.currentUsage.updatedPaymentObj.PaymentId,
           PaymentToken : session.currentUsage.updatedPaymentObj.PaymentToken,
           PaymentType : session.currentUsage.updatedPaymentObj.PaymentType
         }
     }else{
         formattedPlaceOrderPaymentObject = {
           PaymentMethodId : session.lastOrderDetails.Payment.PaymentId,
           PaymentToken : session.lastOrderDetails.Payment.PaymentToken,
           PaymentType : session.lastOrderDetails.Payment.PaymentType
         }
     }


     placeOrderPatientsObj.push(formatPlaceOrderPatientObj);


     var shippingOptionId = '';
     if(session.currentUsage.updatedShippingObj !== undefined ){
         shippingOptionId = session.currentUsage.updatedShippingObj.ShipOptionId;
     }else{
         shippingOptionId = session.lastOrderDetails.ShippingOptions[0].ShipOptionId;
     }


     var deliveryAddress = '';
     if(session.currentUsage.updatedDeliveryAddressObj !== undefined ){
         deliveryAddress = session.currentUsage.updatedDeliveryAddressObj;
     }else{
         deliveryAddress = session.lastOrderDetails.ShippingAddress;
     }


       var postOrderPlaceObject = {
           MetaData : {
               Key: "String Content",
           Value: "String Content"
           },
           NonLensItems: [],
           Patients: placeOrderPatientsObj,
           Payment: formattedPlaceOrderPaymentObject,
           ShipOptionId : shippingOptionId,
           ShippingAddress: deliveryAddress,
       };
       console.log("\n\n======session.updatedQuantity :: \n\n", session.updatedQuantity);
       console.log("\n\nbefore posting the post order object is: \n\n", JSON.stringify(postOrderPlaceObject));
       console.log("\n\n=====================================================================");
       process_contacts_confirm_order(session.auth_code, postOrderPlaceObject).then(function(result){
           let msg = "What do you want to do next ?";
           console.log("------ order placed sucessfully -------");
           console.log("------ order placed response : ", JSON.stringify(result));
           if(result.Result !== null){
               console.log("########## order total "+result.Result.OrderTotal);
               result = result;
               let invoicePayloads = process_order_placed_invoice(session, result);
               console.log("invoicePayloads : ", JSON.stringify(invoicePayloads));
               sendReceiptMessage(session.id, invoicePayloads.payloads).then(function(){
                   sendButtonMessage(session.id, msg, invoicePayloads.buttons);


               })


           }else{
               sendTextMessage(session.id, result.Description);
           }


       })


 }
 //------------------------------------------------------------------------------------------------


 // let txt = "sucessfully place the order...";
 // return sendTextMessage(session.id, txt);


}


var processMultipleUserConfirmOrder = function(session){
     console.log("----- calling multiple order confirmation function -----");
   var placeOrderPatientsObj = [];
   var leftItem = '';
   var rightItem = '';
   var formatPlaceOrderPatientObj = '';
   var formattedPlaceOrderPaymentObject = '';


   // let prescription = currentUserSession.lastOrderDetails.Patients[0].Prescriptions[0];
   //===================================================================================================================
   if(session.removeUserList.length > 0){
     for (let i = 0; i < session.removeUserList.length; i++) {
         let customerDetailsPatientList  = session.customerDetails.Result.Patients;
         for (let j = 0; j < customerDetailsPatientList.length; j++) {
             let patientName = customerDetailsPatientList[j].FirstName+" "+customerDetailsPatientList[j].LastName;


             let patientUpdatedQuantityObject = null;
             for(let k=0; k<session.currentUserListForUpdateQuantity.length; k++){
                 if(session.currentUserListForUpdateQuantity[k].user === patientName){
                     patientUpdatedQuantityObject = session.currentUserListForUpdateQuantity[k];
                 }
             }


             if(session.removeUserList[i] === patientName){
                 var elementsArr = [];
                 var shipObj = '';
                 var paymentCardDetails = '';
                 var rightLensDetails = '';
                 var leftLensDetails = '';
                 var totalCost = 0;
                 var leftItemQuantity = 0;
                 var leftItemPrice = 150;
                 var rightItemQuantity = 0;
                 var rightItemPrice = 150;




                 var prescription = customerDetailsPatientList[j].Prescriptions[0];


                 if(prescription){


                   var order_number = "OCOR" + Math.floor(Math.random()*1000);
                   // ===========   FETCH LEFT EYE  DETAILS   =======================
                   if(prescription.LeftEyeLens !== null){
                       try {
                         let parameter = null;
                         let leftItemQuantity = '';
                         if(prescription.LeftEyeLens.Parameters !== null || prescription.LeftEyeLens.Parameters !== undefined){
                             parameter = prescription.LeftEyeLens.Parameters;
                         }
                         // if(session.updatedQuantity.leftEye !== undefined){
                         //     leftItemQuantity = session.updatedQuantity.leftEye;
                         // }else{
                         //     leftItemQuantity = prescription.LeftItem.Quantity;
                         // }


                         if(patientUpdatedQuantityObject !== null){
                             leftItemQuantity = patientUpdatedQuantityObject.leftEye;
                             leftItemPrice = 150;
                             totalCost+= (leftItemQuantity * leftItemPrice);
                         }else{
                             leftItemQuantity = 1;
                             leftItemPrice = 150;
                             totalCost+= (leftItemQuantity * leftItemPrice);
                         }


                         leftItem = {
                           AvailablePromotions: [],
                           BrandId: prescription.LeftEyeLens.BrandId,
                           BrandName: prescription.LeftEyeLens.Name,
                           Upc: prescription.LeftEyeLens.Upc,
                           PrescriptionId: prescription.PrescriptionId,
                           Parameters: parameter,
                           changedQuantity: 0,
                           // LineItemSubTotal: prescription.LeftEyeLens.LineItemSubTotal,
                           LineItemSubTotal: 0,
                           // DiscountTotal: prescription.LeftEyeLens.DiscountTotal,
                           DiscountTotal: 0,
                           UnitPrice: leftItemPrice,
                           Quantity: leftItemQuantity,
                           PhotoOnlyParams: prescription.LeftEyeLens.PhotoOnlyParams
                         }
                       } catch (e) {
                           console.log("error occured at line no : 2505 : \n\n", e);
                           sendTextMessage(session.id, "opps something went wrong at line 2505.")
                       }


                   }
                   // ===========   FETCH RIGHT EYE  DETAILS   =======================
                   if(prescription.RightEyeLens !== null){
                       try {
                         let parameter = null;
                         // if(prescription.RightEyeLens.Parameters !== null || prescription.RightEyeLens.Parameters !== undefined){
                         //     parameter = prescription.RightItem.Parameters;
                         // }
                         if(prescription.RightEyeLens.Parameters !== null || prescription.RightEyeLens.Parameters !== undefined){
                             parameter = prescription.RightEyeLens.Parameters;
                         }
                         // if(session.updatedQuantity.leftEye !== undefined){
                         //     rightItemQuantity = session.updatedQuantity.rightEye;
                         // }else{
                         //     rightItemQuantity = prescription.LeftItem.Quantity;
                         // }
                         if(patientUpdatedQuantityObject !== null){
                             rightItemQuantity = patientUpdatedQuantityObject.rightEye;
                             rightItemPrice = 150;
                             totalCost+= (rightItemQuantity * rightItemPrice);
                         }else{
                             rightItemQuantity = 1;
                             rightItemPrice = 150;
                             totalCost+= (rightItemQuantity * rightItemPrice);
                         }


                         rightItem = {
                           AvailablePromotions: [],
                           BrandId: prescription.RightEyeLens.BrandId,
                           BrandName: prescription.RightEyeLens.Name,
                           Upc: prescription.RightEyeLens.Upc,
                           PrescriptionId: prescription.PrescriptionId,
                           Parameters: parameter,
                           changedQuantity: 0,
                           LineItemSubTotal: 0,
                           DiscountTotal: 0,
                           UnitPrice: rightItemPrice,
                           Quantity: rightItemQuantity,
                           PhotoOnlyParams: prescription.RightEyeLens.PhotoOnlyParams
                         }
                       } catch (e) {
                         console.log("error occured at line no : 2550 : \n\n", e);
                         sendTextMessage(session.id, "opps something went wrong at line 2550.")
                       }


                   }


                   // configure the post order object
                   try {
                     formatPlaceOrderPatientObj = {
                       FirstName: customerDetailsPatientList[j].FirstName,
                       LastName: customerDetailsPatientList[j].LastName,
                       Prescriptions: [{
                           DoctorName: null,
                           Promotions: [],
                           LeftItem: leftItem,
                           Rightitem : rightItem,
                           PrescriptionId: prescription.PrescriptionId,
                           isUPP: false,
                           changedAutoReorderPeriodDaysDifference: 0,
                           ReorderPeriod: 0,
                           changedAutoReorderDateDaysDifference: 0
                         }
                       ],
                       PatientId: customerDetailsPatientList[j].PatientId
                     }
                   } catch (e) {
                     console.log("error occured at line no : 2576 : \n\n", e);
                     sendTextMessage(session.id, "opps something went wrong at line 2576.")
                   }


                   try {
                     if(session.currentUsage.updatedPaymentObj !== undefined){
                         formattedPlaceOrderPaymentObject = {
                           PaymentMethodId : session.currentUsage.updatedPaymentObj.PaymentId,
                           PaymentToken : session.currentUsage.updatedPaymentObj.PaymentToken,
                           PaymentType : session.currentUsage.updatedPaymentObj.PaymentType
                         }
                     }else{
                         formattedPlaceOrderPaymentObject = {
                           PaymentMethodId : session.lastOrderDetails.Payment.PaymentId,
                           PaymentToken : session.lastOrderDetails.Payment.PaymentToken,
                           PaymentType : session.lastOrderDetails.Payment.PaymentType
                         }
                     }
                   } catch (e) {
                       console.log("error occured at line no : 2595 : \n\n", e);
                       sendTextMessage(session.id, "opps something went wrong at line 2595.")
                   }


                   placeOrderPatientsObj.push(formatPlaceOrderPatientObj);
                   try {
                     var shippingOptionId = '';
                     if(session.currentUsage.updatedShippingObj !== undefined ){
                         shippingOptionId = session.currentUsage.updatedShippingObj.ShipOptionId;
                     }else{
                         shippingOptionId = session.lastOrderDetails.ShippingOptions[0].ShipOptionId;
                     }


                     var deliveryAddress = '';
                     if(session.currentUsage.updatedDeliveryAddressObj !== undefined ){
                         deliveryAddress = session.currentUsage.updatedDeliveryAddressObj;
                     }else{
                         deliveryAddress = session.lastOrderDetails.ShippingAddress;
                     }


                       var postOrderPlaceObject = {
                           MetaData : {
                               Key: "String Content",
                               Value: "String Content"
                           },
                           NonLensItems: [],
                           Patients: placeOrderPatientsObj,
                           Payment: formattedPlaceOrderPaymentObject,
                           ShipOptionId : shippingOptionId,
                           ShippingAddress: deliveryAddress,
                       };
                   } catch (e) {
                       console.log("error occured at line no : 2628 : \n\n", e);
                       sendTextMessage(session.id, "opps something went wrong at line 2628.")
                   } finally {


                   }
                     console.log("\n===========================================================\n");
                     console.log("before posting the order object : \n\n ", JSON.stringify(postOrderPlaceObject));
                     console.log("\n===========================================================\n");
                     process_contacts_confirm_order(session.auth_code, postOrderPlaceObject).then(function(result){
                         let msg = "What do you want to do next ?";
                         console.log("------ order placed sucessfully -------");
                         console.log("------ order placed response : ", JSON.stringify(result));
                         console.log("########## order total "+result.Result.OrderTotal);
                         result = result;
                         let invoicePayloads = process_order_placed_invoice(session, result);
                         console.log("invoicePayloads : ", JSON.stringify(invoicePayloads));
                         sendReceiptMessage(session.id, invoicePayloads.payloads).then(function(){
                             sendButtonMessage(session.id, msg, invoicePayloads.buttons);


                         })


                     })


                   }
                 }
             }
         }
   }
}


var fetchMultiUserData = function(session, addedUser){
   var userArr = [];
   if(addedUser === null){
       userArr = session.multipleUser;
   }else{
       let index = session.multipleUser.indexOf(addedUser);
       session.multipleUser.splice(index, 1);
       userArr = session.multipleUser;
       console.log("rest of the user is: ", userArr);
   }
   return userArr;
}


var process_add_user = function(session, message){
   try {
     console.log("---- calling multi user add user -----");
     sendTypingOnAction(session.id);
     //let multipleUser = fetchMultiUserData(session,null);


     let multipleUser = session.addUserList;
     let quickReplies = [];
     let sortedMultipleUser = [];
     // for (let j = 0; j < session.lastOrderPatientsName.length; j++) {
     //     let index = multipleUser.indexOf(session.lastOrderPatientsName[j]);
     //     multipleUser.splice(index, 1);
     // }


     console.log("after sorting the user list is :: ", multipleUser);


       if(multipleUser.length > 0){
         for (let i = 0; i <  multipleUser.length; i++) {
           let quickRepliesButtonObject = {
              "content_type":"text",
              "title": multipleUser[i],
              "payload": JSON.stringify({
                action: "processMultipleAddUser",
                userName: multipleUser[i]
              })
           }
           quickReplies.push(quickRepliesButtonObject);
         }


         return sendQuickReplies(session.id, prompts.onAddPatientResponse.caption, quickReplies);


       }else{
           sendTextMessage(session.id, "No user found to add from the order list.");
       }




   } catch (e) {
         console.log("error occured when showing the add user list.");
         sendTextMessage(session.id, "oops something went wrong when showing the add user list.")
   } finally {


   }


}


var process_remove_user = function(session, message){
 try {
         console.log("---- calling multi user reemove user -----");
         sendTypingOnAction(session.id);


         // let multipleUser = fetchMultiUserData(session,null);
         let multipleUser = session.removeUserList;
         console.log("\n\n===== multipleUser :: \n\n", multipleUser);
         // adding the dynamically added user
         // if(session.sortedList !== undefined && (session.sortedList.length > 0)){
         //       multipleUser =  multipleUser.concat(session.sortedList);
         // }
         if(multipleUser.length > 1 ){
             let quickReplies = [];
               for (let i = 0; i <  multipleUser.length; i++) {
                 let quickRepliesButtonObject = {
                    "content_type":"text",
                    "title": multipleUser[i],
                    "payload": JSON.stringify({
                      action: "processMultipleRemoveUser",
                      userName: multipleUser[i]
                    })
                 }
                 quickReplies.push(quickRepliesButtonObject);
               }
               return sendQuickReplies(session.id, prompts.onAddPatientResponse.caption, quickReplies);
         }else{
             sendTextMessage(session.id, "No user found to remove from the order list.").then(function(){
                 let msg = "Do you want to change anything else ?"
                 process_multi_user_order_change_options(session, prompts.onSelectSecondTimeEditOrderResponse.caption);
             })
         }


 } catch (e) {
         console.log("\n\n\nerror: ", e);
         sendTextMessage(session.id, "oops something went wrong when processing remove an user.")
 } finally {


 }


}


var process_multiple_add_user_response = function(session, addedUser){
   try {
     console.log("----- calling multiple add user response ------");
     sendTypingOnAction(session.id);


     var msg = addedUser+"\'s prescription has been added to the order.";
     // let multipleUser = fetchMultiUserData(session, addedUser);
     //---------------------------------------------------------------------
     let multipleUser = session.addUserList;
     let index = multipleUser.indexOf(addedUser);
     multipleUser.splice(index, 1);


     session.removeUserList.push(addedUser);


     console.log("rest of the user : ", multipleUser);
     //---------------------------------------------------------------------
     let quickReplies = [];
     if(multipleUser.length > 0){


           if(multipleUser.indexOf("Done") === -1){
               multipleUser.push("Done");
           }


             //testing for no user found to remove from the order list
             if(multipleUser.length > 0){
               for (let i = 0; i <  multipleUser.length; i++) {
                 let quickRepliesButtonObject = {
                    "content_type":"text",
                    "title": multipleUser[i],
                    "payload": JSON.stringify({
                      action: "processMultipleAddUser",
                      userName: multipleUser[i]
                    })
                 }
                 quickReplies.push(quickRepliesButtonObject);
               }


               sendTextMessage(session.id, msg).then(function(){


                   return sendQuickReplies(session.id, prompts.onAddPatientResponse.caption, quickReplies);
               })
             }else{
                 sendTextMessage(session.id, "No user found to remove from the order list.")
             }


     }else{


           let msg = addedUser+"\'s prescription has been added to the order.";
           sendTextMessage(session.id, msg).then(function(){
             process_multi_user_order_change_options(session, prompts.onSelectSecondTimeEditOrderResponse.caption);
           })
     }


   } catch (e) {
       sendTextMessage(session.id, "oops something went wrong when processing add user response...")
   } finally {


   }
}


var process_multiple_remove_user_response = function(session, addedUser){
   try {
     console.log("----- calling multiple remove user response ------");
     sendTypingOnAction(session.id);


     // let msg = addedUser+"  Has been removed to the order list sucessfully.";
     let msg = addedUser+"\'s prescription has been removed from the order.";


     // let multipleUser = fetchMultiUserData(session, addedUser);
     let multipleUser = session.removeUserList;
     //------------------------------------------------------------------
         let index = multipleUser.indexOf(addedUser);
         multipleUser.splice(index, 1);
         //userArr = session.multipleUser;
         console.log("rest of the user is: ", multipleUser);
         session.removeUserList = multipleUser;


         if(session.addUserList.indexOf(addedUser) === -1){
             session.addUserList.push(addedUser);
         }


     //------------------------------------------------------------------
     let quickReplies = [];
     console.log("\n\nremove user list :: \n\n", multipleUser);
     if(multipleUser.length === 1 ){
         console.log("======== !!!!!! ==========");
         let msg = addedUser+"\'s prescription has been removed from the order.";
         sendTextMessage(session.id, msg).then(function(){
             let msg = "Do you want to change anything else ?"
             process_multi_user_order_change_options(session, prompts.onSelectSecondTimeEditOrderResponse.caption);
         })
         return ;
     }


     if(multipleUser.length > 1){
           if(multipleUser.indexOf("Done") === -1){
               multipleUser.push("Done");
           }


             for (let i = 0; i <  multipleUser.length; i++) {
               let quickRepliesButtonObject = {
                  "content_type":"text",
                  "title": multipleUser[i],
                  "payload": JSON.stringify({
                    action: "processMultipleRemoveUser",
                    userName: multipleUser[i]
                  })
               }
               quickReplies.push(quickRepliesButtonObject);
             }


             sendTextMessage(session.id, msg).then(function(){
                 return sendQuickReplies(session.id, "Please remove an user from below ", quickReplies);
             })
     }
     if(multipleUser.length === 0){
         console.log("======== !!!!!! ==========");
         sendTextMessage(session.id, "You can not remove the only user.").then(function(data){
             let msg = "Do you want to change anything else ?"
             process_multi_user_order_change_options(session, prompts.onSelectSecondTimeEditOrderResponse.caption);
         })
         return;
     }


   } catch (e) {
       sendTextMessage(session.id, "oops something went wrong when processing add user response...")
   } finally {


   }
}


var makeChangesToOrder = function(session){
   try {
       fetch_contacts_customer_details(session.auth_code).then(function(data){
           var msg = "What do you want to change ?";
           if(data.Result.Patients.length  === 1 ){
               session.userType = "singleUser";
               session.customerDetails = data;
               process_single_user_order_change_options(session, msg);
           }else if(data.Result.Patients.length > 1 ){
               let patientsArr = data.Result.Patients;
               let patientsNameArr = [];
               session.userType = "multiUser";
               session.customerDetails = data;
               for (let i = 0; i < patientsArr.length; i++) {
                       let name = patientsArr[i].FirstName+" "+patientsArr[i].LastName;
                       patientsNameArr.push(name)
               }
               let lastOrderPatientsNameArr = [];
               for (let j = 0; j < session.lastOrderDetails.Patients.length; j++) {
                   let name = session.lastOrderDetails.Patients[j].FirstName+" "+session.lastOrderDetails.Patients[j].LastName;
                   lastOrderPatientsNameArr.push(name)
               }
               session.multipleUser = patientsNameArr;
               session.lastOrderPatientsName = lastOrderPatientsNameArr;
               session.removeUserList = lastOrderPatientsNameArr;
               session.finalMultiUserList = [];
               session.sortedList = [];
               session.currentUserForUpdateQuantity = {};
               session.currentUserListForUpdateQuantity = [];
               for (let j = 0; j < session.lastOrderPatientsName.length; j++) {
                   let index = patientsNameArr.indexOf(session.lastOrderPatientsName[j]);
                   patientsNameArr.splice(index, 1);
               }


               session.addUserList = patientsNameArr;// whole patient list substract last order user
               process_multi_user_order_change_options(session, msg);
           }else{


           }
       })


   } catch (e) {
       console.log();
   } finally {


   }


}


var choose_user_to_update_quantity = function(session){
   try {
         console.log("---- calling choose user to update quantity -----");
         console.log("session.removeUserList :: ", session.removeUserList);
         var quickReplies = [];
         if(session.removeUserList !== undefined && (session.removeUserList.length > 0)){
           for (let i = 0; i <  session.removeUserList.length; i++) {
             if(session.removeUserList[i] !== "Done"){
                 let quickRepliesButtonObject = {
                    "content_type":"text",
                    "title": session.removeUserList[i],
                    "payload": JSON.stringify({
                      action: "processMultipleUserUpdateQuantity",
                      userName: session.removeUserList[i]
                    })
                 }
                 quickReplies.push(quickRepliesButtonObject);
             }


           }


           return sendQuickReplies(session.id, prompts.onSelectUpdateQuantityResponse.caption, quickReplies);


         }else{
             sendTextMessage(session.id, "oops something went wrong when choose user to order list.");
         }
   } catch (e) {
       sendTextMessage(session.id, "oops something went wrong when choose user to update quantity. ");


   } finally {


   }


}


// ====================================   END CUSTOM PROCESSINGS FUNCTIONS   =================================


function showShippingAddressSelection(session) {
 if (session.shippingAddresses.length > 0) {
   var cards = [];
   var card_item;
   var index = 0;


   session.shippingAddresses.forEach(function (shipAddress) {
     var card_item = {
       title: shipAddress.Address.Address1,
       subtitle: (shipAddress.Address.City + "\n" + (shipAddress.Address.State + " " + shipAddress.Address.PostalCode) + "\n" + shipAddress.Address.Country),
       buttons: [{
         type: "postback",
         title: "Deliver here",
         payload: JSON.stringify({
           action: "ship",
           index: index
         })
       }]
     };


     index++;
     cards.push(card_item);
   });


   sendTextMessage(session.id, prompts.promptShipAddressSelection).then(function () {
     sendCardMessage(session.id, cards);
   });
 } else {
   sendTextMessage(session.id, prompts.onNoPayMethodFound);
 }
}


function storeOrderSummary(session) {
 var order_data = {
   NonLensItems: [],
   Patients: [],
   Payment: session.orderPayMethod,
   ShippingAddress: session.shippingAddresses[0].Address,
   isUPP: false
 };
 var patient;


 var promos = [{
   Description: "$100.00 Rebate",
   PromotionType: "MailInRebate",
   DiscountAmount: 100.0,
   RequiredQuantity: 0
 }, {
   Description: "$45.00 Rebate",
   PromotionType: "MailInRebate",
   DiscountAmount: 45.0,
   RequiredQuantity: 0
 }];


 session.orderItems.forEach(function (order_item) {
   patient = {
     FirstName: order_item.firstName,
     LastName: order_item.lastName,
     Prescriptions: [{
       RightItem: {
         AvailablePromotions: promos,
         BrandId: order_item.rightLens.brandId,
         BrandName: order_item.rightLens.brandName,
         Upc: order_item.rightLens.upc,
         ColorName: "Gemstone Green",
         PrescriptionId: order_item.prescriptionId,
         Parameters: order_item.rightLens.params,
         changedQuantity: 0,
         LineItemSubTotal: 0.0,
         DiscountTotal: 0.0,
         UnitPrice: 0.0,
         Quantity: 1,
         PhotoOnlyParams: order_item.rightLens.photoOnlyParams
       },
       LeftItem: {
         AvailablePromotions: promos,
         BrandId: order_item.leftLens.brandId,
         BrandName: order_item.leftLens.brandName,
         Upc: order_item.leftLens.upc,
         ColorName: "Shimmer Natural",
         PrescriptionId: order_item.prescriptionId,
         Parameters: order_item.leftLens.params,
         changedQuantity: 0,
         LineItemSubTotal: 0.0,
         DiscountTotal: 0.0,
         UnitPrice: 0.0,
         Quantity: 1,
         PhotoOnlyParams: order_item.leftLens.photoOnlyParams
       },
       DoctorName: order_item.doctorName,
       Promotions: promos,
       PrescriptionId: order_item.prescriptionId,
       isUPP: false,
       changedAutoReorderPeriodDaysDifference: 0,
       ReorderPeriod: 0,
       changedAutoReorderDateDaysDifference: 0
     }],
     PatientId: order_item.patientId
   };


   order_data.Patients.push(patient);
 });


 write_log("param=> " + JSON.stringify(order_data));


 request({
   uri: (config.C1800_API_BASE_URL + '/order/summary/?returnShippingDiscount=true&showGoogleWallet=false'),
   method: 'POST',
   headers: {
     apikey: config.C1800_API_KEY
   },
   json: order_data
 }, function (error, response, body) {
   if (!error && response.statusCode == 200) {
     if (body.Result) {
       write_log("result=> " + JSON.stringify(body.Result));
       session.orderTotal = body.Result.OrderTotal;
       session.shippingOptions = body.Result.ShippingOptions;
       showDeliveryOptionSelection(session);
     } else {
       write_log("ATTN: no order summary result returned by the API.");
       sendTextMessage(session.id, prompts.errMsgGeneric);
     }
   } else {
     if (error) {
       write_error_log("error in calling order summary API for [" + session.id + "]: " + error);
     } else {
       write_error_log("invalid status code returned by order summary API for [" + session.id + "]: " + response.statusCode);
     }
     sendTextMessage(session.id, prompts.errMsgGeneric);
   }
 });
}


function showDeliveryOptionSelection(session) {
 if (session.shippingOptions.length > 0) {
   var cards = [];
   var card_item;
   var index = 0;


   session.shippingOptions.forEach(function (shipOption) {
     var card_item = {
       title: shipOption.CartDisplayDescription,
       subtitle: "Cost: " + shipOption.Cost,
       buttons: [{
         type: "postback",
         title: "Select this option",
         payload: JSON.stringify({
           action: "deliveryMode",
           index: index
         })
       }]
     };


     index++;
     cards.push(card_item);
   });


   sendTextMessage(session.id, prompts.promptShipOptionSelection).then(function () {
     sendCardMessage(session.id, cards);
   });
 } else {
   sendTextMessage(session.id, prompts.onNoShipOptionFound);
 }
}


function showOrderSummary(session) {
 var order_summary = prompts.cardOrderSummary.caption + "\nTotal cost: " + session.orderTotal;


 var buttons = [{
   type: "postback",
   title: prompts.cardOrderSummary.options[0],
   payload: JSON.stringify({
     action: "orderConfirmation.ok",
   })
 }, {
   type: "postback",
   title: prompts.cardOrderSummary.options[1],
   payload: JSON.stringify({
     action: "cancel.general"
   })
 }]


 sendButtonMessage(session.id, order_summary, buttons);
}


function sendInvoice(session) {
 try {
 var receiptId = "OCOR" + Math.floor(Math.random()*1000);
 var order_item = session.orderItems[0];


 var invoice = {
   template_type: "receipt",
   recipient_name: session.fullName,
   order_number: receiptId,
   currency: "USD",
   payment_method: ("Visa " + session.orderPayMethod.LastFour),
   timestamp: Math.floor(Date.now() / 1000).toString(),
   elements: [
     {
       title: order_item.rightLens.brandName,
       subtitle: "Right Eye",
       quantity: 1,
       price: 83,
       currency: "USD",
       image_url: (config.SERVER_URL + "/assets/air_optics.jpg")
     },
     {
       title: order_item.leftLens.brandName,
       subtitle: "Left Eye",
       quantity: 1,
       price: 40,
       currency: "USD",
       image_url: (config.SERVER_URL + "/assets/av_define.png")
     }
   ],
   address: {
     street_1: session.orderShippingAddress.Address.Address1,
     street_2: "",
     city: session.orderShippingAddress.Address.City,
     postal_code: session.orderShippingAddress.Address.PostalCode,
     state: session.orderShippingAddress.Address.State,
     country: session.orderShippingAddress.Address.Country
   },
   summary: {
     subtotal: session.orderTotal,
     shipping_cost: session.orderShippingOption.Cost,
     total_tax: 0,
     total_cost: (session.orderTotal - session.orderShippingOption.Cost)
   },
   adjustments: [
     {
       name: "$45.00 Rebate",
       amount: 45
     }
   ]
 };


 sendReceiptMessage(session.id, invoice);
 } catch (err) {
   sendTextMessage(session.id, prompts.errMsgGeneric);
   write_error_log("error in sendInvoice(): " + err);
 }
}


function doNothing() {
 return (true);
}


var sendTypingOnAction = function(recipientId){
   sendActionMessage(recipientId, "typing_on");
}


var sendTypingOffAction = function(recipientId){
   sendActionMessage(recipientId, "typing_off");
}


var processNopeAllDone = function(session){
     let txt = "Thank you.";
     sendTextMessage(session.id, txt);
}


/* ================================= [ F B  F U N C T I O N S ] ================================= */


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


function sendActionMessage(recipientId, action){
 var msgData = {
   recipient: {
     id: recipientId
   },
   sender_action: action
 }
 return callSendAPI(msgData);
}


function sendCardMessage(recipientId, elements) {
 var messageData = {
   recipient: {
     id: recipientId
   },
   message: {
     attachment: {
       type: "template",
       payload: {
         template_type: "generic",
         elements: elements
       }
     }
   }
 }
 return callSendAPI(messageData);
};


function sendReceiptMessage(recipientId, element) {
 var receipt_msg = {
   recipient: {
     id: recipientId
   },
   message: {
     attachment: {
       type: "template",
       payload: element
     }
   }
 };


 return callSendAPI(receipt_msg);
}


function sendButtonMessage(recipientId, caption, buttons) {
 var msgData = {
   recipient: {
     id: recipientId
   },
   message: {
     attachment: {
       type: "template",
       payload: {
         template_type: "button",
         text: caption,
         buttons: buttons
       }
     }
   }
 }
 return callSendAPI(msgData);
}


function sendRequestToLogin(recipientId) {
 var postBackUrl = "https://a3973ad3.ngrok.io/authorize";
 var urlEncodedPostBack = encodeURIComponent(postBackUrl);
 var messageData = {
   recipient: {
     id: recipientId
   },
   message: {
     attachment: {
       type: "template",
       payload: {
         template_type: "button",
         text: prompts.cardRequestToLogin.caption,
         buttons: [{
           type: "account_link",
           //url: ("https://services.1800contactstest.com/MobileService/4/Login/LoginPage.aspx?sessionId="+recipientId+"&postback="+ postBackUrl),
           url : "https://a3973ad3.ngrok.io/authorize"
         }
       ]
       }
     }
   }
 }


 callSendAPI(messageData);
}


function newSendRequestToLogin(recipientId) {
 var postBackUrl = "https://08c54143.ngrok.io/fblogin";
 var urlEncodedPostBack = encodeURIComponent(postBackUrl);
 var messageData = {
   recipient: {
     id: recipientId
   },
   message: {
     attachment: {
       type: "template",
     payload: {
         template_type: "button",
         text: prompts.cardRequestToLogin.caption,
         buttons: [{
           type: "account_link",
           //url: ("https://services.1800contactstest.com/MobileService/4/Login/LoginPage.aspx?sessionId="+recipientId+"&postback="+ postBackUrl)
           url: ("https://services.1800contactstest.com/MobileService/4/Login/LoginPage.aspx?sessionId="+recipientId+"&postback="+ postBackUrl)


         }]
       }
     }
   }
 };


 callSendAPI(messageData);
}


function verifyRequestSignature(req, res, buf) {
 /* Verify that the callback came from Facebook. */
 var signature = req.headers["x-hub-signature"];


 if (!signature) {
   // For testing, let's log an error. In production, you should throw an error.
   console.log("+++couldn't validate the signature.");
   write_log("couldn't validate the signature.");
 } else {
   var elements = signature.split('=');
   var method = elements[0];
   var signatureHash = elements[1];


   var expectedHash = crypto.createHmac('sha1', config.FB_APP_SECRET)
                       .update(buf)
                       .digest('hex');


   if (signatureHash != expectedHash) {
     throw new Error("Couldn't validate the request signature.");
   }
 }
}


// -- call to FB messenger API ----------


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
               write_log("successfully sent message with id " + messageId + " to recipient " + recipientId + ".");
             } else {
               write_log("Successfully called Send API for recipient " + recipientId);
             }


           resolve();
         } else {
           console.log("\n\n\nbody.error :: ", body.error);
           // sendTextMessage(session.id, "oops something went wrong when send api is calling.")
           write_log("Failed calling Send API: ststus=>[" + response.statusCode + "] message=>[" + response.statusMessage + "] error=>[" + body.error + "].");
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


function sendQuickReplies(recipientId, msg, quickRepliesArr){
 var msgData = {
   recipient: {
     id: recipientId
   },
   message: {
       text : msg,
       quick_replies: quickRepliesArr
   }
 }
 return callSendAPI(msgData);
}


function sendGreetingText(){
 console.log("\n\n===== calling send greeting text =====\n\n");
 var messageData = {
   setting_type:"call_to_actions",
   thread_state:"new_thread",
   call_to_actions:[
     {
       payload: "onGetStartedButton"
     }
   ]
 }


 return callSendAPI(messageData);
}


/* ================================ [ L O G  F U N C T I O N S ] ================================ */


function write_log(log_message) {
   try {
       var cur_date = new Date();
       var msg = '\r\n[' + cur_date.toLocaleDateString("en-US") + ' ' + cur_date.toLocaleTimeString("en-US") + ']: ' + log_message + '\r\n';


       fs.appendFile(config.FILENAME_WITH_PATH_APP_LOG, msg, (err) => {
           if (err) {
               console.log('ERROR!!! in writing log message {' + log_message + '}.');
           }
       });
   }
   catch(err) {
       console.log('ERROR!!! in function "write_log()", ERROR={' + log_message + '}.');
   }
}


function write_error_log(log_message) {
   try {
       var cur_date = new Date();
       var msg = '\r\n[' + cur_date.toLocaleDateString("en-US") + ' ' + cur_date.toLocaleTimeString("en-US") + '] ERROR!!!: ' + log_message + '\r\n';


       fs.appendFile(config.FILENAME_WITH_PATH_ERR_LOG, msg, (err) => {
           if (err) {
               console.log('ERROR!!! in writing error log message {' + log_message + '}.');
           }
       });
   }
   catch(err) {
       console.log('ERROR!!! in function "write_error_log()", ERROR={' + log_message + '}.');
   }
}


function log_message(session) {
   try {
       var msgText = session.message.text;


       var cur_date = new Date();
       var msg = "\r\n[" + cur_date.toLocaleDateString("en-US") + " " + cur_date.toLocaleTimeString("en-US") + "] " + session.message.user.name + ": {" + msgText + "}.";


       fs.appendFile(config.FILENAME_WITH_PATH_MSG_LOG, msg, (err) => {
           if (err) {
               console.log("ERROR!!! in logging message {" + msgText + "}.");
           }
       });
   }
   catch(err) {
       console.log("ERROR!!! in function log_message(), ERROR={" + msgText + "}.");
   }
}


function write_NLP_log(log_message) {
   try {
       var cur_date = new Date();
       var msg = '\r\n[' + cur_date.toLocaleDateString("en-US") + ' ' + cur_date.toLocaleTimeString("en-US") + ']: ' + log_message + '\r\n';


       fs.appendFile(config.FILENAME_WITH_PATH_NLP_LOG, msg, (err) => {
           if (err) {
               console.log('ERROR!!! in writing NLP message {' + log_message + '}.');
           }
       });
   }
   catch(err) {
       console.log('ERROR!!! in function "log_NLP_failure()", ERROR={' + log_message + '}.');
   }
}


//----------------------------- END WORKING ON RUNNING THE EXISTING 1800-contacts PROJECT -------------------


app.listen(app.get('port'), function() {
 console.log('Node app is running on port', app.get('port'));
});


// var serverAddress = app.listen(9000, function() {
//   console.log('Node app is running on port', serverAddress.address().port);
//
// });
