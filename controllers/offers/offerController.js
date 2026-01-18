const { pool } = require("../../config/db.js");


//0: get profile
const getUserProfile = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT name, email, contact, gender FROM users WHERE user_id = $1",
      [req.user.user_id] 
    );
    
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};



// 1. POST /offers (Create)
const createOffer = async (req, res) => {
  const owner_id = req.user.user_id; 
  const { car_name, seats_available, monthly_per_person, pickup_points, destination, departure_time, arrival_time } = req.body;

  try {
    const newOffer = await pool.query(
      `INSERT INTO offers (owner_id, car_name, seats_available, monthly_per_person, pickup_points, destination, departure_time, arrival_time) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [owner_id, car_name, seats_available, monthly_per_person, JSON.stringify(pickup_points), destination, departure_time, arrival_time]
    );

    res.json(newOffer.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

// 2. GET /offers/me (Dashboard - Driver's Own Posts)
const getMyOffers = async (req, res) => {
  const owner_id = req.user.user_id;
  try {
    const offers = await pool.query(
      "SELECT * FROM offers WHERE owner_id = $1 ORDER BY created_at DESC",
      [owner_id]
    );
    res.json(offers.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

// 3. GET /offers (Public Feed - Browse Page)
const getAllOffers = async (req, res) => {
  try {
    // ✅ UPDATED: Added users.email AS driver_email
    const offers = await pool.query(
      `SELECT 
          offers.*, 
          users.name as driver_name, 
          users.contact as driver_contact,
          users.email as driver_email 
       FROM offers 
       JOIN users ON offers.owner_id = users.user_id 
       ORDER BY offers.created_at DESC`
    );
    res.json(offers.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};
// 4. GET /offers/:id (Single View)
const getOfferById = async (req, res) => {
  const { id } = req.params;
  try {
    const offer = await pool.query(
      `SELECT offers.*, users.name as driver_name, users.email, users.contact as driver_contact
       FROM offers 
       JOIN users ON offers.owner_id = users.user_id 
       WHERE offer_id = $1`,
      [id]
    );

    if (offer.rows.length === 0) return res.status(404).json("Offer not found");
    
    res.json(offer.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

// 5. PUT /offers/:id (Update)
const updateOffer = async (req, res) => {
  const { id } = req.params;
  const owner_id = req.user.user_id;
  const { car_name, seats_available, monthly_per_person, pickup_points, departure_time, arrival_time } = req.body;

  try {
    const check = await pool.query("SELECT * FROM offers WHERE offer_id = $1", [id]);
    if (check.rows.length === 0) return res.status(404).json("Offer not found");
    if (check.rows[0].owner_id !== owner_id) return res.status(403).json("Not authorized");

    const updatedOffer = await pool.query(
      `UPDATE offers 
       SET car_name = $1, seats_available = $2, monthly_per_person = $3, pickup_points = $4, departure_time = $5, arrival_time = $6 
       WHERE offer_id = $7 RETURNING *`,
      [car_name, seats_available, monthly_per_person, JSON.stringify(pickup_points), departure_time, arrival_time, id]
    );

    res.json(updatedOffer.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

// 6. DELETE /offers/:id (Delete)
const deleteOffer = async (req, res) => {
  const { id } = req.params;
  const owner_id = req.user.user_id;

  try {
    const deleteOp = await pool.query(
      "DELETE FROM offers WHERE offer_id = $1 AND owner_id = $2 RETURNING *",
      [id, owner_id]
    );

    if (deleteOp.rows.length === 0) {
      return res.status(403).json("Not authorized or Offer not found");
    }

    res.json({ message: "Offer deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

module.exports = { getUserProfile,createOffer, getMyOffers, getAllOffers, getOfferById, updateOffer, deleteOffer };