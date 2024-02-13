import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    name:{
        type: String
    },
    email:{
        type: String,
       
    },
    weight:{
        type:Number
    }


})

export default mongoose.model('Profile', profileSchema);
