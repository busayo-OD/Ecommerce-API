const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

// Load config
dotenv.config({ path: '../../config/config.env'})


const register = async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
    })

    try{
        const user = await newUser.save();
        const { password, ...others} = user._doc
        res.status(201).send({message: 'Signup successful', ...others})
        
    } 
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

const login = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email})
        if(user){
            const password_valid = await bcrypt.compare(req.body.password, user.password)
            if(password_valid){
                const token = jwt.sign({
                    _id: user._id.toString(), 
                    isAdmin: user.isAdmin,
                },process.env.JWT_KEY, {expiresIn: '1h'})
                
                res.status(200).send({ message: 'Login successful', token})
            }
            else{
                res.status(400).send({ error: "Incorrect password"})
            }
        }
        else{
            res.status(400).send({ error: "User does not exist"})
        }
    } catch (err) {
        console.log(err)
    }
    
}




module.exports = {register, login}