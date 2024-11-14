import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { thunkLogout } from "../../store/session";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.alert("Feature Coming Soon...");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div  onClick={toggleMenu} className='nav-bar-dropdown'>
      <FaBars className='hamburger' />
      {user ? (
        <div className='username-profile'>
          <span>{user.username[0].toUpperCase()}</span>
    </div>
      ) :
        <FaUserCircle />

      }
      <ul className={ulClassName} ref={ulRef}>
      {user ? (
        <>
          <li onClick={handleOnClick}>Your Projects</li>
          {/* <div className='divider-horizontal'></div> */}
          <li>Recommended</li>
          <li onClick={handleOnClick}>Following</li>
          <div className='divider-horizontal'></div>
          <li onClick={handleOnClick}>Profile</li>
          <li>Settings</li>
          <li onClick={handleOnClick}>Messages</li>
          <div className='divider-horizontal'></div>
          <spam>                              </spam>
          <div className='divider-horizontal'></div>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </>
      ) : null}
      </ul>
    </div>
  );
}

export default ProfileButton;
