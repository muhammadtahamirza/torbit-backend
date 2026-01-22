const { pool } = require("../../config/db.js");


//0: get profile
// In your backend controller file
const getUserProfile = async (req, res) => {
  try {
    const user = await pool.query(
      // ✅ YOU MUST ADD user_id HERE
      "SELECT user_id, name, email, contact, gender FROM users WHERE user_id = $1",
      [req.user.user_id] 
    );
    
    res.json(user.rows[0]); // Now this sends { user_id: 5, name: "Taha", ... }
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
    // Fixed: Removed trailing comma after driver_email and added gender
    const offers = await pool.query(
      `SELECT 
          offers.*, 
          users.name as driver_name, 
          users.contact as driver_contact,
          users.email as driver_email,
          users.gender as driver_gender
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
// 5. PUT /offers/:id (Update & Soft Delete)
const updateOffer = async (req, res) => {
  const { id } = req.params;
  const owner_id = req.user.user_id;
  
  // Added 'status' to the request body destructuring
  const { 
    car_name, 
    seats_available, 
    monthly_per_person, 
    pickup_points, 
    departure_time, 
    arrival_time, 
    status 
  } = req.body;

  try {
    // 1. Initial Check
    const check = await pool.query("SELECT * FROM offers WHERE offer_id = $1", [id]);
    if (check.rows.length === 0) return res.status(404).json("Offer not found");
    
    // Note: Use owner_id to match your destructuring above
    if (check.rows[0].owner_id !== owner_id) return res.status(403).json("Not authorized");

    // 2. Execute Update with COALESCE
    // This allows you to update only the status OR all fields at once
    const updatedOffer = await pool.query(
      `UPDATE offers 
       SET car_name = COALESCE($1, car_name), 
           seats_available = COALESCE($2, seats_available), 
           monthly_per_person = COALESCE($3, monthly_per_person), 
           pickup_points = COALESCE($4, pickup_points), 
           departure_time = COALESCE($5, departure_time), 
           arrival_time = COALESCE($6, arrival_time),
           status = COALESCE($7, status)
       WHERE offer_id = $8 
       RETURNING *`,
      [
        car_name, 
        seats_available, 
        monthly_per_person, 
        pickup_points ? JSON.stringify(pickup_points) : null, 
        departure_time, 
        arrival_time, 
        status, 
        id
      ]
    );

    res.json(updatedOffer.rows[0]);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json("Server Error");
  }
};
module.exports = { getUserProfile,createOffer, getMyOffers, getAllOffers, getOfferById, updateOffer };