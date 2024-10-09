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
            const token = jwt.sign({_id:user._id}, jwt_secret);
            res.status(201).json({user,token});
        } else {
            res.status(404).json({'Register Error':'Not registered internal Error'});
        }
    });

}

const userSignin = async (req, res) => {
    const {email, password} =req.body;
    
    const user = await UserModel.findOne({email:email});
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
    const users = await UserModel.find().select('-password');
    if(users){
        res.status(201).json(users);
    }else{
        res.status(400).json({'Sending users':'NO users found!'});
    }
}


module.exports = {userSignup, userSignin, getAllUsers};