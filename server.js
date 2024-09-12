const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const { cloudinary, storage } = require('./utils/cloudinary');
const multer = require("multer");
const upload = multer({ storage }); // Cloudinary storage

// Import routes
const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/carts");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/categories");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes(upload));
app.use("/api/categories", categoryRoutes(upload));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Database connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
