import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import Button from './Button';
import './Navbar.css';

const Navbar = ({ user }) => {
  const { logoutUser } = useContext(GlobalContext);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const history = useHistory();

  return (
    <>
      {user.token ? (
        <>
          <nav className='navbar'>
            <div className='navbar-container'>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                TRACKIT
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link
                    to='/myassets'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    My Assets
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/supportedCoins'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Supported Coins
                  </Link>
                  <li className='nav-item'>
                    <Link
                      to='/'
                      className='nav-links-mobile'
                      onClick={() => {
                        logoutUser();
                        localStorage.clear();
                        closeMobileMenu();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </li>
              </ul>
              {button && (
                <Link
                  to='/'
                  onClick={() => {
                    logoutUser();
                    localStorage.clear();
                    closeMobileMenu();
                  }}
                >
                  <Button>Logout</Button>
                </Link>
              )}
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className='navbar'>
            <div className='navbar-container'>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                TRACKIT
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link
                    to='/supportedCoins'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Supported Coins
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link
                    to='/login'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>

                  <li className='nav-item'>
                    <Link
                      to='/signup'
                      className='nav-links-mobile'
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </Link>
                  </li>
                </li>
              </ul>

              {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
