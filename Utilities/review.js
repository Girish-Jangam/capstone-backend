const mongoose= require('mongoose');

const connectDb= async () =>{
    try{
        await 
        mongoose.connect('mongodb+srv://girishajangam1:8BRB0AWId7jOk2k3@travel-trove-db.pgyzz6z.mongodb.net/?retryWrites=true&w=majority&appName=travel-trove-db',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    }
    catch(error){
        console.error('DB Connection Error:', error);
        process.exit(1);
    }
};

module.exports=connectDb; 