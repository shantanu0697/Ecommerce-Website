const express = require("express");
const {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfie,
} = require("../controllers/usersController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// user registration
router.route("/").post(registerUser);

router.post("/login", authController);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfie);

module.exports = router;
