const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const dotenv = require('dotenv')

// Load config
dotenv.config({ path: '../../config/config.env'})

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'

        if (!token) {
          throw new Error('Authentication failed!');
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: decoded._id, token})
        req.token = token
        req.user = user
        if(!user){
          throw new Error
      }
        next();
      } catch (err) {
        res.status(400).send({err: 'Please authenticate'});
      }
   
}

const verifyTokenAndAuthorization = async (req, res, next) => {

  verifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin){
      next()
    } else{
      res.status(403).json("Unauthorized")
    }
  })
  
}



module.exports = {
  verifyToken,
  verifyTokenAndAuthorization
};