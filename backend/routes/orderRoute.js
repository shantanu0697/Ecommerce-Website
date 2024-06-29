const express = require("express");
const {
  addOrderItem,
  getOrderById,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, addOrderItem);
router.route("/:id").get(protect, getOrderById);

module.exports = router;
