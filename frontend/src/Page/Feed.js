import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const Feed = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("Token");
        if (!token) {
          navigate('/');
        }
      }, []);




  return (
    <div>Feed</div>
  )
}
