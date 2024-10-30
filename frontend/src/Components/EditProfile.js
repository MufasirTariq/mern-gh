import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const UpdateUserDeatils =  async () => {
        const userId = user._id

        if(!name){name = user.name}
        if(!email){email = user.email}

        if(password == conPassword){
            const response = await axios.post('http://localhost:5000/api/user/updateuser',{userId, name, email, password})
            if(response){
                localStorage.setItem("User",JSON.stringify(response.data));
            }
        } else {
            console.log("Password Dont match");
        }
        
    }

  return (
    <div className='updateform'>

    <form >
        <img src={user.image} alt='User Profile' className='pfp' />
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder={user.name}  />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={user.email}/>
        <input type='password'  value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter New Password' />
        <input type='password' value={conPassword} onChange={(e) => setConPassword(e.target.value)} placeholder='Confirm New Password' />
        <input type='button' value='Save Changes' onClick={() => {UpdateUserDeatils()}} />
    </form>
</div>
  )
}

export default EditProfile