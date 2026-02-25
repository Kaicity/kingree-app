const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  userTargetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const AvailabilityModel = mongoose.model('availability', AvailabilitySchema);

module.exports = AvailabilityModel;
