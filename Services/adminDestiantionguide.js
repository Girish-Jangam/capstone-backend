// backend/services/destinationGuideService.js
const DestinationGuide = require('../Model/destinationModel');

// Fetch all destination guides
const getAllGuides = async () => {
  try {
    return await DestinationGuide.find();
  } catch (error) {
    throw new Error('Error fetching destination guides');
  }
};

// Create a new destination guide
const createGuide = async (guideData) => {
  try {
    
    const newGuide = new DestinationGuide(guideData);
    console.log(newGuide);
    
    return await newGuide.save();
  } catch (error) {
    throw new Error('Error creating destination guide');
  }
};

// Update a destination guide
const updateGuide = async (id, guideData) => {
  try {
    return await DestinationGuide.findByIdAndUpdate(id, guideData, { new: true });
  } catch (error) {
    throw new Error('Error updating destination guide');
  }
};

// Delete a destination guide
const deleteGuide = async (id) => {
  try {
    await DestinationGuide.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting destination guide');
  }
};

module.exports = {
  getAllGuides,
  createGuide,
  updateGuide,
  deleteGuide,
};
