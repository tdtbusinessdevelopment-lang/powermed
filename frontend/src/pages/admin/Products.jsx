import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { productAPI, categoryAPI } from '../../utils/api';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/admin.css';

export default function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    categoryType: '',
    description: '',
    faqs: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // derive a lookup for category names by id (use string keys) for grouping and display
  const categoryById = {};
  categories.forEach((c) => {
    try {
      const key = c._id?.toString ? c._id.toString() : String(c._id);
      categoryById[key] = c.name;
    } catch (e) {
      // ignore
    }
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryAPI.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories');
    }
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

    try {
      if (editingProduct) {
        // Update product
        const payload = { ...formData, faqs: JSON.stringify(formData.faqs) };
        const result = await productAPI.update(editingProduct._id, payload, imageFile);
        if (result) {
          setSuccess('Product updated successfully!');
          setShowModal(false);
          resetForm();
          fetchProducts();
        }
      } else {
        // Create product
        if (!imageFile) {
          setError('Product image is required');
          return;
        }
        const payload = { ...formData, faqs: JSON.stringify(formData.faqs) };
        const result = await productAPI.create(payload, imageFile);
        if (result) {
          setSuccess('Product created successfully!');
          setShowModal(false);
          resetForm();
          fetchProducts();
        }
      }
    } catch (error) {
      setError(error.message || 'Operation failed');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category._id || product.category,
      categoryType: product.categoryType || '',
      description: product.description || '',
      faqs: product.faqs || [],
    });
    setImagePreview(product.image || '');
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productAPI.delete(id);
      setSuccess('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      setError('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      categoryType: '',
      description: '',
      faqs: [],
    });
    setImageFile(null);
    setImagePreview('');
    setEditingProduct(null);
  };

  const addFaq = () => {
    setFormData(prev => ({ ...prev, faqs: [...(prev.faqs || []), { question: '', answer: '' }] }));
  };

  const removeFaq = (index) => {
    setFormData(prev => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
  };

  const handleFaqChange = (index, field, value) => {
    setFormData(prev => {
      const newFaqs = [...(prev.faqs || [])];
      newFaqs[index] = { ...newFaqs[index], [field]: value };
      return { ...prev, faqs: newFaqs };
    });
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="admin-header" style={{ marginBottom: 8 }}>
          <h1>Products</h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="search">
              <input
                type="search"
                placeholder="Search products by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" onClick={() => setSearchQuery('')} title="Clear search">✖</button>
            </div>
            <button onClick={openModal} className="btn-primary">+ Add Product</button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div>
            {/* Group products by category and render a table per category for easier scanning */}
            {(() => {
              const q = (searchQuery || '').trim().toLowerCase();
              const filtered = products.filter((p) => (p.name || '').toLowerCase().includes(q));

              // group by category id (use 'uncategorized' for missing) - always use string keys
              const groups = {};
              const getCatKey = (p) => {
                if (!p.category) return 'uncategorized';
                if (typeof p.category === 'string') return p.category;
                if (p.category._id) return p.category._id.toString();
                if (p.category.id) return p.category.id.toString();
                // as last resort, try JSON string
                try {
                  return JSON.stringify(p.category);
                } catch (e) {
                  return 'uncategorized';
                }
              };

              filtered.forEach((p) => {
                const catId = getCatKey(p);
                if (!groups[catId]) groups[catId] = [];
                groups[catId].push(p);
              });

              // Render categories in the order of `categories` list
              const rendered = [];

              categories.forEach((cat) => {
                const key = cat._id?.toString ? cat._id.toString() : String(cat._id);
                const list = groups[key];
                  if (list && list.length) {
                  rendered.push(
                    <div key={cat._id} className="product-group">
                      <h3 className="product-group-title">{cat.name}</h3>
                      <div className="table-container">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {list.map((product) => (
                              <tr key={product._id}>
                                <td>
                                  {product.image ? (
                                    <img src={product.image} alt={product.name} className="product-thumb" />
                                  ) : (
                                    <div className="product-thumb-placeholder">No Image</div>
                                  )}
                                </td>
                                <td>{product.name}</td>
                                <td>₱{parseFloat(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td>
                                  <button onClick={() => handleEdit(product)} className="btn-edit">Edit</button>
                                  <button onClick={() => handleDelete(product._id)} className="btn-delete">Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                }
                // remove from groups so we can detect uncategorized later
                if (groups[key]) delete groups[key];
              });

              // any remaining groups are uncategorized (or categories not in list)
              const remainingKeys = Object.keys(groups);
              if (remainingKeys.length) {
                remainingKeys.forEach((key) => {
                  const list = groups[key];
                  rendered.push(
                      <div key={key} className="product-group">
                        <h3 className="product-group-title">{categoryById[key] || 'Uncategorized'}</h3>
                        <div className="table-container">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {list.map((product) => (
                              <tr key={product._id}>
                                <td>
                                  {product.image ? (
                                    <img src={product.image} alt={product.name} className="product-thumb" />
                                  ) : (
                                    <div className="product-thumb-placeholder">No Image</div>
                                  )}
                                </td>
                                <td>{product.name}</td>
                                <td>₱{parseFloat(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td>
                                  <button onClick={() => handleEdit(product)} className="btn-edit">Edit</button>
                                  <button onClick={() => handleDelete(product._id)} className="btn-delete">Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                });
              }

              // if nothing matched, show a placeholder
              if (rendered.length === 0) {
                return <div className="text-center">No products found</div>;
              }

              return rendered;
            })()}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
              <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Category Type</label>
                  <input
                    type="text"
                    value={formData.categoryType}
                    onChange={(e) => setFormData({ ...formData, categoryType: e.target.value })}
                    placeholder="e.g., GLP-1 analog, Peptide blend"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>FAQs</label>
                  {(formData.faqs || []).map((faq, idx) => (
                    <div key={idx} className="faq-row">
                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Answer"
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                      />
                      <button type="button" className="btn-secondary" onClick={() => removeFaq(idx)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <div style={{ marginTop: 8 }}>
                    <button type="button" className="btn-primary" onClick={addFaq}>
                      + Add FAQ
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Product Image {!editingProduct && '*'}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingProduct}
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
                  <button type="submit" className="btn-primary">
                    {editingProduct ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
