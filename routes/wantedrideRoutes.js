const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.js");
const { 
  postWantedRide, 
  updateWantedRide, 
  browseWantedRides, 
  sendRideRequest, 
  getRequestStatus, 
  respondToRequest,
  getMyWantedRides
} = require("../controllers/wantedRides/wantedride.js");

// Student Post Management
router.post("/wanted-request/post", verifyToken, postWantedRide);
router.put("/wanted-request/edit/:id", verifyToken, updateWantedRide);

// Browsing (For Drivers)
router.get("/wanted-request/browse", verifyToken, browseWantedRides);

// Interactions (The Request Flow)
router.post("/wanted-request/send", verifyToken, sendRideRequest);
router.get("/wanted-request/me", verifyToken, getMyWantedRides);

router.get("/wanted-request/status", verifyToken, getRequestStatus);
router.patch("/wanted-request/respond", verifyToken, respondToRequest);

module.exports = router;