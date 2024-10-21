import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigateTo = useNavigate()

    const loginStatus = () => {
    
        const token = localStorage.getItem("Token");
    
    if(token){
      return [
        <>
          <Link to = '/profile'><li>Profile</li></Link>
          <Link to = '/createpost'><li>Create Post</li></Link>
          <Link to = '/followingpost'><li>My Feed</li></Link>
          <Link to = {''}><button onClick={()=>{ localStorage.clear(); navigateTo('/');}}>Logout</button></Link>
        </>
      ]
    } else {
        return [
          <>
            <Link to = '/signin'><li>SignIn</li></Link>
            <Link to = '/signup'><li>SignUp</li></Link>
          </>
        ]      
      }
  };
  return (
    <div className="navbar">    
       <h2 className='userName' onClick={() => {navigateTo('/')}} >MERN-GITHUB</h2>
      <ul className="nav-menu">
        {loginStatus()}
      </ul>
    </div>
  )
}
