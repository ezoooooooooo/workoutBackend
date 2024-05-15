const express = require('express');
const router = express.Router();
const { signUp, login, getUserDetails } = require('../APIs/userAPIs');

// Route for user registration (sign up)
router.post('/signup', signUp);

// Route for user login
router.post('/login', login);
router.get('/getUserDetails', getUserDetails);

module.exports = router;
