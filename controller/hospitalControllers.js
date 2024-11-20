import Hospital from "../models/hospitalSchema.js";

const addHospitals = async (req,res) =>{
    const { email } = req.body
    console.log(req.headers)

    try{
        
        const existHospital = await Hospital.findOne({ email })
        if(existHospital){
            return res.status(400).json({
                msg: "Data is  already exist"
            })
        }
        
        const newUser = await Hospital.create(req.body)
        res.status(201).json({
            msg:"Details added succesfully",
            data:newUser
        })
    } catch (err) {
        res.status(400).json(err)

}
}
const updateHospital = async(req,res)=>{
    try{
        let id = req.params.id
            const updateUser = await Hospital.findByIdAndUpdate(id,req.body,{
              new:true,

             })
        res.status(201).json({
            msg:"Hospital details updated succesfully",
            data:updateUser
           
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
        msg:"records deleted succesfully",
        data:HospitalDetails
      
      });
    } catch (err) {
      res.status(400).json(err);
    }
  };

const hospitalLogin =  async(req,res)=>{
    const { email,password } = req.body
    try{
        const existUser = await Hospital.findOne({email})
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




export { addHospitals,updateHospital,deleteHospital,hospitalLogin }