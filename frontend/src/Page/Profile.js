import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/Profile.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('User'));
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [myposts, setMyPosts] = useState([]);

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

  const myPostList = async() => {
    const userId = user._id;
    const response = await axios.post('http://localhost:5000/api/post/myposts', { userId });
    if (response) {
      console.log(response.data);
      setMyPosts(response.data);
    }
  };

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
    <div className='profile-page'>
      <nav className='sidebar'>
        <div className='profile-info'>
          {user.image ? (
            <img src={user.image} alt='User Profile' className='profile-pfp' />
          ) : (
            <img className='profile-pfp' src='https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?semt=ais_hybrid' alt='Default User' />
          )}
          <h3 className='profile-h3'>{user.name}</h3>
          <h3 className='profile-h3' >{friends.length} Friends {myposts.length} Posts</h3>
          <h3 className='profile-h3'></h3>
        </div>
        <button className='edit-profile' type='button' onClick={() => { navigate('/editprofile') }}>Edit Profile</button>
      </nav>
      
      <main className='main-content'>
        <div className='posts'>
          {myposts.map((mp) => (
            <img key={mp._id} src={mp.post} className='post-image' />
          ))}
        </div>

        <div className='sidebar-right'>
          <div className='friends'>
            <h3>Your Friends</h3>
            <ul className='profile-ul' style={{textAlign:'left' }}>
              {friends.length > 0 ? (
              friends.map(fr => (
                <li key={fr._id} className='profile-li'>
                  {fr.image ? (
                      <img src={fr.image} alt='User Profile' style={{width:'40px', height:'40px', borderRadius:'50%' }} />
                      ) : (
                        <img style={{width:'40px', height:'40px', borderRadius:'50%' }} src='https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?semt=ais_hybrid' alt='Default User' />
                      )}
                  <p className='friend-name'>{fr.name}</p>
                  <button type='button' className='profile-follow-btn' onClick={() => removeFriend(fr._id)}>Unfollow</button>
                </li>
                ))
                ) : (
                <li className='profile-li'>No Friends</li>
                )}
              </ul>


          </div>

          <div className='suggestions'>
            <h3>People You May Know:</h3>
            <ul className='profile-ul'>
              {availableUsers.length > 0 ? (
                availableUsers.map(u => (
                  <li key={u._id} className='profile-li'>
                    {u.image ? (
                      <img src={u.image} alt='User Profile' style={{width:'40px', height:'40px', borderRadius:'50%' }} />
                      ) : (
                        <img style={{width:'40px', height:'40px', borderRadius:'50%' }} src='https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?semt=ais_hybrid' alt='Default User' />
                      )}
                    <p>{u.name}</p>
                    <button type='button' className='profile-follow-btn' onClick={() => addFriend(u._id)}>Follow</button>
                  </li>
                ))
              ) : (
                <li className='profile-li'>No users found</li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
