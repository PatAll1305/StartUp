// import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from './ProfileButton';
import { getCategoriesThunk } from "../../store/categories";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const categories = useSelector((state) => Object.values(state.categories));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

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
    <nav>
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
      <ul className="categories-navigation">
        {categories.map((category) => (
          <li key={category.id}>
            <NavLink
              to={`/categories/${category.id}/projects`}
              className="category-link"
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
