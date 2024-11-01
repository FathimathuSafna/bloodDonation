import Hospital from "./hospitalSchema.js";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


var Schema = mongoose.Schema
var userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['manager','staff']
    },
    HospitalId: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',  // Make sure 'Hospital' is the name of the referenced model
        required: true
      }
       
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

userSchema.methods.matchPassword = async function (enteredPassword){
 return await bcrypt.compare(enteredPassword,this.password)

}


const User = mongoose.model("User",userSchema)
export default User