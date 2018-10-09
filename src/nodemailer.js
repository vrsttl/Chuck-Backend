'use strict';
const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'xt3k5kzkqlwpbpyv@ethereal.email',
      pass: '6wg6USy6vbgNkJFhqY'
    }
  });

  let mailOptions = {
    from: 'Attila Veres <foo@example.com>',
    to: 'vrsttl@gmail.com',
    subject: 'Hello ✔',
    html: '<b>Hello world?</b>' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
});