const { Pool } = require("pg");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require('google-auth-library');
const { PrismaClient } = require('@prisma/client');

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


/**
 * Initialize the Prisma Client instance. will use this instance all over application
 * Prisma automatically reads the 'DATABASE_URL' environment variable from your .env file.
 * It manages connection pooling under the hood by default.
 */
const prisma = new PrismaClient({
  // 'query' can be added here if you want to print every SQL query to your terminal
  log: ['error', 'warn'],
});

/**
 * Optional Helper: Use this function in your server.js / app.js
 * to verify the database connection right when the application starts.
 */
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log(' Database connected successfully via Prisma!');
  } catch (error) {
    console.error(' Database connection failed:', error.message);
    process.exit(1); // Shuts down the application if the database is unreachable
  }
};




module.exports = { pool, transporter, googleClient, prisma, connectDB };