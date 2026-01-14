const { pool } = require("../../config/db.js");

// 1. SEND REQUEST (Student applies for a ride)
const sendRequest = async (req, res) => {
  const passenger_id = req.user.user_id;
  const { offer_id } = req.body;

  try {
    // Check if offer exists and prevent self-request
    const offerCheck = await pool.query("SELECT owner_id FROM offers WHERE offer_id = $1", [offer_id]);
    if (offerCheck.rows.length === 0) return res.status(404).json("Offer not found");
    if (offerCheck.rows[0].owner_id === passenger_id) return res.status(400).json("You cannot request your own ride.");

    // Insert Request
    const newRequest = await pool.query(
      "INSERT INTO requests (offer_id, passenger_id) VALUES ($1, $2) RETURNING *",
      [offer_id, passenger_id]
    );

    res.json(newRequest.rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Unique constraint violation (already requested)
      return res.status(400).json("You have already requested this ride.");
    }
    console.error(err);
    res.status(500).json("Server Error");
  }
};

// 2. GET INCOMING REQUESTS (For Driver Dashboard - Manage Posts)
const getDriverRequests = async (req, res) => {
  const driver_id = req.user.user_id;

  try {
    // Get requests for ALL offers owned by this driver
    const requests = await pool.query(
      `SELECT 
          r.request_id, r.status, r.offer_id, r.created_at,
          u.name as passenger_name, u.email as passenger_email, u.gender as passenger_gender, u.contact as passenger_contact,
          o.car_name
       FROM requests r
       JOIN offers o ON r.offer_id = o.offer_id
       JOIN users u ON r.passenger_id = u.user_id
       WHERE o.owner_id = $1
       ORDER BY r.created_at DESC`,
      [driver_id]
    );
    
    res.json(requests.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

// 3. GET MY SENT REQUESTS (For Student Dashboard - Manage Requests)
const getMySentRequests = async (req, res) => {
  const passenger_id = req.user.user_id;

  try {
    const requests = await pool.query(
      `SELECT 
          r.request_id, r.status, r.created_at,
          o.car_name, o.monthly_per_person, o.departure_time,
          u.name as driver_name, u.email as driver_email, u.contact as driver_contact
       FROM requests r
       JOIN offers o ON r.offer_id = o.offer_id
       JOIN users u ON o.owner_id = u.user_id
       WHERE r.passenger_id = $1
       ORDER BY r.created_at DESC`,
      [passenger_id]
    );
    
    res.json(requests.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

// 4. UPDATE STATUS (Driver Accepts/Rejects)
const updateRequestStatus = async (req, res) => {
  const { request_id } = req.params;
  const { status } = req.body;
  
  // Gets ID from the Middleware
  const driver_id = req.user.user_id; 

  try {
    // 1. SECURITY CHECK & GET OFFER DETAILS
    // ✅ Updated: Select offer_id and seats_available too
    const check = await pool.query(
      `SELECT o.owner_id, o.offer_id, o.seats_available
       FROM requests r 
       JOIN offers o ON r.offer_id = o.offer_id 
       WHERE r.request_id = $1`,
      [request_id]
    );

    if (check.rows.length === 0) return res.status(404).json("Request not found");
    
    // Extract the data
    const { owner_id, offer_id, seats_available } = check.rows[0];

    // If the logged-in user is NOT the owner
    if (owner_id !== driver_id) {
      return res.status(403).json("Access Denied: You do not own this ride");
    }

    // 2. SEAT REDUCTION LOGIC (Only runs if accepting)
    if (status === 'accepted') {
      if (seats_available <= 0) {
        return res.status(400).json("Cannot accept: Car is full!");
      }

      // ✅ Decrease seat count by 1
      await pool.query(
        "UPDATE offers SET seats_available = seats_available - 1 WHERE offer_id = $1",
        [offer_id]
      );
    }

    // 3. EXECUTE STATUS UPDATE
    const updated = await pool.query(
      "UPDATE requests SET status = $1 WHERE request_id = $2 RETURNING *",
      [status, request_id]
    );

    res.json(updated.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};



module.exports = { sendRequest, getDriverRequests, getMySentRequests, updateRequestStatus };