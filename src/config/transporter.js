const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
    sendMail: async (user, subject, text) => {
        try {
            const transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.MAILTRAP_USERNAME,
                    pass: process.env.MAILTRAP_PASS
                }
            });

            const mailOptions = {
                from: '"RSP(GraphQL)-Admin" <rsp@example.com>',
                to: user,
                subject: subject,
                text: text
            }

            transport.sendMail(mailOptions, () => { });
        } catch (e) {
            // handle errors here
            res.json(e);
        }
    },
};