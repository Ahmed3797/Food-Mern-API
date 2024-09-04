const express = require("express");
const categoryController = require("../controllers/categoriesController");

module.exports = (upload) => {
  const router = express.Router();

  router.get("/", categoryController.getAllCategories);

  router.get("/:id", categoryController.getCategory);

  router.post("/", upload.single("image"), categoryController.createCategory);

  router.put("/:id", categoryController.updateCategory);

  router.delete("/:id", categoryController.deleteCategory);

  return router;
};
