import express from 'express'
import { addUsers,userLogin } from '../controller/userController.js'
const app =  express.Router()
import protect from '../middleWare/adminMiddleware.js'

app.route('/login').post(userLogin)
app.route("/").post(protect,addUsers)


export default app