import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
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