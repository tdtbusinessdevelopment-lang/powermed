import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>PowerMed Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="nav-item active">
            Dashboard
          </Link>
          <Link to="/admin/categories" className="nav-item">
            Categories
          </Link>
          <Link to="/admin/products" className="nav-item">
            Products
          </Link>
        </nav>
        <div className="admin-footer">
          <div className="user-info">
            <p>{user?.name}</p>
            <p className="user-email">{user?.email}</p>
          </div>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Dashboard</h1>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Categories</h3>
            <p>Manage product categories</p>
            <Link to="/admin/categories" className="card-link">
              Manage Categories →
            </Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Products</h3>
            <p>Manage products and inventory</p>
            <Link to="/admin/products" className="card-link">
              Manage Products →
            </Link>
          </div>
        </div>
        
        <div className="welcome-section">
          <h2>Welcome, {user?.name}!</h2>
          <p>Use the navigation menu to manage categories and products.</p>
        </div>
      </div>
    </div>
  );
}
