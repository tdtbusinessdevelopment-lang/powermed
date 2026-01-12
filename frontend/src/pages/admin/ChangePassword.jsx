import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../utils/api';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/admin.css';

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  // Parse name into first and last name
  const getNameParts = () => {
    if (!user?.name) return { firstName: '', lastName: '' };
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) {
      return { firstName: nameParts[0], lastName: '' };
    }
    const lastName = nameParts.pop();
    const firstName = nameParts.join(' ');
    return { firstName, lastName };
  };

  const { firstName, lastName } = getNameParts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password do not match');
      setLoading(false);
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      setLoading(false);
      return;
    }

    try {
      await authAPI.changePassword(formData.currentPassword, formData.newPassword);
      setSuccess('Password changed successfully! You will be logged out in 2 seconds...');
      
      // Log out and redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/admin/login');
        window.location.reload(); // Force reload to clear session
      }, 2000);
      
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to change password. Please check your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <div className="admin-header">
          <h1>Profile</h1>
        </div>

        <div className="profile-container">
          <div className="profile-info-section">
            <h2>Account Information</h2>
            <div className="info-group">
              <div className="info-item">
                <label>First Name:</label>
                <span className="info-value">{firstName || '-'}</span>
              </div>
              <div className="info-item">
                <label>Last Name:</label>
                <span className="info-value">{lastName || '-'}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span className="info-value">{user?.email || '-'}</span>
              </div>
            </div>
          </div>

          <div className="password-section">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <div className="form-group form-group-left">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter your current password"
                />
              </div>

              <div className="form-group form-group-left">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter your new password (min 6 characters)"
                  minLength={6}
                />
              </div>

              <div className="form-group form-group-left">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your new password"
                  minLength={6}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Changing Password...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
