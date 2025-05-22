const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwtHelper  = require("../Utilities/jwtHelper");


const  registerUser = async (name,email,password,mobileNumber) =>{
    const existingUser = await User.findOne({email});    
    if(existingUser) throw new Error("User already existis");
    const newUser = new User({name,email,password,mobileNumber});
    await newUser.save();

    return {message: "User registered successfully"};
    }

const loginUser = async(email,password)=>{    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
  
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
  
    const token = user.generateAuthToken();
    return { message: 'Login successful', token };

};


module.exports = {loginUser,registerUser};