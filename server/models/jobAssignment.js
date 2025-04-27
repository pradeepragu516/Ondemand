// models/AssignedJob.js
const mongoose = require('mongoose');

const assignedJobSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician', required: true },
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
  status: { type: String, default: 'Assigned' }, // Assigned, In Progress, Completed
}, { timestamps: true });

module.exports = mongoose.model('AssignedJob', assignedJobSchema);