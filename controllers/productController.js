const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  let products;
  let category = req.query.cats;
  if (category) {
    products = await Product.find({ category: category });
  } else {
    products = await Product.find();
  }
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  console.log("I an product post model");

  let product = new Product({
    name,
    description,
    price,
    category,
    stock,
    imageUrl,
  });

  product = await product.save();
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const imageUrl = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.imageUrl;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, description, price, category, stock, imageUrl },
    { new: true }
  );

  if (!product) return res.status(404).send("Product not found");
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
};
