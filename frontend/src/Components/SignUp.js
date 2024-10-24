import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/SignUp.css';

const SignUp = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [imageURL, setImageURL] = useState('');

  // Uploading Image on cludinary for saving url :
  const makeURLofPfp = async () => {
    const data =  new FormData();
    data.append("file",image);
    data.append("upload_preset", "Instagram")
    data.append("cloud_name","xocloud")

    fetch("https://api.cloudinary.com/v1_1/xocloud/image/upload",
      { method: 'post', body: data}).then(res => res.json())
      .then(data => {
        console.log(data.url)
        setImageURL(data.url)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(image){makeURLofPfp()}
  },[image]);

  const navigate = useNavigate()

  const sendData = async () => {
    console.log(name, email, password, imageURL);
    try {
          const response = await axios.post('http://localhost:5000/api/user/signup',{name, email, password, imageURL});
          if(response){
            navigate('/signin');
          }
          
    } catch (error) {
      console.log("Error",error);
    }

  }
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if(token){
      navigate('/profile')
    }
  })


  return (
    <div className='signup'>

      <div className='signup-form'>
        <h2 className='xo'>XO</h2>
        
        <input type='text' name='name' placeholder='Enter Name' onChange={(e) => {setName(e.target.value)}} /> <br/>
        
        <input type='email' name='email' placeholder='Enter Email' onChange={(e) => {setEmail(e.target.value)}} /> <br/>
        
        <input type='text' name='password' placeholder='Enter Password' onChange={(e) => {setPassword(e.target.value)}} /> <br/>

        <input type='file' accept='image/*'  onChange={(e) => {setImage(e.target.files[0])}} />

        <input type='submit' id='signup-btn' value='SignUp' onClick={() => sendData()} />

        <Link to='/signin' className='loginPara'>Already have an account?</Link>
      
      </div>


    </div>
  )
}

export default SignUp