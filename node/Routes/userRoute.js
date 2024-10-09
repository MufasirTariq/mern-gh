const express = require('express');
const route = express.Router();
const {userSignup, userSignin} = require('../Controllers/userControl');

route.post('/signup', userSignup);
route.post('/signin', userSignin);

module.exports = route;