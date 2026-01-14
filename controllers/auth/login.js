const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../../config/db.js");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) return res.status(401).json("Invalid Credential");

    const user = userResult.rows[0];

    if (!user.is_verified) return res.status(401).json("Please verify your email first.");
    if (!user.password) return res.status(401).json("Please login with Google.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json("Invalid Credential");

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
module.exports = login;