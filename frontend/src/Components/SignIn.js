import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className='signin'>
      <h1>SignIn Page</h1>

      <div className='signup-form'>
      
        <label>Email:</label>
        <input type='email' name='email' placeholder='Enter Email' /> <br/>
        
        <label>Password:</label>
        <input type='text' name='password' placeholder='Enter Password' /> <br/>

        <input type='submit' name='signin-btn' value='SignIn' />
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