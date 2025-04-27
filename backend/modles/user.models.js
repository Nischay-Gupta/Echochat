import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
userName:{
    type:String,
    required:true,
    unique:true,
    collation: { locale: 'en', strength: 2 } 
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
friends:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}],
friendRequests: [{
    sender: {
     type:String,
     required:true
      
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}]

})

export const User=mongoose.model("User",userSchema)