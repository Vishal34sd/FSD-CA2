import express from "express" ;
import dotenv from "dotenv" 
dotenv.config() ;
import connectDB from "./db.js";
import bookRoutes from "./routes/bookRoutes.js";


const app = express() ;

connectDB();

app.use(express.json());


app.use("/api/book" , bookRoutes);




app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
}) 