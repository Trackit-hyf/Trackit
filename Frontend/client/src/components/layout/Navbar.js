import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <a href='#'>MY Finance</a>
      </h1>
      <ul>
        <li>
          <a href='#'>Sign up</a>
        </li>
        <li>
          <a href='#'>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
