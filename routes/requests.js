const router = require("express").Router();
const authorize = require("../middleware/auth.js");
const { 
  sendRequest, 
  getDriverRequests, 
  getMySentRequests, 
  updateRequestStatus 
} = require("../controllers/offers/requestController.js");

// Base Path: /requests (defined in index.js)

router.post("/requests", authorize, sendRequest);                  // Send Request

router.get("/my-requests", authorize, getMySentRequests);  // Student View
router.get("/requests/incoming", authorize, getDriverRequests);     // Driver View
router.put("/requests/:request_id", authorize, updateRequestStatus);// Accept/Reject

module.exports = router;