const express = require('express');
const router = express.Router();
const destinationService = require('../Services/destinationGuideService');
const { authenticateAdmin } = require('../Utilities/adminMiddleware'); // Ensure admin authentication middleware

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await destinationService.getAllDestinations();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a destination by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await destinationService.getDestinationsById(id);
    res.status(200).json(destination);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Create a new destination
router.post('/create', async (req, res) => {
  try {
    
    const destinationData = req.body;
    const newDestination = await destinationService.createDestination(destinationData);
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a destination description
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedDestination = await destinationService.updateDescription(id, data);
    res.status(200).json(updatedDestination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a destination
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDestination = await destinationService.deleteDestinations(id);
    res.status(200).json(deletedDestination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
