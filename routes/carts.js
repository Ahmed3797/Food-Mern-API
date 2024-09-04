const express = require("express");
const router = express.Router();

const auth = require("../Middleware/auth");
const cartController = require("../controllers/cartController");

router.use(auth);

router.get("/", cartController.getUserCart);

router.post("/", cartController.postInCart);

router.delete("/:itemId", cartController.postFromCart);

module.exports = router;
