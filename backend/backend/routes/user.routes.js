const express = require('express');
const { registerUser } = require('../controllers/user.controller');
const { body } = require('express-validator');

const router = express.Router();

// User registration route
router.post('/register', 
    [
        body('fullname.firstname').notEmpty().withMessage('First name is required'),
        body('fullname.lastname').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Email is not valid'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ], 
    registerUser
);

module.exports = router;