import {React, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Profile = () => {

  const user = JSON.parse(localStorage.getItem('User'));
  const navigate = useNavigate();
  
  // if no signin or sigup you can't go to profile page
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if(!token){
      navigate('/')
    }
  })
  return (
    <div className='profile'>
      <h1>Home Page</h1>
      {user ? (
        <>
          <h2>{user.name}</h2>
          <h2>{user.email}</h2>
        </>
      ):(
        <h2>no user details</h2>
      )}
      
      <Link to='/'>Home</Link>
      <button type='submit' name='logout-btn' 
      onClick={() => {
        localStorage.clear();
        navigate('/')
        }}>Logout</button>
      
    </div>
  )
}

export default Profile