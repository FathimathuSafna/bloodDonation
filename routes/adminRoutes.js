import express from 'express'

import { addDetails,adminLogin,updateDetails  } from '../controller/adminController.js'

const app =  express.Router()

app.route('/').post(addDetails)
app.route('/login').post(adminLogin)
app.route("/:id").put(updateDetails)


export default app