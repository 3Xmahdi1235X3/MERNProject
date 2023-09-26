const Order = require("../models/OrderModel");
const asyncHandler = require("express-async-handler");
const createTransporter = require("../config/mailer");

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) res.json(order);
  else {
    res.status(404);
    throw new Error("order not found ");
  }
});
const getLastest = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "-password -__v")
      .lean();

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
    let transporter = createTransporter();

    // create an email message object
    let message = {
      from: "omarlengliz12@gmail.com",
      to: req.body.payer.email_address,
      subject: "Payment Received",
      html: `
    <h2>Payment Received</h2>
    <p>Dear customer,</p>
    <p>We have received your payment of $ ${order.totalPrice} for your order.</p>
    <p>Thank you for your business!</p>
  `,
    };

    // send the email using the transporter object
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } else {
    res.status(404);
    throw new Error("order not found ");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  console.log(orders);
  res.json(orders);
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivred = true;
    order.delivredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("order not found ");
  }
});
const getWeeklyOrder = asyncHandler(async (req, res) => {
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date();
  endOfWeek.setHours(23, 59, 59, 999);
  endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

  const pipeline = [
    { $match: { createdAt: { $gte: startOfWeek, $lte: endOfWeek } } },
    { $unwind: "$orderItems" },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$totalPrice" },
        totalProductsSold: { $sum: "$orderItems.qty" },
      },
    },
  ];

  const result = await Order.aggregate(pipeline);

  const totalOrdersThisWeek = result[0].totalOrders;
  const totalRevenueThisWeek = result[0].totalRevenue;
  const totalProductsSoldThisWeek = result[0].totalProductsSold;

  try {
    const result = await Order.aggregate(pipeline);
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
const getMonthely = asyncHandler(async (req, res) => {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear(), 11, 31);

    const result = await Order.aggregate([
      {
        $match: {
          isPaid: true,
          paidAt: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { $month: "$paidAt" },
          revenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const revenueByMonth = result.reduce((acc, { _id, revenue }) => {
      acc[_id] = Number(revenue.toFixed(3));
      return acc;
    }, {});

    const currentYear = new Date().getFullYear();

    const monthlyRevenues = Array.from(Array(12).keys()).map((month) => ({
      month: `${currentYear}-${month + 1 < 10 ? `0${month + 1}` : month + 1}`,
      revenue: revenueByMonth[month + 1] || 0,
    }));

    const monthsOfYear = Array.from(Array(12).keys()).map((month) => ({
      month: `${currentYear}-${month + 1 < 10 ? `0${month + 1}` : month + 1}`,
      revenue: 0,
    }));

    const mergedRevenues = monthlyRevenues.map((revenue, index) => ({
      ...monthsOfYear[index],
      ...revenue,
    }));

    res.json(mergedRevenues);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  getWeeklyOrder,
  getMonthely,
  getLastest,
};
