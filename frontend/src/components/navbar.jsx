import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './navbar.css';

const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">SkillSwipe</Link>
            <div className="navbar-links">
                <Link to="/jobs">Browse jobs</Link>
                {token ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="navbar-logout">Log out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Sign in</Link>
                        <Link to="/signup" className="navbar-cta">Create account</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;