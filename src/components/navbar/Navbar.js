import React from 'react'
import './Navbar.css'
import {ReactComponent as Avatar } from '../../assets/avatar.svg';

function Navbar() {
  return (
    <div className='navbar_main'>
        <div className='app_name'>
            <span>LinkUp</span>
        </div>
        <div className='options'>
            <span>Home</span>
            <span>Login</span>
            <span>
                <Avatar className='avatar'/>
            </span>
        </div> 
    </div>
  )
}

export default Navbar