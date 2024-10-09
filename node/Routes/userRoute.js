const express = require('express');
const route = express.Router();
const {userSignup, userSignin, getAllUsers} = require('../Controllers/userControl');

route.post('/signup', userSignup);
route.post('/signin', userSignin);
route.get('/allusers', getAllUsers);

module.exports = route;