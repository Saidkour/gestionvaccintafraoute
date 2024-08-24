const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log("Not connected");
  });

module.exports = mongoose;
