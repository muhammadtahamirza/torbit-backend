const { Pool } = require("pg");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');
require("dotenv").config();

// --- NEON POSTGRES CONFIGURATION ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Make sure this is the POOLED string from Neon
  ssl: {
    rejectUnauthorized: false, // REQUIRED: Neon requires SSL
  },
  max: 10, // Limit connections so Vercel doesn't crash the DB
  idleTimeoutMillis: 30000, // Close connections if not used for 30s
  connectionTimeoutMillis: 2000, // Fail fast if DB is unreachable
});

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // true for 465, false for other ports
  port: 587,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// --- GOOGLE AUTH ---
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = { pool, transporter, googleClient };