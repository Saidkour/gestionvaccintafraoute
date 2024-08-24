const mongoose = require("../db");

const orderSchema = new mongoose.Schema({
  responsibleName: {
    type: String,
    required: [true, "name is required"],
  },
  responsibleLastName: {
    type: String,
    required: [true, "last name is required"],
  },
  responsiblePhone: {
    type: String,
    required: [true, "phone is required"],
  },
  responsibleIdCard: {
    type: String,
    required: [true, "id card is required"],
  },
  birthday: {
    type: String,
    required: [true, "birthday is required"],
    validate: {
      validator: function (v) {
        /^((0?[1-9])|(1[012]))[-/.]((0?[1-9])|([12][0-9])|(3[01]))[-/.](19|20)\d\d$/.test(
          v
        );
      },
      message: (props) =>
        `${props.value} is not a valid date format! It should be in DD/MM/YYYY format.`,
    },
  },
  childName: {
    type: String,
    required: [true, "child name is required"],
  },
  childLastName: {
    type: String,
    required: [true, "Child last name is required"],
  },
  vaccineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vaccine",
    required: [true, "vaccine id is required"],
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
    enum: ["male", "female"],
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "confirmed", "canceled", "done"],
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleString("en-GB", {
      timeZone: "Africa/Casablanca",
    }),
  },
});

// deselect __v field pre
orderSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

module.exports = mongoose.model("Order", orderSchema);
