const express = require('express');
const route = express.Router();
const {addPost,allposts, like, unlike, comment, allComments} = require('../Controllers/postControl')

route.post('/addpost', addPost);
route.get('/allposts', allposts);
route.post('/like', like);
route.post('/unlike', unlike);
route.post('/comment', comment);
route.post('/allComments', allComments);

module.exports = route;