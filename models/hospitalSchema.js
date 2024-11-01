import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


var Schema = mongoose.Schema
var hospitalSchema = new Schema({
RegNo:{
    type:String,
    required:true
    },
    Name:{
        type:String,
        required:true
    },
    Place:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    PhoneNumber:{
        type:Number,
        required:true
    }
})


const Hospital = mongoose.model("Hospital",hospitalSchema)
export default Hospital