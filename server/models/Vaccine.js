const mongoose = require("../db");

const VaccineSchema = new mongoose.Schema({
  startAge: {
    type: Number,
    required: true,
  },
  lastAge: {
    type: Number,
    required: true,
  },
  ageType: {
    type: String,
    required: true,
    enum: ["day", "week", "month", "year"],
  },
  description: {
    type: String,
    required: true,
  },
  dose: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vaccine", VaccineSchema);
