import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/Profile.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('User'));
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchingAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/allusers');
      setUsers(response.data);
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
      myPostList();
    }
  }, [navigate]);

  const [myposts, setMyPosts] = useState([]);
  const myPostList = async() => {
    const userId = user._id
    const response = await axios.post('http://localhost:5000/api/post/myposts',{userId})
    if(response){
      console.log(response.data);
      setMyPosts(response.data);
    }
  }

  const addFriend = async (friendId) => {
    const id = user._id;
    try {
      await axios.post('http://localhost:5000/api/user/addfriend', { friendId, id });
      friendList();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const removeFriend = async (friendId) => {
    const id = user._id;
    try {
      await axios.post('http://localhost:5000/api/user/removefriend', { friendId, id });
      friendList();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };
  
  const friendList = async () => {
    const id = user._id;
    try {
      const response = await axios.post('http://localhost:5000/api/user/friendlist', { id });
      setFriends(response.data.friends);
    } catch (error) {
      console.error("Error fetching friend list:", error);
    }
  };
  
  const availableUsers = users.filter(u => !friends.some(fr => fr._id === u._id) && u._id !== user._id);

  return (
    <div className='profile'>
  {user ? (
    <div className="profile-info">
      {user.image ? (
        <img src={user.image} alt='User Profile' className='pfp' />
      ) : (
        <img className='pfp' src='https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?semt=ais_hybrid' alt='Default User' />
      )}
      <h2>{user.name}</h2>
      <button className='edit-profile' type='button' 
      onClick={() => {
        navigate('/editprofile')
      }}>Edit Profile</button>
    </div>
    
  ) : (
    <h2>No user details</h2>
  )}

    <div className='userDetails'>
      <h4>{friends.length} Friends</h4>
      <h4>{myposts.length} Posts</h4>
    </div>

  <div className='myPostsFrame'>
  {myposts.map((mp) => (
    <img key={mp._id} src={mp.post} />
  ))}
</div>
  
  <div className='content'>
    <div className='friends'>    
      <h2>Your Friends</h2>
      <ul className='profile-ul' >
        {friends.length > 0 ? (
          friends.map(fr => (
            <li key={fr._id} className='profile-li' >
              <p>{fr.name}</p>  
              <button type='button' className='profile-follow-btn' onClick={() => removeFriend(fr._id)}>Unfollow</button>
            </li>
          ))
        ) : (
          <li className='profile-li' >No Followers</li>
        )}
      </ul>
    </div>

    <div className='suggestions'>
      <h2>People You May Know:</h2>
      <ul  className='profile-ul' >
        {availableUsers.length > 0 ? (
          availableUsers.map(u => (
            <li key={u._id} className='profile-li'>
              <p>{u.name}</p>  
              <button type='button' className='profile-follow-btn' onClick={() => addFriend(u._id)}>Follow</button>
            </li>
          ))
        ) : (
          <li className='profile-li' >No users found</li>
        )}
      </ul>
    </div>
  </div>
</div>

  );
};

export default Profile;
