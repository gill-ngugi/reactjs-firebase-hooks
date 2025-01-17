import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">Portfolio</Link>
        </div>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Projects</Link>
          <Link to="/skills" className="nav-link">Skills</Link>
          <Link to="/bio" className="nav-link">Bio</Link>
          
          {user ? (
            <div className="auth-links">
              {user.uid === process.env.REACT_APP_ADMIN_UID && (
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              )}
              <button 
                onClick={handleSignOut}
                className="sign-out-btn"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/signin" className="nav-link">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
