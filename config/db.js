const { Pool } = require("pg");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');
require("dotenv").config();

//(in dev you use local postgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// using free gmail id to send otps
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


// google auth
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



module.exports = { pool, transporter, googleClient };