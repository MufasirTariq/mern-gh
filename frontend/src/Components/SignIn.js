import axios from 'axios';
import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/SignIn.css';

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
        localStorage.setItem("User",JSON.stringify(response.data.u));
        navigate('/feed');
    } catch (error) {
      console.log('Failed:', error);
    }
  }

  // if token availble goto profile
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if(token){
      navigate('/feed')
    }
  })

  return (
    <div className='signin'>

      <div className='signup-form'>
        <h2 className='xo'>XO</h2>
        <input type='email' name='email' placeholder='Enter Email' onChange={(e) => {setEmail(e.target.value)}} /> <br/>
        
        <input type='text' name='password' placeholder='Enter Password' onChange={(e) => {setPassword(e.target.value)}} /> <br/>

        <input type='submit' id='signin-btn' value='SignIn' onClick={() => {sendData()}} />

        <Link to='/signup' className='loginPara'>Don't have an account?</Link>
      
      </div>

      
        
    </div>
  )
}

export default SignIn