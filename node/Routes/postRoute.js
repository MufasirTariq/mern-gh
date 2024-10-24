const express = require('express');
const route = express.Router();
const addPost = require('../Controllers/postControl')

route.post('/addpost', addPost);

module.exports = route;