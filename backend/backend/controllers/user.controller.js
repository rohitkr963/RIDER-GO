// filepath: c:\Users\nk756\OneDrive\Desktop\RIDER-GO\backend\controllers\user.controller.js
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
// const blacklistTokenModel = require("../models/blacklistToken.model")

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