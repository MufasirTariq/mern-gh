const express = require('express');
const route = express.Router();
const {userSignup, userSignin, getAllUsers, addFriend, friendList} = require('../Controllers/userControl');

route.post('/signup', userSignup);
route.post('/signin', userSignin);
route.get('/allusers', getAllUsers);
route.post('/addfriend', addFriend);
route.post('/friendlist', friendList);

module.exports = route;