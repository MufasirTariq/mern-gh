import {React, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

        <Link to='/signin'>SignIn</Link>
        <br/>
        <Link to='/signup'>SignUp</Link>
    </div>
  )
}

export default Home