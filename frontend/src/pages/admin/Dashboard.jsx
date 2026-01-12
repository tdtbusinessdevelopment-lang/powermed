import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/admin.css';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="admin-container">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1> Admin Dashboard</h1>
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
