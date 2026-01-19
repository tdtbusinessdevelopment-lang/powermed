import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { upload, uploadToCloudinary } from '../config/cloudinary.js';
import { protectAdmin, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products (with optional category filter)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, isActive } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Admin)
router.post('/', protectAdmin, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price, category, categoryType, description, stock } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required' });
    }

    // Upload image to Cloudinary
    let imageUrl = '';
    try {
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudinaryResult.secure_url;
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(500).json({ 
        message: uploadError.message || 'Failed to upload image to Cloudinary. Please check your internet connection and Cloudinary credentials.' 
      });
    }

    const product = new Product({
      name,
      brand: brand || 'PowerMed',
      price: parseFloat(price),
      category,
      categoryType,
      description,
      image: imageUrl,
      stock: stock ? parseInt(stock) : 0,
    });

    const savedProduct = await product.save();
    const populatedProduct = await Product.findById(savedProduct._id).populate('category', 'name slug');
    
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Admin)
router.put('/:id', protectAdmin, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, brand, price, category, categoryType, description, stock, isActive } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If category is being updated, verify it exists
    if (category && category !== product.category.toString()) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found' });
      }
      product.category = category;
    }

    // Upload new image if provided
    if (req.file) {
      try {
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        product.image = cloudinaryResult.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ 
          message: uploadError.message || 'Failed to upload image to Cloudinary. Please check your internet connection and Cloudinary credentials.' 
        });
      }
    }

    // Update other fields
    if (name) product.name = name;
    if (brand) product.brand = brand;
    if (price) product.price = parseFloat(price);
    if (categoryType !== undefined) product.categoryType = categoryType;
    if (description !== undefined) product.description = description;
    if (stock !== undefined) product.stock = parseInt(stock);
    if (isActive !== undefined) product.isActive = isActive === 'true' || isActive === true;

    const updatedProduct = await product.save();
    const populatedProduct = await Product.findById(updatedProduct._id).populate('category', 'name slug');
    
    res.json(populatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (hard delete - permanently removes from database)
// @access  Private (Admin)
router.delete('/:id', protectAdmin, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Hard delete - permanently remove from database
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
