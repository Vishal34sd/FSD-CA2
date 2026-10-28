import mongoose from "mongoose" ;



const connectDB = async() =>{
    try{
     const connection = await mongoose.connect(process.env.MONGODB_URI) ;
     if (!connection) {
         console.log("DB is not connected");
     }

     console.log("DB connected successfully");
    }
    catch(err){
        console.log("Database connection error:", err.message);
    }
}


export default connectDB 