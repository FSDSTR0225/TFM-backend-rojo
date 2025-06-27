const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER, // usuario SMTP (normalmente tu email o user específico)
    pass: process.env.BREVO_SMTP_PASS, // contraseña SMTP (API key SMTP)
  },
});

module.exports = transporter;
