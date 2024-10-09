import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Profile = () => {

  const user = JSON.parse(localStorage.getItem('User'));
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);

  const fetchingAllUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/user/allusers')
    if(response){
      setUsers(response.data)
      console.log(response.data);
    } else {
      console.log("error");
    }
    }

  // if no signin or sigup you can't go to profile page
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if(!token){
      navigate('/')
    } else {
      fetchingAllUsers();
    }
  }, [navigate])

  return (
    <div className='profile'>
      <h1>Home Page</h1>
      
      <button type='submit' name='logout-btn' 
      onClick={() => {
        localStorage.clear();
        navigate('/')
        }}>Logout</button>

      
      {user ? (
        <>
          <h2>{user.name}</h2>
          <h2>{user.email}</h2>
        </>
      ):(
        <h2>no user details</h2>
      )}

      <h2>People you may know!:</h2>
        <ul>
          {users.length > 0 ? (
            users.map((u) => (
              u._id != user._id ? (
                <li key={u._id}>
                {u.name}
              </li>
              ) : null
              
            ))
          ) : (
            <li>No users found</li>
          )}
        </ul>

    </div>
  )
}

export default Profile