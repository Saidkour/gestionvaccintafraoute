const express = require("express");
const router = express.Router();
const { allowedRoles, auth } = require("../controllers/usersController");
const {
  getAllOrders,
  createOrder,
  updateOrder,
} = require("../controllers/ordersController");

router.get("/", auth, getAllOrders);
router.post("/", createOrder);
router.patch("/:id", auth, allowedRoles("doctor", "asistant"), updateOrder);

module.exports = router;
