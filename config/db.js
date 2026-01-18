const { Pool } = require("pg");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



module.exports = { pool, transporter, googleClient };