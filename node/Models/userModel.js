const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const UserSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    image:{type:String},
    friends:[{type:ObjectId, ref:'UserModel'}]

},{
    timestamps:true
});

module.exports =mongoose.model('UserModel', UserSchema)

