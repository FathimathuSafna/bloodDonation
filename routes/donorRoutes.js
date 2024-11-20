import express from 'express'
import { donor,updateUser,deleteUser } from '../controller/donorController.js'
import protect from '../middleWare/userMiddleware.js'

const app =  express.Router()

app.route('/').post(protect,donor)
app.route('/:id').put(protect,updateUser).delete(protect,deleteUser)

export default app