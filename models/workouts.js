import mongoose from "mongoose";

const workoutsSchema = new mongoose.Schema({
    //* here you need to decide what you want from your user
    //* in order to create the form and validation
        
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        name:{
            type: String,
            required: true,
        },
        muscle: {
            type: String,
        },
        sets: {
            type: Array,
            default: [],
        },
        reps: {
            type: Array,
            default: []
        }


    })

        export default mongoose.model('Workout', workoutsSchema);