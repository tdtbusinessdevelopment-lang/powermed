import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    // Find a category to attach the product to (use first available)
    let category = await Category.findOne({});
    if (!category) {
      console.log('No category found. Please run seedCategories first.');
      process.exit(1);
    }

    const productName = 'PT-141 Nasal Spray (Sample)';

    const existing = await Product.findOne({ name: productName });
    if (existing) {
      console.log('Sample product already exists.');
      process.exit(0);
    }

    const product = new Product({
      name: productName,
      brand: 'Seenersie',
      price: 1999.0,
      category: category._id,
      categoryType: 'Peptide',
      description: 'Boosts onset of sexual arousal, heightens libido, and addresses erectile dysfunction and female sexual dysfunction.',
      image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      stock: 100,
      faqs: [
        { question: 'What is PT-141?', answer: 'PT-141 is a peptide used to treat sexual dysfunction in men and women.' },
        { question: 'How long until results?', answer: 'Most users report effects within 30-60 minutes.' },
      ],
    });

    await product.save();
    console.log('✅ Seeded sample product:', productName);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
