const PostModel = require('../Models/PostModel');

const addPost = async (req, res) => {
    const {id, caption, postURL} = req.body;
    console.log(id)
    if (!id || !postURL){
        res.status(404).json({Error:"UserID or Post is missing"})
    }
    
    const postUpload = PostModel({caption:caption, post:postURL, postedBy:id});
    postUpload.save();

    if(postUpload){
        res.status(201).json(postUpload)
    } else {
        res.status(404).json({'Post Upload':'internal Error'});
    }

}

module.exports = addPost;