const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const {verifyToken, verifyTokenAndAuthorization} = require('../middleware/auth')

userRouter.put('/:id', verifyTokenAndAuthorization )


module.exports = userRouter