import express from 'express'
import { userLogin,donor,donationDetails,updateUser,deleteUser } from '../controller/userController.js'
const app =  express.Router()

app.route('/login').post(userLogin)
app.route('/donor').post(donor)
app.route('/donationDetails').post(donationDetails)
app.route('/donor/:id').put(updateUser).delete(deleteUser)

export default app