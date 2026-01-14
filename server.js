const express = require("express");
const cors = require("cors");
const { pool } = require("./config/db.js"); // Import pool to test connection
require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");
const offerRoutes = require("./routes/offerRoutes.js");
const request = require("./routes/requests.js");

const app = express();

// 1. UPDATE CORS (Crucial for Vercel)
// Vercel backend needs to know exactly which frontends can talk to it
app.use(cors({
  origin: [
    "http://localhost:5173",              // Your Local React Frontend
    "https://torbit.vercel.app",          // (Example) Your Production Frontend
    "https://torbit-frontend.vercel.app"  // (Example) Your Vercel domain
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());

// Routes
app.use(authRoutes);
app.use(offerRoutes);
app.use(request);

// 2. HEALTH CHECK ROUTE (Good for debugging)
app.get('/', async (req, res) => {
  try {
    // Quick query to make sure Neon DB is connected
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: "Torbit Backend is Running!", 
      db: "Connected", 
      time: result.rows[0].now 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error", db: "Disconnected", error: err.message });
  }
});

// 3. EXPORT THE APP (Required for Vercel to work)
module.exports = app;

// 4. LISTEN LOCALLY (Only runs on your laptop, ignored by Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}