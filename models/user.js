const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  image: {
    require: false,
    type: String,
  },
  password: {
    require: false,
    type: String,
  },
  status: {
    require: false,
    type: Number,
  },
});
module.exports = mongoose.model("User", dataSchema);
