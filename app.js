require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDb  = require("./Model/db");
const router = require("./Routes/userRoutes");
const tripItineraryRoutes = require('./Routes/adminIternaryRoutes');
const destinationRoutes = require('./Routes/destiantionAdminRoutes')
const adminRoutes = require('./Routes/adminRoutes');
const app = express();
const Port =  3000;
const reviewRoutes= require('./Routes/review');
const travelGroupRoutes = require('./Routes/travelGroup');
const authService = require('./Routes/authRoutes')

connectDb();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/admin', adminRoutes); // Admin login
app.use('/api/trip-itineraries', tripItineraryRoutes); // Trip itineraries
app.use('/api/destinations', destinationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/travelGroups', travelGroupRoutes);

app.use(router);
    
app.listen(Port);
