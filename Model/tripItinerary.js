

const mongoose = require('mongoose');

const tripItinerarySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Custom ID
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  activities: { type: [String], required: true },
  lodging: { type: String, required: true },
  dining: { type: String, required: true }
});
module.exports = mongoose.model('TripItinerary', tripItinerarySchema);



















