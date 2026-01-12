import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { categoryAPI, productAPI } from '../../utils/api';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/admin.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [categories, products] = await Promise.all([
        categoryAPI.getAll(),
        productAPI.getAll()
      ]);
      setCategoriesCount(categories.length);
      setProductsCount(products.length);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Categories</h3>
            <div className="dashboard-stat">
              {loading ? (
                <span className="stat-loading">Loading...</span>
              ) : (
                <span className="stat-number">{categoriesCount}</span>
              )}
            </div>
            <p>Total categories</p>
            <Link to="/admin/categories" className="card-link-button">
              Manage Categories →
            </Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Products</h3>
            <div className="dashboard-stat">
              {loading ? (
                <span className="stat-loading">Loading...</span>
              ) : (
                <span className="stat-number">{productsCount}</span>
              )}
            </div>
            <p>Total products</p>
            <Link to="/admin/products" className="card-link-button">
              Manage Products →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
