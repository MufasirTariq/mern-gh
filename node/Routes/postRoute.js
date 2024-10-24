const express = require('express');
const route = express.Router();
const {addPost,allposts} = require('../Controllers/postControl')

route.post('/addpost', addPost);
route.get('/allposts', allposts);

module.exports = route;