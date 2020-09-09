import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

const Navbar = ({ user }) => {
  const { logoutUser } = useContext(GlobalContext);

  return (
    <>
      {user.token ? (
        <nav className='navbar nav-bg'>
          <h1>
            <Link to='/'>Trackit</Link>
          </h1>
          <ul>
            <li>
              <Link to='/' onClick={() => logoutUser()}>
                Logout
              </Link>
            </li>
            <li>
              <Link to='/myassets'>My Assets</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className='navbar nav-bg'>
          <h1>
            <Link to='/'>Trackit</Link>
          </h1>
          <ul>
            <li>
              <Link to='/signup'>Sign up</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
