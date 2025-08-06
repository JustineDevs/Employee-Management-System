const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;

db.url = process.env.MONGODB_URI || "mongodb://localhost:27017/apollonia_dental";

db.employee = require("./employee.model.js");
db.department = require("./department.model.js");

module.exports = db; 