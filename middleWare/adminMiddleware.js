import AsyncHandler from 'express-async-handler'
import Admin from '../models/adminSchema.js'
import jwt from 'jsonwebtoken'

const protect = AsyncHandler(async (req, res, next) => {
  try {
    let token = req.headers.token
    let decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    let isAdmin = await Admin.findOne({ _id : decoded.id })
    if ( !isAdmin ) {
      res.status(401).json({ msg: 'No Admin user found..' })
      throw new Error('Not Autherized')
    } else {
      next();
    }

  } catch (error) {

    res.status(401).json({ msg: 'Not authorized..' })
    throw new Error('Not authorized, token failed');

  }
});

export default protect
