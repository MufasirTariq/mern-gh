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

const allposts = async (req, res) => {
    const posts = await PostModel.find().populate('postedBy','_id name image').sort('-createdAt')
    if(posts){
        res.status(201).json(posts);
    }else{
        res.status(400).json({'Sending posts':'NO users found!'});
    }


}

const like = async(req, res) => {
    const {userId, postId} = req.body;

    const likeIt = await PostModel.findByIdAndUpdate(postId,{
        $push : {likes : userId }
    }, {new : true})

    if(likeIt){
        res.status(201).json({info:"liked"})
    } else {
        res.status(401).json({info:"Not liked"})
    }

}

const unlike = async (req, res) => {
    const {postId, userId} = req.body;
    const unliked = await PostModel.findByIdAndUpdate(postId,{
        $pull : {likes: userId}
    }, {new : true})
    
    if(unliked){
        res.status(201).json({info:"Unliked"})
    } else {
        res.status(401).json({info:"Not Unliked"})
    }

}

const comment = async (req, res) => {
    const {comment, postId, userId} = req.body;
    const makeComment = await PostModel.findByIdAndUpdate(postId,{
        $push : {comments: { comment: comment, postedBy: userId } }
    }, {new : true})

    if(makeComment){
        res.status(201).json({status:"Commented"})
    } else {
        res.status(401).json({status:" Not Commented"})
    }
}

const allComments = async (req, res) => {
    const {postId} = req.body;
    const commentList = await PostModel.findById(postId)
    .populate('postedBy', '_id name image').populate('comments.postedBy', '_id name')
    .select('-likes ')

    if(commentList){
        res.status(201).json(commentList)
    } else {
        res.status(401).json("No commentList")
    }
}

const myposts = async(req, res) => {
    const {userId} = req.body;
    const myPostsList = await PostModel.find({postedBy: userId})
    if(myPostsList){
        res.status(201).json(myPostsList)
    } else {
        res.status(401).json("NO myPostsList")
    }
}
module.exports = {addPost, allposts, like, unlike, comment, allComments, myposts};