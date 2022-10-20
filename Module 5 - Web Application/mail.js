module.exports = (to, subject, text) => {
  const nodeMailer = require('nodemailer');
  const smtpTransport = nodeMailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const message = {
    from: process.env.SMTP_USERNAME,
    to,
    subject,
    text
  }

  smtpTransport.sendMail(message, (err, res) => {
    if (err) {
      console.log('Fail to send email: ' + err)
    }
    else {
      console.log('Email sent sucessfully!');
    }
    smtpTransport.close();
  });
}