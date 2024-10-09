import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const sendData = async () => {
    console.log(name, email, password);
    try {
          const response = await axios.post('http://localhost:5000/api/user/signup',{name, email, password});
          if(response){
            navigate('/signin');
          }
          
    } catch (error) {
      console.log("Error",error);
    }

  }
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if(token){
      navigate('/profile')
    }
  })


  return (
    <div className='signup'>
      <h1>Signup Page</h1>

      <div className='signup-form'>
        
        <label>Name:</label>
        <input type='text' name='name' placeholder='Enter Name' onChange={(e) => {setName(e.target.value)}} /> <br/>
        
        <label>Email:</label>
        <input type='email' name='email' placeholder='Enter Email' onChange={(e) => {setEmail(e.target.value)}} /> <br/>
        
        <label>Password:</label>
        <input type='text' name='password' placeholder='Enter Password' onChange={(e) => {setPassword(e.target.value)}} /> <br/>

        <input type='submit' name='signup-btn' value='SignUp' onClick={() => sendData()} />
      </div>

      <div>
        <Link to='/signin'>Already have an account?</Link>
        <br/>
        <Link to='/'>Home Page</Link>
      </div>

    </div>
  )
}

export default SignUp