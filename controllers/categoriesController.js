const Category = require("../models/Category");
const {cloudinary} = require("../utils/cloudinary"); // Assuming cloudinary config is set up in utils
const fs = require("fs");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send("Category not found");
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

exports.createCategory = async (req, res) => {

  console.log("In Create category")
  try {
    const { name, description } = req.body;
    console.log(name,description)
    let imageUrl = "";

    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      
      console.log("in ipads cloudeinry")
    }

    let category = new Category({
      name,
      description,
      imageUrl,
    });

    category = await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to create category" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imageUrl = req.body.imageUrl; // In case there is no new image

    // If a new image is uploaded, upload to Cloudinary and update the image URL
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;

      // Optionally remove the uploaded file from local storage
      fs.unlinkSync(req.file.path);
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, imageUrl },
      { new: true }
    );

    if (!category) return res.status(404).send("Category not found");
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) return res.status(404).send("Category not found");

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
