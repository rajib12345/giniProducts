


var sendGridApiKey = "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";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY || sendGridApiKey);
var msg = {
  to: 'rajibkarmakar87@gmail.com',
  from: 'rajibkarmakar87@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

var sendEmail = function(){
  sgMail.send(msg);
}




module.exports.sendEmail = sendEmail;
