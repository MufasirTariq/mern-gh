const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../Models/userModel');

jwt_secret = 'theweeknd';

const userSignup = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(404).json({'Register Error':'Fill all fields'});
    }

    const checkUser = await UserModel.findOne({email:email});
    if(checkUser){
        res.status(404).json({'Register Error':'Email already Exist'});
    }

    bcrypt.hash(password,10).then((hashPass) => {
        const user = UserModel({name, email, password:hashPass});
        user.save()
        if(user){
            res.status(201).json(user);
        } else {
            res.status(404).json({'Register Error':'Not registered internal Error'});
        }
    });

}

const userSignin = async (req, res) => {
    const {email, password} =req.body;
    
    const user = await UserModel.findOne({email:email}).populate('friends','name');
    if(user){
        bcrypt.compare(password,user.password)
        .then((isMatch)=>{
            const token = jwt.sign({_id:user._id}, jwt_secret);
            res.status(201).json({user, token});
        }).catch((err) => {
            res.status(400).json({'SignIn Error':err});
        })
    } else {
        res.status(400).json({'SignIn Error':'Email not matched!'});
    }

}

const getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password -friends');
    if(users){
        res.status(201).json(users);
    }else{
        res.status(400).json({'Sending users':'NO users found!'});
    }
}

const addFriend = async (req, res) => {

    const{friendId, id} = req.body;
    
    const user = await UserModel.findById(id);
    
    if(user){
    
        const friendExist = user.friends.includes(friendId)
    
        if(!friendExist){
    
            const friendRequest =  await UserModel.findByIdAndUpdate(
                id,
                {$push:{friends:friendId}},
                {new: true}
            );
            
            if(!friendRequest){
                res.status(404).json('Friend Not Added');
                }
            
            const acceptRequest = await UserModel.findByIdAndUpdate(
                friendId,
                {$push:{friends:id}},
                {new:true}      
            )
            
            
            if(friendRequest && acceptRequest){
                res.status(201).json({Success:'Friend Added'});
            } else {
                res.status(404).json('Friend Not Added');
            }
        } else {
            res.status(200).json({Error:"Already a Friend"});
        }
    } else {
        res.status(404).json('Please SignIn!');
    }   
      

    
}


module.exports = {userSignup, userSignin, getAllUsers, addFriend}; 