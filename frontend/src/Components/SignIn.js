import axios from 'axios';
import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const sendData = async () => {
    console.log(email, password);

    try {
        const response = await axios.post('http://localhost:5000/api/user/signin', {email, password})
        console.log('Success:', response);
        localStorage.setItem("Token",response.data.token);
        localStorage.setItem("User",JSON.stringify(response.data.user));
        navigate('/profile');
    } catch (error) {
      console.log('Failed:', error);
    }
  }
  return (
    <div className='signin'>
      <h1>SignIn Page</h1>

      <div className='signup-form'>
      
        <label>Email:</label>
        <input type='email' name='email' placeholder='Enter Email' onChange={(e) => {setEmail(e.target.value)}} /> <br/>
        
        <label>Password:</label>
        <input type='text' name='password' placeholder='Enter Password' onChange={(e) => {setPassword(e.target.value)}} /> <br/>

        <input type='submit' name='signin-btn' value='SignIn' onClick={() => {sendData()}} />
      </div>

      <div>
        <Link to='/signup'>Don't have an account?</Link>
        <br/>
        <Link to='/'>Home Page</Link>
      </div>

    </div>
  )
}

export default SignIn