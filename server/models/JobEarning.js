const mongoose = require("mongoose");

const EarningsSchema = new mongoose.Schema({
  technicianId: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Earnings", EarningsSchema);
