const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.js")
const signup = require("../controllers/auth/signup.js");
const verify = require("../controllers/auth/verify.js");
const login = require("../controllers/auth/login.js");
const googleAuth = require("../controllers/auth/googleAuth.js");
const { requestEmailUpgrade, finalizeEmailUpgrade, googleAuthUpdate } = require("../controllers/auth/update.js");
const { getProfile, updateProfile } = require("../controllers/profile.js");// all routes ....
router.post("/auth/signup", signup);
router.post("/auth/verify", verify);
router.post("/login", login);
router.post("/auth/google", googleAuth);







//settings

router.get("/profile", authenticateToken, getProfile);
router.put("/profile/update", authenticateToken, updateProfile);



// Manual Email Swap (Identity Verification)
router.put("/upgrade-request", authenticateToken, requestEmailUpgrade);
router.put("/upgrade-confirm", authenticateToken, finalizeEmailUpgrade);

// Google Email Swap (Instant Identity Verification)
router.put("/google-upgrade", authenticateToken, googleAuthUpdate);


module.exports = router;