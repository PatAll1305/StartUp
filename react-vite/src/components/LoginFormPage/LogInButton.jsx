import { useNavigate } from 'react-router-dom';
import "./LogInButton.css";

const LoginButton = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <button 
    onClick={handleClick} 
    type="submit" 
    className="login-submit-button">
      {isAuthenticated ? 'Logout' : 'Log In'}
    </button>
  );
};

export default LoginButton;
