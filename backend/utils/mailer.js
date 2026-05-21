const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password',
  },
});

const sendMail = ({ to, subject, html }) => {
  return transporter.sendMail({
    from: '"Internship Portal" <your-email@gmail.com>',
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
