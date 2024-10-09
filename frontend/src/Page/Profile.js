import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Profile = () => {

  const user = JSON.parse(localStorage.getItem('User'));
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

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
      friendList();
    }
  }, [])


  // add friend :
  const addFriend = async (friendId) => {
    const id = user._id;
    const response = await axios.post('http://localhost:5000/api/user/addfriend',{friendId, id})
    if (response){
      console.log(response.data);
      friendList();
    } else {
      console.log('error');
    }

  }
  
  //diplayinf friend list :
  const friendList = async () => {
    const id = user._id;
    console.log(id)
    const response = await axios.post('http://localhost:5000/api/user/friendlist',{id})
    if(response){
      console.log(response.data.friends);
      setFriends(response.data.friends);
    } else {
      console.log("error");
    }

  }
  
  return (
    <div className='profile'>
      <h1>Home Page</h1>
      
      <button type='submit' name='logout-btn' 
      onClick={() => {
        localStorage.clear();
        navigate('/')}}>
          Logout</button>

      {/* User info  */}
      {user ? (
        <>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
        </>
      ):(
        <h2>no user details</h2>
      )}

      {/* People are not friends */}
        <h2>People you may know :</h2>
        <ul>
          {users.length > 0 ? (
            users.map((u) => {
              if (u._id !== user._id) {
                return (
                  <li key={u._id}>
                    {u.name} - <button type='button' name='add-friend' onClick={() => addFriend(u._id)}> Add + </button>
                  </li>
                );
              }
            return null; 
          })
            ) : ( <li>No users found</li>)
          }
        </ul>
    

      {/* Friends List     */}
      <h2>Your Friends</h2>
      <ul>
        {friends.length > 0 ? (
          friends.map((fr) => {
            return (
              <li key={fr._id}>
                {fr.name} - <button type='button' name='remove-friend' > Remove </button>

              </li>
            );
            return null;
          })
        ):(<li>No Friends found</li>)}
      </ul>
    </div>
  )
}

export default Profile