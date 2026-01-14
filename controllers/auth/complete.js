const { pool } = require("../../config/db.js");

// Update Profile (Gender/Contact)
const completeProfile = async (req, res) => {
  const userId = req.user.user_id;
  const { gender, contact } = req.body;

  try {
    const update = await pool.query(
      "UPDATE users SET gender = $1, contact = $2 WHERE user_id = $3 RETURNING *",
      [gender, contact, userId]
    );
    res.json(update.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

module.exports = { completeProfile };