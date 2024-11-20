import Donor from "../models/donorSchema.js";
import User from "../models/userSchema.js";

const donor = async(req,res)=>{
    const { aadharNumber } = req.body
    try{
        const existUser = await Donor.findOne({aadharNumber})
        if(existUser){
            return res.status(400).json({
                msg: "User already exist"
            })
        }
        const newUser = await Donor.create(req.body)
        res.status(201).json({
            msg:"Details added succesfully",
            data:newUser
        })
    } catch (err) {
        res.status(400).json(err)

}
}

const updateUser = async(req,res)=>{
try{
    let id = req.params.id
        const updateUser = await Donor.findByIdAndUpdate(id,req.body,{
          new:true
         })
    res.status(201).json({
        msg:"User details updated succesfully",
        data:updateUser
    })
} catch (err) {
    res.status(400).json(err)
}
}
const deleteUser = async (req, res) => {
try {
    let isStaff = await User.findOne({ _id : req.headers.id })
        if(!isStaff){
            return res.status(400).json({
                msg:"you dont have access"
            })
        }
  let id = req.params.id;
  const userDetails = await Donor.findByIdAndDelete(id);
  res.status(201).json({
    msg:"records deleted succesfully",
    data:userDetails
  });
} catch (err) {
  res.status(400).json(err);
}
};



export { donor,updateUser,deleteUser }