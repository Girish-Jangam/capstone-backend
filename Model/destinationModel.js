// models/destinationModel.js

const mongoose = require('mongoose');

// models/destinationModel.j 



// Define the destination schema
const destinationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
   images:  { type: String, required: true } // Tags like 'beach', 'mountain', 'city'
   //
});

destinationSchema.index({ id: 'text', title: 'text' });

// If collection "destinations" already exists, it will use it; otherwise, it will create a new collection.
const Destination = mongoose.model('destination', destinationSchema); // Third argument is the collection name


module.exports = Destination;
