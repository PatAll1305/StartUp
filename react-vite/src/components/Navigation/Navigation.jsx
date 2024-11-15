// import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
// import { getCategoriesThunk } from "../../store/categories";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleStartProjectClick = () => {
    // alert("This feature is coming soon!");
    if (sessionUser) {
      navigate("/projects/create"); 
    } else {
      navigate("/login"); 
    }
  };

  return (
    <ul className="navlist-navigation">
      <li>
        <NavLink className="navigation-startup" to="/">StartUp</NavLink>
      </li>
      <li>
        <div className="search-bar">
          <input
            placeholder="Search projects, creators, and categories"
            type="text"
            value=""
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </li>
      <li className="right-side">
        {sessionUser ? (
          <>
            <button
              className="auth-button"
              onClick={handleStartProjectClick}>
              Start a Project
            </button>
            <ProfileButton user={sessionUser} />
          </>
        ) : (
          <>
            <button
              className="auth-button"
              onClick={handleStartProjectClick}
            >
              Start a Project
            </button>
            <button
              className="auth-button"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </li>
      
    </ul>
  );
}

export default Navigation;
