const bcrypt = require("bcrypt");
const { pool, transporter } = require("../../config/db.js");

const signup = async (req, res) => {
  // ✅ 1. Accept name and gender
  const { name, email, password, gender , contact} = req.body; 

  try {
    // 2. Check if a VERIFIED user already exists
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0 && userCheck.rows[0].is_verified) {
      return res.status(400).json("User already exists. Please login.");
    }

    // 3. Generate Logic (OTP & Hash)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60000); 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ 4. DB Query (Updated to include Name & Gender)
    await pool.query(
      `INSERT INTO users (email, password, otp_code, otp_expiry, is_verified, name, gender, contact)
       VALUES ($1, $2, $3, $4, FALSE, $5, $6, $7)
       ON CONFLICT (email) DO UPDATE 
       SET password = $2, 
           otp_code = $3, 
           otp_expiry = $4, 
           is_verified = FALSE,
           name = $5,     -- Update name on retry
           gender = $6,    -- Update gender on retry
           contact = $7`,
      [email, hashedPassword, otp, expiry, name, gender, contact] 
    );

    // 5. Email
    console.log(`Sending OTP to ${email}...`);
    await transporter.sendMail({
      from: `"RideCampus" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your account",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome, ${name}!</h2>
          <p>Your Verification Code is:</p>
          <h1 style="color: #6366f1; letter-spacing: 5px;">${otp}</h1>
          <p>It expires in 10 minutes.</p>
        </div>
      `,
    });

    console.log('OTP sent successfully');
    
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).send("Server Error");
  }
};

module.exports = signup;