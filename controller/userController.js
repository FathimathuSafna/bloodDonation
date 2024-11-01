import User from "../models/userSchema.js";
import Donor from "../models/donorSchema.js";
import DonationDetails from "../models/donationDetailsSchema.js";

const userLogin = async(req,res)=>{
const { email,password } = req.body
    try{
        const existUser = await User.findOne({email})
        if(!existUser){
            res.status(400).json({
                msg:"Invalid email or password"
            })
        }
        if(await existUser.matchPassword(password)){
            return res.status(200).json({
                msg: "login success"
            })
        } else {
            return res.status(400).json({
                msg:"Incorrect password"
            })
        }
    } catch (err){
        console.log(err)
        res.status(400).json({
            msg:err
        })
    }
}

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
                msg:"Details added succesfully"
            })
        } catch (err) {
            res.status(400).json(err)
    
    }
}

const donationDetails = async(req,res)=>{
    console.log(req.body)
        try {
          const details = await DonationDetails.create(req.body)
          res.status(201).json({
            msg:"details added succesfully"
          })
        } catch (err) {
          res.status(400).json(err);
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
            updateUser
        })
    } catch (err) {
        res.status(400).json(err)
    }
}
const deleteUser = async (req, res) => {
    try {
      let id = req.params.id;
      const userDetails = await Donor.findByIdAndDelete(id);
      res.status(201).json({
        msg:"records deleted succesfully"
      });
    } catch (err) {
      res.status(400).json(err);
    }
  };



export { userLogin,donor,donationDetails,updateUser,deleteUser }