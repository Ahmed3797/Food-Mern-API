const express = require("express");
const categoryController = require("../controllers/categoriesController");

module.exports = (upload) => {
  const router = express.Router();

  // Get all categories
  router.get("/", categoryController.getAllCategories);

  // Get a single category by ID
  router.get("/:id", categoryController.getCategory);

  // Create a new category (with image upload)
  router.post("/", upload.single("image"), categoryController.createCategory);

  // Update an existing category (with optional image upload)
  router.put("/:id", upload.single("image"), categoryController.updateCategory);

  // Delete a category by ID
  router.delete("/:id", categoryController.deleteCategory);

  return router;
};
