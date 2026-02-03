import express from 'express';
import Category from '../models/Category.js';
import { protectAdmin, admin } from '../middleware/auth.js';
import { upload, uploadToCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Return categories in insertion order (earliest first) instead of alphabetical
    // Sorting by `_id` ascending preserves insertion order (ObjectId contains timestamp)
    const categories = await Category.find({ isActive: true }).sort({ _id: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/categories
// @desc    Create a new category
// @access  Private (Admin)
router.post('/', protectAdmin, admin, upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    let imageUrl = '';
    
    // Upload image to Cloudinary if provided (optional - don't fail if upload fails)
    if (req.file) {
      try {
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer, 'powermed/categories');
        imageUrl = cloudinaryResult.secure_url;
        console.log('Image uploaded successfully:', imageUrl);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        // Don't fail the entire request - just log the error and continue without image
        console.warn('⚠️  Category will be created without image due to Cloudinary upload failure');
        // You can optionally return an error here if image is required
        // For now, we'll allow creating category without image
      }
    }

    const category = new Category({
      name,
      image: imageUrl || undefined, // Only set if imageUrl is not empty
    });

    try {
      const savedCategory = await category.save();
      console.log('Category created:', savedCategory);
      res.status(201).json(savedCategory);
    } catch (saveError) {
      console.error('Error saving category:', saveError);
      res.status(400).json({ message: saveError.message || 'Failed to save category' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update a category
// @access  Private (Admin)
router.put('/:id', protectAdmin, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, isActive } = req.body;
    console.log('Update request body:', { name, description, isActive, hasFile: !!req.file });

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if new name conflicts with existing category
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
    }

    // Upload new image to Cloudinary if provided (optional - don't fail if upload fails)
    if (req.file) {
      try {
        console.log('Uploading image to Cloudinary...');
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer, 'powermed/categories');
        category.image = cloudinaryResult.secure_url;
        console.log('Image uploaded successfully:', cloudinaryResult.secure_url);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        console.warn('⚠️  Category will be updated without new image due to Cloudinary upload failure');
        // Don't fail the entire request - just log the error
        // The category will be updated without the new image (keeps existing image if any)
      }
    }
    // Note: If no new image is provided, we keep the existing image (don't modify category.image)

    if (name) category.name = name;
    // description field removed from schema — no-op
    if (isActive !== undefined) {
      // Handle string 'true'/'false' from form data
      category.isActive = isActive === 'true' || isActive === true;
    }

    console.log('Category before save:', { name: category.name, hasImage: !!category.image });
    try {
      const updatedCategory = await category.save();
      console.log('Category updated successfully:', updatedCategory._id);
      res.json(updatedCategory);
    } catch (saveError) {
      console.error('Error saving category:', saveError);
      console.error('Save error details:', {
        message: saveError.message,
        name: saveError.name,
        stack: saveError.stack
      });
      res.status(400).json({ message: saveError.message || 'Failed to save category' });
    }
  } catch (error) {
    console.error('Unexpected error in PUT /categories/:id:', error);
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete a category (hard delete - permanently removes from database)
// @access  Private (Admin)
router.delete('/:id', protectAdmin, admin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Hard delete - permanently remove from database
    await Category.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /categories/:id:', error);
    res.status(500).json({ message: error.message || 'Failed to delete category' });
  }
});

export default router;
