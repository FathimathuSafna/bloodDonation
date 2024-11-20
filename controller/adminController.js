import Admin from "../models/adminSchema.js";
import generateToken from '../utils/generateToken.js'

const addDetails =  async (req,res) =>{
    const { email } = req.body
    try{
        const existAdmin = await Admin.findOne({email})
        if(existAdmin){
            return res.status(400).json({
                msg: "Admin already exist"
            })
        }
        const newadmin = await Admin.create(req.body)
        res.status(201).json({
            msg:"Details added succesfully",
            data:newadmin
        })
    } catch (err) {
        res.status(400).json(err)

}
}

const adminLogin = async (req,res)=>{
    const { email,password } = req.body
    try{
        const existAdmin = await Admin.findOne({email})
        if(!existAdmin){
            res.status(400).json({
                msg:"Admin not found"
            })
        }
        if(await existAdmin.matchPassword(password)){
            return res.status(200).json({
                msg: "login success",
                data:generateToken(existAdmin._id)
                
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

const updateDetails = async (req,res) =>{
    try{
        let isAdmin = await Admin.findOne({ _id : req.headers.id })
        if(!isAdmin){
            return res.status(400).json({
                msg:"you dont have access"
            })
        }
        let id = req.params.id
        const { email,password,Name,isActive } = req.body
        const admin = await Admin.findById(id)
        admin.email = email
        admin.password = password
        admin.Name = Name
        admin.isActive = isActive
        const updateDetails = await admin.save()
         res.status(201).json({
            msg:"Details updated succesfully",
            data:updateDetails
        })
    } catch(err) {
        res.status(400).json(err)
    }
}



export {addDetails,adminLogin,updateDetails}