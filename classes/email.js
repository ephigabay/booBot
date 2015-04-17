/**
 * Created by ephi on 4/17/15.
 */
var emailjs = require('emailjs');
var emailConfig = require('../_email-config');

module.exports = Email;

function Email() {
    this.server = emailjs.server.connect({
        user: emailConfig.USERNAME,
        password: emailConfig.PASSWORD,
        host: emailConfig.SMTP_HOST,
        ssl: emailConfig.IS_SSL
    });
}

Email.prototype.sendMail = function(to) {
    this.server.send({
        text: emailConfig.MESSAGE,
        from: emailConfig.FROM,
        subject: emailConfig.SUBJECT,
        to: to
    }, function (err, message) {
        console.log(err || message);
    });
};