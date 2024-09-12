const express = require("express");
const productController = require("../controllers/productController");

module.exports = (upload) => {
  const router = express.Router();

  // Get all products
  router.get("/", productController.getAllProducts);

  // Get a single product by ID
  router.get("/:id", productController.getProduct);

  // Create a new product (with image upload)
  router.post("/", upload.single("image"), productController.createProduct);

  // Update an existing product (with optional image upload)
  router.put("/:id", upload.single("image"), productController.updateProduct);

  // Delete a product
  router.delete("/:id", productController.deleteProduct);

  return router;
};
