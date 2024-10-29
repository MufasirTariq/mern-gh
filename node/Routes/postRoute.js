const express = require('express');
const route = express.Router();
const {addPost,allposts, like, unlike, comment, allComments, myposts} = require('../Controllers/postControl')

route.post('/addpost', addPost);
route.get('/allposts', allposts);
route.post('/like', like);
route.post('/unlike', unlike);
route.post('/comment', comment);
route.post('/allComments', allComments);
route.post('/myposts', myposts);

module.exports = route;