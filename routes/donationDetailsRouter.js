import express from 'express'
import { donationDetails,getDonationDetailsByDonorId,getByHospitalId } from '../controller/donationDetails.js'
import protect from '../middleWare/userMiddleware.js'

const app =  express.Router()

app.route('/').post(protect,donationDetails).get(protect,getByHospitalId)
app.route('/:id').get(protect,getDonationDetailsByDonorId)

export default app