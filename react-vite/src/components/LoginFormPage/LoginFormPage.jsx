import { useState } from "react";
import { thunkLogin, thunkLogout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import LogInButton from "./LogInButton";
import "./LoginFormPage.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogout = async () => {
    await dispatch(thunkLogout());
    navigate("/"); 
  };

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <ul className="navlist-login-page">
        <li className="login-startup-title">
          <NavLink to="/">StartUp</NavLink>
        </li>
      </ul>
      <h1 className="login-form-heading">Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message} className="error-message">{message}</p>)}
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="email" className="login-label">
          Email
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label htmlFor="password" className="login-label">
          Password
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
        {/* <button type="submit" className="login-submit-button">
          Log In
        </button> */}
        <LogInButton
            type="submit" 
            className="login-submit-button"
            isAuthenticated={!!sessionUser}
            onLogout={handleLogout}
        />
      </form>
      <div className="signup-section">
        <hr className="divider" />
        <p className="signup-text">
          New to the site? <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
        </p>
      </div>
    </>
  );
}

export default LoginFormPage;
