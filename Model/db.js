const mongoose = require('mongoose');
require("dotenv").config();

//mongodb://username:password@127.0.0.1:27017/travel_trove_db if auth .connection

const mongoUri = process.env.MONGO_URI; 
console.log(`Connecting to mongodb at :`, mongoUri);


const connectDB = async()=>{
    try {
        await mongoose.connect(mongoUri,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log("connected to mongodb via mongoose");
        
    } catch (error) {
        console.error("Mongodb Conection Failed :",err);
        process.exit(1);
    }
}

module.exports = connectDB;