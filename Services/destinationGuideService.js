const DestinationGuide = require('../Model/destinationModel')

// Get all destinations
const getAllDestinations = async () => {
    try {
        const destinations = await DestinationGuide.find();
        return destinations;
    } catch (error) {
        throw new Error('Error fetching destinations: ' + error.message);
    }
};

// Get destination by ID
const getDestinationsById = async (id) => {
    try {
        const destination = await DestinationGuide.findById(id);
        if (!destination) {
            throw new Error('Destination not found');
        }
        return destination;
    } catch (error) {
        throw new Error('Error fetching destination by ID: ' + error.message);
    }
};

// Create a new destination
const createDestination = async (data) => {
    try {
        const newDestination = new DestinationGuide(data);
        await newDestination.save();
        return newDestination;
    } catch (error) {
        throw new Error('Error creating destination: ' + error.message);
    }
};

// Update a destination description
const updateDescription = async (id, data) => {
    try {
        const updatedDestination = await DestinationGuide.findByIdAndUpdate(id, data, { new: true });
        if (!updatedDestination) {
            throw new Error('Destination not found');
        }
        return updatedDestination;
    } catch (error) {
        throw new Error('Error updating destination: ' + error.message);
    }
};

// Delete a destination
const deleteDestinations = async (id) => {
    try {
        const deletedDestination = await DestinationGuide.deleteOne({id:id});
        if (!deletedDestination) {
            throw new Error('Destination not found');
        }
        return deletedDestination;
    } catch (error) {
        throw new Error('Error deleting destination: ' + error.message);
    }
};

module.exports = {
    getAllDestinations,
    createDestination,
    getDestinationsById,
    updateDescription,
    deleteDestinations
};
