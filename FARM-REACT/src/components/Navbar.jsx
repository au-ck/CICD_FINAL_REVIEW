// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">FarmerFriendly</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated && user?.role === 'farmer' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/farmer/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/farmer/products">Products</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/farmer/orders">Orders</Link></li>
              </>
            )}
            {isAuthenticated && user?.role === 'buyer' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/buyer/dashboard">Shop</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/buyer/orders">My Orders</Link></li>
              </>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={logout}>
                  Logout ({user?.name})
                </button>
              </li>
            )}
            {!isAuthenticated && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;