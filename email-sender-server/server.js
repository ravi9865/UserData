const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
// import axios from 'axios';


const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

app.post('/send_mail', (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ravira_209098@saitm.org',
      pass: 'zqup crkf lswa xdoh',
    },
  });

  const mailOptions = {
    from:'ravira_209098@saitm.org',
    to: 'ravira_209098@saitm.org',
    subject: subject,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent successfully:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
