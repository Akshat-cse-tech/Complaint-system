const nodemailer = require('nodemailer');

const sendStatusEmail = async (toEmail, username, complaintTitle, newStatus) => {
  const statusMessages = {
    'in-progress': {
      subject: '🔄 Your Complaint is Being Processed',
      color: '#60a5fa',
      message: 'Our team has started working on your complaint and it is now In Progress.'
    },
    'resolved': {
      subject: '✅ Your Complaint Has Been Resolved',
      color: '#34d399',
      message: 'Great news! Your complaint has been resolved by our team.'
    }
  };

  const info = statusMessages[newStatus];
  if (!info) return;

  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    }
  });

  const result = await transporter.sendMail({
    from: '"ComplaintDesk" <complaints@complaintdesk.com>',
    to: toEmail,
    subject: info.subject,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:auto;background:#0f1117;color:#e8eaf0;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:24px;text-align:center">
          <h1 style="color:white;margin:0;font-size:22px">ComplaintDesk</h1>
          <p style="color:rgba(255,255,255,0.7);margin:4px 0 0">College Placement Portal</p>
        </div>
        <div style="padding:24px">
          <h2 style="color:${info.color};margin-bottom:8px">${info.subject}</h2>
          <p style="color:#e8eaf0">Hello <strong>${username}</strong>,</p>
          <p style="color:rgba(255,255,255,0.7);line-height:1.6">${info.message}</p>
          <div style="background:rgba(255,255,255,0.06);border:0.5px solid rgba(255,255,255,0.12);border-radius:10px;padding:16px;margin:16px 0">
            <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px">COMPLAINT</p>
            <p style="margin:4px 0 0;color:#fff;font-weight:600">${complaintTitle}</p>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.5);font-size:12px">STATUS</p>
            <p style="margin:4px 0 0;color:${info.color};font-weight:600;text-transform:uppercase">${newStatus}</p>
          </div>
          <p style="color:rgba(255,255,255,0.5);font-size:12px">This is an automated email from ComplaintDesk.</p>
        </div>
      </div>
    `
  });

  console.log('Email preview URL:', nodemailer.getTestMessageUrl(result));
};

module.exports = { sendStatusEmail };