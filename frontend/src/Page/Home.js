import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

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
        <h1>Home Page</h1>
    </div>
  )
}

export default Home