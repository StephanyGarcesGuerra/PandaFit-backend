import mongoose from "mongoose";

const workoutsSchema = new mongoose.Schema({
    //* here you need to decide what you want from your user
    //* in order to create the form and validation
        name:{
            type: String,
            required: true,
        },
        muscle: {
            type: String,
            required: true,
        },
        sets: {
            type:String,
        },
        reps: {
            type:String,
        }


    })

        export default mongoose.model('Workout', workoutsSchema);