const express = require('express');
var nodemailer = require('nodemailer');
const router = express.Router();

// api to invite teammates over email
router.post('/', async (req, res) => {
    var toList = req.body.emailIds;
    try {
        //default account to test 
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
                user: testAccount.user, 
                pass: testAccount.pass, 
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: toList, // list of receivers
            subject: "Invitation to Task Management Application", // Subject line
            text: "Here is the link to register/login to the application "
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.json({
            statusCode: 200,
            message: "Invitation sent successfully",
            data: ""
        });

    } catch (err) {
        res.json({
            statusCode: 500,
            message: "Error occured while inviting teammates " + error,
            data: ""
        });
    }
})
module.exports = router ;