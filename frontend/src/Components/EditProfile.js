import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateProfilePic from './UpdateProfilePic';
import '../Css/EditProfile.css';

const EditProfile = () => {
    const user = JSON.parse(localStorage.getItem('User'));
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("Token");
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    var [name, setName] = useState('')      
    var [email, setEmail] = useState('')      
    const [password, setPassword] = useState('')      
    const [conPassword, setConPassword] = useState('')      

    const UpdateUserDeatils = async () => {
        const userId = user._id

        if (!name) { name = user.name }
        if (!email) { email = user.email }

        if (password === conPassword) {
            const response = await axios.post('http://localhost:5000/api/user/updateuser', { userId, name, email, password });
            if (response) {
                localStorage.setItem("User", JSON.stringify(response.data));
            }
        } else {
            console.log("Passwords don't match");
        }
    }

    const [updatePfp, setUpdatePfp] = useState(false);
    const changePfp = () => {
        setUpdatePfp(!updatePfp);
    }

    return (
        <div className='updateform'>
            <form>
            {user.image ? (
                 <img src={user.image} alt='User Profile' className='pfp' onClick={changePfp} />
            ) : (
                <img className='pfp' src='https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?semt=ais_hybrid' alt='Default User' />
                )}    
               
                
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder={user.name} />
                
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={user.email} />
                
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter New Password' />
                
                <input type='password' value={conPassword} onChange={(e) => setConPassword(e.target.value)} placeholder='Confirm New Password' />
                
                <input type='button' value='Save Changes' onClick={UpdateUserDeatils} />
            </form>
            {updatePfp && <UpdateProfilePic changePfp={changePfp} />}
        </div>
    );
}

export default EditProfile;
