import React from 'react'

const ProfileNavbar = () => {
  return (
    <div className='ProfileNavbar'>
        <div className='navbar'>
            <h2>hi he</h2>
            <ul>
                <Link to = '/signin'><li>SignIn</li></Link>
                <Link to = '/signup'><li>SignUp</li></Link>
            </ul>

        </div>
    </div>

  )
}

export default ProfileNavbar