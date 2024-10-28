import { React, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import '../Css/Feed.css';



export const Feed = () => {
    
    const navigate = useNavigate();
  
    const user = JSON.parse(localStorage.getItem('User'))
    
    const [posts, setPosts] = useState([]);

      useEffect(() => {
          const token = localStorage.getItem("Token");
          if (!token) {
            navigate('/');
          } else {
            feed();
            friendList();
          }
        }, []);

      const feed = async () => {
        const response = await axios.get('http://localhost:5000/api/post/allposts')
        if(response){
          setPosts(response.data);
        }
      }

      const likePost = async (id) => {
        const userId = user._id
        const postId = id
        const response = await axios.post(`http://localhost:5000/api/post/like`,{userId, postId});
        if(response){
          feed()
        }
        
      }

      const unLikePost = async (id) => {
        const userId = user._id
        const postId = id
        // console.log(userId, postId)
        const response = await axios.post(`http://localhost:5000/api/post/unlike`,{userId, postId});
        if(response){
          feed()
        }
      }

      const [friends, setFriends] = useState([]);
      const friendList = async () => {
        const id = user._id;
        try {
          const response = await axios.post('http://localhost:5000/api/user/friendlist', { id });
          setFriends(response.data.friends);
        } catch (error) {
          console.error("Error fetching friend list:", error);
        }
      };
      return (
        <div className='feed'>
          
          {posts.map((p) => (
            <div className='card' key={p._id}> 

              {/* card-header */}
              <div className="card-header">

                <div className="card-pic">
                  <img src={p.postedBy.image ? p.postedBy.image: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png" } alt="" />
                </div>
                
                <h5>
                  <Link to={`/profile/${p.postedBy._id}`}>
                  {p.postedBy.name}  
                  </Link>
                </h5>

                {p.postedBy._id === user._id || friends.some(f => f._id === p.postedBy._id) ?
                  (
                    <></>  
                  ) : (
                    <div className='follow-btn'>
                      <button type='button'>Follow</button>
                    </div>
                  )}
                
              </div >
              
              {/* Card image */}
              <div className="card-image">
                <img src={p.post} alt='post'  />
              </div>

              {/* card-content */}
              <div className="card-content">
                 {p.likes.includes(user._id) ?
                  (<button type='button' 
                    onClick={()=>{unLikePost(p._id)}}
                  >Unlike</button>
                
                  )
                  :( 
                  <button type='button' 
                    onClick={()=>{likePost(p._id)}}
                    >Like</button>
                   )
                }
                <p ><strong>{p.likes.length}Likes</strong></p>
                <p><strong>{p.postedBy.name}</strong> {p.caption}</p>
                {/* <p style={{fontWeight:"bold", cursor:"pointer"}} 
                onClick={()=>{toggleComment(p)}}
                >View all comments</p> */}

                {/* add commnets */}
                <div className="add-comment">
                  <span className="material-symbols-outlined"> </span>
                  <input type='text' placeholder="Add comments" 
                  // value={comment} 
                  // onChange={(e)=>{setComment(e.target.value)}}
                  />
                  <button className="comment" 
                  // onClick={()=>{makeComment(comment, post._id);}}
                  >Post</button> 
                </div>  
              </div>
            </div>
          
          ))}
        </div>
      );
      
}
