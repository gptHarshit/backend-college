const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  averagePackage: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("College", collegeSchema);