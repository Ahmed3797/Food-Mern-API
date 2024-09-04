const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const auth = require("../Middleware/auth");

router.get("/", auth, orderController.getUserOrders);

router.get("/all", orderController.allOrders);

router.post("/", auth, orderController.createOrder);

router.put("/:orderId/status", orderController.updateStatus);

module.exports = router;
