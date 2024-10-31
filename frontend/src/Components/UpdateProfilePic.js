import React from 'react';
import '../Css/UPdateProfilePic.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UpdateProfilePic = ({changePfp}) => {
    const user = JSON.parse(localStorage.getItem('User'));
    const navigate = useNavigate()
  // Remove Profile PFP:
    const removePhoto = async () => {
        const userId = user._id;
        console.log(userId)
        const response = await axios.post('http://localhost:5000/api/user/removePfp',{userId})
        if(response){
            console.log(response.data)
            localStorage.setItem("User",JSON.stringify(response.data));
             navigate('/editprofile')
             changePfp(false);
        } else {
            console.log(response.error)
        }
    }
  return (
    <div className='updateprofilepic'>
            <div className='changePic'>
                <h2>Change Profile Photo</h2>

                <div style={{borderTop:"1px solid #00000030"}}>
                    
                    <button  className='upload-btn' style={{color:"#1EA1F7", textAlign: "center" }} 
                    // onClick={() => {handleClick()}}    
                    >Upload Photo</button>

                    <input type='file' accept='image/*' style={{display:"none"}} 
                    //  ref={hiddenFileInput} 
                    //  onChange={(e) => {setImage(e.target.files[0])}}   
                    />
                </div>
                
                <div style={{borderTop:"1px solid #00000030" }}>
                    <button className='upload-btn cancel-btn'
                    onClick={() => {removePhoto()}}
                    >Remove Current Photo</button>
                </div>
                
                <div style={{borderTop:"1px solid #00000030", textAlign: "center" }}>
                    <button style={{ background:"none", border:"none", cursor:"pointer", fontSize:"15px"}}
                    onClick={changePfp}
                    >Cancel</button>
                </div>

            </div>
        </div>
  )
}

export default UpdateProfilePic