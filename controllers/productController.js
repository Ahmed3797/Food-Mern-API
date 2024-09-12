const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    let products;
    let category = req.query.cats;
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Cloudinary URL will be available in req.file.path after upload
    console.log("I am Create Product")
    const imageUrl = req.file ? req.file.path : "";
    console.log(name,description,price,category,stock,imageUrl)
    let product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl, // Save Cloudinary URL to database
    });

    product = await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // If a new file is uploaded, update the image URL, otherwise keep the existing one
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock, imageUrl },
      { new: true } // Return the updated document
    );

    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
