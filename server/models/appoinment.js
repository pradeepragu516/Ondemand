const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  services: [
    {
      id: Number,
      name: String,
      price: Number,
      time: String,
      image: String,
    }
  ],
  date: Date,
  total: Number,
  address: String,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);