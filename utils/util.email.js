/**
 * @file For sending mail to client using nodemailer.
 * @author Krutin Trivedi <krutin@dal.ca>
 */

//imports
var nodemailer = require('nodemailer');

var sendMailMethods = {
	forgotPassword: function(email, _token_) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'svachcart@gmail.com',
                pass: 'Admin@123'
            }
        });
        
        var mailOptions = {
            from: 'svachcart@gmail.com',
            to: email,
            subject: 'Svachcart',
            html: '<h1>Forgot your password</h1>' +
                        '<p>we got your backs..</p>' +
                        '<br/>' +
                        '<p>To change your password click on the below link</p>' +
                        '<br/>' +
                        '<a href="http://localhost:3000/reset_password?reset='+ _token_ +'">http://localhost:3000/reset_password?reset='+_token_+'</a>'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
	},
	
    orderShipped: function(firstName, lastName, email) {
		var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'svachcart@gmail.com',
                pass: 'Admin@123'
            }
        });
        
        var mailOptions = {
            from: 'svachcart@gmail.com',
            to: email,
            subject: 'Svachcart',
            html: require('./templates/index.js').orderConfirmation(),
            attachments: [{
                filename: 'image-1.png',
                path: './utils/templates/images/image-1.png',
                cid: 'fb@nodemailer.com' //same cid value as in the html img src
            },{
                filename: 'image-2.png',
                path: './utils/templates/images/image-2.png',
                cid: 'twitter@nodemailer.com' //same cid value as in the html img src
            },{
                filename: 'image-3.png',
                path: './utils/templates/images/image-3.png',
                cid: 'linkedin@nodemailer.com' //same cid value as in the html img src
            },{
                filename: 'image-4.png',
                path: './utils/templates/images/image-4.png',
                cid: 'logo@nodemailer.com' //same cid value as in the html img src
            },{
                filename: 'image-6.png',
                path: './utils/templates/images/image-6.png',
                cid: 'delivery@nodemailer.com' //same cid value as in the html img src
            },]
            
            // '<h1>Hello there ' + firstName + " " + lastName + '..!</h1>' +
            //             '<p>How are you doing..?</p>' +
            //             '<br/>' +
            //             '<p>our team will get back to you shortly. please write any query you have in this mail thread.</p>' +
            //             '<br/>' +
            //             '<p>until then, Have good day ' + firstName + " " + lastName + '..! will see you soon</p>'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
	}
};

module.exports = sendMailMethods;