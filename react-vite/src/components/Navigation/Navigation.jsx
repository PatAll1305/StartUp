// import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation() {
  // const [showLoginModal, setShowLoginModal] = useState(false);
  // const [showSignupModal, setShowSignupModal] = useState(false);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleStartProjectClick = () => {
    alert("This feature is coming soon!");
    // navigate("/StartProject"); 
  };

  return (
    <ul className="navlist-navigation">
      <li>
        <NavLink className="navigation-startup" to="/">StartUp</NavLink>
      </li>
      <li>
        <div className="search-bar">
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
          <input 
            placeholder="Search projects, creators, and categories"
            type="text"
            value=""
          />
        </div>
      </li>
      <li className="right-side">
        <button
          className="auth-button"
          onClick={handleStartProjectClick}>
            Start a Project
        </button>
        <button 
          className="auth-button" 
          onClick={handleLoginClick}>
            Log In
        </button>
      </li>
    </ul>
  );
}

export default Navigation;
