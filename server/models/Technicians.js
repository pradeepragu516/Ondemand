// models/Technician.js
const mongoose = require("mongoose");
const TechnicianSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  skills: String,
  experience: Number,
  address: String,
  status: { type: String, default: "Pending" },
  verificationCode: String,
});

module.exports = mongoose.model("Technician", TechnicianSchema);