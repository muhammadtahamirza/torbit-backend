const { pool, transporter, googleClient } = require("../../config/db.js");

// Path 1: The Request (Send OTP to the target email)
const requestEmailUpgrade = async (req, res) => {
  const { newEmail } = req.body;
  const userId = req.user.user_id;

  if (!newEmail.endsWith("nu.edu.pk")) {
    return res.status(400).json("Invalid domain. Please use your @nu.edu.pk email.");
  }

  try {
    // --- SAFETY CHECK: Is this FAST email already taken by someone else? ---
    const emailCheck = await pool.query("SELECT user_id FROM users WHERE email = $1", [newEmail]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json("This campus email is already registered to another account.");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60000); // 10 mins

    await pool.query(
      "UPDATE users SET otp_code = $1, otp_expiry = $2 WHERE user_id = $3",
      [otp, expiry, userId]
    );

    await transporter.sendMail({
      from: `"Torbit Security" <${process.env.SMTP_USER}>`,
      to: newEmail,
      subject: "Verify Your Student Identity",
      html: `<h1>Verification Code: ${otp}</h1><p>Enter this code to swap your email to your student account.</p>`
    });

    res.json("Verification code sent to your student email.");
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

// Path 2: The Final Update (The Swap)
const finalizeEmailUpgrade = async (req, res) => {
  const { newEmail, otp } = req.body;
  const userId = req.user.user_id;

  try {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [userId]);
    const user = result.rows[0];

    if (!user || user.otp_code !== otp || new Date() > new Date(user.otp_expiry)) {
      return res.status(400).json("Invalid or expired OTP.");
    }

    // --- FINAL CHECK: Re-verify availability to prevent race conditions ---
    const emailCheck = await pool.query("SELECT user_id FROM users WHERE email = $1 AND user_id != $2", [newEmail, userId]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json("This email was claimed by another user during verification.");
    }

    await pool.query(
      "UPDATE users SET email = $1, otp_code = NULL, otp_expiry = NULL WHERE user_id = $2",
      [newEmail, userId]
    );

    res.json("Identity Upgraded! Your student badge is now active.");
  } catch (err) {
    res.status(500).json("Database Error");
  }
};

// Path 3: Google Instant Swap
const googleAuthUpdate = async (req, res) => {
  const { token } = req.body;
  const loggedInUserId = req.user.user_id;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { email, sub: googleId } = ticket.getPayload();

    if (!email.endsWith("nu.edu.pk")) {
      return res.status(400).json("Please select your @nu.edu.pk Google account.");
    }

    // --- SAFETY CHECK: Check if this Google email is already used by another ID ---
    const emailCheck = await pool.query("SELECT user_id FROM users WHERE email = $1 AND user_id != $2", [email, loggedInUserId]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json("This Google account is already linked to another Torbit user.");
    }

    await pool.query(
      "UPDATE users SET email = $1, google_id = $2 WHERE user_id = $3",
      [email, googleId, loggedInUserId]
    );

    res.json({ message: "Identity Verified via Google!", email });
  } catch (err) {
    res.status(400).json("Google verification failed.");
  }
};

module.exports = { requestEmailUpgrade, finalizeEmailUpgrade, googleAuthUpdate };