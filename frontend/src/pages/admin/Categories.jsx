import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { categoryAPI, productAPI } from '../../utils/api';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/admin.css';

// Custom Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ color: '#e74c3c' }}>Delete Category</h2>
        <p style={{ marginBottom: '24px', color: '#666' }}>
          Are you sure you want to delete <strong>{itemName}</strong>?<br />
          This action cannot be undone.
        </p>
        <div className="modal-actions" style={{ justifyContent: 'center' }}>
          <button onClick={onClose} className="btn-secondary" style={{ minWidth: '100px' }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-delete"
            style={{ minWidth: '100px', background: '#e74c3c' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminCategories() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // Store products for counting
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catsData, prodsData] = await Promise.all([
        categoryAPI.getAll(),
        productAPI.getAll()
      ]);
      setCategories(catsData);
      setProducts(prodsData);
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getProductCount = (categoryId) => {
    return products.filter(product => {
      const pCatId = product.category?._id || product.category;
      return pCatId === categoryId;
    }).length;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const url = editingCategory
        ? `${API_BASE_URL}/categories/${editingCategory._id}`
        : `${API_BASE_URL}/categories`;

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
        setShowModal(false);
        resetForm();
        fetchData(); // Refresh both to be safe
      } else {
        setError(data.message || 'Operation failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
    });
    setImagePreview(category.image || '');
    setImageFile(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setImageFile(null);
    setImagePreview('');
    setEditingCategory(null);
  };

  // Initiate delete flow
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      setDeletingId(categoryToDelete._id);
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${API_BASE_URL}/categories/${categoryToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccess('Category deleted successfully!');
        fetchData();
      } else {
        setError('Failed to delete category');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <div className="admin-header">
          <h1>Categories</h1>
          <button onClick={() => { resetForm(); setShowModal(true); }} className="btn-primary">+ Add Category</button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {loading ? (
          <div className="loading">Loading categories...</div>
        ) : (
          <div className="categories-grid">
            {categories.length === 0 ? (
              <div className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
                No categories found
              </div>
            ) : (
              categories.map((category, index) => {
                // Cycle through 5 gradients based on index
                const gradientClass = `bg-gradient-${index % 5}`;
                const count = getProductCount(category._id);

                return (
                  <div key={category._id} className={`category-card ${gradientClass}`}>

                    {/* Product Count Badge (Replacing Image) */}
                    <div className="category-count-wrapper">
                      <span className="category-count-number">{count}</span>
                      <span className="category-count-label">Products</span>
                    </div>

                    <h3>{category.name}</h3>

                    <div className="category-actions">
                      <button
                        onClick={() => handleEdit(category)}
                        className="btn-action-icon"
                        title="Edit"
                        disabled={deletingId === category._id}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category)}
                        className="btn-action-icon delete"
                        title="Delete"
                        disabled={deletingId === category._id}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                {/* Description removed */}
                <div className="form-group">
                  <label>Category Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? (editingCategory ? 'Updating...' : 'Creating...') : (editingCategory ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={categoryToDelete?.name}
        />

      </div>
    </div>
  );
}
