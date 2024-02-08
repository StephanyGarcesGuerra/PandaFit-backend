import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    //* here you need to decide what you want from your user
    //* in order to create the form and validation
        name:{
            type: String,
            minLength: 3,
            maxLength: 20
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type:String,
            minLength: 3,
            maxLength: 50,
            required: true
        },
        sex: {
            type: String,
        },
        height:{
            type: String,
        },
        weight:{
            type: String,
        },
        birthday:{
            type: String,
        }

    })

        export default mongoose.model('User', usersSchema);
