import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';

dotenv.config();

const categories = [
  {
    name: 'Weight Management & Metabolic Support Peptides',
  },
  {
    name: 'Regenerative, Repair & Anti-Aging Peptides',
  },
  {
    name: 'Growth Hormone–Modulating Peptides',
  },
  {
    name: 'Cognitive, Mood & Stress Support Peptides',
  },
  {
    name: 'Skin, Beauty & Cosmetic Peptides',
  },
  {
    name: 'Sexual Wellness Peptides',
  },
  {
    name: 'Fat Burner Injectables (Not Peptides)',
  },
  {
    name: 'Hormones & Growth Factors (Not Peptides)',
  },
  {
    name: 'Vitamins, Cofactors & Others',
  },
  {
    name: 'Injectable Pens',
  },
];

const seedCategories = async () => {
  try {
    await connectDB();

    // Clear existing categories (optional - remove if you want to keep existing data)
    // await Category.deleteMany({});

    // Check which categories already exist
    const existingCategories = await Category.find({});
    const existingNames = existingCategories.map(cat => cat.name);

    // Insert only new categories
    const categoriesToInsert = categories.filter(cat => !existingNames.includes(cat.name));

    if (categoriesToInsert.length > 0) {
      await Category.insertMany(categoriesToInsert);
      console.log(`✅ Seeded ${categoriesToInsert.length} new categories`);
    } else {
      console.log('✅ All categories already exist in the database');
    }

    // Display all categories
    const allCategories = await Category.find({});
    console.log(`\n📋 Total categories in database: ${allCategories.length}`);
    allCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
