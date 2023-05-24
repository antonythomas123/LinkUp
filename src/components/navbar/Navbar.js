import React from 'react';
import './Navbar.css';
import { ReactComponent as Avatar } from '../../assets/avatar.svg';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar_main'>
      <div className='app_name'>
        <span>LinkUp</span>
      </div>
      <div className='options'>
        <span><Link to={'/'}>Home</Link></span>
        <span><Link to={'/login'}>Login</Link></span>
        <span>
          <Avatar className='avatar' />
        </span>
      </div>
    </div>
  )
}

export default Navbar