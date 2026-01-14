const express = require("express");
const router = express.Router();

const signup = require("../controllers/auth/signup.js");
const verify = require("../controllers/auth/verify.js");
const login = require("../controllers/auth/login.js");
const googleAuth = require("../controllers/auth/googleAuth.js");


// all routes ....
router.post("/auth/signup", signup);
router.post("/auth/verify", verify);
router.post("/login", login);
router.post("/auth/google", googleAuth);



module.exports = router;