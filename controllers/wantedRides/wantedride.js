const { pool } = require("../../config/db.js");

// 1. Post a Wanted Ride (Student)
const postWantedRide = async (req, res) => {
    const { pickup_points, departure_time, arrival_time, monthly_budget, seats_needed, destination } = req.body;
    const student_id = req.user.user_id;
    try {
        await pool.query(
            "INSERT INTO wanted_rides (student_id, pickup_points, departure_time, arrival_time, monthly_budget, seats_needed, destination) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [student_id, JSON.stringify(pickup_points), departure_time, arrival_time, monthly_budget, seats_needed, destination || 'FAST CFD Campus']
        );
        res.status(201).json({ message: "Monthly requirement posted successfully" });
    } catch (err) {
        res.status(500).json("Error posting requirement");
    }
};

// 2. Edit or Soft Delete (Student)
const updateWantedRide = async (req, res) => {
    const { id } = req.params;
    const { pickup_points, departure_time, arrival_time, monthly_budget, seats_needed, status } = req.body;
    try {
        await pool.query(
            `UPDATE wanted_rides 
             SET pickup_points = COALESCE($1, pickup_points), 
                 departure_time = COALESCE($2, departure_time), 
                 arrival_time = COALESCE($3, arrival_time), 
                 monthly_budget = COALESCE($4, monthly_budget), 
                 seats_needed = COALESCE($5, seats_needed),
                 status = COALESCE($6, status)
             WHERE wanted_id = $7 AND student_id = $8`,
            [pickup_points ? JSON.stringify(pickup_points) : null, departure_time, arrival_time, monthly_budget, seats_needed, status, id, req.user.user_id]
        );
        res.json({ message: "Update successful" });
    } catch (err) {
        res.status(500).json("Update failed");
    }
};


// 3. Browse Wanted Rides 
const browseWantedRides = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                wr.*, 
                u.name as student_name, 
                u.contact as student_contact,
                u.gender as student_gender, 
                u.email as student_email
             FROM wanted_rides wr 
             JOIN users u ON wr.student_id = u.user_id 
             ORDER BY wr.created_at DESC`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json("Error fetching wanted rides");
    }
};



// 4. Send Request (Driver to Student)
const sendRideRequest = async (req, res) => {
    const { wanted_id } = req.body;
    const driver_id = req.user.user_id;
    try {
        await pool.query(
            "INSERT INTO wanted_ride_requests (wanted_id, driver_id) VALUES ($1, $2)",
            [wanted_id, driver_id]
        );
        res.status(201).json({ message: "Monthly deal offer sent to student" });
    } catch (err) {
        res.status(500).json("You have already sent an offer to this student.");
    }
};


// 5. Get Status for Dashboard (Both Ends)
// GET /wanted-request/status
// 5. Get Status for Dashboard (Both Ends)
// GET /wanted-request/status
const getRequestStatus = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const result = await pool.query(
      `SELECT 
        wr.wanted_id, 
        wr.student_id, 
        wr.destination, 
        wr.status AS post_status,
        wrr.request_id, 
        wrr.status AS request_status,
        wrr.driver_id,
        -- Student Info (Owner of the post)
        u_student.name AS student_name,
        u_student.email AS student_email,
        u_student.contact AS student_contact,
        -- Driver Info (Person offering the ride)
        u_driver.name AS driver_name, 
        u_driver.contact AS driver_contact,
        u_driver.email AS driver_email
      FROM wanted_rides wr
      JOIN users u_student ON wr.student_id = u_student.user_id
      LEFT JOIN wanted_ride_requests wrr ON wr.wanted_id = wrr.wanted_id
      LEFT JOIN users u_driver ON wrr.driver_id = u_driver.user_id
      -- Fetch if user is the Student (Post Owner) OR the Driver (Offer Sender)
      WHERE wr.student_id = $1 OR wrr.driver_id = $1
      ORDER BY wr.created_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error fetching status");
  }
};
// 6. Respond to Request (Student accepts/rejects Driver)
// 6. Respond to Request (Student accepts/rejects Driver)
// PATCH /wanted-request/respond
const respondToRequest = async (req, res) => {
    const { request_id, status } = req.body; // 'accepted' or 'rejected'
    const student_id = req.user.user_id;

    try {
        // 1. SECURITY CHECK: Ensure the logged-in student owns the Wanted Ride post
        const check = await pool.query(
            `SELECT wr.student_id, wr.wanted_id 
             FROM wanted_ride_requests wrr
             JOIN wanted_rides wr ON wrr.wanted_id = wr.wanted_id
             WHERE wrr.request_id = $1`,
            [request_id]
        );

        if (check.rows.length === 0) return res.status(404).json("Request not found");
        
        // If the logged-in user is NOT the student who created the post
        if (check.rows[0].student_id !== student_id) {
            return res.status(403).json("Access Denied: You do not own this requirement");
        }

        // 2. EXECUTE STATUS UPDATE
        const result = await pool.query(
            "UPDATE wanted_ride_requests SET status = $1 WHERE request_id = $2 RETURNING wanted_id",
            [status, request_id]
        );
        
        // 3. AUTO-CLOSE POST: If student accepts a driver, close the monthly requirement
        if (status === 'accepted') {
            await pool.query(
                "UPDATE wanted_rides SET status = 'closed' WHERE wanted_id = $1", 
                [result.rows[0].wanted_id]
            );
        }

        res.json({ message: `Monthly deal ${status}` });
    } catch (err) {
        console.error(err);
        res.status(500).json("Response failed");
    }
};
// GET /wanted-request/me (Dashboard - Student's Own Requirements)
const getMyWantedRides = async (req, res) => {
  const student_id = req.user.user_id; // Extract from authenticate middleware
  try {
    const result = await pool.query(
      `SELECT * FROM wanted_rides 
       WHERE student_id = $1 
       ORDER BY created_at DESC`,
      [student_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};


module.exports = {
    postWantedRide,
    updateWantedRide,
    browseWantedRides,
    sendRideRequest,
    getRequestStatus,
    respondToRequest,
    getMyWantedRides
};