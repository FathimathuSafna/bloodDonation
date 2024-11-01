import Admin from "../models/adminSchema.js";
import Hospital from "../models/hospitalSchema.js";


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
            msg:"Details added succesfully"
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

// const updateDetails = async (req,res) =>{
//     try{
//         let id = req.params.id
//         const updateDetail = await Admin.findByIdAndUpdate(id,req.body,{
//             new:true
//         })
//          res.status(201).json({
//             msg:"Details updated succesfully",
//             updateDetail
//         })
//     } catch(err) {
//         res.status(400).json(err)
//     }
// }

const addHospitals = async (req,res) =>{
    const { email } = req.body
    try{
        const existHospital = await Hospital.findOne({email})
        if(existHospital){
            return res.status(400).json({
                msg: "Data is  already exist"
            })
        }
        const newUser = await Hospital.create(req.body)
        res.status(201).json({
            msg:"Details added succesfully"
        })
    } catch (err) {
        res.status(400).json(err)

}
}
const updateHospital = async(req,res)=>{
    try{
        let id = req.params.id
            const updateUser = await Hospital.findByIdAndUpdate(id,req.body,{
              new:true
             })
        res.status(201).json({
            msg:"Hospital details updated succesfully",
            updateHospital
        })
    } catch (err) {
        res.status(400).json(err)
    }
}
const deleteHospital = async (req, res) => {
    try {
      let id = req.params.id;
      const HospitalDetails = await Hospital.findByIdAndDelete(id);
      res.status(201).json({
        msg:"records deleted succesfully"
      });
    } catch (err) {
      res.status(400).json(err);
    }
  };





export {addDetails,adminLogin,addHospitals,updateHospital,deleteHospital}