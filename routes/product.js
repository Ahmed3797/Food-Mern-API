const express = require("express");
const productController = require("../controllers/productController");

module.exports = (upload) => {
  const router = express.Router();

  router.get("/", productController.getAllProducts);

  router.get("/:id", productController.getProduct);

  router.post("/", upload.single("image"), productController.createProduct);

  router.put("/:id", upload.single("image"), productController.updateProduct);

  router.delete("/:id", productController.deleteProduct);

  return router;
};
