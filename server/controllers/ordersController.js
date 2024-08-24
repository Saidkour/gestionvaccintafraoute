const Order = require("../models/order");
const asyncWrapper = require("express-async-wrapper");

exports.getAllOrders = asyncWrapper(async (req, res, next) => {
  const fields = req.query?.fields?.split(",").join(" ");

  // search
  const excludeFields = ["fields", "limit", "sort", "page"];
  let searchQuery = { ...req.query };
  excludeFields.forEach((e) => {
    delete searchQuery[e];
  });

  Object.keys({ ...searchQuery }).forEach((k) => {
    searchQuery[k] = {
      $regex: new RegExp(`\\b\\w*${searchQuery[k]}\\w*\\b`, "gi"),
    };
  });

  const sort = req.query?.sort?.split(",").join(" ");
  const limit = req.query?.limit || 10;
  const page = req.query?.page * 1 > 0 ? req.query?.page * 1 : 1;

  const query = Order.find({ ...searchQuery })
    .select(fields)
    .sort(sort)
    .populate({ path: "vaccineId", select: "startAge lastAge id ageType" })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort("-_id");
  const orders = await query;
  const count = await Order.countDocuments({ ...searchQuery });

  res.json({
    status: "success",
    orders,
    resultsCount: count,
    limit,
    showingFrom: (page - 1) * limit,
    showingTo: (page - 1) * limit + orders.length,
  });
});

exports.createOrder = asyncWrapper(async (req, res) => {
  await Order.create(req.body);
  res.status(201).json({ status: "success", message: "Order created" });
});

exports.updateOrder = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!(await Order.findByIdAndUpdate(id, { status }, { runValidators: true })))
    return res.status(404).json({ status: "fail", message: "Order not found" });

  res.json({ status: "success", message: "Order updated" });
});
