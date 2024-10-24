import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/Profile.css'

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('User'));
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchingAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/allusers');
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate('/');
    } else {
      fetchingAllUsers();
      friendList();
    }
  }, [navigate]);

  const addFriend = async (friendId) => {
    const id = user._id;
    try {
      const response = await axios.post('http://localhost:5000/api/user/addfriend', { friendId, id });
      console.log(response.data);
      friendList();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const removeFriend = async (friendId) => {
    const id = user._id;
    try {
      const response = await axios.post('http://localhost:5000/api/user/removefriend', { friendId, id });
      console.log(response.data);
      friendList();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };
  
  const friendList = async () => {
    const id = user._id;
    try {
      const response = await axios.post('http://localhost:5000/api/user/friendlist', { id });
      console.log(response.data.friends);
      setFriends(response.data.friends);
    } catch (error) {
      console.error("Error fetching friend list:", error);
    }
  };
  
    const availableUsers = users.filter(u => !friends.some(fr => fr._id === u._id) && u._id !== user._id);

  return (
    <div className='profile'>
      {user ? (
        <>
          {user.image ? (<img src={user.image} alt='default' className='pfp' />):(
            <img  className='pfp' src='https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?semt=ais_hybrid' alt='default user pic'/>
          )}
          <h2>{user.name}</h2>
          <h4>{user.email}</h4>
          <h4>{friends.length} Followers</h4>
        </>
      ) : (
        <h2>No user details</h2>
      )}


      <div className='unknown'>
        <h2>People You May Know:</h2>
        <ul>
          {availableUsers.length > 0 ? (
            availableUsers.map(u => (
              <li key={u._id}>
                {u.name} - <button type='button' onClick={() => addFriend(u._id)}>Follow</button>
              </li>
            ))
          ) : (
            <li>No users found</li>
          )}
        </ul>
      </div>

      <div className='friends'>    
        <h2>Your Friends</h2>
        
        <ul>
          {friends.length > 0 ? (
            friends.map(fr => (
              <li key={fr._id}>
                {fr.name} - <button type='button' onClick={() => removeFriend(fr._id)}>Unfollow</button>
              </li>
            ))
          ) : (
            <li>No Followers</li>
          )}
        </ul>
      </div>
    </div>

  );
};

export default Profile;
