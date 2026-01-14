const router = require("express").Router();
const authenticate = require("../middleware/auth.js"); // or "../middleware/validInfo" depending on your file name
const { getUserProfile,
  createOffer, 
  getAllOffers, 
  getOfferById, 
  getMyOffers, 
  updateOffer, 
  deleteOffer ,
  
} = require("../controllers/offers/offerController");
const { completeProfile } = require("../controllers/auth/complete.js");
const { auth } = require("google-auth-library");


router.get("/profile", authenticate, getUserProfile);

// PUT /users/complete-profile
router.put("/complete-profile", authenticate, completeProfile);

router.get("/offers/me", authenticate, getMyOffers);
router.get("/offers", getAllOffers); 

router.post("/offers", authenticate, createOffer); 
router.get("/offers/:id", getOfferById);

router.put("/offers/:id", authenticate, updateOffer);

router.delete("/offers/:id", authenticate, deleteOffer);

module.exports = router;