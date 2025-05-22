const express = require("express");
const {loginUser,registerUser} = require("../Services/authService");
const Destination = require('../Model/destinationModel')
const destService = require('../Services/destinationGuideService')
const { createTripItinerary, getTripItineraryById } = require('../Services/tripItineraryService');
const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;
    const result = await registerUser(name, email, password, mobileNumber);
    res.status(201).json({ message: "Successfully registered" });  // Returning structured JSON response
  } catch (error) {
    res.status(400).json({ message: error.message });  // Structured error response
  }
});

//Login

router.post("/login",async(req,res)=>{
  try {
    const { email, password } = req.body;    
    const response = await loginUser(email, password);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// get destinations

router.get('/search', async (req, res) => {
    const query = req.query.q;    
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
  
    try {
      const destinations = await Destination.find({

        $text: { $search: query }
      }).exec();
  
      if (destinations.length === 0) {
        return res.status(404).json({ message: 'No results found for your search term' });
      }
  
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while searching for destinations', error });
    }
  });



//get guide 

router.get('/getdestinations', async (req,res) => {
  try {
    const destinations = await destService.getAllDestinations();
    res.send(destinations);
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// Create a new trip itinerary
router.post('/trip-itineraries', async (req, res) => {
  try {
    const newItinerary = await createTripItinerary(req.body);
    res.status(201).json({ message: 'Trip itinerary created successfully', id: newItinerary.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get trip itinerary by ID
router.get('/trip-itineraries/:id', async (req, res) => {
  try {
    const itinerary = await getTripItineraryById(req.params.id);
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(404).json({ error: 'Trip itinerary not found' });
  }
});
module.exports= router;