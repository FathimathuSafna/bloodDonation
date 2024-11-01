import mongoose from "mongoose";

var Schema = mongoose.Schema
var donationDetailsSchema = new Schema({
    donorId:{
        type:Schema.Types.ObjectId,
        ref:"Donor",
        required:true,
    },
    hospitalId:{
        type:Schema.Types.ObjectId,
        ref:"Hospital",
        required:true
    },
    donationDate:{
        type:Date,
        required:true
    },
    isDonationSuccesful:{
        type:Boolean,
        required:true
    }
       
})



const DonationDetails = mongoose.model("DonationDetails",donationDetailsSchema)
export default DonationDetails