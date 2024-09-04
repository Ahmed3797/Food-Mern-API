const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getUserCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user }).populate(
    "items.productId"
  );
  if (!cart) return res.status(404).send("Cart not found");
  res.json(cart);
};

exports.postInCart = async (req, res) => {
  const { productId, quantity } = req.body;

  console.log(productId, quantity);

  let product = await Product.findById(productId);
  if (!product) return res.status(404).send("Product not found");

  let cart = await Cart.findOne({ userId: req.user });

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  } else {
    cart = new Cart({
      userId: req.user,
      items: [{ productId, quantity }],
    });
  }

  cart = await cart.save();
  res.status(201).json(cart);
};

exports.postFromCart = async (req, res) => {
  console.log("In cart item delete function");
  console.log(req.user);
  console.log(req.params.itemId);

  const cart = await Cart.findOne({ userId: req.user });
  if (!cart) return res.status(404).send("Cart not found");

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === req.params.itemId
  );

  if (itemIndex === -1) return res.status(404).send("Item not found in cart");

  if (cart.items[itemIndex].quantity > 1) {
    cart.items[itemIndex].quantity -= 1;
  } else {
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.itemId
    );
  }

  await cart.save();

  const populatedCart = await cart.populate("items.productId");

  res.json(populatedCart);
};
