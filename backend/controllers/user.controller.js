const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require("../models/blacklistToken.model")

module.exports.registerUser = async(req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
}
    const { fullname, email, password } = req.body;

    const isUserAlready = await userModel.findOne({email});

    if(isUserAlready) {
        return res.status(400).json({message: "User already exist"});
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
        
    });

    const token = await user.generateAuthToken();
res.cookie('token', token, { httpOnly: true }).status(200).json({ token, user });


}

 module.exports.loginUser = async (req,res,next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user) {
         return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'})
        }
const token = await user.generateAuthToken();

res.cookie('token', token);

res.cookie('token', token, { httpOnly: true }).status(200).json({ token, user });

}

module.exports.getUserProfile = async(req,res,next) => {
    res.status(200).json(req.user);
}


module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');

        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'Token not provided' });
        }

        const existingToken = await blacklistTokenModel.findOne({ token });

        if (!existingToken) {
            await blacklistTokenModel.create({ token });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};