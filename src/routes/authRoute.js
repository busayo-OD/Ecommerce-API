const authRouter = require('express').Router();
const authController = require('../controllers/authController');

//REGISTER
authRouter.post('/register', authController.register);

//LOGIN
authRouter.post('/login', authController.login);


module.exports = authRouter