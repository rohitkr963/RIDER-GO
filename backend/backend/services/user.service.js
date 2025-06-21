const userModel = require('../models/user.model');

module.exports.createUser = async (userData) => {
    const user = new userModel(userData);
    await user.save();
    return user;
};