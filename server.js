const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const userRoutes = require("./routes/users");
const cartRoutes = require("./routes/carts");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/categories");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes(upload));
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes(upload));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

mongoose
  .connect(
   process.env.DATABASE_URL
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
