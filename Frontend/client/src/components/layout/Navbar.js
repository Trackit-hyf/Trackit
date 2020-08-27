import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar nav-bg'>
      <h1>
        <Link to='/'>My Finance</Link>
      </h1>
      <ul>
        <li>
          <Link to='/signup'>Sign up</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/myassets'>My Assets</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
