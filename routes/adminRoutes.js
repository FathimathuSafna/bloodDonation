import express from 'express'

import { addDetails,adminLogin,addHospitals,updateHospital,deleteHospital } from '../controller/adminController.js'

const app =  express.Router()

app.route('/').post(addDetails)
app.route('/login').post(adminLogin)
// app.route("/:id").put(updateDetails)

// hospital enroll

app.route('/hospital').post(addHospitals)
app.route('/hospital/:id').put(updateHospital).delete(deleteHospital)


export default app