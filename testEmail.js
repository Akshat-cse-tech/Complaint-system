require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'Test Email from ComplaintDesk',
  text: 'If you receive this, email is working!'
}).then(() => console.log('Email sent successfully!'))
  .catch(err => console.log('Error:', err.message));require('dotenv').config(); 
