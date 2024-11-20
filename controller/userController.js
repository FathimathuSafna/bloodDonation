import User from "../models/userSchema.js";
import generateToken from "../utils/generateToken.js";

const addUsers = async(req,res)=>{
    const { email } = req.body
    try{
        
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({
                msg: "User already exist"
            })
        }
        const newUser = await User.create(req.body)
        res.status(201).json({
            msg:"Details added succesfully",
            data:newUser
        })
    } catch (err) {
        res.status(400).json(err)

}
}

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
                msg: "login success",
                data :generateToken(existUser._id)
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




export { addUsers,userLogin }