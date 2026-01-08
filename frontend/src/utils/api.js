// API utility functions for connecting frontend to backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Category API functions
export const categoryAPI = {
  // Get all categories
  getAll: async () => {
    return apiCall('/categories');
  },

  // Get single category by ID
  getById: async (id) => {
    return apiCall(`/categories/${id}`);
  },

  // Create category
  create: async (categoryData) => {
    return apiCall('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  // Update category
  update: async (id, categoryData) => {
    return apiCall(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  // Delete category
  delete: async (id) => {
    return apiCall(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// Product API functions
export const productAPI = {
  // Get all products (with optional filters)
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.isActive !== undefined) queryParams.append('isActive', filters.isActive);

    const queryString = queryParams.toString();
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`);
  },

  // Get single product by ID
  getById: async (id) => {
    return apiCall(`/products/${id}`);
  },

  // Create product (with image upload)
  create: async (productData, imageFile) => {
    const formData = new FormData();
    
    // Append all product fields
    Object.keys(productData).forEach(key => {
      if (productData[key] !== undefined && productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    });

    // Append image file
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return apiCall('/products', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type with boundary for FormData
      body: formData,
    });
  },

  // Update product (with optional image upload)
  update: async (id, productData, imageFile = null) => {
    const formData = new FormData();
    
    // Append all product fields
    Object.keys(productData).forEach(key => {
      if (productData[key] !== undefined && productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    });

    // Append image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return apiCall(`/products/${id}`, {
      method: 'PUT',
      headers: {}, // Let browser set Content-Type with boundary for FormData
      body: formData,
    });
  },

  // Delete product
  delete: async (id) => {
    return apiCall(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

export default {
  categoryAPI,
  productAPI,
};
