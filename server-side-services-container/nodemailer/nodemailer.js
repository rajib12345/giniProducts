var nodemailer = require('nodemailer');
const promise = require("promise");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gini.assistant@gmail.com',
    pass: 'gini@gmail@2018'
  }
});

var mailOptions = {
  from: 'gini.assistant@gmail.com',
  to: '',
  subject: '',
  text: ''
};




var sendEmail = function(mailObject){
    try {
      mailOptions.to = mailObject.mailTo;
      mailOptions.subject = mailObject.mailSubject;
      mailOptions.text = mailObject.mailBody;

      console.log("== in send email fun mail options \n", mailOptions);

      var emailPromise = new promise(function(resolve, resject){
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            resolve(info.response);
          }
        });
      });

      return emailPromise;
    } catch (e) {

    }

}

var create_email_template = function(){
    var template = `
    <div>
        <p style="text-align:center; margin-top:10px;">Compose Your Email</p>
    </div>
    <div class="mail-template" style="margin-top:10px; margin-left:-6px;">
        <div class="mail-header" style="height:50px; color:white; background-color: OrangeRed;">
            <p style="padding-top:13px; padding-left: 10px;">Compose</p>
            <button type="button" id="sendEmailBtn" class="btn" style="float: right;color: white;margin-right: 5px;margin-top: -35px; background-color: OrangeRed; outline:none !impotrtant;" onclick="sendEmail()">
              <i class="fa fa-paper-plane"  aria-hidden="true" style="font-size:16px; transform: rotate(60deg);"></i>
            </button>
        </div>
        <div class="mail-From" style="border-bottom:1px solid #ddd;">
            <input type="text"  class="" style="padding-left: 10px;width:100%; height:40px;  border:none; outline:none !important; border-radius:0px;" id="usr" placeholder="From   gini.assistant@gmail.com" disabled="true">
        </div>
        <div class="mail-to"  style="border-bottom:1px solid #ddd;">
            <input type="text" id="mailTo" class="" style="padding-left: 10px;width:100%; height:40px; border:none; outline:none !important; border-radius:0px;" id="usr" placeholder="To">
        </div>
        <div class="mail-subject"  style="border-bottom:1px solid #ddd;">
            <input type="text" id="mailSubject" class="" style="padding-left: 10px;width:100%; height:40px; border:none; outline:none !important; border-radius:0px;" id="usr" placeholder="Subject">
        </div>
        <div class="mail-body"  style="border-bottom:1px solid #ddd;">
            <textarea class="" id="mailBody" style="padding-left: 10px;width:100%;border:none; outline:none !important; border-radius:0px;" rows="10" id="comment" placeholder="Compose email"></textarea>
        </div>
    </div>
    `;

    return template;
}


module.exports.sendEmail = sendEmail;
module.exports.create_email_template = create_email_template;
