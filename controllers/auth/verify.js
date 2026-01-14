const jwt = require("jsonwebtoken");
const { pool } = require("../../config/db.js");

const verify = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(400).json("User not found");
    
    const user = result.rows[0];

    if (user.otp_code !== otp) return res.status(400).json("Invalid OTP");
    if (new Date() > new Date(user.otp_expiry)) return res.status(400).json("OTP Expired");

    await pool.query(
      "UPDATE users SET is_verified = TRUE, otp_code = NULL, otp_expiry = NULL WHERE email = $1",
      [email]
    );

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Verified successfully!", token });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
module.exports = verify;