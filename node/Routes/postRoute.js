const express = require('express');
const route = express.Router();
const {addPost,allposts, like, unlike} = require('../Controllers/postControl')

route.post('/addpost', addPost);
route.get('/allposts', allposts);
route.post('/like', like);
route.post('/unlike', unlike);

module.exports = route;