const nodemailer = require('nodemailer');

function createTransporter() {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mahdijenhani125@gmail.com',
      pass: 'mpbrbdyneerrvhfv'
    }
  });

  return transporter;
}

module.exports = createTransporter;
