const Order = require("../models/order");
const Vaccine = require("../models/Vaccine");
const User = require("../models/User");
const asyncWrapper = require("express-async-wrapper");

const dummyVaccine = require("./tables/vaccine");
const dummyOrder = require("./tables/order");
const dummyUser = require("./tables/user");

const seeder = asyncWrapper(async (req, res, next) => {
  await Vaccine.deleteMany();
  await Order.deleteMany();
  await User.deleteMany();
  await Vaccine.insertMany(dummyVaccine());
  await Order.insertMany(dummyOrder());
  await User.create(dummyUser());
  res.json({
    status: "success",
    message: "Data seeded successfully",
  });
});

module.exports = seeder;
