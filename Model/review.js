const mongoose=require('mongoose');

const reviewSchema= new mongoose.Schema({
    name:String,
    destination: String,
    rating: Number,
    review: String
}); 

const reviews = mongoose.model('Review', reviewSchema);
module.exports = reviews;