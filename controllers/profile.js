const { pool } = require("../config/db.js");

// API 1: Fetch Profile & Calculate Completion
const getProfile = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const result = await pool.query(
      "SELECT name, email, contact, gender, google_id FROM users WHERE user_id = $1", 
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json("User not found");
    }

    const user = result.rows[0];

    // Completion Logic: 5 steps = 20% each
    let score = 0;
    if (user.name) score += 20;
    if (user.contact) score += 20;
    if (user.gender) score += 20;
    if (user.google_id) score += 20;
    
    // Safety check: ensure email exists before calling toLowerCase/endsWith
    if (user.email && user.email.toLowerCase().endsWith("nu.edu.pk")) {
      score += 20;
    }

    res.json({ ...user, completionPercentage: score });
  } catch (err) {
    console.error("Get Profile Error:", err.message);
    res.status(500).json("Server Error");
  }
};

// API 2: Update General Info
const updateProfile = async (req, res) => {
  const { name, contact, gender } = req.body;
  const userId = req.user.user_id;

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, contact = $2, gender = $3 WHERE user_id = $4",
      [name, contact, gender, userId]
    );

    // rowCount check ensures the update actually happened
    if (result.rowCount === 0) {
      return res.status(404).json("User not found to update");
    }

    // Always return JSON object to prevent Axios parsing errors
    res.status(200).json({ message: "Profile Updated" });
  } catch (err) {
    console.error("Update Profile Error:", err.message);
    // Send a clear string for the frontend catch block
    res.status(500).json("Database Update Failed");
  }
};

module.exports = { getProfile, updateProfile };