const mongoose = require('mongoose');
const UserModel = require('../Models/userModel');
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
    caption:{type:String,},
    post:{type:String, required: true},
    postedBy:{type:ObjectId, ref:UserModel},

    likes:[{type:ObjectId, ref:UserModel}],

    comment:[{
        comment:{type:String},
        postedBy:{type:ObjectId, ref:UserModel}
    }]
});

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;