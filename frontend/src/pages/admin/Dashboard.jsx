import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { categoryAPI, productAPI } from '../../utils/api';
import AdminSidebar from '../../components/AdminSidebar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { FaBoxOpen, FaList } from 'react-icons/fa';
import '../../styles/admin.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
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

      console.log('All Products:', products);

      // Sort products by views (descending) and take top 5
      const sortedByViews = [...products]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);

      setTopProducts(sortedByViews);

      // Sort products by date (descending) and take top 5
      const sortedByDate = [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setRecentProducts(sortedByDate);
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
          <div className="dashboard-card card-gradient-orange">
            <div className="card-header-flex">
              <h3>Categories</h3>
              <FaList className="card-icon" />
            </div>
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

          <div className="dashboard-card card-gradient-blue">
            <div className="card-header-flex">
              <h3>Products</h3>
              <FaBoxOpen className="card-icon" />
            </div>
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

        <div className="dashboard-section">
          <h2>Most Viewed Products</h2>
          <div className="chart-container">
            {loading ? (
              <div className="loading-container">Loading chart data...</div>
            ) : topProducts.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProducts}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    angle={0}
                    textAnchor="middle"
                    height={30}
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    formatter={(value) => [`${value} Views`, 'Views']}
                    labelStyle={{ color: '#333' }}
                  />
                  <Bar dataKey="views" fill="#e66f27" radius={[4, 4, 0, 0]}>
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#e66f27' : '#f39c12'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data-container">No views data yet</div>
            )}
          </div>
        </div>
        <div className="dashboard-section" style={{ marginTop: '30px' }}>
          <h2>Recently Added Products</h2>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Added</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <span className={`badge ${product.isActive ? 'badge-success' : 'badge-danger'}`}>
                        {product.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td>{product.name}</td>
                    <td>₱{parseFloat(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {recentProducts.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">No recent activity</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
