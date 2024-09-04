const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("Category not found");
  res.json(category);
};

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  let category = new Category({
    name,
    description,
    imageUrl,
  });

  category = await category.save();
  res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );

  if (!category) return res.status(404).send("Category not found");
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("Category not found");
  res.json(category);
};
