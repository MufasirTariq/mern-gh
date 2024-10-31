const express = require('express');
const route = express.Router();
const {userSignup, userSignin, getAllUsers, addFriend, friendList, removeFriend, getUserDetails, updateUser, removePfp, updatePfp} = require('../Controllers/userControl');

route.post('/signup', userSignup);
route.post('/signin', userSignin);
route.get('/allusers', getAllUsers);
route.post('/addfriend', addFriend);
route.post('/removefriend', removeFriend);
route.post('/friendlist', friendList);
route.post('/getuserdetails', getUserDetails );
route.post('/updateuser', updateUser );
route.post('/removePfp', removePfp );
route.post('/updatePfp', updatePfp );

module.exports = route;