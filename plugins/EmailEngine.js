const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: process.env.APP_REGISTERED_EMAIL_SERVICE_PARTNER,
  auth: {
    user: process.env.APP_REGISTERED_EMAIL,
    pass: process.env.APP_REGISTERED_PASSWORD,
  },
});

async function sendMail(from, to, subject, body, html) {
  console.log("Sending email");
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: body,
    html: html,
  };
  try {
    const mail = await transport.sendMail({ ...mailOptions });
    console.log(mail);
  } catch (error) {
    console.log("Error sending mail", error);
  }
}

module.exports = {
  sendMail,
};
