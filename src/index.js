'use strict';

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const PORT = 3000;

const sendMail = (addresses, joke) => {
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
      to: `${addresses}`,
      subject: 'Hello ✔',
      html: `${joke}` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}
app.use(express.json());

app.post('/', (req, res) => {
  const emails = req.body.emails;
  const currentJoke = req.body.currentJoke;
  if (emails.length > 0) {
    sendMail(emails, currentJoke);
    res.json({
      result: "OK"
    })
  } else {
    res.json({
      result: "Not sufficient email addresses received."
    })
  }
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});