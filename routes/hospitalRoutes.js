import express from 'express'
import { hospitalLogin,addHospitals,updateHospital,deleteHospital} from '../controller/hospitalControllers.js'
import  protect  from '../middleWare/adminMiddleware.js'

const app =  express.Router()

app.route('/login').post(hospitalLogin)
app.route('/').post(protect,addHospitals)
app.route('/:id').put(protect,updateHospital).delete(protect,deleteHospital)



export default app 