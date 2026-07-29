const { pool } = require("../../config/db.js");
// NOTE: Have to move from calling direct queries to using ORM for database quries, it prevents security risks, for details search: sql injectoin


// Update Profile (Gender/Contact)
const completeProfile = async (req, res) => {
  const userId = req.user.user_id;
  const { gender, contact } = req.body;

  try {
		// TODO: replace with ORM prisma query
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