const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  status: {
    require: false,
    type: Number,
  },
  created_date: {
    require: false,
    type: Date,
  },
  updated_date: {
    require: false,
    type: Date,
  },
});
module.exports = mongoose.model("Project", dataSchema);
