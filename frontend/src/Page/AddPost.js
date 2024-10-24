import React, {useState, useEffect} from 'react';
import '../Css/AddPost.css';
import axios from 'axios';


const AddPost = () => {
    const user = JSON.parse(localStorage.getItem('User'));

    const loadFile = (e) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = () => { URL.revokeObjectURL(output.src)};
    }

    const [post, setPost] = useState('');
    const [postURL, setPostURL] = useState('');

    const [caption, setCaption] = useState('');
    
    // Converting post into url
    const makeUrlOfPost = () => {
        const data = new FormData();
        data.append("file",post);
        data.append("upload_preset", "Instagram")
        data.append("cloud_name","xocloud")
    
        fetch("https://api.cloudinary.com/v1_1/xocloud/image/upload",
          { method: 'post', body: data}).then(res => res.json())
          .then(data => {
            setPostURL(data.url)
          })
          .catch(err => console.log(err))
    }

    useEffect(() => {
        if(post){makeUrlOfPost()}
    },[post])

    // saving post to databse of user
    const sharePost = async () => {
        const id = user._id;

        const response =  await axios.post('http://localhost:5000/api/post/addpost',{id, caption, postURL})
        if(response){
            console.log(response);
        } 
    }

    

  return (
    <div className='addpost'>
         <div className='post-header'>
                <h4 style={{margin:'3px auto'}}>Create New Post</h4>
                <button id='post-btn' 
                onClick={() => {sharePost()}}
                    >Share</button>
            </div>

            <div className='main-div'>
                <img id='output' src='https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg' alt='' />
                <input type='file' accept='image/*' 
                onChange={(e) => { 
                    loadFile(e)
                    setPost(e.target.files[0])
                    }}
                    />
            </div>

            <div className='details'>
                <div className='card-header'>    
                    <div className='card-pic'>
                        <img  src='https://media.architecturaldigest.com/photos/647e4779e92595b94166f8be/1:1/w_1273,h_1273,c_limit/abel-the-weeknd-tesfaye_2.jpg' alt=''/>
                    </div>
                    <h5>Username</h5>
                </div>

                <textarea  type='text' placeholder='Caption' onChange={(e) => {setCaption(e.target.value)}}></textarea>
            </div>
    </div>
  )
}

export default AddPost