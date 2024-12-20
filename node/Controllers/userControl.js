const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../Models/userModel');

jwt_secret = 'theweeknd';

const userSignup = async (req, res) => {
    const {name, email, password, imageURL} = req.body;

    if(!name || !email || !password){
        res.status(404).json({'Register Error':'Fill all fields!'});
    }

    const checkUser = await UserModel.findOne({email:email});
    if(checkUser){
        res.status(404).json({'Register Error':'Email already Exist'});
    }

    bcrypt.hash(password,10).then((hashPass) => {
        const user = UserModel({name, email, password:hashPass, image:imageURL});
        user.save()
        if(user){
            res.status(201).json(user);
        } else {
            res.status(404).json({'Register Error':'Not registered internal Error'});
        }
    });

}

const userSignin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find the user while excluding password and friends fields
        const user = await UserModel.findOne({ email })

        if (user) {
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                
                const token = jwt.sign({ _id: user._id }, jwt_secret);
                const u = {name:user.name, email:user.email, _id:user._id, image:user.image}
            
                res.status(201).json({ u, token });
            
            } else {
                res.status(400).json({ 'SignIn Error': 'Invalid password!' });
            }
        } else {
            res.status(400).json({ 'SignIn Error': 'Email not matched!' });
        }
    } catch (error) {
        console.error("SignIn Error:", error);
        res.status(500).json({ 'SignIn Error': 'Server error' });
    }
};

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

const removeFriend = async (req, res) => {

    const{friendId, id} = req.body;
    
    const user = await UserModel.findById(id);
    
    if(user){
    
        const friendRequest =  await UserModel.findByIdAndUpdate(
            id,
            {$pull:{friends:friendId}},
            {new: true}
        );
        
        if(!friendRequest){
            res.status(404).json('Friend Not Added');
            }
        
        const acceptRequest = await UserModel.findByIdAndUpdate(
            friendId,
            {$pull:{friends:id}},
            {new:true}      
        )
        
        
        if(friendRequest && acceptRequest){
            res.status(201).json({Success:'Friend removed'});
        } else {
            res.status(404).json('Friend Not removed');
        }
        
    } else {
        res.status(404).json('Please SignIn!');
    }  
} 

const friendList = async (req, res) => {
    const {id} = req.body;
    const friendList = await UserModel.findById(id).select('friends').populate('friends')
    if(friendList){
        res.status(200).json(friendList)
    } else {
        res.status(404).json({Error:" no friend list"})
    }  
}

const getUserDetails = async (req,res) => {
    const details = await UserModel.findById(req.body.userId).select('-friends -createdAt -updatedAt')
    console.log(details);
    if(details){
        res.status(201).json(details);
    } else {
        res.status(401).json("No details");
    }

}

const updateUser = async (req, res) => {
    const { userId, name, email, password } = req.body;
    console.log(userId)

    try {
        const hashPass = await bcrypt.hash(password, 10);
        const user = await UserModel.findByIdAndUpdate(userId, {name,email,password: hashPass,},
             { new: true }).select('-password -createdAt -friends -updatedAt')

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ 'Update Error': 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ 'Update Error': error.message });
    }
};

const removePfp = async (req, res) => {
    console.log(req.body.userId)
    const removepfp = await UserModel.findByIdAndUpdate(req.body.userId,{image:null},{new:true});
    if(removepfp){
        const user = await UserModel.findById(removepfp._id).select('-createdAt -updatedAt -friends -password')
        res.status(201).json(user);
    } else {
        res.status(401).json({status:"Pfp not Removed"});
    }
}

const updatePfp = async (req, res) => {
    const {userId, imageUrl} = req.body;
    console.log(userId, imageUrl);
    const updatedUser = await UserModel.findByIdAndUpdate(userId,{image:imageUrl}, { new: true })
    if(updatedUser){
        const user = await UserModel.findById(updatedUser._id).select('-createdAt -updatedAt -friends -password')
        res.status(201).json(user)
    } else {
        res.status(201).json({status:"Error in updating photo"})
    }
}

module.exports = {
    userSignup,
    userSignin,
    getAllUsers,
    addFriend,
    removeFriend,
    friendList,
    getUserDetails,
    updateUser,
    removePfp,
    updatePfp,
}; 