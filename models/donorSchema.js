import mongoose from "mongoose";

var Schema = mongoose.Schema
var donorSchema = new Schema({
    Name:{
        type:String,
        required:true,
    },
    aadharNumber:{
        type:Number,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    address:{
        type:String
    },
    District:{
        type:String,
        required:true,
    },
    bloodGroup:{
        type:String,
        required:true,
    },
    Date_of_Donation:{
        type:Date,
        required:true,
    }
       
})



const Donor = mongoose.model("Donor",donorSchema)
export default Donor