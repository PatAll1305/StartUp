import { useState } from "react";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <ul>
      <li>
        <NavLink to="/">Kickstarter</NavLink>
      </li>
      <li>
        <div className="relative smart-input-group">
          <input
            className="atomic-text-input border-none"
            id="global-nav-search-input"
            placeholder="Search projects, creators, and categories"
            type="text"
            value=""
          />
        </div>
      </li>
      <li className="right-side">
        <button
            className="auth-button"
            onClick={() => setShowLoginModal(true)}
          >
            Log In
          </button>
          {showLoginModal && (
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={() => setShowLoginModal(false)}
              modalComponent={<LoginFormModal />}
            />
          )}
        <button
          className="auth-button"
          onClick={() => setShowSignupModal(true)}
        >
          Sign Up
        </button>
        {showSignupModal && (
          <OpenModalMenuItem
            itemText="Sign Up"
            onItemClick={() => setShowSignupModal(false)}
            modalComponent={<SignupFormModal />}
          />
        )}
      </li>
    </ul>
  );
}

export default Navigation;
