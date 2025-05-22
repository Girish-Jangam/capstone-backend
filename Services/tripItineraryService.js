const TripItinerary = require('../Model/tripItinerary');
const { generateTripId } = require('./idGeneratorService');

// Create a new trip itinerary with a custom ID
const createTripItinerary = async (tripData) => {
  const { destination, duration, activities, lodging, dining } = tripData;

  // Generate a new custom trip ID
  const tripId = await generateTripId();

  const newItinerary = new TripItinerary({
    id: tripId,  // Set the generated custom ID
    destination,
    duration,
    activities,
    lodging,
    dining,
  });

  // Save the new itinerary to the database
  const savedItinerary = await newItinerary.save();

  return savedItinerary;
};

// Get all trip itineraries
const getAllTripItineraries = async () => {
  // Retrieve all trip itineraries from the database
  const itineraries = await TripItinerary.find();
  return itineraries;
};

// Get trip itinerary by ID
const getTripItineraryById = async (id) => {
  // Find the trip itinerary by the custom ID
  const itinerary = await TripItinerary.findOne({ id: id });

  if (!itinerary) {
    throw new Error('Trip itinerary not found');
  }

  return itinerary;
};

// Update a trip itinerary by ID
const updateTripItinerary = async (id, updateData) => {
  // Find the trip itinerary by ID and update it with new data
  const updatedItinerary = await TripItinerary.findOneAndUpdate(
    { id: id },
    { $set: updateData },
    { new: true } // Return the updated document
  );

  if (!updatedItinerary) {
    throw new Error('Trip itinerary not found');
  }

  return updatedItinerary;
};

// Delete a trip itinerary by ID
const deleteTripItinerary = async (id) => {
  // Find the trip itinerary by ID and delete it
  const deletedItinerary = await TripItinerary.findOneAndDelete({ id: id });

  if (!deletedItinerary) {
    throw new Error('Trip itinerary not found');
  }

  return deletedItinerary;
};

module.exports = {
  createTripItinerary,
  getAllTripItineraries,
  getTripItineraryById,
  updateTripItinerary,
  deleteTripItinerary,
};
