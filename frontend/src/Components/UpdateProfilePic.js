import React, { useEffect, useRef, useState } from 'react';
import '../Css/UPdateProfilePic.css'; // Ensure the correct path is used
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfilePic = ({ changePfp }) => {
    const user = JSON.parse(localStorage.getItem('User'));
    const navigate = useNavigate();

    // Function to remove profile photo
   
    const removePhoto = async () => {
        const userId = user._id;
        try {
            const response = await axios.post('http://localhost:5000/api/user/removePfp', { userId });
            if (response.data) {
                console.log(response.data);
                localStorage.setItem("User", JSON.stringify(response.data));
                navigate('/editprofile');
                changePfp(false);
            }
        } catch (error) {
            console.error("Error removing profile picture:", error);
        }
    };

    // UPdate profile pic
    // State to manage the selected image and its URL
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    // Reference for the file input
    const inputFile = useRef(null);
    const openImageFile = () => {
        inputFile.current.click();
    };
    // Function to upload image to Cloudinary
    const createImageUrl = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Instagram");
        data.append("cloud_name", "xocloud");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/xocloud/image/upload", {
                method: 'POST',
                body: data,
            });
            const result = await res.json();
            setImageUrl(result.url);
        } catch (err) {
            console.error("Error uploading image:", err);
        }
    };

    useEffect(() => {
        if (image) {
            createImageUrl();
        }
    });

    const UpdatePfp = async () => {
        const userId = user._id
        const response = await axios.post('http://localhost:5000/api/user/updatePfp',{userId, imageUrl})
        if(response){
            localStorage.setItem("User", JSON.stringify(response.data));
            navigate('/editprofile');
            changePfp(false);
        } else {
            console.log(response.error)
        }
    }

    useEffect(() => {
        if(imageUrl){UpdatePfp()}
    })

    return (
        <div className='updateprofilepic'>
            <div className='changePic'>
                <h2>Change Profile Photo</h2>

                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button
                        className='upload-btn'
                        style={{ color: "#1EA1F7", textAlign: "center" }}
                        onClick={openImageFile}
                    >
                        Upload Photo
                    </button>

                    <input
                        type='file'
                        accept='image/*'
                        style={{ display: "none" }}
                        ref={inputFile}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button
                        className='upload-btn cancel-btn'
                        onClick={removePhoto}
                    >
                        Remove Current Photo
                    </button>
                </div>

                <div style={{ borderTop: "1px solid #00000030", textAlign: "center" }}>
                    <button
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}
                        onClick={() => changePfp(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePic;
