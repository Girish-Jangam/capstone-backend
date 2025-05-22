const mongoose = require('mongoose');

const TravelGroupSchema = new mongoose.Schema({
    groupId: { type: String },
    name: { type: String, required: true },
    description: { type: String },
    isPublic: { type: Boolean, default: true },
    members: { type:[String],default:[] },
    createdBy: {},
    messages: [{
        sender : {type:String, required:true},
        text : {type:String, required:true}
    }],
    invitations: []
});

const travelGroup = mongoose.model('TravelGroup', TravelGroupSchema);
module.exports = travelGroup;  // Ensure this line exists
