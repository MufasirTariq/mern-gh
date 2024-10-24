import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export const Feed = () => {
    const navigate = useNavigate();
    var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("Token");
        if (!token) {
          navigate('/');
        } else {
          feed();
        }
      }, []);

      const feed = async () => {
        const response = await axios.get('http://localhost:5000/api/post/allposts')
        if(response){
          console.log(response);
          setPosts(response.data);
        }
      }


      return (
        <div className='feed'>
          {posts.map((p) => (
            <div className='card' key={p._id}> 
              <img src={p.post} alt='post' style={{ width: '20%' }} />
            </div>
          ))}
        </div>
      );
      
}
