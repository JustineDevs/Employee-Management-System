const mongoose = require("mongoose");

const Department = mongoose.model(
  "Department",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    departmentCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  }, {
    timestamps: true
  })
);

module.exports = Department; 