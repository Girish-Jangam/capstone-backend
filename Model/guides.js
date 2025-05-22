const mongoose = require('mongoose');

const DestinationGuideSchema = new mongoose.Schema({
    title :{type:String,required:true},
    description :{type:String,required:true},
    reviews:[{
        user: String,
        rating:Number,
        comment: String
    }]
});

const user = mongoose.model('destinationguides',DestinationGuideSchema);;

module.exports = user;
