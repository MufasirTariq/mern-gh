import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../Css/Home.css';


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if(token){
      navigate('/profile')
    }
  })
  
  return (
    <div className='home'>
        
    </div>
  )
}

export default Home