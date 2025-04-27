import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDB=()=>{
try {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('mongodb connected');
    })
} catch (error) {
    console.log("an error occoured while connecting to the database ", error);
    
}
}

export default connectDB