import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTachometerAlt, FaBoxOpen, FaList, FaUserLock, FaSignOutAlt } from 'react-icons/fa';

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Determine active route based on current location
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-logo">
        <img src="https://figmage.com/images/iMa9rM-IVDGz6AHEzuP_s.png" alt="PowerMed Logo" />
      </div>
      <nav className="admin-nav">
        <Link to="/admin/dashboard" className={`nav-item ${isActive('/admin/dashboard')}`}>
          <FaTachometerAlt className="nav-icon" />
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/categories" className={`nav-item ${isActive('/admin/categories')}`}>
          <FaList className="nav-icon" />
          <span>Categories</span>
        </Link>
        <Link to="/admin/products" className={`nav-item ${isActive('/admin/products')}`}>
          <FaBoxOpen className="nav-icon" />
          <span>Products</span>
        </Link>
        <Link to="/admin/change-password" className={`nav-item ${isActive('/admin/change-password')}`}>
          <FaUserLock className="nav-icon" />
          <span>Profile</span>
        </Link>
      </nav>
      <div className="admin-footer">
        <div className="welcome-greeting">
          <p>Welcome, {user?.firstName || user?.name || 'Admin'}!</p>
        </div>
        <div className="user-info">
          <p className="user-email">{user?.email}</p>
        </div>
        <button onClick={logout} className="logout-button">
          <FaSignOutAlt style={{ marginRight: '8px' }} />
          Logout
        </button>
      </div>
    </div>
  );
}
