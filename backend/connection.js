import mongoose from "mongoose";

const connectDB=()=>{
try {
    mongoose.connect("mongodb://127.0.0.1:27017/chat-app")
    .then(()=>{
        console.log('mongodb connected');
    })
} catch (error) {
    console.log("an error occoured while connecting to the database ", error);
    
}
}

export default connectDB