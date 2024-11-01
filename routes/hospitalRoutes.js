import express from 'express'
import { hospitalLogin,addUsers} from '../controller/hospitalControllers.js'

const app =  express.Router()

app.route('/login').post(hospitalLogin)
app.route("/addUsers").post(addUsers)

export default app 