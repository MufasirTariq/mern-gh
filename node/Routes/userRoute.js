const express = require('express');
const route = express.Router();
const {userSignup, userSignin, getAllUsers, addFriend} = require('../Controllers/userControl');

route.post('/signup', userSignup);
route.post('/signin', userSignin);
route.get('/allusers', getAllUsers);
route.post('/addfriend', addFriend);

module.exports = route;