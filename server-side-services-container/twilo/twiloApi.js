const trialPhNUmber = "12055395346";
const twiloAccSid = "AC2ba5d815c33df5792d042abe6609a716";
const twiloAuthToken = "a8fff1b482733729332229b1398bfa79";


// twilio integration
const accountSid = 'AC2ba5d815c33df5792d042abe6609a716';
const authToken = 'a8fff1b482733729332229b1398bfa79';
const client = require('twilio')(accountSid, authToken);




function sendTwilioSms(to, msg){
  console.log("========== send twilio sms ============");
  console.log("to : ", to);
  console.log("sms : ", msg);

  client.messages
    .create({
       body: msg,
       from: '+12055395346',
       to: to
     })
    //.then(message));
}



module.exports.sendTwilioSms = sendTwilioSms;
