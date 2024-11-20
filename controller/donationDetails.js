import DonationDetails from "../models/donationDetailsSchema.js";
import User from "../models/userSchema.js";
import moment from "moment-timezone";

const donationDetails = async(req,res)=>{
        try {
          const details = await DonationDetails.create(req.body)
          res.status(201).json({
            msg:"details added succesfully",
            data:details
          })
        } catch (err) {
          res.status(400).json(err);
        }
    }

    const getDonationDetailsByDonorId = async(req,res)=>{
        try{
           let id = req.params.id
            const donationDetails = await DonationDetails.find({donorId:id})
            res.status(201).json({
                msg:"suceesfully retrived",
                data:donationDetails
            })
        } catch (err){
            res.status(400).json(err)
        }
        }
        


        const getByHospitalId = async (req, res) => {
            try {
                const id = req.query.hospitalId;
                let dateStr = req.query.donationDate; // Get the date string from the query
        
                if (!id) {
                    return res.status(400).json({ msg: "Invalid hospital ID" });
                }
        
                const condition = { hospitalId: id };
        
                // Parse donationDate if provided
                if (dateStr) {
                    dateStr = dateStr.trim(); // Trim any extra spaces
                    console.log("Received date string:", dateStr); // Debugging: Log raw input
                    
                    // Clean the date string by replacing space before the timezone
                    if (dateStr.includes(" ")) {
                        dateStr = dateStr.replace(" ", "+"); // or ".000Z" if you want to replace with Z
                    }
                    
                    // Use moment to parse the date string
                    const date = moment(dateStr);
                    console.log("Parsed Date:", date.format());  // Debugging: Log parsed date
        
                    // Check if the date is valid
                    if (!date.isValid()) {
                        return res.status(400).json({
                            msg: "Invalid donationDate format. Please provide a valid date in ISO format."
                        });
                    }
        
                    // Define the start and end of the day to match records for the specific date
                    const startOfDay = date.startOf('day').toDate(); // Start of the day
                    const endOfDay = date.endOf('day').toDate(); // End of the day
        
                    // Add donationDate range to the query
                    condition.donationDate = { $gte: startOfDay, $lte: endOfDay };
                }
        
                // Fetch records from the database
                const donationDetails = await DonationDetails.find(condition).populate('donorId')
                res.status(200).json({
                    msg: "Successfully retrieved",
                    data: donationDetails
                });
            } catch (err) {
                console.error("Error:", err);  // Debugging: Log error details
                res.status(500).json({ msg: "An error occurred", error: err.message });
            }
        }
        
export { donationDetails,getDonationDetailsByDonorId,getByHospitalId }
        