const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user }).populate(
      "items.productId"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.createOrder = async (req, res) => {
  const { deliveryInfo } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user }).populate(
      "items.productId"
    );
    if (!cart || cart.items.length === 0)
      return res.status(400).send("Cart is empty");

    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    const order = new Order({
      userId: req.user,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount,
      deliveryInfo,
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.updateStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["pending", "shipped", "delivered"];
  if (!validStatuses.includes(status)) {
    return res.status(400).send("Invalid status");
  }

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.json(order);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
