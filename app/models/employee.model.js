const mongoose = require("mongoose");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },
    hireDate: {
      type: Date,
      default: Date.now
    },
    salary: {
      type: Number,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  }, {
    timestamps: true
  })
);

module.exports = Employee; 