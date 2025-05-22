const express = require('express');
const router = express.Router();
const tripItineraryService = require('../Services/tripItineraryService');
const { authenticateAdmin } = require('../Utilities/adminMiddleware'); // Ensure admin authentication middleware

// Create a new trip itinerary
router.post('/create', async (req, res) => {
  try {
    const tripData = req.body; // Extract the data from the request body
    const newItinerary = await tripItineraryService.createTripItinerary(tripData);
    res.status(201).json(newItinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all trip itineraries
router.get('/',  async (req, res) => {
  try {
    const itineraries = await tripItineraryService.getAllTripItineraries();
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a trip itinerary by ID
router.get('/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const itinerary = await tripItineraryService.getTripItineraryById(id);
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update a trip itinerary by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedItinerary = await tripItineraryService.updateTripItinerary(id, data);
    res.status(200).json(updatedItinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a trip itinerary by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItinerary = await tripItineraryService.deleteTripItinerary(id);
    res.status(200).json(deletedItinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
