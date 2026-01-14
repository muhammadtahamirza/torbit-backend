const jwt = require("jsonwebtoken");
const { pool, googleClient } = require("../../config/db.js");

const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { email, name, sub: googleId } = ticket.getPayload();

     let user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
       user = await pool.query(
        "INSERT INTO users (name, email, google_id, is_verified) VALUES ($1, $2, $3, TRUE) RETURNING *",
        [name, email, googleId]
      );
    } else {
       if (!user.rows[0].google_id) {
         user = await pool.query(
           "UPDATE users SET google_id = $1, is_verified = TRUE WHERE email = $2 RETURNING *", 
           [googleId, email]
         );
      }
    }

     const jwtToken = jwt.sign(
      { user_id: user.rows[0].user_id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

     res.json({ token: jwtToken, user: user.rows[0] });

  } catch (err) {
    console.error("Google Auth Error:", err.message);
    res.status(400).send("Google Auth Failed");
  }
};

module.exports = googleAuth;