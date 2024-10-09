import React from 'react'
import { Link } from 'react-router-dom'
const Profile = () => {

  const user = JSON.parse(localStorage.getItem('User'));

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
      <br/>
      <Link to='/logout'>Logout</Link>
    </div>
  )
}

export default Profile