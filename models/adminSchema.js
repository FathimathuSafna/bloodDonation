import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


var Schema = mongoose.Schema
var adminSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        required:true
    }
       
})
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

adminSchema.methods.matchPassword = async function (enteredPassword){
 return await bcrypt.compare(enteredPassword,this.password)

}


const Admin = mongoose.model("Admin",adminSchema)
export default Admin