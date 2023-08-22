import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:String,
    email:{
        type:String,
        require:true,
        unique:true
    },
    age:Number,
    password:{
        type:String,
        require:true
    }
});

export const usersModel = mongoose.model(usersCollection,userSchema)