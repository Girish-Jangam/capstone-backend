//create scehema 
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
 
 
 



const UserSchema  = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    mobileNumber:{type:String, required:true},
    password:{type:String,required: true, unique:true},
    role:{type:String, default:"user"}
});

//hash password before saving

UserSchema.pre("save",async function (next)  {    
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,5);
    
    next();
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  // Method to generate Auth Token (for example, using JWT)
UserSchema.methods.generateAuthToken = function () {
    // Assume you're using JWT, replace with your JWT generation logic
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ _id: this._id }, 'yourSecretKey', { expiresIn: '1h' });
    return token;
  };
module.exports = mongoose.model("User",UserSchema);