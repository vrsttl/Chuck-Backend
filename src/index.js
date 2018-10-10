'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const PORT = process.env.SERVPORT;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
      html: `<div>
                <h1 style="text-align: center; color:red; font-size:34px;">Your Chuck Norris joke of the day...</h1>
                <h2 style="text-align: center; color:blue;">${joke}</h2>
             </div>
      `
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

app.post('/', (req, res) => {
  const emails = req.body.emails;
  const currentJoke = req.body.currentJoke.currentJoke;
  if (emails) {
    sendMail(emails, currentJoke);
    res.json({
      result: "OK"
    })
  } else {
    res.json({
      result: "Insufficient email addresses received."
    })
  }
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
