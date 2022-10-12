const nodemailer = require('nodemailer')
const ejs = require('ejs')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "seluentreprise@gmail.com", // generated ethereal user
        pass: "rtbrgncpththgrmr", // generated ethereal password
    },
    debug: false,
    logger: true  // <---highly recommend this one here
});

const sendMail = (receiver, subject, content) => {
    ejs.renderFile(__dirname + '/templates/welcome.ejs', { receiver, content }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            let mailOptions = {
                from: 'selu.entreprise',
                to: receiver,
                subject: subject,
                html: data
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
        }
    })
}

module.exports = {
    sendMail
}